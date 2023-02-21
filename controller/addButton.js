

function plusone() {
    
    const id = this.parentNode.parentNode.parentNode.getElementsByClassName("product-id")[0].innerHTML;
    var intCount = Number(this.parentNode.getElementsByClassName("count")[0].innerText);
    intCount++;
    const price = Number(this.parentNode.parentNode.getElementsByClassName("products-container__discounted-price")[0].innerText.slice(1));
    updateCart(price, "inc");
    addCartArray[id] = intCount;
    this.parentNode.getElementsByClassName("count")[0].innerText = intCount;
}

function minusone() {
    const id = this.parentNode.parentNode.parentNode.getElementsByClassName("product-id")[0].innerHTML;
    const price = Number(this.parentNode.parentNode.getElementsByClassName("products-container__discounted-price")[0].innerText.slice(1));
    updateCart(price, "dec");
    var intCount = Number(this.parentNode.getElementsByClassName("count")[0].innerText);
    if (intCount != 1) {
        intCount--;
        this.parentNode.getElementsByClassName("count")[0].innerText = intCount;
        addCartArray[id] = intCount;
    }
    else {
        const defaultAdd = this.parentNode.parentNode.getElementsByClassName("products-container__item--add-default")[0];
        defaultAdd.style.display = "block";
        const updatedButton = this.parentNode.parentNode.getElementsByClassName("products-container__item--add-updated")[0];
        updatedButton.style.display = "none";
        intCount--;
        delete addCartArray[id];
    }

}

function addProduct(productId) {
    const price = Number(this.parentNode.parentNode.getElementsByClassName("products-container__discounted-price")[0].innerText.slice(1));
    updateCart(price, "inc");
    addCartArray[productId] = 1;
    const addButton = this.parentNode.getElementsByClassName("products-container__item--add-default")[0];
    addButton.style.display = "none";
    const updatedButton = this.parentNode.getElementsByClassName("products-container__item--add-updated")[0];
    updatedButton.style.display = "flex";

}