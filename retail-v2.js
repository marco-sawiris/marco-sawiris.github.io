const retailAsset=name=>`assets/retail-large-format/${name}`;

const retailGroups=[
  {
    title:'SHELF & GONDOLA DISPLAYS',
    slug:'shelf-gondola',
    description:'Branded shelving and gondola systems designed for strong product visibility at retail.',
    images:[
      'Marco.Sawiris-Retail-Large-Format-02.webp',
      'Marco.Sawiris-Retail-Large-Format-17.webp',
      'Marco.Sawiris-Retail-Large-Format-15.webp',
      'shelf-kitkat-corner.webp',
      'shelf-free-mug.webp',
      'Marco.Sawiris-Retail-Large-Format-05.webp',
      'shelf-yellow-blue.webp',
      'Marco.Sawiris-Retail-Large-Format-13.webp',
      'shelf-fitness.webp',
      'shelf-pampers.webp',
      'Marco.Sawiris-Retail-Large-Format-09.webp',
      'Marco.Sawiris-Retail-Large-Format-18.webp',
      'Marco.Sawiris-Retail-Large-Format-19.webp',
      'Marco.Sawiris-Retail-Large-Format-16-v2.jpg',
      'shelf-coco-pops.webp',
      'shelf-maggi.webp'
    ]
  },
  {
    title:'TABLE TENT DISPLAYS',
    slug:'table-tent',
    description:'Compact promotional communication developed for table tent',
    images:[
      'table-oreo.webp',
      'table-lion.webp',
      'table-free-mug.webp',
      'Marco.Sawiris-Retail-Large-Format-07.webp',
      'table-soups.webp',
      'Marco.Sawiris-Retail-Large-Format-01.webp',
      'table-blue-free.webp',
      'Marco.Sawiris-Retail-Large-Format-08.webp'
    ]
  },
  {
    title:'BILLBOARDS & OUTDOOR',
    slug:'billboards-outdoor',
    description:'Large-format outdoor advertising developed for high visibility, clear hierarchy and fast communication.',
    images:[
      'Marco.Sawiris-Retail-Large-Format-06.webp',
      'Marco.Sawiris-Retail-Large-Format-20.webp',
      'Marco.Sawiris-Retail-Large-Format-10.webp',
      'Marco.Sawiris-Retail-Large-Format-12.webp',
      'Marco.Sawiris-Retail-Large-Format-14.webp'
    ]
  }
];

const retailGrid=document.getElementById('portfolio-grid');

if(retailGrid){
  const panel=document.createElement('div');
  panel.className='retail-panel';
  panel.hidden=true;
  panel.dataset.projectCount=retailGroups.reduce((total,group)=>total+group.images.length,0);
  panel.setAttribute('aria-label','Retail and Large Format projects');
  panel.innerHTML='<nav class="campaign-tabs retail-tabs" aria-label="Retail and Large Format sections"></nav><div class="campaign-heading retail-heading"><div><span class="campaign-kicker">Selected Format</span><h3></h3></div><p></p></div><div class="retail-gallery"></div>';
  retailGrid.insertAdjacentElement('beforebegin',panel);

  const tabs=panel.querySelector('.retail-tabs');
  const heading=panel.querySelector('.retail-heading h3');
  const description=panel.querySelector('.retail-heading p');
  const gallery=panel.querySelector('.retail-gallery');
  tabs.innerHTML=retailGroups.map((group,index)=>`<button type="button" class="campaign-tab retail-tab${index===0?' is-active':''}" data-retail-group="${group.slug}">${group.title}</button>`).join('');

  const renderRetailGroup=(slug,animate=true)=>{
    const group=retailGroups.find(item=>item.slug===slug)||retailGroups[0];
    tabs.querySelectorAll('.retail-tab').forEach(button=>button.classList.toggle('is-active',button.dataset.retailGroup===group.slug));
    heading.textContent=group.title;
    description.textContent=group.description;
    gallery.dataset.retailGroup=group.slug;
    gallery.innerHTML=group.images.map((image,index)=>{
      const source=retailAsset(image);
      return `<a class="retail-card" href="${source}" target="_blank" rel="noopener" aria-label="Open ${group.title} project ${index+1}"><img src="${source}" alt="${group.title} design ${index+1}" loading="lazy"></a>`;
    }).join('');
    if(animate&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
      panel.querySelector('.retail-heading').animate([{opacity:0,transform:'translateY(16px)'},{opacity:1,transform:'translateY(0)'}],{duration:460,easing:'cubic-bezier(.16,1,.3,1)'});
      gallery.querySelectorAll('.retail-card').forEach((card,index)=>card.animate(
        [{opacity:0,transform:'translateY(20px)'},{opacity:1,transform:'translateY(0)'}],
        {duration:460,delay:Math.min(index,9)*45,easing:'cubic-bezier(.16,1,.3,1)',fill:'both'}
      ));
    }
  };

  tabs.addEventListener('click',event=>{
    const button=event.target.closest('.retail-tab');
    if(button)renderRetailGroup(button.dataset.retailGroup);
  });
  renderRetailGroup(retailGroups[0].slug,false);
}
