# dualSubVietnamese

### Subtitle Translation Scripts

These scripts enable you to translate subtitles from English to Vietnamese on any video viewing platform using the Google Translate API. There are three different scripts available:

#### subtitle_console
This script prints the translated subtitle to the console.

#### subtitle_override
It replaces the English subtitle with the translated Vietnamese one.

#### subtitle_dual
This script allows you to display both the English and Vietnamese subtitles simultaneously.

### How to Use

1. Obtain the Selector of the subtitle element on the video viewing platform you are using.
2. Replace the default Selector in the `getTargetElement()` function of the script you intend to use with your obtained Selector.
3. Paste the modified script into the console of your web browser and execute it.
4. Enjoy watching videos with translated subtitles!

### Example Usage

```javascript
// Subtitle Console Script
function getTargetElement() {
    // Replace this with the Selector of the subtitle element
    return document.querySelector('div.vjs-text-track-display > div > div > div'); //MindValley subtitle selector
}

// Paste the rest of the subtitle_console script here
```

### Note

Ensure that you have access to the internet while using these scripts, as they rely on the Google Translate API for translation. Additionally, the translated subtitles may not always be perfect due to the limitations of machine translation. Adjustments may be required for optimal viewing experience.
