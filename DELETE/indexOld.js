const defaultList = require('./src/banList.json').words;

class ProfanityFilter {
    constructor(placeHolder = '*', optionalList = []) {
        this.placeHolder = placeHolder;
        this.optionalList = optionalList;
        this.list = new Set(optionalList && optionalList.length > 0 ? optionalList : defaultList);
        this.excludeList = new Set();
        this.regex = /[^a-zA-Z0-9|\$|\@]|\^/g;
    }

    isProfane(string) {
        return [...this.list].some((word) => {
            if (this.excludeList.has(word.toLowerCase())) {
                return false;
            }
            const wordExp = new RegExp(`\\b${word.replace(/(\W)/g, '\\$1')}\\b`, 'gi');
            return wordExp.test(string);
        });
    }

    replaceProfanity(string) {
        const replaceRegEx = /\w/g;
        return string
            .replace(this.regex, '')
            .replace(replaceRegEx, this.placeHolder);
    }

    sanitize(string) {
        const splitRegEx = /\b/;
        return string.split(splitRegEx).map((word) => {
            return this.isProfane(word) ? this.replaceProfanity(word) : word;
        }).join(splitRegEx.exec(string)[0]);
    }

    addWords(...words) {
        words.forEach((word) => {
            word = word.toLowerCase();
            this.list.add(word);
            this.excludeList.delete(word);
        });
    }

    removeWords(...words) {
        words.forEach(word => this.excludeList.add(word.toLowerCase()));
    }
}

module.exports = ProfanityFilter;

const filter = new ProfanityFilter("*")
const string = 'The man looked at his enemy and said "go"'
filter.addWords('lakkalakka')
console.log(filter.isProfane(string))
console.log(filter.clean(string))



