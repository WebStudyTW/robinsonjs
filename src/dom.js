class Node {
  constructor (children, nodeType) {
    this.children =  children;
    this.nodeType = nodeType;
  }
}

class ElementData {
  constructor (tagName, attributes) {
    this.tagName = tagName;
    this.attributes = attributes;
  }
}

function createTextNode (data){
  return new Node([], data);
}

function createElementNode (name, attrMap, children) {
  return new Node(children, new ElementData(name, attrMap));
}

export default {createTextNode, createElementNode};
