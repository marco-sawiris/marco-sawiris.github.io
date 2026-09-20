const socialCampaigns = [
  { title:'Jazeera Paints - Brand Communication', slug:'jazeera-brand', description:'Jazeera Paints’ digital communication showcases products, services, and brand-led creative beyond key campaigns.', images:[1,2,3,4,5,6].map(n=>`assets/social/Marco.Sawiris-Social-Media-Jazeera-Paints-Brand-Communication-${String(n).padStart(2,'0')}.webp`) },
  { title:'Jazeera Paints - Color Trends', slug:'jazeera-color', description:'Interior-led social media visuals showcasing paint colors, codes, and coordinated palettes in contemporary spaces.', images:[1,2,3,4,5,6,7,8].map(n=>`assets/social/Marco.Sawiris-Social-Media-Jazeera-Paints-Color-Trends-${String(n).padStart(2,'0')}.webp`) },
  { title:'Jazeera Paints - Eid & Seasonal Campaign', slug:'jazeera-seasonal', description:'A compact collection of festive and seasonal communication adapted to different occasions while preserving a clean, recognizable brand language.', images:[1,2,3,4,5,6,7,8].map(n=>`assets/social/Marco.Sawiris-Social-Media-Jazeera-Paints-Seasonal-${String(n).padStart(2,'0')}.webp`) },
  { title:'Jazeera Paints - Ramadan Campaign', slug:'jazeera-ramadan', description:'A unified Ramadan campaign blending festive visuals, traditional drinks, and cultural relevance with Jazeera Paints’ visual identity.', images:[1,2,3,4,5,6,7].map(n=>`assets/social/Marco.Sawiris-Social-Media-Jazeera-Paints-Ramadan-${String(n).padStart(2,'0')}.webp`) },
  { title:'Garnier Color Naturals', slug:'garnier', description:'A hair-color campaign combining bold lifestyle imagery, clear communication, and consistent product visibility across social formats.', images:[1,3,4,2,5,6].map(n=>`assets/social/Marco.Sawiris-Social-Media-Garnier-Color-Naturals-${String(n).padStart(2,'0')}.webp`) },
  { title:'The Grasshoppers', slug:'grasshoppers', description:'A playful social media campaign combining character-led visuals, promotional offers and engaging brand communication.', images:[1,2,3,4,5,6,7,8].map(n=>`assets/social/Marco.Sawiris-Social-Media-The-Grasshoppers-${String(n).padStart(2,'0')}.webp`) },
  { title:'Al Nozha Beach', slug:'al-nozha', description:'A lifestyle-driven resort campaign built around coastal imagery, aspirational messaging and a consistent premium visual tone across the full series.', images:[1,2,3,4,5,6,7,8].map(n=>`assets/social/Marco.Sawiris-Social-Media-Al-Nozha-Beach-${String(n).padStart(2,'0')}.webp`) },
  { title:'Hosny Restaurant', slug:'hosny', description:'A distinctive food campaign combining classic Egyptian cinema references with strong product photography and memorable social media storytelling.', images:[1,2,3,4,5,6,7,8].map(n=>`assets/social/Marco.Sawiris-Social-Media-Hosny-Restaurant-${String(n).padStart(2,'0')}.webp`) },
  { title:'Crush Burger', slug:'crush-burger', description:'Bold product-led visuals use a consistent yellow-orange palette and close-up food imagery to create immediate appetite appeal and brand recognition.', images:[1,2,3,4,5,6].map(n=>`assets/social/Marco.Sawiris-Social-Media-Crush-Burger-${String(n).padStart(2,'0')}.webp`) },
  { title:'Jamila Fashion', slug:'jamila', description:'Editorial-style social media communication built around lifestyle photography, clean composition and focused brand presentation.', images:[1,2,3,4].map(n=>`assets/social/Marco.Sawiris-Social-Media-Jamila-Fashion-${String(n).padStart(2,'0')}.webp`) },
  { title:'Rejeem App - Saudi Arabia', slug:'rejeem', description:'A fitness and diet app campaign connecting gym activities and healthy eating in one integrated digital experience.', images:[1,2,3,4,5].map(n=>`assets/social/Marco.Sawiris-Social-Media-Rejeem-App-${String(n).padStart(2,'0')}.webp`) },
  { title:'Mwani Qatar Campaign', slug:'mwani', description:'A maritime digital campaign for Mwani Qatar, highlighting ports, marine activities and events through a consistent institutional visual identity.', images:[1,2,3,4,5,6,7].map(n=>`assets/social/Marco.Sawiris-Social-Media-Mwani-Qatar-${String(n).padStart(2,'0')}.webp`) },
  { title:'Bayan Environmental Services', slug:'bayan-environmental', description:'Environmental consultancy content covering impact assessment, waste management, pollution analysis and rehabilitation studies.', images:[1,2,3,4,5,6,7,8,9,10].map(n=>`assets/social/Marco.Sawiris-Social-Media-Bayan-Environmental-Services-${String(n).padStart(2,'0')}.webp`) },
  { title:'Technical Solutions for Industry', slug:'technical-solutions', description:'Integrated technology content combining R&D, AI, automation, IoT and software to improve industrial efficiency and digital transformation.', images:[1,2,3,4,7,8,9,10,11,5,6,12].map(n=>`assets/social/Marco.Sawiris-Social-Media-Technical-Solutions-for-Industry-${String(n).padStart(2,'0')}.webp`) }
];

const escapeSocialText=value=>String(value).replace(/[&<>\"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[char]));
const socialGrid=document.getElementById('portfolio-grid');
const socialPanel=document.createElement('div');
socialPanel.className='social-panel';
socialPanel.hidden=true;
socialPanel.innerHTML='<nav class="campaign-tabs" aria-label="Social media campaigns"></nav><div class="campaign-heading"><div><span class="campaign-kicker">Selected Campaign</span><h3></h3></div><p></p></div><div class="social-gallery"></div>';
socialGrid?.insertAdjacentElement('beforebegin',socialPanel);

const campaignTabs=socialPanel.querySelector('.campaign-tabs');
const campaignHeading=socialPanel.querySelector('.campaign-heading h3');
const campaignDescription=socialPanel.querySelector('.campaign-heading p');
const campaignGallery=socialPanel.querySelector('.social-gallery');

campaignTabs.innerHTML=socialCampaigns.map((campaign,index)=>`<button type="button" class="campaign-tab${index===0?' is-active':''}" data-campaign="${campaign.slug}">${escapeSocialText(campaign.title)}</button>`).join('');

function renderSocialCampaign(slug,animate=true){
  const campaign=socialCampaigns.find(item=>item.slug===slug)||socialCampaigns[0];
  campaignTabs.querySelectorAll('.campaign-tab').forEach(button=>button.classList.toggle('is-active',button.dataset.campaign===campaign.slug));
  campaignHeading.textContent=campaign.title;
  campaignDescription.textContent=campaign.description;
  campaignGallery.dataset.campaign=campaign.slug;
  campaignGallery.innerHTML=campaign.images.map((src,index)=>`<a class="social-image" href="${src}" target="_blank" rel="noopener" style="--social-index:${index};--ambient-delay:${(index%4)*.35}s"><img src="${src}" alt="${escapeSocialText(campaign.title)} design ${index+1}" loading="lazy"></a>`).join('');
  if(animate){
    if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
      socialPanel.querySelector('.campaign-heading').animate([{opacity:0,transform:'translateY(16px)'},{opacity:1,transform:'translateY(0)'}],{duration:460,easing:'cubic-bezier(.16,1,.3,1)'});
      campaignGallery.querySelectorAll('.social-image').forEach((image,index)=>{
        image.animate(
          [{opacity:0,transform:'translateY(20px)'},{opacity:1,transform:'translateY(0)'}],
          {duration:460,delay:Math.min(index,9)*45,easing:'cubic-bezier(.16,1,.3,1)',fill:'both'}
        );
      });
    }
  }
}

campaignTabs.addEventListener('click',event=>{
  const button=event.target.closest('.campaign-tab');
  if(button)renderSocialCampaign(button.dataset.campaign);
});
renderSocialCampaign(socialCampaigns[0].slug,false);

const socialTitle=document.getElementById('work-title');
const socialDescription=document.getElementById('work-description');
document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{
  const filter=button.dataset.filter;
  document.querySelectorAll('#portfolio-grid .work-card').forEach(card=>card.classList.toggle('is-hidden',card.dataset.category!==filter));
  socialPanel.hidden=filter!=='social';
  if(filter==='social'){
    socialTitle.textContent='Social Media & Advertising.';
    socialDescription.textContent='Choose a campaign to explore its complete visual direction and selected social media designs.';
    socialPanel.animate([{opacity:0,transform:'translateY(26px)'},{opacity:1,transform:'none'}],{duration:620,easing:'cubic-bezier(.16,1,.3,1)'});
  }
}));
