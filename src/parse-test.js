
import Parser from './html';

let testHTML = `
<html>
    <body>
        <h1>Title</h1>
        <div id="main" class="test">
            <p>Hello <em>world</em>!</p>
        </div>
    </body>
</html>`;

let nodes = Parser.parse(testHTML);

function getNode(){
    return nodes;
}

console.log(JSON.stringify(nodes));

export default {getNode};
