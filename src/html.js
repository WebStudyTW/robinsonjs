
import Node from './dom';
import Parser from './parser';

class HtmlParser extends Parser {

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

    while (true) {
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

    while (true) {
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
  let parser = new HtmlParser(0, source);
  let nodes = parser.parseNodes();

  if (nodes.length == 1) {
    return nodes;
  } else {
    return Node.createElementNode('html', {}, nodes);
  }
}

export default {parse};
