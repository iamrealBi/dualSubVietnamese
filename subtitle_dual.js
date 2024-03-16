async function translateToVietnamese(text) {
    const response = await fetch('https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=' + encodeURI(text));
    const data = await response.json();
    return data[0][0][0];
}

let previousContent = '';
let previousTranslatedContent = '';
let targetElement = null;
let dualSub = null;

function getTargetElement() {
    return document.querySelector('div.vjs-text-track-display > div > div > div');
}

async function createDualSub() {
    if (!targetElement) return;

    const currentContent = targetElement.textContent.replace(/\n/g, '');
    if (currentContent !== previousContent) {
        try {
            const translatedContent = await translateToVietnamese(currentContent);
            if (dualSub) {
                dualSub.remove();
            }
            dualSub = document.createElement('div');
            dualSub.style.position = 'absolute';
            dualSub.style.zIndex = '999'; // Đảm bảo dualSub có zIndex thấp hơn targetElement
            dualSub.style.color = 'yellow';
            dualSub.style.textShadow = '2px 2px 4px #000000';
            dualSub.style.textAlign = 'center';
            dualSub.style.width = '100%';
            dualSub.style.top = '90%'; // Dịch chuyển lên trên một chút
            dualSub.style.left = '0';
            dualSub.textContent = translatedContent;

            targetElement.parentElement.appendChild(dualSub);

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
                createDualSub();
            }
            break;
        } else if (mutation.type === 'characterData') {
            targetElement = getTargetElement();
            if (targetElement) {
                createDualSub();
            }
            break;
        }
    }
}
    
    );

const observerConfig = {
    childList: true,
    subtree: true,
    characterData: true,
    characterDataOldValue: true
};

observer.observe(document.body, observerConfig);