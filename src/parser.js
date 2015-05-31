
class Parser {
  constructor (pos, input) {
    this.pos = pos;
    this.input = input;
  }

  nextChar () {
    return this.input[this.pos];
  }

  eof () {
    return this.pos >= this.input.length;
  }

  startsWith (startStr) {
    let tmpStr = this.input.substring(this.pos);
    return tmpStr.indexOf(startStr) === 0;
  }

  consumeChar () {
    if (!this.eof()) {
      let tmpChar = this.input[this.pos];
      this.pos += 1;
      return tmpChar;
    }
    return '';
  }

  consumeWhile (test) {
    let tmpStr = '';
    while (!this.eof() && test(this.nextChar())) {
      tmpStr += this.consumeChar();
    }
    return tmpStr;
  }

  consumeWitespace () {
    return this.consumeWhile((tmpChar) => {
      return tmpChar === ' ' || tmpChar === '\n';
    });
  }
}

export default Parser;
