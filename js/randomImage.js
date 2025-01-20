const images = [
'3fs-3fs-3-lock-in-granny.gif',
'greek-statue-judgement.gif',
'jarvis-lock-in.gif',
'lock-in-neet.gif',
'locked-in-alien-lock-in.gif',
'locked-in-lock-in.gif',
'locked-in-monkey.gif',
'lockinchillguy.gif',
'meme-crypto.gif',
'meme.jpg',
'what-is-the-next-step-for-immigration-immigration.gif',
'geeked-locked-in.gif'
];

function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * images.length);
    return `images/${images[randomIndex]}`;
}

document.addEventListener('DOMContentLoaded', () => {
    const imageElement = document.querySelector('.graphic');
    if (imageElement) {
        imageElement.src = chrome.runtime.getURL(getRandomImage());
    }
});
