class Node{
    constructor(children, nodeType){
        this.children =  children;
        this.nodeType = nodeType;
    }

    static getTextNode(data){
        return new Node([],data);
    }

    static getElementNode(name, attrMap, children){
        return new Node(children, new ElementData(name, attrMap));
    }
}
class ElementData{
    constructor(tagName, attributes){
        this.tagName = tagName;
        this.attributes = attributes;
    }
}




export default Node;
