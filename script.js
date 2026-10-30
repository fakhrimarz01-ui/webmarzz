// Vanilla JavaScript — no libraries or build step required.
const currentPage = document.body.dataset.page;
document.querySelector(`nav [data-page="${currentPage}"]`)?.setAttribute('aria-current', 'page');
document.querySelector('#year').textContent = new Date().getFullYear();
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menuButton.addEventListener('click', () => {
 const open = menuButton.getAttribute('aria-expanded') !== 'true';
 menuButton.setAttribute('aria-expanded', String(open));
 menuButton.textContent = open ? 'CLOSE −' : 'MENU +';
 navigation.classList.toggle('open', open);
});
document.addEventListener('keydown', event => {
 if (event.key === 'Escape' && navigation.classList.contains('open')) { menuButton.click(); menuButton.focus(); }
});
const dialog = document.querySelector('#project-dialog');
if (dialog) {
 document.querySelectorAll('.project').forEach(button => button.addEventListener('click', () => {
  document.querySelector('#dialog-image').src = button.dataset.image;
  document.querySelector('#dialog-image').alt = button.dataset.title;
  document.querySelector('#dialog-title').textContent = button.dataset.title;
  document.querySelector('#dialog-category').textContent = button.dataset.category;
  dialog.showModal();
 }));
 document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
 dialog.addEventListener('click', event => { if (event.target === dialog) { const r=dialog.getBoundingClientRect(); if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom) dialog.close(); } });
}
const form = document.querySelector('#contact-form');
if (form) {
 const service = new URLSearchParams(location.search).get('service');
 if (service && [...form.elements.service.options].some(o => o.value === service)) form.elements.service.value = service;
 form.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(form);
  const message = `Styling inquiry\n\nName: ${data.get('firstName')} ${data.get('lastName')}\nEmail: ${data.get('email')}\nService: ${data.get('service')}\n\n${data.get('message')}`;
  document.querySelector('#message-preview').textContent = message;
  document.querySelector('#form-result').hidden = false;
  document.querySelector('#copy-status').textContent = '';
  document.querySelector('#form-result').scrollIntoView({block:'nearest',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
 });
 document.querySelector('#copy-message').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(document.querySelector('#message-preview').textContent); document.querySelector('#copy-status').textContent = 'Message copied. Nothing has been sent yet.'; }
  catch { document.querySelector('#copy-status').textContent = 'Please select and copy the message above manually.'; }
 });
}
