let topTabCategoryList, leftTabCategories, productsAll;
let currCategory = "Vegetables and Fruits", currSubCategory = "All", currProducts;
let cartTotal = 0, cartSumTotal = 0;

let addCartArray = new Map();

fetch("../model/data.json")
    .then((response) => response.json())
    .then((data) => {
        topTabCategoryList = data.topTabCategoryList;
        const categoryList = document.getElementById("category-list");
        var count = topTabCategoryList.length;
        var i = 0;
        if (count <= 7) {
            topTabCategoryList.forEach((element) => {
                const categoryListItem = document.createElement("li");
                categoryListItem.classList.add("category-list__list-item");
                categoryListItem.classList.add("display-flex");
                categoryListItem.addEventListener("click", categoryClick);
                categoryListItem.innerHTML += element;
                categoryList.append(categoryListItem);
            });
        } else {
            while (i < 7) {
                const categoryListItem = document.createElement("li");
                categoryListItem.classList.add("category-list__list-item");
                categoryListItem.classList.add("display-flex");
                categoryListItem.addEventListener("click", categoryClick);
                categoryListItem.innerHTML += topTabCategoryList[i];
                categoryList.append(categoryListItem);
                i++;
            }
            const categoryListItem = document.createElement("li");
            categoryListItem.classList.add("category-list__list-item");
            categoryListItem.classList.add("display-flex");
            categoryListItem.id = "more";
            categoryListItem.innerHTML += "More";
            categoryListItem.innerHTML += "<i class='fa fa-angle-down'></i>";
            categoryList.append(categoryListItem);
            const more = document.getElementById("more");

            let dropdown = document.createElement("ul");
            while (i < count) {
                const categoryListItem = document.createElement("li");
                categoryListItem.innerHTML += topTabCategoryList[i];
                categoryListItem.addEventListener("click", categoryClick);
                dropdown.id = "dropdown";
                dropdown.append(categoryListItem);
                i++;
            }
            more.append(dropdown);
        }

        leftTabCategories = data.leftTabCategories;
        productsAll = data.products;

        setSubCategories(leftTabCategories, "Vegetables and Fruits");




    });


