// petals.js - animación ligera de pétalos tipo sakura
(function(){
  const Petals = {};
  Petals.burst = function(opts={}){
    // Respect admin setting stored in localStorage 'pb_settings_v1.petals'
    try{
      const raw = localStorage.getItem('pb_settings_v1');
      if(raw){ const settings = JSON.parse(raw); if(settings && settings.petals===false) return; }
    }catch(e){ /* ignore and continue */ }

    const count = opts.count || 30;
    const container = document.body;
    for(let i=0;i<count;i++){
      const p = document.createElement('div');
      p.className = 'sakura-petal';
      const size = Math.random()*12 + 8;
      p.style.width = size + 'px';
      p.style.height = size*0.7 + 'px';
      p.style.left = (Math.random()*100) + '%';
      p.style.top = '-10%';
      p.style.opacity = (Math.random()*0.5)+0.5;
      p.style.transform = `rotate(${Math.random()*360}deg)`;
      container.appendChild(p);
      // animate with random duration and horizontal drift
      const duration = 3500 + Math.random()*2500;
      const drift = (Math.random()-0.5) * 200; // px
      p.animate([
        { transform: `translate3d(0, 0, 0) rotate(${Math.random()*360}deg)`, opacity: p.style.opacity },
        { transform: `translate3d(${drift}px, ${window.innerHeight + 100}px, 0) rotate(${Math.random()*360}deg)`, opacity: 0 }
      ], { duration, easing: 'cubic-bezier(.2,.8,.2,1)' });
      // remove after duration
      setTimeout(()=>{ p.remove(); }, duration+100);
    }
  };
  window.Petals = Petals;
})();
