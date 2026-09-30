const showreelVideos=[
  ['1A1ku1b4zjcInNkKJGI_X0IFTVSiG4F9o','JPE Ramadan'],
  ['1ErEqn6-8_zzZ7OGEyPGZ-9ZpaTYQyNjK','Evolac Ad 02'],
  ['1OofOwkC3Aj5JKwigiT1ldZT1zKkJIJ-L','Evolac Ad 01'],
  ['1DG6PLKLE5qg9D0sV3N1EKLsQGmxPIom7','Reel 03'],
  ['11UaBNJjwb0bAIWOwfuKo2hrHjtRWqSgt','Reel 04'],
  ['1Yae_ebqxDgFCp2Li7NP0jyK5xcH-pTQn','Reel 02'],
  ['1FEgX-GAJvPgVqIP4yt3oXEe9RxPYcIyP','Old Doha Port'],
  ['1j29SZHtAP6ZdmjvUdqAIrd5X2jUh5b2e','Motion Project'],
  ['1HZelXZtx96OTNbvSNy4HSJbUiZmDXyFF','App Launcher'],
  ['1fwZDDxVsSSZxZyvWCPXMDbMu6znspVvj','Invite Friends'],
  ['17N9FMPfo4XHjTNlO4mp5otKlFSuPU66P','Product Animation'],
  ['1fIhZ56p9DjIbd2TiFLIfr7Q6GhLNPxsj','UAE Day'],
  ['1TxTtNrqr2QUUCgTsHtal-gXP2hXGFny-','Tenxerp Logo'],
  ['1zOiDUlZ6yk40h_Jd6HhqUrizRRSQmJGE','Zamalek'],
  ['1x_xkt04Y2ZEvod8jZLKDhlLvTmlvSfK7','World Health Day'],
  ['1PNKioMQFshYFqtBH1-7gYmhKsEsYXES2','Nativity'],
  ['1UI4tkS_TjMNMgeMhAk6tQQsSDBCAglI2','Concrete Effect'],
  ['11EG_ehltXLgHicPjCBEli1V1bfZ-lTYU','Colors Day'],
  ['1go9MXxfqT3qYBh4-hTjEXk1uavHLCwAp','3shank'],
  ['15W4UlPtSskSfd0_gnvjRTVk3FIz8QQn_','6 October'],
  ['13ulwjXY-2Qi75PrdsQQqtVcLpxRMt9Is','25 January'],
  ['1ZQNfaig1bnj734nT5VCyc9paKrnZuCkM','New Year 2024 — 01'],
  ['1yJFqyPEkYxKji7HLm5k7MT_smX-F28Xx','New Year 2024 — 02'],
  ['109ha2QDbjP49INJQbSc-7SnluWzVNhTq','Amr'],
  ['1URb_UxuUrlJIgr9E4u0FTLXKJxDtxu6S','Coffee Day'],
  ['1p_9RHgyFnn5EpqNu9ii_eh2bFm1dvsSl','Jazeera Color Trend 2024'],
  ['1uiMkpO_8EGIZxLEjwO4rcCOIFXD5V2Wj','Jazeera Paints — VO Script']
];

// رقم الفيديو الرئيسي في القايمة فوق (يبدأ من 0). 5 = Reel 02
const FEATURED_REEL_INDEX=5;

const showreelFrame=document.querySelector('.showreel-frame');

if(showreelFrame){
  showreelFrame.classList.add('custom-showreel');
  const featuredReel=showreelVideos[FEATURED_REEL_INDEX];
  showreelFrame.innerHTML=`<div class="featured-reel"><button class="featured-reel-btn" type="button" data-video-id="${featuredReel[0]}" aria-label="Play featured video: ${featuredReel[1]}"><img src="https://drive.google.com/thumbnail?id=${featuredReel[0]}&sz=w1280" alt="" width="1280" height="720" loading="lazy"><span class="featured-reel-play" aria-hidden="true">▶</span><span class="featured-reel-title">Featured video · ${featuredReel[1]}</span></button></div><div class="showreel-grid" role="list" aria-label="Motion graphics showreel">${showreelVideos.map(([id,title],index)=>`<button class="video-card" type="button" role="listitem" data-video-id="${id}" data-video-title="${title}" style="--video-index:${index}"><span class="video-thumb"><img src="https://drive.google.com/thumbnail?id=${id}&sz=w500" alt="${title} video thumbnail" loading="lazy"><span class="video-play" aria-hidden="true">▶</span></span><span class="video-title">${title}</span></button>`).join('')}</div>`;

  const videoDialog=document.createElement('dialog');
  videoDialog.className='video-dialog';
  videoDialog.setAttribute('aria-label','Showreel video player');
  videoDialog.innerHTML='<button class="video-dialog-close" type="button" aria-label="Close video">×</button><div class="video-dialog-player"><iframe title="Showreel video" allow="autoplay; fullscreen" allowfullscreen></iframe></div><strong class="video-dialog-title"></strong>';
  document.body.append(videoDialog);

  const player=videoDialog.querySelector('iframe');
  const dialogTitle=videoDialog.querySelector('.video-dialog-title');
  const closeDialog=()=>{player.src='about:blank';videoDialog.close()};

  showreelFrame.addEventListener('click',event=>{
    const card=event.target.closest('.video-card');
    if(!card)return;
    dialogTitle.textContent=card.dataset.videoTitle;
    player.src=`https://drive.google.com/file/d/${card.dataset.videoId}/preview`;
    videoDialog.showModal();
  });
  showreelFrame.addEventListener('click',event=>{
    const btn=event.target.closest('.featured-reel-btn');
    if(!btn)return;
    const box=btn.parentElement;
    box.innerHTML=`<iframe title="Featured video" src="https://drive.google.com/file/d/${btn.dataset.videoId}/preview" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
    box.classList.add('is-playing');
  });
  videoDialog.querySelector('.video-dialog-close').addEventListener('click',closeDialog);
  videoDialog.addEventListener('click',event=>{if(event.target===videoDialog)closeDialog()});
  videoDialog.addEventListener('cancel',event=>{event.preventDefault();closeDialog()});
}
