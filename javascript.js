// Lägga till böcker i varukorgen 
function addToCart(id, quantity) {
    let cart = getCart(),
        index = null;

    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id == id) {
            index = i;
        }
    }

    if (index === null) {
        cart.push({
            id: id,
            quantity: quantity
        });
    } else {
        cart[index].quantity += quantity;
    }

    localStorage.setItem('cart', JSON.stringify(cart));

};
 // Click på köp-knappen 
    $(document.body).on('click', '.add', function () {
        // Hämtar den omslutande diven för hela card (bokens space på index-sidan)
        const cardElem = $(this).closest('.card'),
        // Kan då hämta id och quantity 
            id = parseInt(cardElem.data('id')),
            quantity = parseInt(cardElem.find('.quantity').val());
    
        // Kör en callback (upp till rad 2)
        // med id och quantity 
        addToCart(id, quantity);
        fillCart();
    });

// Ta bort en bok från varukorgen 
function bindCart() {
    $(document.body).on('click', '.cart-remove', function () {
        const cartElem = $(this).closest('.cart-item'),
            id = parseInt(cartElem.data('id'));

        removeFromCart(id);
        fillCart();
    });

    // Ta bort en bok från varukorgen 
    function removeFromCart(id) {
        let cart = getCart();

        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id == id) {
                cart.splice(i, 1);
            }
        }

        localStorage.setItem('cart', JSON.stringify(cart));
    };

// Ändra antal 
    $(document.body).on('change', '.cart-quantity', function () {
        const cartElem = $(this).closest('.cart-item'),
            id = parseInt(cartElem.data('id')),
            price = parseFloat(cartElem.data('price')),
            quantity = parseInt($(this).val());

        updateCart(id, quantity);

        let totalPriceElem = cartElem.find('.cart-total-price');

        totalPriceElem.text(price * quantity);
        cartPrice();
    });

// Ändra antal 
function updateCart(id, quantity) {
    let cart = getCart();

    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id == id) {
            cart[i].quantity = quantity;
        }
    }

    localStorage.setItem('cart', JSON.stringify(cart));
};

// Töm varukorgen 
    $('.remove-all').on('click', function () {
        localStorage.removeItem('cart');

        fillCart();
    });

// Bekräfta köp 
    $('.purchase').on('submit', async function (e) {
        e.preventDefault();

        let form = $(this).serializeArray();

        let obj = {};
        for (let i = 0; i < form.length; i++) {
            obj[form[i].name] = form[i].value;
        }

        let books = await getBooks(),
            cart = getCart();

        let productsHTML = '';
        for (let i = 0; i < cart.length; i++) {
            let book = getBook(books, cart[i].id),
                totalPrice = (book.price * cart[i].quantity);

            productsHTML += `
            <div class="confirm-item">
                <span>
                    <img src="${book.imgUrl}" class="small-img"/>
                </span>
                <span class="confirm-item-title">
                    ${book.title}
                </span>
                <span class="confirm-item-quantity">
                    ${cart[i].quantity}st
                </span>
                <span>
                    ${totalPrice} kr
                </span>
            </div>
            `;
        }

        let html = `
            <div class="confirm">
                <div>
                    ${productsHTML}
                </div>
                <hr>
                <div>${obj.name}</div>
                <div>${obj.telephone}</div>
                <div>${obj.email}</div>
                <div>${obj.address}</div>
                <div>${obj.zip_code}</div>
                <div>${obj.city}</div>
            </div>

            
        `;

        $(this).remove();
        $('.col-75').remove();
        $('.col-25').remove();
        localStorage.removeItem('cart');
        $('.purchase-result').html('<h2>Tack för din beställning!</h2>' + html);
    });
};

// Hämta enskild bok 
function getBook(books, id) {
    for (let i = 0; i < books.length; i++) {
        if (books[i].id == id) {
            return books[i];
        }
    }
};


// Hämta vår key cart 
function getCart() {
    let json = localStorage.getItem('cart');
    if (!json) {
        return [];
    }

    try {
        return JSON.parse(json);
    } catch (e) {
        return [];
    }
};

// Hämta JSON-filen 
function getBooks() {
    return new Promise(function (resolve) {
        $.getJSON('books.json', function (data) {
            resolve(data);
        });
    });
};

// Hämta böckerna från JSON-filen 
async function fillCards() {
    let books = await getBooks();

    let result = '';
    for (let i = 0; i < books.length; i++) {
        result += `
            <div class="card grid-item" data-id="${books[i].id}">   
            <div class="card-body">      
            <img id="img" src="${books[i].imgUrl}">
            <h3>${books[i].title}</h3>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <p>${books[i].info}</p>
            <p>${books[i].price} kr</p>
            <input class="quantity" type="number" min="1" max="99" value="1">
            <button class="add">Köp</button>
            </div>
            </div>
        `;
    }

    $('.content').html(result);
};


// Info om varje bok i kundvagnen 
async function fillCart() {
    let books = await getBooks(),
        cart = getCart();

    let html = '';
    for (let i = 0; i < cart.length; i++) {
        let book = getBook(books, cart[i].id),
            totalPrice = (book.price * cart[i].quantity);

        html += `
        
          <div class="cart-item" data-id="${book.id}" data-price="${books[i].price}">
          
              <span class="cart-item-title">
                  ${book.title}
              </span>
              
              <span>
                  <input class="cart-quantity" type="number" min="1" max="99" value="${cart[i].quantity}">
              </span>
              <span>
                <span class="cart-total-price">${totalPrice}</span> kr
              </span>
              <span class="cart-remove" style="float: right">
                  X
              </span>
          </div>
        `;
    }

    $('.cart').html(html);
    cartPrice();
};

// Beställningens totala pris 
function cartPrice() {
    let totalPrice = 0;
    $('.cart-total-price').each(function () {
        totalPrice += parseFloat($(this).text());
    });

    $('.total-price').text(totalPrice);
};
