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
      this.url = url;
   }

   async getJSON() {
      try {
         const fetchJson = await fetch(this.url);
         const data = fetchJson.json();
         this.#jsonData = data;
         return data;
      } catch (err) {
         console.error('Error fetching JSON:', err);
      }
   }

   createActivityCards(mode = "daily") {
      const activityProperties = {
         "Work": {img: "./images/icon-work.svg", bgColor: "bg-orange"},
         "Play": {img: "./images/icon-play.svg", bgColor: "bg-blue"},
         "Study": {img: "./images/icon-study.svg", bgColor: "bg-pink"},
         "Exercise": {img: "./images/icon-exercise.svg", bgColor: "bg-green"},
         "Social": {img: "./images/icon-social.svg", bgColor: "bg-purple"},
         "Self Care": {img: "./images/icon-self-care.svg", bgColor: "bg-yellow"},
      }

      this.getJSON().then(res => {
         for(const {title, timeframes} of res) {
            const activityArticle = new CreateDOM('article', `tracking-card__activity ${activityProperties[title]?.bgColor}`);

            //setParent is declaring that createChild under it will be under the specified parent.
            //this is to avoid repetitive declaration of which parent the child is under.
            //also for structural declaration purposes.
            activityArticle.setParent('tracking-card__activity')
                           .createChild("img","tracking-card__activity-image","",[["src", activityProperties[title]?.img], ["alt", `Icon that represents ${title} activity`]])
                           .createChild("div","tracking-card__activity-wrapper")
                           .setParent("tracking-card__activity-wrapper")
                              .createChild("header","tracking-card__activity-header")
                              .createChild("div","tracking-card__activity-hours")
                              .setParent("tracking-card__activity-header")
                                 .createChild("h2","tracking-card__activity-title", title)
                                 .createChild("img","tracking-card__activity-menu", "", [["src", "./images/icon-ellipsis.svg"], ["alt", "Icon that represents ellipsis"]])
                              .setParent("tracking-card__activity-hours")
                                 .createChild("p","tracking-card__activity-current", `${timeframes[mode].current}hrs`)
                                 .createChild("p","tracking-card__activity-previous", `${this.#previousHoursText[mode]} - ${timeframes[mode].previous}hrs`)
                           .appendToDocument(".tracking-card");
            this.#activityDOMList.set(title, activityArticle);
         }

         //To sync html and js tag visual loading
         document.body.classList.remove('loading');
      });
   }

   changeFilterAll(e) {
      const timeframeFilter = e.currentTarget.dataset["filter"];
      const filterButtonList = document.querySelectorAll('.tracking-card__filter-button');

      for(const filterButton of filterButtonList) {
         filterButton.classList.remove('active');
      }

      e.currentTarget.classList.add('active');
      this.#jsonData.then(res => {
         const jsonMap = new Map(res.map(mapResult => [mapResult.title, mapResult.timeframes]));
         for (const [key, objDOM] of this.#activityDOMList) {
            const currentElement = objDOM.node.querySelector('.tracking-card__activity-current');
            const previousElement = objDOM.node.querySelector('.tracking-card__activity-previous');

            currentElement.textContent = `${jsonMap.get(key)[timeframeFilter].current}hrs`;
            previousElement.textContent = `${this.#previousHoursText[timeframeFilter]} - ${jsonMap.get(key)[timeframeFilter].previous}hrs`;
         }
      }) 
   }
}