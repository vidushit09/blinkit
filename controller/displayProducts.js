function displayProducts(products) {
    var productsContainerItems = document.getElementById(
        "products-container__items"
    );
    productsContainerItems.replaceChildren();

    products.forEach((element) => {
        const productsContainerItem = document.createElement("div");
        productsContainerItem.classList.add("products-container__item");
        const productContainerItemImage = document.createElement("div");
        productContainerItemImage.classList.add("products-container__item-image");
        const productId = document.createElement("div");
        productId.classList.add("product-id")
        productId.innerHTML = element.id;
        productId.style.display = "none";
        productsContainerItem.append(productId);
        const productsContainerDiscount = document.createElement("div");
        productsContainerDiscount.classList.add("products-container__discount");
        productsContainerDiscount.innerHTML += element.discount + "% OFF";
        productContainerItemImage.append(productsContainerDiscount);
        const productContainerItemImg = document.createElement("img");
        productContainerItemImg.src = "http://127.0.0.1:5500/" + element.url;
        productContainerItemImg.classList.add("product-container__item--img");
        productContainerItemImage.append(productContainerItemImg);
        const productsContainerSourcedAt = document.createElement("div");
        productsContainerSourcedAt.classList.add(
            "products-container__sourced-at"
        );
        productsContainerSourcedAt.innerHTML +=
            "Sourced at " + element.sourcedAt;
        productContainerItemImage.append(productsContainerSourcedAt);
        productsContainerItem.append(productContainerItemImage);

        const productsContainerItemName = document.createElement("div");
        productsContainerItemName.classList.add("products-container__item-name");
        productsContainerItemName.innerHTML += element.name;
        productsContainerItem.append(productsContainerItemName);

        const productsContainerItemWeight = document.createElement("div");
        productsContainerItemWeight.classList.add(
            "products-container__item-weight"
        );
        productsContainerItemWeight.innerHTML += element.quantity;
        productsContainerItem.append(productsContainerItemWeight);

        const productsContainerItemFooter = document.createElement("div");
        productsContainerItemFooter.classList.add(
            "products-container__item-footer"
        );
        const productsContainerPriceDetails = document.createElement("div");
        productsContainerPriceDetails.classList.add(
            "products-container__price-details"
        );
        const price = Number(element.price);
        const discount = Number(element.discount);
        const newPrice = (price * (1 - 0.01 * discount)).toFixed(2);
        const productsContainerDiscountedPrice = document.createElement("div");
        productsContainerDiscountedPrice.classList.add(
            "products-container__discounted-price"
        );
        productsContainerDiscountedPrice.innerHTML += "₹" + newPrice;
        productsContainerPriceDetails.append(productsContainerDiscountedPrice);
        const productsContainerActualPrice = document.createElement("div");
        productsContainerActualPrice.classList.add(
            "products-container__actual-price"
        );
        productsContainerActualPrice.innerHTML += "₹" + price;
        productsContainerPriceDetails.append(productsContainerActualPrice);
        productsContainerItemFooter.append(productsContainerPriceDetails);

        if (addCartArray[element.id] == undefined) {
            const productsContainerItemAdd = document.createElement("button");
            productsContainerItemAdd.id = "products-container__item-add--default";
            productsContainerItemAdd.innerHTML += "ADD";
            productsContainerItemAdd.classList.add("products-container__item--add-default");
            productsContainerItemAdd.addEventListener("click", addProduct.bind(productsContainerItemAdd, element.id));
            productsContainerItemFooter.append(productsContainerItemAdd);

            const productsContainerItemAddUpdated = document.createElement("div");
            productsContainerItemAddUpdated.id = "products-container__item-add--updated";
            productsContainerItemAddUpdated.innerHTML = '<i class="fa fa-minus" aria-hidden="true" id="plus-button" onclick="minusone.call(this)"></i>';
            var count = document.createElement("div");
            count.classList.add("count");
            count.innerHTML = 1;
            productsContainerItemAddUpdated.append(count);
            productsContainerItemAddUpdated.innerHTML += '<i class="fa fa-plus" aria-hidden="true" id="minus-button" onclick="plusone.call(this)"></i>';

            productsContainerItemAddUpdated.classList.add("products-container__item--add-updated");
            productsContainerItemAddUpdated.style.display = "none";

            productsContainerItemFooter.append(productsContainerItemAddUpdated);
        }
        else {
            const productsContainerItemAdd = document.createElement("button");
            productsContainerItemAdd.id = "products-container__item-add--default";
            productsContainerItemAdd.innerHTML += "ADD";
            productsContainerItemAdd.classList.add("products-container__item--add-default");
            productsContainerItemAdd.addEventListener("click", addProduct.bind(productsContainerItemAdd, element.id));
            productsContainerItemAdd.style.display = "none";
            productsContainerItemFooter.append(productsContainerItemAdd);

            const productsContainerItemAddUpdated = document.createElement("div");
            productsContainerItemAddUpdated.id = "products-container__item-add--updated";
            productsContainerItemAddUpdated.innerHTML = '<i class="fa fa-minus" aria-hidden="true" id="plus-button" onclick="minusone.call(this)"></i>';
            var count = document.createElement("div");
            count.classList.add("count");
            count.innerHTML = addCartArray[element.id];
            productsContainerItemAddUpdated.append(count);
            productsContainerItemAddUpdated.innerHTML += '<i class="fa fa-plus" aria-hidden="true" id="minus-button" onclick="plusone.call(this)"></i>';

            productsContainerItemAddUpdated.classList.add("products-container__item--add-updated");


            productsContainerItemFooter.append(productsContainerItemAddUpdated);
        }

        productsContainerItem.append(productsContainerItemFooter);
        productsContainerItems.append(productsContainerItem);
    });
}