import { PmWorker } from './worker';

function validateOrigin(origin) {
  return /https:\/\/.*.anctf.tk/.test(origin);
}

window.addEventListener('message', (event) => {
  if (!validateOrigin(event.origin)) return;
  const worker = new PmWorker(event);
});
