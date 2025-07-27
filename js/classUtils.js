export class Utils {
   eventListener(id, event, eventFunction) {
      const element = document.getElementById(id);

      element.addEventListener(event, eventFunction);
      return this;
   }
}