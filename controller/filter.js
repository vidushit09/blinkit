

function setProducts(subCategory, category) {
    if (category != "") {
        products = productsAll.filter(obj => obj.categoryName == category);
        if (subCategory != "All")
            products = products.filter(obj => obj.subCategoryName == subCategory);

    }
    else {
        if (subCategory != "All")
            products = productsAll.filter(obj => obj.subCategoryName == subCategory);
        else
            products = productsAll.filter(obj => obj.categoryName == currCategory);

    }
    currProducts = products;
    displayProducts(products);
}


function setSubCategories(leftTabCategories, category) {
    currCategory = category;
    const subCategories = leftTabCategories.filter(
        (obj) => obj.categoryName === category
    );
    const productsContainerCategory = document.getElementById(
        "products-container__category"
    );
    productsContainerCategory.replaceChildren();
    const productsContainerCategoryActive = document.createElement("li");
    productsContainerCategoryActive.classList.add(
        "products-container__category--active"
    );
    productsContainerCategoryActive.classList.add("display-flex");
    const productsContainerCategoryImage = document.createElement("div");
    productsContainerCategoryImage.classList.add(
        "products-container__category__category-image"
    );
    const productsContainerCategoryImageImg = document.createElement("img");
    productsContainerCategoryImageImg.src = "http://127.0.0.1:5500/" + subCategories[0].categoryUrl;
    productsContainerCategoryImageImg.classList.add("products-container__category-image-img");
    productsContainerCategoryImage.append(productsContainerCategoryImageImg);
    productsContainerCategoryActive.append(productsContainerCategoryImage);
    productsContainerCategoryActive.innerHTML += "All";
    productsContainerCategoryActive.addEventListener("click", subCategoryClick);
    productsContainerCategory.append(productsContainerCategoryActive);
    subCategories.forEach((element) => {
        const productsContainerCategoryInactive = document.createElement("li");
        productsContainerCategoryInactive.classList.add(
            "products-container__category--inactive"
        );
        productsContainerCategoryInactive.classList.add("display-flex");
        productsContainerCategoryInactive.addEventListener("click", subCategoryClick);
        const productsContainerCategoryImage = document.createElement("div");
        productsContainerCategoryImage.classList.add(
            "products-container__category__category-image"
        );
        const productsContainerCategoryImageImg = document.createElement("img");
        productsContainerCategoryImageImg.src =
            "http://127.0.0.1:5500/" + element.categoryUrl;
        productsContainerCategoryImageImg.classList.add(
            "products-container__category-image-img"
        );
        productsContainerCategoryImage.append(productsContainerCategoryImageImg);
        productsContainerCategoryInactive.append(productsContainerCategoryImage);
        productsContainerCategoryInactive.innerHTML += element.subCategoryName;
        productsContainerCategory.append(productsContainerCategoryInactive);

    });

    setProducts("All", category);
}


function categoryClick() {
    const category = this.innerText;
    setSubCategories(leftTabCategories, category);
}
function subCategoryClick() {
    const subCategory = this.innerText;
    currSubCategory = subCategory;
    active = document.getElementsByClassName("products-container__category--active");
    active[0].classList.replace("products-container__category--active", "products-container__category--inactive");
    this.classList.replace("products-container__category--inactive", "products-container__category--active");
    setProducts(subCategory, "");
}



