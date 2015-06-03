import * as Style from './style';
import * as Css from './Css';
import ParseTest from './parse-test';



// h1, h2, h3 { margin: auto; color: #cc0000; }
let listOfSelectors1 = [new Css.SimpleSelector('h1', '', []), new Css.SimpleSelector('h2', '', []), new Css.SimpleSelector('h3', '', [])];
let listOfDeclarations1 = [new Css.Declaration('margin', 'auto'), new Css.Declaration('color', '#cc0000')];
let rule1 = new Css.Rule(listOfSelectors1, listOfDeclarations1);

// div.note { margin-bottom: 20px; padding: 10px; }
let listOfSelectors2 = [new Css.SimpleSelector('div', '', ['note'])];
let listOfDeclarations2 = [new Css.Declaration('margin-bottom', '20px'), new Css.Declaration('padding', '10px')];
let rule2 = new Css.Rule(listOfSelectors2, listOfDeclarations2);

// #answer { display: none; }
let listOfSelectors3 = [new Css.SimpleSelector('', 'answer', [])];
let listOfDeclarations3 = [new Css.Declaration('display', 'none')];
let rule3 = new Css.Rule(listOfSelectors3, listOfDeclarations3);

let stylesheet = new Css.Stylesheet([rule1, rule2, rule3]);
let node = ParseTest.getNode();
var styleNode = Style.buildStyleTree(node[0], stylesheet);
console.log(styleNode);
