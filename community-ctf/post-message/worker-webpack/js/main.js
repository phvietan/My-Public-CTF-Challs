import { ACTION } from './constants';

const worker = document.getElementById('worker').contentWindow;
const secret = document.getElementById('secret');

window.storeSecret = () => {
  const t = secret.value;
  worker.postMessage(`{"action":"${ACTION.STORE_LOCALSTORAGE}","key":"secret","value":${JSON.stringify(t)}}`, '*');
}

window.alertSecret = () => {
  worker.postMessage(`{"action":"${ACTION.GET_LOCALSTORAGE}","key":"secret"}`, '*');
}
window.addEventListener('message', (event) => {
  const { data } = event;
  alert(data);
});
