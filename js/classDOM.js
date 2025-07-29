export class CreateDOM {
   #newNode = null;
   #childNode = new Map();
   #parentClass = null;
   
   constructor(nodeTag, nodeClass) {
      this.#newNode = document.createElement(nodeTag);
      this.#newNode.className = nodeClass;
   }

   setParent(parentClass) {
      this.#parentClass = parentClass;
      return this;
   }

   //childProperties value should be [{property: $prop, propertyValue: $propValue}]
   //sample with 2 Attributes: [["src", "./images/icon-ellipsis.svg"], ["alt", "Icon that represents ellipsis"]]
   createChild(childTag, childClass, textValue = null, childAttributes = null) {
      const childNode = document.createElement(childTag);
      childNode.className = childClass;

      if (textValue) {
         const textNode = document.createTextNode(textValue);
         childNode.appendChild(textNode);
      }

      if (childAttributes) {
         for (const [property, propertyValue] of childAttributes) {
            childNode.setAttribute(property, propertyValue);
         }
      }

      //Used map for O(1) version of find. This shouldn't have performance issues.
      const findNode = this.#childNode.get(this.#parentClass);

      if(!findNode) {
         this.#newNode.appendChild(childNode);
      } else {
         findNode.appendChild(childNode);
      }

      this.#childNode.set(childClass, childNode);

      return this;
   }

   get node() {
      return this.#newNode;
   }

   appendToDocument(parentSelector = "body") {
      const parent = document.querySelector(parentSelector);
      parent.appendChild(this.#newNode);
   }
}