
class StyledNode {
    constructor(node, specifiedValues, children){
        this.node = node;
        this.specifiedValues = specifiedValues;
        this.children = children;
    }

    match(elem, selector) {
        return matchSimpleSelector(elem, selector);
    }

}

function buildStyleTree(node, stylesheet) {
    //console.log('Start to build style tree.');
    //console.log(node);
    //console.log(node.constructor.name);
    //console.log(node.getChildren());
    let styledNode = new StyledNode(
            node,
            getSpecifiedValues(node),
            node.getChildren().map( child => {
                return buildStyleTree(child, stylesheet);
            })
        );
    return styledNode;

}

function getSpecifiedValues(node) {
    if(node.nodeType.constructor.name == 'ElementData'){
        //console.log('Get ElementData node, tagName = ' + node.nodeType.tagName);
        return {};
    }
    if(node.nodeType.constructor.name == 'String'){
        //console.log('Get Text node, data = ' + node.nodeType);
        return {};
    }
}


function matchSimpleSelector (elem, selector){
    if(selector.id != elem.getId())
        return false;

    if(selector.tagName != elem.tagName)
        return false;

    let elemClassSet = elem.getClassSet();

    if(!elemClassSet.has(selector.cssClass))
        return false;

    return true;
}

export default {buildStyleTree};
