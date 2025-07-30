# Frontend Mentor - Time tracking dashboard solution

This is a solution to the [Time tracking dashboard challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/time-tracking-dashboard-UIQ7167Jw). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

-  [Overview](#overview)
   -  [The challenge](#the-challenge)
   -  [Screenshot](#screenshot)
   -  [Links](#links)
-  [My process](#my-process)
   -  [Built with](#built-with)
   -  [What I learned](#what-i-learned)
   -  [Continued development](#continued-development)
   -  [Useful resources](#useful-resources)
-  [Author](#author)
-  [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

-  View the optimal layout for the site depending on their device's screen size
-  See hover states for all interactive elements on the page
-  Switch between viewing Daily, Weekly, and Monthly stats

### Screenshot

![Desktop Design](<Screenshot/AJ - Desktop Design.png>)
![Desktop - Active](<Screenshot/AJ - Desktop Design - Active.png>)
![Tablet Design](<Screenshot/AJ - Tablet Design.png>)
![Mobile Design](<Screenshot/AJ - Mobile Design.png>)

### Links

-  Solution URL: [Add solution URL here](https://your-solution-url.com)
-  Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

-  Semantic HTML5 markup
-  CSS custom properties
-  Flexbox
-  CSS Grid
-  Mobile-first workflow
-  Javascript

### What I learned

1. For the activity card background color. There was artifacts color at the bottom left and right of the card. I solved it by using linear gradient to apply the background color at the upper portion of the card only.

```css
.bg-orange {
   background: linear-gradient(0deg, transparent 50%, var(--orange) 50%);
}
```

2. Mutation of DOM property/attributes. Store the newly created nodes in a map/array. Then when we make adjustments in the nodes within the map/array, it also applies the adjustments in the DOM!

This works because when we store an already defined object (such as {}, a node, etc.) in a variable, array, or map, the object isn't duplicated. Instead, what gets stored is a reference — essentially a pointer to the memory address where the actual object resides.

Think of the object as a box containing data. When you assign this object to another variable, you're not creating a new box. You're just handing out another label or tag that points to the same box. Both variables now point to the same box, so any changes made through one label are reflected when accessed through the other.

```js
import {CreateDOM} from "./classDOM.js";

export class TimeTracking {
   #activityDOMList = new Map();
   #previousHoursText = {
      "daily": "Yesterday",
      "weekly": "Last Week",
      "monthly": "Last Month",
   }
   #jsonData = null;

   constructor(url) {
      ...
   }

   async getJSON() {
      ...
      this.#jsonData = data;
   }

   createActivityCards(mode = "daily") {
      ...

      this.getJSON().then(res => {
         for(const {title, timeframes} of res) {
            const activityArticle = new CreateDOM(...);
            ...

            activityArticle.setParent(...)
                           .createChild(...)

            //Stores the node to an a map variable
            this.#activityDOMList.set(title, activityArticle);
         }
      });
   }

   changeFilterAll(e) {
      ...
      this.#jsonData.then(res => {
         ...
         const jsonMap = new Map(res.map(mapResult => [mapResult.title, mapResult.timeframes]));

         //By editing the value in this.#activityDOMList where the nodes of the activity cards are stored, it is also mutates the ones in the DOM.

         //Looping throught the this.#activityDOMList map
         for (const [key, objDOM] of this.#activityDOMList) {
            const currentElement = objDOM.node.querySelector('.tracking-card__activity-current');
            const previousElement = objDOM.node.querySelector('.tracking-card__activity-previous');

            //Modifying the node values from the array, which will then change the value in the DOM.
            currentElement.textContent = `${jsonMap.get(key)[timeframeFilter].current}hrs`;
            previousElement.textContent = `${this.#previousHoursText[timeframeFilter]} - ${jsonMap.get(key)[timeframeFilter].previous}hrs`;
         }
      })
   }
}
```

### Useful resources

-  [Linear Gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient) - Helped me solved the issue with the weird artifacts at the bottom left and right of my activity cards.

-  [Mutations](https://medium.com/@fknussel/arrays-objects-and-mutations-6b23348b54aa) - I used mutation to adjust the values for current and previous hours based on the timeframe filter.

**Note: Delete this note and replace the list above with resources that helped you during the challenge. These could come in handy for anyone viewing your solution or for yourself when you look back on this project in the future.**

## Author

-  GitHub - [AJ-Tan](https://github.com/AJ-Tan)
-  Frontend Mentor - [@AJ-Tan](https://www.frontendmentor.io/profile/AJ-Tan)
