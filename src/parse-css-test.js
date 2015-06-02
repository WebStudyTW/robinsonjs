
import Parser from './css';

let testCSS = `
h1, h2, h3 { margin: auto; color: #cc0000; }
div.note { margin-bottom: 20px; padding: 10px; }
#answer { display: none; }`;

let nodes = Parser.parse(testCSS);

console.log(JSON.stringify(nodes));
