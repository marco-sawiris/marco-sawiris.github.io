const protectedArtworkSelector='img, video, .logo-visual, .social-image, .editorial-card, .retail-card, .packaging-card, .work-card, .video-thumb';
const copyAllowedSelector='.contact-links';
const localArtworkPattern=/^assets\/.*\.(?:avif|gif|jpe?g|png|webp)$/i;

const isCopyAllowed=target=>target instanceof Element&&Boolean(target.closest(copyAllowedSelector));

document.querySelectorAll('img, video').forEach(asset=>{
  asset.draggable=false;
});

document.addEventListener('contextmenu',event=>{
  if(event.target.closest(protectedArtworkSelector))event.preventDefault();
});

document.addEventListener('dragstart',event=>{
  if(event.target.closest(protectedArtworkSelector))event.preventDefault();
});

document.addEventListener('selectstart',event=>{
  if(!isCopyAllowed(event.target))event.preventDefault();
});

document.addEventListener('copy',event=>{
  if(!isCopyAllowed(event.target))event.preventDefault();
});

document.addEventListener('cut',event=>{
  if(!isCopyAllowed(event.target))event.preventDefault();
});

document.addEventListener('click',event=>{
  const link=event.target.closest('a[href]');
  if(!link)return;

  const href=link.getAttribute('href')||'';
  if(localArtworkPattern.test(href))event.preventDefault();
});
