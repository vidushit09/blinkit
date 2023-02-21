function updateCart(price, operation) {

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

        const navbarMyCart= document.getElementsByClassName("navbar__mycart")[0];

        navbarMyCart.style.padding="0.8rem 1rem";

        navbarMyCart.style.fontSize="1.3rem";


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
        cartSumTotal = Number(cartSumTotal);
        cartSumTotal -= price;
        cartSumTotal = cartSumTotal.toFixed(2);
        cartTotal--;

        const navbarMyCart= document.getElementsByClassName("navbar__mycart")[0];
        navbarMyCart.style.padding="1.5rem";
        navbarMyCart.style.fontSize="1.51rem";

        const cart = document.getElementsByClassName("my-cart-text")[0];
        cart.style.display="none";
        const oldCart = document.getElementsByClassName("my-cart")[0];
        oldCart.style.display = "block";


    }

}