console.log('YO YO YO');

window.addEventListener('load', myMain, false);

let keepVideos = 0;
let removedVideos = 0;

chrome.storage.sync.get('num', (data) => {
  console.log('data retrieved from storage = ', data);
  if (data['num']) {
    console.log('setting retrieved value for keepVideos from chrome sync');
    keepVideos = data['num'];
  }
});

function myMain() {
  var jsInitChecktimer = setInterval(checkForJS_Finish, 100);

  function checkForJS_Finish() {
    var list = document.querySelectorAll('ytd-compact-video-renderer');

    if (list.length > 0) {
      console.log('list length = ', list.length);
      console.log(`removedVideps = ${removedVideos}`);

      // check if the videos are laready removed
      if (keepVideos + removedVideos === list.length) {
        console.log('breaking here');
        return;
      }

      let i = removedVideos != 0 ? removedVideos : keepVideos;

      // increment the removedVideos here itself updating of removedVideos in multiple contexts of setInterval
      removedVideos = list.length;
      for (; i < list.length; i++) {
        var newElement = document.createElement('div');

        newElement.style.position = 'absolute';

        newElement.style.backgroundColor = 'rgba(157, 158, 158, 0.8)';
        newElement.style.backdropFilter = 'blur(10px)';
        newElement.style.top = 0;
        newElement.style.right = 0;
        newElement.style.bottom = 0;
        newElement.style.left = 0;
        newElement.innerHTML = '<h5>Removed</h5>';
        newElement.classList.add('removed-video');

        list[i].style.position = 'relative';

        list[i].appendChild(newElement);
        list[i].querySelector('ytd-channel-name').remove();
      }

      //   clearInterval(jsInitChecktimer);
    }
  }
}
