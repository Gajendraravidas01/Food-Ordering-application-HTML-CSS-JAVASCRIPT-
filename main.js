var swiper = new Swiper(".mySwiper", {
  loop: true,
  navigation: {
    nextEl: "#next",
    prevEl: "#prev",
  },
});

const cartIcon = document.querySelector(".cart-icon");
const cartTab = document.querySelector(".cart-tab");
const closeBtn = document.querySelector("#closebtn");
const cardList = document.querySelector(".card-list");
const cartList = document.querySelector('.cart-list');
const cartValue = document.querySelector('.cart-value');
const  cartTotal = document.querySelector('.cart-total');
const hamberger = document.querySelector('.hamberger');
const mobileNav = document.querySelector('.mobile-nav')

hamberger.addEventListener('click' ,() => {
    mobileNav.classList.toggle('active');
});


cartIcon.addEventListener("click", () => {
  cartTab.classList.add("cart-tab-active");
});
closeBtn.addEventListener("click", () => {
  cartTab.classList.remove("cart-tab-active");
});

const productList = [];
let cartProduct = [];


const updateTotalPrice = () => {
    let totalPrice = 0;
    document.querySelectorAll('.item').forEach(item => {
        // console.log(item);
        const price = parseFloat(item.querySelector('.item-total').innerText.replace('$',''));
        
        totalPrice += price;
    })
    cartTotal.textContent = `${totalPrice.toFixed(2)}`;
    console.log(totalPrice)
}

const addToCart = (item) => {

    const existingProduct = cartProduct.find(product => product.id === item.id);


    if(existingProduct){
        alert('Your item is already in you cart!');
        return;
    }
    cartProduct.push(item);

    let quantity = 1;
    let itemPrice = parseFloat((item.price).replace('$',''));

    const cartItem = document.createElement('div');
    cartItem.classList.add('item');
    cartItem.innerHTML = `
    <div class="item-container">
        <img src=${item.image} alt="burger">

    </div>
    <div class="detail">
        <h4>${item.name}</h4>
        <h4 class="item-total">${item.price}</h4>
    </div>
    <div class="flex">
        <a href="#" class="quantity-btn">
            <i class="fa-solid fa-minus minus"></i>
        </a>
        <h4 class="quantity-value">${quantity}</h4>
        <a href="#" class="quantity-btn">
            <i class="fa-solid fa-plus plus"></i>
        </a>
    </div>
    `
    
    cartList.append(cartItem);

    updateTotalPrice();

    cartValue.textContent = parseInt(cartValue.textContent) + 1;

    const plus = cartItem.querySelector('.plus');
    const minus = cartItem.querySelector('.minus');
    const quantityValue = cartItem.querySelector('.quantity-value')
    const itemTotal = cartItem.querySelector('.item-total');


    // console.log(cartProduct);

    plus.addEventListener('click', (e) => {
        e.preventDefault();

        quantity++;
        quantityValue.textContent = quantity;
        itemTotal.textContent = `$${(itemPrice*quantity).toFixed(2)}`

        cartValue.textContent = parseInt(cartValue.textContent) + 1;
        updateTotalPrice();
    })
    minus.addEventListener('click',(e) => {
        e.preventDefault();
        if(quantity > 1){
            quantity--;
            quantityValue.textContent = quantity;
            itemTotal.textContent = `$${(itemPrice*quantity).toFixed(2)}`
            updateTotalPrice();
        }else{
            cartItem.classList.add('slide-out')
            setTimeout(() => {
                cartItem.remove();
                cartProduct = cartProduct.filter(product => product.id !== item.id)
                updateTotalPrice();
            }, 300);
        }

        cartValue.textContent = parseInt(cartValue.textContent) - 1;
    })


}

const showCards = () => {
    productList.map((item) => {
        const orderCard = document.createElement("div");
        orderCard.setAttribute("class", "order-card");

        // ****************8METHOD FIRST***********
        // const ImageCardContainer = document.createElement("div");
        // ImageCardContainer.setAttribute("class", "card-img");
        // ImageCardContainer.setAttribute("class", "images-container");

        // const Image = document.createElement("img");
        // Image.src = item.image;
        // ImageCardContainer.appendChild(Image);

        // const Name = document.createElement("h4");
        // Name.innerText = item.name;

        // const price = document.createElement("h4");
        // price.setAttribute("class", "price");
        // price.innerText = item.price;

        // const button = document.createElement("a");
        // button.href = "#";
        // button.innerText = "add to cart";
        // button.setAttribute("class", "btn");

        // orderCard.appendChild(ImageCardContainer);
        // orderCard.appendChild(Name);
        // orderCard.appendChild(price);
        // orderCard.appendChild(button);

        // ********8METHOD-SECOND*************8
        // UPPER JITNA BHI KIYE H USKA JARURAT HI NI H AGAR HM ORDERCARD.INNERHTML ME SARA EK HI BAAR SET KAR DE TO KAAM BAN JAYEGA.

        orderCard.innerHTML = `
            <div class="card-img images-container">
                <img src=${item.image} alt="burger">
            </div>
            <h4>${item.name}</h4>
            <h4 class="price">${item.price}</h4>
            <a href="" id="addtocartbtn" class="btn">Add to card</a>
        `
        cardList.appendChild(orderCard);
        const addtocartbtn = orderCard.querySelector('#addtocartbtn')
        addtocartbtn.addEventListener('click',(e) => {
            e.preventDefault();
            addToCart(item);
        })
        

    });
};

const initApp = () => {
  fetch("./products.json")
    .then((res) => res.json())
    .then((data) => {
      productList.push(...data);
      showCards();
    });
};

initApp();
