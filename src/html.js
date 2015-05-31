
import Node from './dom';

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

  parseTagName () {
    return this.consumeWhile((tmpChar) => {
      if (tmpChar.match(/[a-zA-Z0-9]/g)) {
        return true;
      }
      return false;
    })
  }

  parseNode () {
    if (this.nextChar() === '<') {
      return this.parseElement();
    } else {
      return this.parseText();
    }
  }

  parseElement () {
    console.assert(this.consumeChar() === '<', 'Start Parse Element Error.');
    let tagName = this.parseTagName();
    let attrs = this.parseAttributes();
    console.assert(this.consumeChar() === '>', `Parse Tag ${tagName} Error`);
    this.consumeWitespace();

    let children = this.parseNodes();

    this.consumeWitespace();
    let endTagError = `Parse Tag ${tagName} End Error`;
    console.assert(this.consumeChar() === '<', endTagError);
    console.assert(this.consumeChar() === '/', endTagError);
    console.assert(this.parseTagName() === tagName, endTagError);
    console.assert(this.consumeChar() === '>', endTagError);
    this.consumeWitespace();

    return Node.createElementNode(tagName, attrs, children);
  }

  parseText() {
    return Node.createTextNode(this.consumeWhile((tmpChar) => {
      return tmpChar !== '<';
    }));
  }

  parseAttributes () {
    let attributes = {};

    while(true) {
      this.consumeWitespace();
      if (this.nextChar() === '>') {
        break;
      }
      let {name, value} = this.parseAttr();
      attributes[name] = value;
    }
    return attributes;
  }

  parseAttr () {
    let name = this.parseTagName();
    console.assert(this.consumeChar() === '=', `Parse Attr ${name} No =`);
    let value = this.parseAttrValue();
    return {name, value};
  }

  parseAttrValue () {
    let openQuote = this.consumeChar();
    let value = this.consumeWhile((tmpChar) => {
      return tmpChar !== openQuote;
    });
    console.assert(this.consumeChar() === openQuote, `Parse Attr value ${value} Error`);
    return value;
  }

  parseNodes () {
    let nodes = [];

    while(true) {
      this.consumeWitespace();
      if (this.eof() || this.startsWith('</')) {
        break;
      }
      nodes.push(this.parseNode());
    }
    return nodes;
  }
}

function parse (source) {
  let parser = new Parser(0, source);
  let nodes = parser.parseNodes();

  if (nodes.length == 1) {
    return nodes;
  } else {
    return Node.createElementNode('html', {}, nodes);
  }
}

export default {parse};
