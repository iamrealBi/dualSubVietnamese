async function translateToVietnamese(text) {
    const response = await fetch('https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=' + encodeURI(text));
    const data = await response.json();
    return data[0][0][0];
}

let previousContent = '';
let observer = null;

function getTargetElement() {
    return document.querySelector('div.vjs-text-track-display > div > div > div');
}

async function processContent(mutations) {
    for (const mutation of mutations) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            const targetElement = getTargetElement();
            if (targetElement) {
                const currentContent = targetElement.textContent.replace(/\n/g, '');
                if (currentContent !== previousContent) {
                    try {
                        const translatedContent = await translateToVietnamese(currentContent);
                        console.clear();
                        console.log(translatedContent);
                        previousContent = currentContent;
                    } catch (error) {
                        console.error('Lỗi khi dịch:', error);
                    }
                }
            } else {
                console.log('Waiting for subtitle...');
            }
            break;
        } else if (mutation.type === 'characterData') {
            const targetElement = getTargetElement();
            if (targetElement) {
                const currentContent = targetElement.textContent.replace(/\n/g, '');
                if (currentContent !== previousContent) {
                    try {
                        const translatedContent = await translateToVietnamese(currentContent);
                        console.clear();
                        console.log(translatedContent);
                        previousContent = currentContent;
                    } catch (error) {
                        console.error('Lỗi khi dịch:', error);
                    }
                }
            } else {
                console.log('Waiting for subtitle...');
            }
            break;
        }
    }
}

observer = new MutationObserver(processContent);

const observerConfig = {
    childList: true,
    subtree: true,
    characterData: true,
    characterDataOldValue: true
};

observer.observe(document.body, observerConfig);
