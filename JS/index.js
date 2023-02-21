import {homepageController} from "./controller/homepageController.js";

fetch("../json/data.json")
    .then((response) => response.json())
    .then((data) => {
        homepageController.init(data);
    });
