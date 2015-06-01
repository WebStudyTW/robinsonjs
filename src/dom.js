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

  getId() {
      return this.attributes['id'];
  }

  getClasses() {
      var regex = /\s+/;
      classList = this.attributes['class'].split(regex);
      var classSet = new Set();
      for (let classElement of classList) {
          classSet.add(classElement);
      }
      return classSet;
  }

}

function createTextNode (data){
  return new Node([], data);
}

function createElementNode (name, attrMap, children) {
  return new Node(children, new ElementData(name, attrMap));
}

export default {createTextNode, createElementNode};
