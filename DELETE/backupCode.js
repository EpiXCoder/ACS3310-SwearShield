const defaultList = require('./banList.json').words;

class Filter {

    constructor(placeHolder = '*', optionalList = []) {
        this.placeHolder = placeHolder;
        this.optionalList = optionalList;
        this.list = (optionalList && optionalList.length > 0) ? optionalList : defaultList;
        this.excludeList = [];
        this.regex = /[^a-zA-Z0-9|\$|\@]|\^/g;
  }

  /**f
   * Determine if a string contains profane language.
   * @param {string} string - String to evaluate for profanity.
   */
  isProfane(string) {
    return this.list
      .filter((word) => {
        const wordExp = new RegExp(`\\b${word.replace(/(\W)/g, '\\$1')}\\b`, 'gi');
        return !this.excludeList.includes(word.toLowerCase()) && wordExp.test(string);
      })
      .length > 0 || false;
  }

  /**
   * Replace a word with placeHolder characters;
   * @param {string} string - String to replace.
   */
  replaceWord(string) {
    const replaceRegEx = /\w/g;
    return string
      .replace(this.regex, '')
      .replace(replaceRegEx, this.placeHolder);
  }

  /**
   * Evaluate a string for profanity and return an edited version.
   * @param {string} string - Sentence to filter.
   */
  clean(string) {
    const splitRegEx = /\b/;
    return string.split(splitRegEx).map((word) => {
      return this.isProfane(word) ? this.replaceWord(word) : word;
    }).join(splitRegEx.exec(string)[0]);
  }

  /**
   * Add word(s) to blacklist filter / remove words from whitelist filter
   * @param {...string} word - Word(s) to add to blacklist
   */
  addWords() {
    let words = Array.from(arguments);

    this.list.push(...words);

    words
      .map(word => word.toLowerCase())
      .forEach((word) => {
        if (this.excludeList.includes(word)) {
          this.excludeList.splice(this.excludeList.indexOf(word), 1);
        }
      });
  }

  /**
   * Add words to whitelist filter
   * @param {...string} word - Word(s) to add to whitelist.
   */
  removeWords() {
    this.excludeList.push(...Array.from(arguments).map(word => word.toLowerCase()));
  }
}

module.exports = Filter;