var num = document.querySelector('#num-videos');

chrome.storage.sync.get('num', (data) => {
  console.log('data retrieved from storage = ', data);
  if (data['num']) {
    console.log('setting retrieved value from chrome sync');
    num.value = data['num'];
  }
});

num.addEventListener('change', (e) => {
  console.log('num changed ', num.value);
  chrome.storage.sync.set({ num: num.value });
});
