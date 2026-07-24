/* =========================================================
   Marcela & Carlos — script compartido
   ========================================================= */

/* ---------- CONFIGURACIÓN ----------
   Pega aquí la URL de tu Web App de Google Apps Script
   (ver instrucciones en GUIA-GOOGLE-SHEETS.md).
   Mientras esté vacío, el formulario igual funciona y
   redirige a "gracias.html". */
const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbxFlSVkzPJTy0nRdD5gf3jjauMUzN6zRppRQuKSziuKZnK8-oIjwD0d-pV-saE2eb7b9g/exec";

(function(){
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Cortinilla de intro + arranque del título ---------- */
  const intro = document.getElementById('intro');
  const titleEl = document.querySelector('.write-svg');
  function startTitle(){ if(titleEl) titleEl.classList.add('start'); }

  if(intro){
    if(prefersReduced){
      // Movimiento reducido: mostrar la portada directo
      intro.remove();
      startTitle();
    } else {
      // La cortinilla aparece cada vez que se abre o recarga el sitio
      document.body.style.overflow = 'hidden';
      setTimeout(function(){
        intro.classList.add('lift');   // sube y destapa
        startTitle();                  // el título se escribe al destaparse
        setTimeout(function(){
          intro.remove();
          document.body.style.overflow = '';
        }, 1100);
      }, 3000);
    }
  } else {
    // Páginas internas: no hay cortinilla
    startTitle();
  }

  /* ---------- Menú hamburguesa ---------- */
  const burger = document.querySelector('.hamburger');
  const menu = document.querySelector('.mobile-menu');
  if(burger && menu){
    const close = menu.querySelector('.close');
    burger.addEventListener('click',()=>{ burger.classList.toggle('open'); menu.classList.toggle('open'); });
    if(close) close.addEventListener('click',()=>{ burger.classList.remove('open'); menu.classList.remove('open'); });
  }

  /* ---------- Botón "Atrás": navegación secuencial entre páginas ---------- */
  (function(){
    const order = ['index','nos-casamos','la-boda','hospedaje',
                   'mesa-de-regalos','confirma-asistencia'];
    let page = (location.pathname.split('/').pop() || 'index').replace(/\.html$/,'');
    if(page === '') page = 'index';
    const i = order.indexOf(page);
    // En las páginas de gracias no aparece (ya tienen "Volver al intro").
    if(i > 0){
      const back = document.createElement('a');
      back.className = 'nav-back';
      back.href = order[i-1] + '.html';
      back.setAttribute('aria-label','Página anterior');
      back.innerHTML = '<span class="arrow">&#9664;</span> Atrás';
      const cont = document.querySelector('.continue');
      if(cont){ cont.classList.add('has-back'); cont.insertBefore(back, cont.firstChild); }
      else { document.body.appendChild(back); }
    }
  })();

  /* ---------- Transición fade-out al cambiar de página ---------- */
  function isInternalPage(a){
    const href = a.getAttribute('href') || '';
    if(!href || href.startsWith('#')) return false;
    if(a.target === '_blank') return false;
    if(/^(https?:|mailto:|tel:)/i.test(href)) return false;
    return href.endsWith('.html');
  }
  document.querySelectorAll('a').forEach(a=>{
    if(!isInternalPage(a)) return;
    a.addEventListener('click', e=>{
      e.preventDefault();
      const url = a.getAttribute('href');
      if(prefersReduced){ window.location.href = url; return; }
      document.body.classList.add('is-leaving');
      requestAnimationFrame(()=> document.body.classList.add('go'));
      setTimeout(()=>{ window.location.href = url; }, 430);
    });
  });

  /* ---------- Formulario RSVP: selección Sí/No + campos condicionales ---------- */
  const qAcomp = document.getElementById('q-acomp');
  const qCount = document.getElementById('q-count');
  function setHidden(group, val){
    const h = group.parentElement.querySelector('input[type=hidden]');
    if(h) h.value = val;
  }
  function showCond(el){ if(el) el.classList.add('show'); }
  function hideCond(el){ if(el) el.classList.remove('show'); }
  function resetGroup(name){
    const g = document.querySelector('.yesno[data-group="'+name+'"]');
    if(g){ g.querySelectorAll('button').forEach(b=>b.classList.remove('sel')); setHidden(g,''); }
  }
  document.querySelectorAll('.yesno').forEach(group=>{
    group.querySelectorAll('button').forEach(btn=>{
      btn.addEventListener('click',()=>{
        group.classList.remove('err');
        group.querySelectorAll('button').forEach(b=>b.classList.remove('sel'));
        btn.classList.add('sel');
        const val = btn.dataset.val;
        setHidden(group, val);
        const which = group.dataset.group;
        if(which === 'asiste'){
          if(val === 'si'){ showCond(qAcomp); }
          else { hideCond(qAcomp); hideCond(qCount); resetGroup('tiene'); }
        } else if(which === 'tiene'){
          if(val === 'si'){ showCond(qCount); }
          else { hideCond(qCount); }
        }
      });
    });
  });

  /* ---------- Envío del formulario → Google Sheets + ruteo de gracias ---------- */
  const form = document.querySelector('#rsvp-form');
  if(form){
    form.addEventListener('submit', e=>{
      e.preventDefault();

      const nombreEl = form.querySelector('input[name=nombre]');
      const whatsEl  = form.querySelector('input[name=whatsapp]');
      const asisteVal = (form.querySelector('input[name=asiste]')||{}).value || '';
      const tieneVal  = (form.querySelector('input[name=tiene_acompanantes]')||{}).value || '';
      const asisteGroup = form.querySelector('.yesno[data-group="asiste"]');
      const tieneGroup  = form.querySelector('.yesno[data-group="tiene"]');

      // validación mínima de campos requeridos (*)
      let ok = true;
      if(!nombreEl.value.trim()){ nombreEl.classList.add('err'); ok=false; } else nombreEl.classList.remove('err');
      if(!asisteVal){ asisteGroup.classList.add('err'); ok=false; }
      if(asisteVal==='si' && !tieneVal){ tieneGroup.classList.add('err'); ok=false; }
      if(!whatsEl.value.trim()){ whatsEl.classList.add('err'); ok=false; } else whatsEl.classList.remove('err');
      if(!ok){
        const firstErr = form.querySelector('.err');
        if(firstErr) firstErr.scrollIntoView({behavior:'smooth', block:'center'});
        return;
      }

      const submitBtn = form.querySelector('.submit');
      if(submitBtn){ submitBtn.disabled = true; submitBtn.textContent = 'Enviando…'; }

      let count = '0';
      if(asisteVal==='si' && tieneVal==='si'){
        count = (form.querySelector('select[name=acompanantes]')||{}).value || '1';
      }

      const data = {
        asiste:        asisteVal,
        acompanantes:  count,
        nombre:        nombreEl.value.trim(),
        correo:        (form.querySelector('input[name=correo]')||{}).value || '',
        whatsapp:      whatsEl.value.trim(),
        mensaje:       (form.querySelector('textarea[name=mensaje]')||{}).value || '',
        fecha:         new Date().toLocaleString('es-MX')
      };

      // Distintos flujos de agradecimiento
      const dest = (asisteVal === 'no') ? 'gracias-no.html' : 'gracias.html';
      const go = ()=>{ window.location.href = dest; };

      if(!GOOGLE_SHEETS_URL){ go(); return; }
      fetch(GOOGLE_SHEETS_URL, {
        method:'POST', mode:'no-cors',
        headers:{'Content-Type':'text/plain;charset=utf-8'},
        body: JSON.stringify(data)
      }).then(go).catch(go);
    });
  }
  /* ---------- Aparición al scroll + efecto "pintado" en acuarelas ---------- */
  if('IntersectionObserver' in window){
    // Imágenes: aparición elegante (fade + leve acercamiento + enfoque)
    const imgEls = Array.prototype.slice.call(
      document.querySelectorAll('.container img:not(.dec)')
    );
    // Texto y demás elementos: fade + sube
    const sel = '.container h1, .container h2, .container h3, .container p,'
              + ' .container .btn, .container .palette,'
              + ' .container .yesno, .container .field, .container .padres,'
              + ' .site-footer';
    const revealEls = Array.prototype.slice.call(document.querySelectorAll(sel));

    if(prefersReduced){
      // Sin animación: mostrar todo de una vez
      imgEls.forEach(function(el){ el.classList.add('reveal-img','is-visible'); });
      revealEls.forEach(function(el){ el.classList.add('reveal','is-visible'); });
    } else {
      imgEls.forEach(function(el){ el.classList.add('reveal-img'); });
      revealEls.forEach(function(el){ el.classList.add('reveal'); });
      // escalonar la aparición entre hermanos
      revealEls.forEach(function(el){
        var sibs = Array.prototype.slice.call(el.parentElement.children)
                        .filter(function(c){ return c.classList.contains('reveal'); });
        el.style.transitionDelay = Math.min(sibs.indexOf(el),6)*75 + 'ms';
      });
      // Aparece UNA vez al entrar al campo visual y se queda (scroll fluido)
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if(e.isIntersecting){
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      }, {threshold:0.12, rootMargin:'0px 0px -8% 0px'});
      imgEls.concat(revealEls).forEach(function(el){ io.observe(el); });
    }
  }

  /* ---------- Cuenta regresiva ---------- */
  const cd = document.querySelector('.countdown');
  if(cd){
    const target = new Date(cd.getAttribute('data-date')).getTime();
    const dEl = cd.querySelector('[data-d]'), hEl = cd.querySelector('[data-h]'),
          mEl = cd.querySelector('[data-m]'), sEl = cd.querySelector('[data-s]'),
          label = cd.querySelector('.cd-label');
    const pad = n => String(n).padStart(2,'0');
    function tick(){
      let diff = target - Date.now();
      if(diff <= 0){
        dEl.textContent='0'; hEl.textContent='00'; mEl.textContent='00'; sEl.textContent='00';
        if(label) label.textContent='¡Hoy nos casamos!';
        return;
      }
      const day = Math.floor(diff/86400000); diff -= day*86400000;
      const hr  = Math.floor(diff/3600000);  diff -= hr*3600000;
      const mn  = Math.floor(diff/60000);     diff -= mn*60000;
      const sc  = Math.floor(diff/1000);
      dEl.textContent = day;
      hEl.textContent = pad(hr);
      mEl.textContent = pad(mn);
      sEl.textContent = pad(sc);
    }
    tick();
    setInterval(tick, 1000);
  }
})();
