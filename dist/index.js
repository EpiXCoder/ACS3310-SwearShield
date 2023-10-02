"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const banList_json_1 = require("./banList.json");
class SwearShield {
    constructor(placeHolder = '*', optionalList = []) {
        this.regex = /[^a-zA-Z0-9|\$|\@]|\^/g;
        this.placeHolder = placeHolder;
        this.optionalList = optionalList;
        this.list = new Set(optionalList.length > 0 ? optionalList : banList_json_1.words);
        this.excludeList = new Set();
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
        var _a, _b;
        const splitRegEx = /\b/;
        return string.split(splitRegEx).map((word) => {
            return this.isProfane(word) ? this.replaceProfanity(word) : word;
        }).join((_b = (_a = splitRegEx.exec(string)) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : '');
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
exports.default = SwearShield;
const filter = new SwearShield("*");
const string = 'The man looked at his enemy and said "go fuck yourself you jizz head"';
filter.addWords('lakkalakka');
console.log(filter.isProfane(string));
console.log(filter.sanitize(string));
