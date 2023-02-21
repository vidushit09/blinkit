
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

    displayProducts(currProducts);
}
