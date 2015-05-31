
class Parser {
  constructor() {
    this.pos = 0;
    this.input = '';
  }

  nextChar() {
    return this.input[this.pos];
  }

  eof() {
    return this.pos >= this.input.length;
  }

  startsWith(startStr) {
    let tmpStr = this.input.substring(this.pos);
    return tmpStr.indexOf(startStr) === 0;
  }

  consumeChar() {
    if (!this.eof()) {
      let tmpChar = this.input[this.pos];
      this.pos += 1;
      return tmpChar;
    }
    return '';
  }

  consumeWhile(test) {
    let tmpStr = '';
    while (!this.eof() && test(this.nextChar())) {
      tmpStr += this.consumeChar();
    }
    return tmpStr;
  }

  consumeWitespace() {
    return this.consumeWhile((tmpChar) => {
      return tmpChar === ' ';
    });
  }

  parseTagName() {
    return this.consumeWhile((tmpChar) => {
      if (tmpChar.match(/[a-zA-Z0-9]/g)) {
        return true;
      }
      return false;
    })
  }

  parseNode() {
    if (this.nextChar() === '<') {
      return this.parseElement();
    } else {
      return this.parseText();
    }
  }

  parseElement() {

  }

  parseText() {

  }
}

export default Parser;
