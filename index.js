function togglePictureInPicture() {
    const video = document.querySelector('.rtcc-local-view');
    logui("video readyState == " + video.readyState);
    logui("pictureInPictureEnabled == " + document.pictureInPictureEnabled);
    logui("video.disablePictureInPicture == " + video.disablePictureInPicture);

    if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
    } else if (document.pictureInPictureEnabled) {
        video.requestPictureInPicture()
            .then(() => { })
            .catch((e) => {
                logui("Error: " + e);
            });;
    }
}

function togglePictureInPictureWebkit() {
    const video = document.querySelector('.rtcc-local-view');
    video.webkitSetPresentationMode(video.webkitPresentationMode === "picture-in-picture" ? "inline" : "picture-in-picture");
}

function playPause() {
    const myVideo = document.querySelector('.rtcc-local-view');
    if (myVideo.paused)
        myVideo.play();
    else
        myVideo.pause();
}

function logui(msg) {
    let log = document.getElementById('logp');
    log.innerHTML = log.innerHTML + "<br />------------------------<br />" + msg;
    console.log(msg);
}

document.querySelector('.rtcc-pip-button').addEventListener('click', () => {
    logui("toggling popout");
    togglePictureInPicture();
});

document.getElementById('playbtn').addEventListener('click', () => {
    playPause();
});


//start
const params = new URLSearchParams(window.location.search);
let reloadBtn = document.getElementById('reload');
if(params.has('localvideo')) {
    logui("Detected intent to use mp4");
    document.querySelector('.rtcc-local-view').src = "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_2mb.mp4";
    reloadBtn.innerText += "camera";
    reloadBtn.addEventListener('click',() => {
        window.location = window.location.href.split('?')[0];
    });
} else {
    logui("Detected intent to use camera");
    reloadBtn.innerText += "mp4";
    reloadBtn.addEventListener('click',() => {
        window.location = window.location.href.split('?')[0] + "?localvideo=true";
    });
    if(navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({video: true})
            .then((stream) => {
                document.querySelector('.rtcc-local-view').srcObject = stream;
            })
            .catch((e) => {
                logui("GUM failed: " + e);
            });
    } else {
        logui("No getUserMedia()??????");
    }
}


