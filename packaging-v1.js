const packagingProjects = [
  {title:'Crush Burger', type:'Restaurant Packaging', image:'Marco.Sawiris-Crush-Burger-Packaging.webp', concept:'A coordinated burger and fries packaging system using warm premium tones, bold branding and clear food-service functionality.'},
  {title:'Qatra', type:'Water Filtration Packaging', image:'Marco.Sawiris-Qatra-Packaging.webp', concept:'Arabic lettering integrates water and natural forms to communicate purification and cleaner everyday water.'},
  {title:'Glow & Care', type:'Natural Massage Candle Packaging', image:'Marco.Sawiris-Care-and-Glow-Packaging.webp', concept:'Protective hands frame a glowing drop, visually linking natural candle warmth with body-care and skin-care benefits.'},
  {title:'Samer Rose Chocolate', type:'Confectionery Packaging', image:'Marco.Sawiris-Samer-Rose-Chocolate-Packaging.webp', concept:'A premium chocolate box extending the Samer Rose identity through warm cocoa tones, refined typography and elegant detailing for a sophisticated gift presentation.'},
  {title:'Vital - Mosquito Attractant', type:'Mosquito Attractant', image:'Marco.Sawiris-Vital-Mosquito-Attractant-Packaging.webp', concept:'Technical packaging communicates the attractant function through a clean, clear and reliable product presentation.'},
  {title:'Vital Conta', type:'Mosquito Trap Packaging', image:'Marco.Sawiris-Vital-Conta-Packaging.webp', concept:'Clean technical packaging presents the mosquito trap, its components and usage through a clear and organized visual hierarchy.'},
  {title:'Vital Grav', type:'Mosquito Trap Packaging', image:'Marco.Sawiris-Vital-Grav-Packaging.webp', concept:'Structured packaging presents the mosquito trap with clear technical information and a strong professional product identity.'},
  {title:'Vital - Attractant Sachet', type:'Pest Control Packaging', image:'Marco.Sawiris-Vital-Attractant-Sachet-Packaging.webp', concept:'Compact sachet packaging designed for mosquito attractant refill use, with clear instructions and strong product-system consistency.'},
  {title:'Nateast - Whole Wheat Flour', type:'Food Packaging', image:'Marco.Sawiris-NatEast-Whole-Wheat-Flour-Packaging.webp', concept:'Natural flour packaging built around warm agricultural imagery, nutritional cues and a premium farm-to-package visual language.'},
  {title:'E.A.T Pizza', type:'Food Packaging', image:'Marco.Sawiris-Eat-Pizza-Packaging.webp', concept:'Illustrated pizza-box concept using expressive hand-drawn food graphics to create an approachable, crafted brand character.'}
];

const escapePackagingText = value => String(value).replace(/[&<>\"]/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[character]));
const packagingGrid = document.getElementById('portfolio-grid');

if (packagingGrid) {
  packagingGrid.insertAdjacentHTML('beforeend', packagingProjects.map(project => {
    const source = `assets/packaging/${project.image}`;
    return `<a class="work-card editorial-card packaging-card is-hidden" data-category="packaging" href="${source}" target="_blank" rel="noopener"><img src="${source}" alt="${escapePackagingText(project.title)} packaging design" loading="lazy"><div class="editorial-copy"><h3>${escapePackagingText(project.title)}</h3><p class="project-type">${escapePackagingText(project.type)}</p><h4>Concept &amp; Design Approach</h4><p><b>Concept:</b> ${escapePackagingText(project.concept)}</p></div></a>`;
  }).join(''));
}
