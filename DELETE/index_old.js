// Default bad words list
const defaultBadWords = ["fuck", "shit", "ass"]; 

function profanityFilter(text, badWords = defaultBadWords) {
    let lowerCaseText = text.toLowerCase();

    for(let i = 0; i < badWords.length; i++) {
        while(lowerCaseText.indexOf(badWords[i]) !== -1) {
            let badWordLength = badWords[i].length;
            let badWordIndex = lowerCaseText.indexOf(badWords[i]);
            let replacement = "*".repeat(badWordLength);
            lowerCaseText = lowerCaseText.substring(0, badWordIndex) + replacement + lowerCaseText.substring(badWordIndex + badWordLength);
        }
    }

    return lowerCaseText;
}

module.exports = profanityFilter;
