const categoryCopy={
  print:{title:'Editorial Design.',description:'A curated selection of editorial design, company profiles, catalogs, magazines and production-ready print work.'},
  logo:{title:'Logo Design.',description:'A selected collection of brand marks developed around clear ideas, relevant symbolism and purposeful color systems.'},
  social:{title:'Social Media & Advertising.',description:'Choose a campaign to explore its complete visual direction and selected social media designs.'},
  packaging:{title:'Packaging Design.',description:'A selected collection of packaging systems combining product clarity, visual identity and shelf-ready commercial presentation.'},
  retail:{title:'Retail & Large Format.',description:'Selected retail displays, point-of-sale activations, outdoor advertising and large-format executions.'},
  motion:{title:'Motion Graphics.',description:'A selected showreel of motion design, animation and visual storytelling work.'}
};

const categoryButtons=[...document.querySelectorAll('.filter')];
const portfolioCards=[...document.querySelectorAll('#portfolio-grid .work-card')];
const socialCategoryPanel=document.querySelector('.social-panel');
const retailCategoryPanel=document.querySelector('.retail-panel');
const portfolioTitle=document.getElementById('work-title');
const portfolioDescription=document.getElementById('work-description');
const reducePortfolioMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
const motionSourceSection=document.getElementById('showreel');
let motionCategoryPanel=null;

if(motionSourceSection){
  const motionContent=motionSourceSection.querySelector('.wrap');
  motionCategoryPanel=document.createElement('div');
  motionCategoryPanel.className='showreel motion-category-panel';
  motionCategoryPanel.id='showreel';
  motionCategoryPanel.hidden=true;
  if(motionContent)motionCategoryPanel.append(...motionContent.childNodes);
  motionSourceSection.removeAttribute('id');
  motionSourceSection.hidden=true;
  document.getElementById('portfolio-grid')?.insertAdjacentElement('beforebegin',motionCategoryPanel);
}

function animatePortfolioHeading(){
  if(reducePortfolioMotion)return;
  [portfolioTitle,portfolioDescription].forEach((element,index)=>{
    element.animate(
      [{opacity:0,transform:'translateY(14px)'},{opacity:1,transform:'translateY(0)'}],
      {duration:420,delay:index*70,easing:'cubic-bezier(.16,1,.3,1)'}
    );
  });
}

function animatePortfolioCard(card,index){
  if(reducePortfolioMotion)return;
  card.animate(
    [{opacity:0,transform:'translateY(22px)'},{opacity:1,transform:'translateY(0)'}],
    {duration:460,delay:Math.min(index,7)*42,easing:'cubic-bezier(.16,1,.3,1)',fill:'both'}
  );
  const copy=card.querySelector('.editorial-copy');
  if(copy){
    copy.animate(
      [{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],
      {duration:420,delay:120+Math.min(index,7)*42,easing:'cubic-bezier(.16,1,.3,1)',fill:'both'}
    );
  }
}

categoryButtons.forEach(button=>{
  const category=button.dataset.filter;
  const count=category==='social'
    ? (socialCategoryPanel?socialCategoryPanel.querySelectorAll('.campaign-tab').length:0)
    : category==='motion'?'Selected'
    : category==='retail'?Number(retailCategoryPanel?.dataset.projectCount||0)
    : portfolioCards.filter(card=>card.dataset.category===category).length;
  const unit=category==='social'?'campaigns':category==='motion'?'showreel':'projects';
  button.classList.remove('is-active');
  button.setAttribute('aria-expanded','false');
  button.innerHTML=`<span class="filter-label">${button.textContent.trim()}</span><span class="filter-meta">${count} ${unit}</span><span class="filter-icon" aria-hidden="true">+</span>`;
});
portfolioCards.forEach(card=>card.classList.add('is-hidden'));
if(socialCategoryPanel)socialCategoryPanel.hidden=true;
if(retailCategoryPanel)retailCategoryPanel.hidden=true;
portfolioTitle.textContent='Explore My Work.';
portfolioDescription.textContent='Select a category to explore the full range of my design work.';

categoryButtons.forEach(button=>button.addEventListener('click',event=>{
  event.stopImmediatePropagation();
  const category=button.dataset.filter;
  const willOpen=!button.classList.contains('is-active');

  categoryButtons.forEach(item=>{
    item.classList.remove('is-active');
    item.setAttribute('aria-expanded','false');
    item.querySelector('.filter-icon').textContent='+';
  });
  portfolioCards.forEach(card=>card.classList.add('is-hidden'));
  if(socialCategoryPanel)socialCategoryPanel.hidden=true;
  if(retailCategoryPanel)retailCategoryPanel.hidden=true;
  if(motionCategoryPanel)motionCategoryPanel.hidden=true;

  if(!willOpen){
    portfolioTitle.textContent='Explore My Work.';
    portfolioDescription.textContent='Select a category to explore the full range of my design work.';
    return;
  }

  button.classList.add('is-active');
  button.setAttribute('aria-expanded','true');
  button.querySelector('.filter-icon').textContent='−';
  portfolioTitle.textContent=categoryCopy[category].title;
  portfolioDescription.textContent=categoryCopy[category].description;
  animatePortfolioHeading();

  if(category==='social'){
    if(socialCategoryPanel){
      socialCategoryPanel.hidden=false;
      socialCategoryPanel.animate([{opacity:0,transform:'translateY(18px)'},{opacity:1,transform:'none'}],{duration:480,easing:'cubic-bezier(.16,1,.3,1)'});
    }
  }else if(category==='retail'){
    if(retailCategoryPanel){
      retailCategoryPanel.hidden=false;
      if(!reducePortfolioMotion)retailCategoryPanel.animate([{opacity:0,transform:'translateY(18px)'},{opacity:1,transform:'translateY(0)'}],{duration:480,easing:'cubic-bezier(.16,1,.3,1)'});
    }
  }else if(category==='motion'){
    if(motionCategoryPanel){
      motionCategoryPanel.hidden=false;
      const motionFrame=motionCategoryPanel.querySelector('.showreel-frame');
      motionFrame?.classList.remove('reveal','reveal-left','reveal-right','reveal-project');
      motionFrame?.classList.add('is-visible');
      if(!reducePortfolioMotion){
        motionCategoryPanel.animate([{opacity:0,transform:'translateY(20px)'},{opacity:1,transform:'translateY(0)'}],{duration:480,easing:'cubic-bezier(.16,1,.3,1)'});
      }
    }
  }else{
    portfolioCards.filter(card=>card.dataset.category===category).forEach((card,index)=>{
      card.classList.remove('is-hidden');
      animatePortfolioCard(card,index);
    });
  }
},{capture:true}));

document.querySelector('a[href="#showreel"]')?.addEventListener('click',event=>{
  event.preventDefault();
  const motionButton=categoryButtons.find(button=>button.dataset.filter==='motion');
  if(motionButton&&!motionButton.classList.contains('is-active'))motionButton.click();
  requestAnimationFrame(()=>motionCategoryPanel?.scrollIntoView({behavior:reducePortfolioMotion?'auto':'smooth',block:'start'}));
});
