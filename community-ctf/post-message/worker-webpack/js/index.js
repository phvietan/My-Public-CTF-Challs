import { PmWorker } from './worker';

function validateOrigin(origin) {
  return /https:\/\/.*.drstra.in/.test(origin);
}

window.addEventListener('message', (event) => {
  if (!validateOrigin(event.origin)) return;
  const worker = new PmWorker(event);
});
