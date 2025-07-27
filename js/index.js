import {TimeTracking} from "./classTimeTracking.js";
import {Utils} from "./classUtils.js";

const timeRecordData = new TimeTracking('../data.json');

timeRecordData.createActivityCards("daily");

new Utils()
    .eventListener('filter-daily', 'click', timeRecordData.changeFilterAll.bind(timeRecordData))
    .eventListener('filter-weekly', 'click', timeRecordData.changeFilterAll.bind(timeRecordData))
    .eventListener('filter-monthly', 'click', timeRecordData.changeFilterAll.bind(timeRecordData));