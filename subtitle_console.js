async function translateToVietnamese(text) {
    const response = await fetch('https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=' + encodeURI(text));
    const data = await response.json();
    return data[0][0][0];
}

let previousContent = '';

function getTargetElement() {
    return document.querySelector('div.vjs-text-track-display > div > div > div');
}

async function printContent() {
    const targetElement = getTargetElement();
    if (targetElement) {
        const currentContent = targetElement.textContent.replace(/\n/g, '');
        if (currentContent !== previousContent) {
            console.clear();
            try {
                const translatedContent = await translateToVietnamese(currentContent);
                console.log(translatedContent);
                previousContent = currentContent;
            } catch (error) {
                console.error('Lỗi khi dịch:', error);
            }
        }
    } else {
        console.log('Waiting for subtitle...');
    }
}

setInterval(printContent, 200);