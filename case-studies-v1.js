(()=>{
const root=document.getElementById('case-studies');if(!root)return;
const tabs=[...root.querySelectorAll('.campaign-tab')],panels=[...root.querySelectorAll('.cs-panel')];
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const motion=document.documentElement.classList.contains('motion-ready')&&!reduce;
// same entrance as the hero text (copyRiseStrong): rise + blur-in, staggered
const parts=p=>[p.querySelector('.campaign-heading'),p.querySelector('.cs-collage'),...p.querySelectorAll('.cs-block'),p.querySelector('.cs-actions')].filter(Boolean);
function animate(p){if(!motion)return;parts(p).forEach((el,i)=>{el.animate([{opacity:0,transform:'translateY(65px)',filter:'blur(9px)'},{opacity:1,transform:'none',filter:'none'}],{duration:1000,delay:i*110,easing:'cubic-bezier(.16,1,.3,1)',fill:'both'});el.style.opacity=''})}
function show(id,fx){
  tabs.forEach(t=>{const on=t.dataset.target===id;t.classList.toggle('is-active',on);t.setAttribute('aria-selected',on)});
  panels.forEach(p=>{const on=p.id===id;p.hidden=!on;if(on&&fx)animate(p)});
}
tabs.forEach(t=>t.addEventListener('click',()=>show(t.dataset.target,true)));
show(tabs[0].dataset.target,false);
// first panel animates when the section scrolls into view
if(motion){
  const first=panels[0];parts(first).forEach(el=>el.style.opacity=0);
  const io=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)){io.disconnect();animate(first)}},{threshold:.15});
  io.observe(first);
}
// "View the designs": open Work > Social Media on the matching campaign tab
root.querySelectorAll('[data-open-design]').forEach(a=>a.addEventListener('click',e=>{
  e.preventDefault();
  const social=document.querySelector('.filter[data-filter="social"]');
  if(social&&!social.classList.contains('is-active'))social.click();
  document.querySelector('.social-panel .campaign-tab[data-campaign="'+a.dataset.openDesign+'"]')?.click();
  requestAnimationFrame(()=>document.getElementById('work')?.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'}));
}));
})();
