(()=>{
const root=document.getElementById('case-studies');if(!root)return;
const tabs=[...root.querySelectorAll('.cs-tab')],panels=[...root.querySelectorAll('.cs-panel')];
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
function show(id,animate){
  tabs.forEach(t=>{const on=t.dataset.target===id;t.classList.toggle('is-active',on);t.setAttribute('aria-selected',on)});
  panels.forEach(p=>{const on=p.id===id;p.hidden=!on;if(on&&animate&&!reduce)p.animate([{opacity:0,transform:'translateY(16px)'},{opacity:1,transform:'none'}],{duration:460,easing:'cubic-bezier(.16,1,.3,1)'})});
}
tabs.forEach(t=>t.addEventListener('click',()=>show(t.dataset.target,true)));
show(tabs[0].dataset.target,false);
// "View the designs": open Work > Social Media on the matching campaign tab
root.querySelectorAll('[data-open-design]').forEach(a=>a.addEventListener('click',e=>{
  e.preventDefault();
  const social=document.querySelector('.filter[data-filter="social"]');
  if(social&&!social.classList.contains('is-active'))social.click();
  document.querySelector('.social-panel .campaign-tab[data-campaign="'+a.dataset.openDesign+'"]')?.click();
  requestAnimationFrame(()=>document.getElementById('work')?.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'}));
}));
})();
