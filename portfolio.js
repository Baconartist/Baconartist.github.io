const cards = [...document.querySelectorAll('.video-card')];
const filters = [...document.querySelectorAll('[data-filter]')];
const more = document.querySelector('#show-more');
let activeFilter = 'all';
let expanded = false;
function updateGallery() {
  const matching = cards.filter(card => activeFilter === 'all' || card.dataset.account === activeFilter);
  cards.forEach(card => { card.hidden = !matching.includes(card) || (!expanded && matching.indexOf(card) >= 6); });
  more.hidden = matching.length <= 6;
  more.textContent = expanded ? 'Show less ↑' : `Explore all ${matching.length} videos ↓`;
  document.querySelector('#gallery-count').textContent = `${String(Math.min(expanded ? matching.length : 6, matching.length)).padStart(2, '0')} / ${String(matching.length).padStart(2, '0')} videos`;
  document.querySelector('#gallery-status').textContent = `${cards.filter(card => !card.hidden).length} videos shown${activeFilter !== 'all' ? ' from @' + activeFilter : ''}.`;
}
filters.forEach(button => button.addEventListener('click', () => {
  activeFilter = button.dataset.filter; expanded = false;
  filters.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
  updateGallery();
}));
more.addEventListener('click', () => { const wasExpanded = expanded; expanded = !expanded; updateGallery(); if (wasExpanded) document.querySelector('#work').scrollIntoView(); });
updateGallery();

const dialog = document.querySelector('#player-dialog');
const shell = document.querySelector('#player-shell');
let current = 0;
let opener;
function showVideo(index) {
  current = (index + cards.length) % cards.length;
  const card = cards[current];
  document.querySelector('#player-title').textContent = card.querySelector('h3').textContent;
  document.querySelector('#original-link').href = card.querySelector('.video-link').href;
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.tiktok.com/player/v1/${card.dataset.video}?autoplay=0&loop=1&description=0&music_info=1`;
  iframe.title = `${card.querySelector('h3').textContent} by @${card.dataset.account}`;
  iframe.allow = 'fullscreen; encrypted-media';
  iframe.allowFullscreen = true;
  shell.replaceChildren(iframe);
  document.querySelector('#player-position').textContent = `${current + 1} / ${cards.length}`;
}
cards.forEach((card, index) => card.querySelector('.video-link').addEventListener('click', event => {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !dialog.showModal) return;
  event.preventDefault(); opener = event.currentTarget; showVideo(index); dialog.showModal(); document.body.classList.add('modal-open');
}));
document.querySelector('#close-player').addEventListener('click', () => dialog.close());
document.querySelector('#previous-video').addEventListener('click', () => showVideo(current - 1));
document.querySelector('#next-video').addEventListener('click', () => showVideo(current + 1));
dialog.addEventListener('close', () => {shell.replaceChildren(); document.body.classList.remove('modal-open'); opener?.focus();});
dialog.addEventListener('click', event => {if(event.target === dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
document.querySelector('#year').textContent = new Date().getFullYear();
