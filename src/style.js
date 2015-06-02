var propertyMap = {

}

class StyledNode {
    constructor(node, specifiedValues, children){
        this.node = node;
        this.specifiedValues = specifiedValues;
        this.children = children;
    }
}


function matchSimpleSelector (elem, selector){
    if(selector.id != elem.getId())
        return false;

    if(selector.tagName != elem.tagName)
        return false;

    return true;
}

export default matchSimpleSelector;
