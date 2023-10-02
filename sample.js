const SwearShield = require('./dist/index').default;

const filter = new SwearShield();

let string = "innocent few words fuck tit jizz";
console.log(filter.isProfane(string))
console.log(filter.sanitize(string))