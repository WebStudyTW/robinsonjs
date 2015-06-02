
import Parser from './parser';

class Stylesheet {
  constructor (rules) {
    this.rules = rules;
  }
}

class Rule {
  constructor (selectors, declarations) {
    this.selectors = selectors;
    this.declarations = declarations;
  }
}

class SimpleSelector {
  constructor (tagName, id, classArray) {
    this.tagName = tagName;
    this.id = id;
    this.classArray = classArray;
  }

  specificity () {
    let a = (this.id.length > 0) ? 1 : 0;
    let b = this.classArray.length;
    let c = (this.tagName.length > 0) ? 1 : 0;

    return a * 100 + b * 10 + c;
  }
}

class Declaration {
  constructor (name, value) {
    this.name = name;
    this.value = value;
  }
}

class Px {
  constructor (px) {
    this.px = px;
  }

  toPx () {
    return parseFloat(this.px);
  }
}

class Color {
  constructor (r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }
}

class CssParser extends Parser {

  parseRules () {
    let rules = [];

    while (true) {
      this.consumeWitespace();
      if (this.eof()) {
        break;
      }
      rules.push(this.parseRule());
    }
    return rules;
  }

  parseRule () {
    let selectors = this.parseSelectors();
    let declarations = this.parseDeclarations();
    return new Rule(selectors, declarations);
  }

  parseSelectors () {
    let selectors = [];
    let checkSelector = false;

    while (!checkSelector) {
      selectors.push(this.parseSimpleSelector());
      this.consumeWitespace();

      switch (this.nextChar()) {
        case ',':
          this.consumeChar();
          this.consumeWitespace();
          break;
        case '{':
          checkSelector = true;
          break;
        default:
          console.log(`Unexpected char ${this.nextChar()} in selector list`);
          break;
      }
    }
    selectors.sort((a, b) => a.specificity() > b.specificity());
    return selectors;
  }

  parseSimpleSelector () {
    let selector = new SimpleSelector('', '', []);
    let checkSelector = false;

    while (!this.eof() && !checkSelector) {
      switch (this.nextChar()) {
        case '#':
          this.consumeChar();
          selector.id = this.parseIdentifier();
          break;
        case '.':
          this.consumeChar();
          selector.classArray.push(this.parseIdentifier());
          break;
        case '*':
          this.consumeChar();
          break;
        default:
          if (this.nextChar().match(/[a-zA-Z0-9_\-]/g)) {
            selector.tagName = this.parseIdentifier();
            // console.log('TagName: ' + selector.tagName);
          } else {
            checkSelector = true;
          }
          break;
      }
    }
    return selector;
  }

  parseDeclarations () {
    console.assert(this.consumeChar() === '{', 'Error Start parse declarations');
    let declarations = [];
    while (true) {
      this.consumeWitespace();
      if (this.nextChar() === '}') {
        this.consumeChar();
        break;
      }
      declarations.push(this.parseDeclaration());
    }
    return declarations;
  }

  parseDeclaration () {
    let propertyName = this.parseIdentifier();
    this.consumeWitespace();
    console.assert(this.consumeChar() === ':', 'Error syntax, should be ":"');
    this.consumeWitespace();
    let value = this.parseValue();
    this.consumeWitespace();
    console.assert(this.consumeChar() == ';', 'Error end syntax, should be ";"');

    return new Declaration(propertyName, value);
  }

  parseValue () {
    if (this.nextChar().match(/[0-9]/g)) {
      return this.parseLength();
    }
    else if (this.nextChar() === '#') {
      return this.parseColor();
    }
    else {
      return this.parseIdentifier();
    }
  }

  parseLength () {
    let num = this.parseFloatNum();
    let unitType = this.parseIdentifier();
    return this.createUnit(num, unitType);
  }

  parseFloatNum () {
    return this.consumeWhile( (tmpChar) => {
      return tmpChar.match(/[0-9\.]/g)
    });
  }

  createUnit (num, unitType) {
    switch (unitType) {
      case 'px':
        return new Px(num);
      default:
        console.log("Error type");
    }
    return null;
  }

  parseColor () {
    console.assert(this.consumeChar() === '#', 'Error Start Color Type');
    let r = this.parseHexPair();
    let g = this.parseHexPair();
    let b = this.parseHexPair();
    return new Color(r, g, b, 255);
  }

  parseHexPair () {
    let hexStr = this.input.substring(this.pos, this.pos + 2);
    this.pos += 2;
    return parseInt(hexStr, 16);
  }

  parseIdentifier () {
    return this.consumeWhile( (tmpChar) => {
      return tmpChar.match(/[a-zA-Z0-9_\-]/g)
    });
  }
}

function parse (source) {
  let parser = new CssParser(0, source);
  return new Stylesheet(parser.parseRules());
}

export default {parse};
