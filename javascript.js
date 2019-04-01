let addToCart = function(id, quantity) {
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

let bindCart = function() {
    $(document.body).on('click', '.cart-remove', function () {
        const cartElem = $(this).closest('.cart-item'),
            id = parseInt(cartElem.data('id'));
        
        removeFromCart(id);
        fillCart();
    });
    
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
    
    $('.remove-all').on('click', function () {
        localStorage.removeItem('cart');
        
        fillCart();
    });

    $('.purchase').on('submit', async function(e) {
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
                <div>${obj.name}</div>
                <div>${obj.telephone}</div>
                <div>${obj.email}</div>
                <div>${obj.address}</div>
                <div>${obj.zip_code}</div>
                <div>${obj.city}</div>
            </div>
        `;

        $(this).remove();
        $('.shoppingcart').remove(); 
        $('.purchase-result').html('<h2>Tack för din beställning</h2>' + html);
    });
};

let getBook = function(books, id) {
    for (let i = 0; i < books.length; i++) {
        if (books[i].id == id) {
            return books[i];
        }
    }
};

let getBooks = function() {
    return new Promise(function(resolve) {
        $.getJSON('books.json', function (data) {
            resolve(data);
        });
    });
};

let getCart = function() {
    let json = localStorage.getItem('cart');
    if ( ! json) {
  	    return [];
    }

    try {
  	    return JSON.parse(json);
    } catch (e) {
        return [];
    }
};

let fillCards = async function() {
    let books = await getBooks();

    let result = '';
    for (let i = 0; i < books.length; i++) {
        result += `
            <div class="card grid-item" data-id="${books[i].id}">   
            <div class="card-body">      
            <img id="img" src="${books[i].imgUrl}">
            <h3>${books[i].title}</h3>
            <p>${books[i].info}</p>
            <p>${books[i].price} kr</p>
            <input class="quantity" type="number" min="1" max="99" value="1">
            <button class="add">Köp</button>
            </div>
            </div>
        `;
    }

    $('.content').html(result);

    $(document.body).on('click', '.add', function () {
        const cardElem = $(this).closest('.card'),
            id = parseInt(cardElem.data('id')),
            quantity = parseInt(cardElem.find('.quantity').val());
        
        addToCart(id, quantity);
        fillCart();
    });
};

let fillCart = async function() {
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

let cartPrice = function() {
    let totalPrice = 0;
    $('.cart-total-price').each(function() {
        totalPrice += parseFloat($(this).text());
    });

    $('.total-price').text(totalPrice);
};

let removeFromCart = function(id) {
    let cart = getCart();

    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id == id) {
            cart.splice(i, 1);
        }
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
};

let updateCart = function(id, quantity) {
    let cart = getCart();

    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id == id) {
            cart[i].quantity = quantity;
        }
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
};