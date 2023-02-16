fetch("../model/data.json")
    .then((response) => response.json())
    .then((data) => {
        var products = data.products;
        console.log(products);
        var productsContainerItems = document.getElementById("products-container__items");
        products.forEach(element => {
            const productsContainerItem = document.createElement("div");
            productsContainerItem.classList.add("products-container__item");
            const productContainerItemImage = document.createElement("div");
            productContainerItemImage.classList.add("products-container__item-image");
            const productsContainerDiscount = document.createElement("div");
            productsContainerDiscount.classList.add("products-container__discount");
            productsContainerDiscount.innerHTML += element.discount + "% OFF";
            productContainerItemImage.append(productsContainerDiscount);
            const productContainerItemImg = document.createElement("img");
            productContainerItemImg.src = "http://127.0.0.1:5500/" + element.url;
            productContainerItemImg.classList.add("product-container__item--img");
            productContainerItemImage.append(productContainerItemImg);
            const productsContainerSourcedAt = document.createElement("div");
            productsContainerSourcedAt.classList.add("products-container__sourced-at");
            productsContainerSourcedAt.innerHTML += ":Sourced at " + element.sourcedAt;
            productContainerItemImage.append(productsContainerSourcedAt);
            productsContainerItem.append(productContainerItemImage);

            const productsContainerItemName = document.createElement("div");
            productsContainerItemName.classList.add("products-container__item-name");
            productsContainerItemName.innerHTML += element.name;
            productsContainerItem.append(productsContainerItemName);

            const productsContainerItemWeight = document.createElement("div");
            productsContainerItemWeight.classList.add("products-container__item-weight");
            productsContainerItemWeight.innerHTML += element.quantity;
            productsContainerItem.append(productsContainerItemWeight);

            const productsContainerItemFooter = document.createElement("div");
            productsContainerItemFooter.classList.add("products-container__item-footer");
            const productsContainerPriceDetails = document.createElement("div");
            productsContainerPriceDetails.classList.add("products-container__price-details");
            const price = Number(element.price);
            const discount = Number(element.discount);
            const newPrice = price * (1 - 0.01 * discount);
            const productsContainerDiscountedPrice = document.createElement("div");
            productsContainerDiscountedPrice.classList.add("products-container__discounted-price");
            productsContainerDiscountedPrice.innerHTML += "₹" + newPrice;
            productsContainerPriceDetails.append(productsContainerDiscountedPrice);
            const productsContainerActualPrice = document.createElement("div");
            productsContainerActualPrice.classList.add("products-container__actual-price");
            productsContainerActualPrice.innerHTML += "₹" + price;
            productsContainerPriceDetails.append(productsContainerActualPrice);
            productsContainerItemFooter.append(productsContainerPriceDetails);


            const productsContainerItemAdd = document.createElement("button");
            productsContainerItemAdd.innerHTML += "ADD";
            productsContainerItemAdd.classList.add("products-container__item--add");
            productsContainerItemFooter.append(productsContainerItemAdd);

            productsContainerItem.append(productsContainerItemFooter);
            productsContainerItems.append(productsContainerItem);
        });

        const leftTabCategories = data.leftTabCategories;

        const productsContainerCategory = document.getElementById("products-container__category");
        var i = 0;
        leftTabCategories.forEach(element => {
            if (i == 0) {
                const productsContainerCategoryActive = document.createElement("li");
                productsContainerCategoryActive.classList.add("products-container__category--active");
                productsContainerCategoryActive.classList.add("display-flex");
                const productsContainerCategoryImage = document.createElement("div");
                productsContainerCategoryImage.classList.add("products-container__category__category-image");
                const productsContainerCategoryImageImg = document.createElement("img");
                productsContainerCategoryImageImg.src = "http://127.0.0.1:5500/" + element.categoryUrl;
                productsContainerCategoryImageImg.classList.add("products-container__category-image-img");
                productsContainerCategoryImage.append(productsContainerCategoryImageImg);
                productsContainerCategoryActive.append(productsContainerCategoryImage);
                productsContainerCategoryActive.innerHTML += element.categoryName;
                productsContainerCategory.append(productsContainerCategoryActive);
            }
            else {
                const productsContainerCategoryInactive = document.createElement("li");
                productsContainerCategoryInactive.classList.add("products-container__category--inactive");
                productsContainerCategoryInactive.classList.add("display-flex");
                const productsContainerCategoryImage = document.createElement("div");
                productsContainerCategoryImage.classList.add("products-container__category__category-image");
                const productsContainerCategoryImageImg = document.createElement("img");
                productsContainerCategoryImageImg.src = "http://127.0.0.1:5500/" + element.categoryUrl;
                productsContainerCategoryImageImg.classList.add("products-container__category-image-img");
                productsContainerCategoryImage.append(productsContainerCategoryImageImg);
                productsContainerCategoryInactive.append(productsContainerCategoryImage);
                productsContainerCategoryInactive.innerHTML += element.categoryName;
                productsContainerCategory.append(productsContainerCategoryInactive);
            }
            i++;
        });

        const topTabCategoryList = data.topTabCategoryList;
        const categoryList = document.getElementById("category-list");
        var i = 0;
        topTabCategoryList.forEach(element => {
            const categoryListItem = document.createElement("li");
            categoryListItem.classList.add("category-list__list-item");
            categoryListItem.classList.add("display-flex")
            categoryListItem.innerHTML += element;
            categoryList.append(categoryListItem);
        });
        const categoryListItem = document.createElement("li");
        categoryListItem.classList.add("category-list__list-item");
        categoryListItem.classList.add("display-flex")
        categoryListItem.innerHTML += "More";
        categoryListItem.innerHTML += "<i class='fa fa-angle-down'></i>";
        categoryList.append(categoryListItem);
    })