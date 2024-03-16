async function translateToVietnamese(text) {
    const response = await fetch('https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=' + encodeURI(text));
    const data = await response.json();
    return data[0][0][0];
}

let previousContent = '';
let targetElement = null;

function getTargetElement() {
    return document.querySelector('div.vjs-text-track-display > div > div > div');
}

async function replaceContent() {
    if (!targetElement) return;

    const currentContent = targetElement.textContent.replace(/\n/g, '');
    if (currentContent !== previousContent) {
        try {
            const translatedContent = await translateToVietnamese(currentContent);
            targetElement.textContent = translatedContent;
            previousContent = currentContent;
        } catch (error) {
            console.error('Lỗi khi dịch:', error);
        }
    }
}

const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            targetElement = getTargetElement();
            if (targetElement) {
                replaceContent();
            }
            break;
        } else if (mutation.type === 'characterData') {
            targetElement = getTargetElement();
            if (targetElement) {
                replaceContent();
            }
            break;
        }
    }
});

const observerConfig = {
    childList: true,
    subtree: true,
    characterData: true,
    characterDataOldValue: true
};

observer.observe(document.body, observerConfig);