import Parser from './parser';

class Stylesheet{
    constructor(rules){
        this.rules = rules;
    }
}

class Rule{
    constructor(selectors, declarations){
        this.selectors = selectors; //List of Selector
        this.declarations = declarations;
    }
}

class SimpleSelector {
    constructor(tagName, id, cssClass){
        this.tagName = tagName;
        this.id = id;
        this.cssClass = cssClass;
    }
}

class Declaration {
    constructor(name, value){
        this.name = name;
        this.value = value;
    }
}

function parseSimpleSelector(selectorStr) {
    let selector = new SimpleSelector(null, null, []);
    for (let x  of selectorStr){

    }
}

export default {Stylesheet, Rule, SimpleSelector, Declaration};
