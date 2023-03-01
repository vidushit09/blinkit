import { homepageController } from "../controller/homepageController.js";
import { homepageModel } from "../model/homepageModel.js";


let currCategory = "Vegetables and Fruits", currSubCategory = "All", currProducts;
let productsAll;


function categoryClick() {
    const category = this.innerText;
    currCategory = category;
    const subCategories = homepageController.getleftTabCategories(category);

    homepageView.setSubCategories(subCategories);
}

function subCategoryClick() {
    const subCategory = this.innerText;
    currSubCategory = subCategory;
    var active = document.getElementsByClassName("products-container__category--active");
    active[0].classList.replace("products-container__category--active", "products-container__category--inactive");
    this.classList.replace("products-container__category--inactive", "products-container__category--active");
    currProducts = homepageController.setProducts(subCategory, "", currCategory);
    homepageView.displayProducts(currProducts);
}


function plusone() {
    const id = this.parentNode.parentNode.getElementsByClassName("product-id")[0].innerHTML;
    var intCount = Number(this.parentNode.getElementsByClassName("count")[0].innerText);
    intCount++;
    const price = Number(this.parentNode.parentNode.getElementsByClassName("products-container__discounted-price")[0].innerText.slice(1));
    const obj = JSON.parse(window.localStorage.getItem(id));
    obj.quantity++;
    window.localStorage.setItem(id, JSON.stringify(obj));
    homepageView.updateCart(price, "inc");
    this.parentNode.getElementsByClassName("count")[0].innerText = intCount;
}

function minusone() {
    const id = this.parentNode.parentNode.getElementsByClassName("product-id")[0].innerHTML;
    const price = Number(this.parentNode.parentNode.getElementsByClassName("products-container__discounted-price")[0].innerText.slice(1));
    
    var intCount = Number(this.parentNode.getElementsByClassName("count")[0].innerText);
    var item = JSON.parse(window.localStorage.getItem(id));
    if (intCount != 1) { 
        this.parentNode.getElementsByClassName("count")[0].innerText = intCount-1;
        item.quantity--;     
        window.localStorage.setItem(id, JSON.stringify(item));
    }
    else if(window.localStorage.getItem("cartTotal")=='1'){
        const defaultAdd = this.parentNode.parentNode.getElementsByClassName("products-container__item--add-default")[0];
        defaultAdd.style.display = "block";
        const updatedButton = this.parentNode.parentNode.getElementsByClassName("products-container__item--add-updated")[0];
        updatedButton.style.display = "none";
        window.localStorage.removeItem(id);
    }
    else{
        const defaultAdd = this.parentNode.parentNode.getElementsByClassName("products-container__item--add-default")[0];
        defaultAdd.style.display = "block";
        const updatedButton = this.parentNode.parentNode.getElementsByClassName("products-container__item--add-updated")[0];
        updatedButton.style.display = "none";
        window.localStorage.removeItem(id);
    }
    homepageView.updateCart(price, "dec");

}
function addUpdated(event) {
    if (event.target.id == "plus-button")
        plusone.call(this);
    else if(event.target.id == "minus-button")
        minusone.call(this);
}

function addProduct(productId) {
    const price = Number(this.parentNode.parentNode.getElementsByClassName("products-container__discounted-price")[0].innerText.slice(1));
    const obj = {
        name: this.parentNode.parentNode.parentNode.getElementsByClassName("products-container__item-name")[0].innerText,
        price: price,
        quantity: 1
    }
    window.localStorage.setItem(productId, JSON.stringify(obj));
    homepageView.updateCart(price, "inc");
    const addButton = this.parentNode.getElementsByClassName("products-container__item--add-default")[0];
    addButton.style.display = "none";
    const updatedButton = this.parentNode.getElementsByClassName("products-container__item--add-updated")[0];
    updatedButton.style.display = "flex";

}

function selectChange() {
    const selectedOption = document.getElementById("sort-dropdown").value;
    if (selectedOption == "Price (Low to High)") {
        currProducts = currProducts.sort((a, b) => {
            if (a.price < b.price) {
                return -1;
            }
        });
    }
    else if (selectedOption == "Price (High to Low)") {
        currProducts = currProducts.sort((a, b) => {
            if (a.price > b.price) {
                return -1;
            }
        });
    }
    else if (selectedOption == "Discount (High to Low)") {
        currProducts = currProducts.sort((a, b) => {
            if (a.discount > b.discount) {
                return -1;
            }
        });
    }
    else {
        currProducts = currProducts.sort((a, b) => {
            if (a.id < b.id) {
                return -1;
            }
        });
    }

    homepageView.displayProducts(currProducts);
}


const homepageView = {
    init: function () {
        const sort = document.getElementsByClassName("products-container__dropdown")[0];
        sort.addEventListener("change", selectChange);
        this.render();
    },
    render: function () {
        const categories = homepageController.getCategories();

        productsAll = homepageController.getProducts();
        this.setCategories(categories);
    },
    setCategories: function (topTabCategoryList) {
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
        this.setSubCategories(homepageModel.getLeftTabCategoriesData(currCategory));
    },
    setSubCategories: function (subCategories) {
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
        productsContainerCategoryImageImg.src = "http://127.0.0.1:5500/" + subCategories[0].categoryThumbnail;
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
                "http://127.0.0.1:5500/" + element.categoryThumbnail;
            productsContainerCategoryImageImg.classList.add(
                "products-container__category-image-img"
            );
            productsContainerCategoryImage.append(productsContainerCategoryImageImg);
            productsContainerCategoryInactive.append(productsContainerCategoryImage);
            productsContainerCategoryInactive.innerHTML += element.subCategory;
            productsContainerCategory.append(productsContainerCategoryInactive);

        });
        currProducts = homepageController.setProducts("All", currCategory, currCategory);
        this.displayProducts(currProducts);
    },
    displayProducts: function (products) {
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
            productContainerItemImg.src = "http://127.0.0.1:5500/" + element.thumbnail;
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
            productsContainerItemWeight.innerHTML = element.quantity ;
            productsContainerItemWeight.innerHTML+= " kg"
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

            if (window.localStorage.getItem(element.id) == undefined) {
                const productsContainerItemAdd = document.createElement("button");
                productsContainerItemAdd.id = "products-container__item-add--default";
                productsContainerItemAdd.innerHTML += "ADD";
                productsContainerItemAdd.classList.add("products-container__item--add-default");
                productsContainerItemAdd.addEventListener("click", addProduct.bind(productsContainerItemAdd, element.id));
                productsContainerItemFooter.append(productsContainerItemAdd);

                const productsContainerItemAddUpdated = document.createElement("div");
                productsContainerItemAddUpdated.id = "products-container__item-add--updated";
                productsContainerItemAddUpdated.innerHTML = '<i class="fa fa-minus" aria-hidden="true" id="minus-button"></i>';
                var count = document.createElement("div");
                count.classList.add("count");
                count.innerHTML = 1;
                productsContainerItemAddUpdated.append(count);
                productsContainerItemAddUpdated.innerHTML += '<i class="fa fa-plus" aria-hidden="true" id="plus-button"></i>';
                productsContainerItemAddUpdated.addEventListener("click", addUpdated.bind(productsContainerItemAddUpdated));
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
                productsContainerItemAddUpdated.innerHTML = '<i class="fa fa-minus" aria-hidden="true" id="minus-button"></i>';
                var count = document.createElement("div");
                count.classList.add("count");
                count.innerHTML = JSON.parse(window.localStorage.getItem(element.id)).quantity;
                productsContainerItemAddUpdated.append(count);
                productsContainerItemAddUpdated.innerHTML += '<i class="fa fa-plus" aria-hidden="true" id="plus-button"></i>';
                productsContainerItemAddUpdated.addEventListener("click", addUpdated.bind(productsContainerItemAddUpdated));


                productsContainerItemAddUpdated.classList.add("products-container__item--add-updated");


                productsContainerItemFooter.append(productsContainerItemAddUpdated);
            }

            productsContainerItem.append(productsContainerItemFooter);
            productsContainerItems.append(productsContainerItem);
        });
    },
    updateCart: function (price, operation) {
        var cartTotal = window.localStorage.getItem("cartTotal");
        var cartSumTotal = window.localStorage.getItem("cartSumTotal");
        

        if (operation == "inc" || (operation == "dec" && cartTotal != 1)) {
            if (operation == "inc") {
                cartSumTotal = Number(cartSumTotal);
                cartSumTotal += price;
                cartSumTotal = cartSumTotal.toFixed(2);
                cartTotal++;
                const cart = document.getElementsByClassName("my-cart-text")[0];

            }
            else {
                cartSumTotal = Number(cartSumTotal);
                cartSumTotal -= price;
                cartSumTotal = cartSumTotal.toFixed(2);
                cartTotal--;
            }
            window.localStorage.setItem("cartTotal", cartTotal);
            window.localStorage.setItem("cartSumTotal", cartSumTotal);

            const navbarMyCart = document.getElementsByClassName("navbar__mycart")[0];

            navbarMyCart.style.padding = "0.8rem 1rem";

            navbarMyCart.style.fontSize = "1.3rem";


            const cart = document.getElementsByClassName("my-cart-text")[0];
            const count = document.createElement("div");
            count.classList.add("count");
            count.innerHTML = cartTotal;
            count.innerHTML += " items";
            const total = document.createElement("div");
            total.classList.add("total");
            total.innerHTML = "₹";
            total.innerHTML += cartSumTotal;
            cart.replaceChildren();
            cart.append(count);
            cart.append(total)
            cart.style.display = "block";
            const oldCart = document.getElementsByClassName("my-cart")[0];
            oldCart.style.display = "none";
        }
        else {
            window.localStorage.removeItem("cartTotal");
            window.localStorage.removeItem("cartSumTotal");

            const navbarMyCart = document.getElementsByClassName("navbar__mycart")[0];
            navbarMyCart.style.padding = "1.5rem";
            navbarMyCart.style.fontSize = "1.51rem";

            const cart = document.getElementsByClassName("my-cart-text")[0];
            cart.style.display = "none";
            const oldCart = document.getElementsByClassName("my-cart")[0];
            oldCart.style.display = "block";


        }
    },
    changeCartButton: function () {
        var cartTotal = window.localStorage.getItem("cartTotal");
        var cartSumTotal = window.localStorage.getItem("cartSumTotal");
        const navbarMyCart = document.getElementsByClassName("navbar__mycart")[0];
        navbarMyCart.style.padding = "0.8rem 1rem";
        navbarMyCart.style.fontSize = "1.3rem";
        const cart = document.getElementsByClassName("my-cart-text")[0];
        const count = document.createElement("div");
        count.classList.add("count");
        count.innerHTML = cartTotal;
        count.innerHTML += " items";
        const total = document.createElement("div");
        total.classList.add("total");
        total.innerHTML = "₹";
        total.innerHTML += cartSumTotal;
        cart.replaceChildren();
        cart.append(count);
        cart.append(total)
        cart.style.display = "block";
        const oldCart = document.getElementsByClassName("my-cart")[0];
        oldCart.style.display = "none";
    }

}

export { homepageView };