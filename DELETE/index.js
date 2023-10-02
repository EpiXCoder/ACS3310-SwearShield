"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var banList_json_1 = require("./src/banList.json");
var ProfanityFilter = /** @class */ (function () {
    function ProfanityFilter(placeHolder, optionalList) {
        if (placeHolder === void 0) { placeHolder = '*'; }
        if (optionalList === void 0) { optionalList = []; }
        this.regex = /[^a-zA-Z0-9|\$|\@]|\^/g;
        this.placeHolder = placeHolder;
        this.optionalList = optionalList;
        this.list = new Set(optionalList.length > 0 ? optionalList : banList_json_1.words);
        this.excludeList = new Set();
    }
    ProfanityFilter.prototype.isProfane = function (string) {
        var _this = this;
        return __spreadArray([], this.list, true).some(function (word) {
            if (_this.excludeList.has(word.toLowerCase())) {
                return false;
            }
            var wordExp = new RegExp("\\b".concat(word.replace(/(\W)/g, '\\$1'), "\\b"), 'gi');
            return wordExp.test(string);
        });
    };
    ProfanityFilter.prototype.replaceProfanity = function (string) {
        var replaceRegEx = /\w/g;
        return string
            .replace(this.regex, '')
            .replace(replaceRegEx, this.placeHolder);
    };
    ProfanityFilter.prototype.sanitize = function (string) {
        var _this = this;
        var _a, _b;
        var splitRegEx = /\b/;
        return string.split(splitRegEx).map(function (word) {
            return _this.isProfane(word) ? _this.replaceProfanity(word) : word;
        }).join((_b = (_a = splitRegEx.exec(string)) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : '');
    };
    ProfanityFilter.prototype.addWords = function () {
        var _this = this;
        var words = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            words[_i] = arguments[_i];
        }
        words.forEach(function (word) {
            word = word.toLowerCase();
            _this.list.add(word);
            _this.excludeList.delete(word);
        });
    };
    ProfanityFilter.prototype.removeWords = function () {
        var _this = this;
        var words = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            words[_i] = arguments[_i];
        }
        words.forEach(function (word) { return _this.excludeList.add(word.toLowerCase()); });
    };
    return ProfanityFilter;
}());
exports.default = ProfanityFilter;
var filter = new ProfanityFilter("*");
var string = 'The man looked at his enemy and said "go fuck yourself you jizz head"';
filter.addWords('lakkalakka');
console.log(filter.isProfane(string));
console.log(filter.sanitize(string));
