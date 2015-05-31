
import Parser from './parser';

class Stylesheet {
  constructor () {
    this.rules = [];
  }
}

class Rule {
  constructor () {
    this.selectors = [];
    this.declarations = [];
  }
}

class SimpleSelector {
  constructor () {
    this.tagName = '';
    this.id = '';
    this.class = [];
  }
}

class Declaration {
  constructor () {
    this.name = '';
    this.value = '';
  }
}

class CssParser extends Parser {

}

