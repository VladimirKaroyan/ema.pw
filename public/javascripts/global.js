$(document).ready(function () {
    // ************************************************
// Shopping Cart API
// ************************************************

    let shoppingCart = (function () {
        // =============================
        // Private methods and propeties
        // =============================
        cart = [];

        // Constructor
        function Item(name, price, count, productCode) {
            this.name = name;
            this.price = price;
            this.count = count;
            this.productcode = productCode;
        }

        // Save cart
        function saveCart() {
            sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
        }

        // Load cart
        function loadCart() {
            cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
        }

        if (sessionStorage.getItem("shoppingCart") != null) {
            loadCart();
        }


        // =============================
        // Public methods and propeties
        // =============================
        let obj = {};

        // Add to cart
        obj.addItemToCart = function (name, price, count, productCode) {
            for (let item in cart) {
                if (cart[item].name === name) {
                    cart[item].count++;
                    saveCart();
                    return;
                }
            }
            let item = new Item(name, price, count, productCode);
            cart.push(item);
            saveCart();
        };
        // Set count from item
        obj.setCountForItem = function (name, count) {
            for (let i in cart) {
                if (cart[i].name === name) {
                    cart[i].count = count;
                    break;
                }
            }
            saveCart();
        };
        // Remove item from cart
        obj.removeItemFromCart = function (name) {
            for (let item in cart) {
                if (cart[item].name === name) {
                    cart[item].count--;
                    if (cart[item].count === 0) {
                        cart.splice(item, 1);
                    }
                    break;
                }
            }
            saveCart();
        };

        // Remove all items from cart
        obj.removeItemFromCartAll = function (name) {
            for (let item in cart) {
                if (cart[item].name === name) {
                    cart.splice(item, 1);
                    break;
                }
            }
            if (cart.length === 0) {
                $('#cart').modal('hide');
            }
            saveCart();
        };

        // Clear cart
        obj.clearCart = function () {
            cart = [];
            saveCart();
        };

        // Count cart
        obj.totalCount = function () {
            return cart.length;
        };

        // Total cart
        obj.totalCart = function () {
            let totalCart = 0;
            for (let item in cart) {
                totalCart += cart[item].price * cart[item].count;
            }
            return Number(totalCart.toFixed(2));
        };

        // List cart
        obj.listCart = function () {
            let cartCopy = [];
            for (i in cart) {
                item = cart[i];
                itemCopy = {};
                for (p in item) {
                    itemCopy[p] = item[p];

                }
                itemCopy.total = Number(item.price * item.count).toFixed(2);
                cartCopy.push(itemCopy)
            }
            return cartCopy;
        };

        // cart : Array
        // Item : Object/Class
        // addItemToCart : Function
        // removeItemFromCart : Function
        // removeItemFromCartAll : Function
        // clearCart : Function
        // countCart : Function
        // totalCart : Function
        // listCart : Function
        // saveCart : Function
        // loadCart : Function
        return obj;
    })();


// *****************************************
// Triggers / Events
// *****************************************
// Add item
    $('.add-to-cart').click(function (event) {
        event.preventDefault();
        let name = $('.product-title').text();
        let price = parseInt($('.price').text().replace(/^\D+/g, ''));
        let productCode = $('.productCode').text();
        shoppingCart.addItemToCart(name, price, 1, productCode);
        $('#cart').modal('show');
        displayCart();
    });

// Clear items
    $('.clear-cart').click(function () {
        shoppingCart.clearCart();
        displayCart();
    });

    function getItem(itemSelector) {
        let name = $(itemSelector).find('.item-name').text();
        let price = parseFloat($(itemSelector).find('.item-price').text().replace('$', ''));
        let count = (parseInt($(itemSelector).find('.item-count').prop('value')) >= 1) ? parseInt($(itemSelector).find('.item-count').prop('value')) : 0;
        let productCode = (parseInt($(itemSelector).find('.item-count').prop('value')) >= 1) ? parseInt($(itemSelector).find('.item-count').prop('value')) : 0;
        return [name, price, count, productCode];
    }

    function displayCart() {
        let cartArray = shoppingCart.listCart();
        let output = "";
        for (let i in cartArray) {
            output += "<tr class='item'>"
                + "<td><div class='item-name'>" + cartArray[i].name + "</div></td>"
                + "<td><div class='item-price'>$" + cartArray[i].price + "</div></td>"
                + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>"
                + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
                + "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>"
                + "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>"
                + " = "
                + "<td>" + cartArray[i].total + "$</td>"
                + "<input type='hidden'>" + cartArray[i].productcode + "$</input>"
                + "</tr>";
        }
        $('.show-cart').html(output);
        $('.total-cart').html(shoppingCart.totalCart());
        $('.total-count').html(shoppingCart.totalCount());
    }

    displayCart();
// Disable order button
    $('#cart').on('show.bs.modal', function () {
        if (cart.length === 0) {
            $('#make-order-button').prop('disabled', true);
        } else {
            $('#make-order-button').prop('disabled', false);
        }
    });
// Delete item button

    $('.show-cart').on("click", ".delete-item", function (event) {
        let item = getItem($(this).closest('.item'));
        shoppingCart.removeItemFromCartAll(item[0]);
        displayCart();
    })


// -1
    $('.show-cart').on("click", ".minus-item", function (event) {
        let item = getItem($(this).closest('.item'));
        let count = item[2] - 1;
        if (item[2] <= 1) {
            shoppingCart.removeItemFromCartAll(item[0], count);
        }
        shoppingCart.setCountForItem(item[0],);
        displayCart();
    });
// +1
    $('.show-cart').on("click", ".plus-item", function (event) {
        let item = getItem($(this).closest('.item'));
        let count = item[2] + 1;
        shoppingCart.setCountForItem(item[0], count);
        displayCart();
    });

// Item count input
    $('.show-cart').on("change", ".item-count", function (event) {
        let name = $(this).data('name');
        let count = Number($(this).val());
        shoppingCart.setCountForItem(name, count);
        displayCart();
    });
//Make order
    $('#make-order-button').click(function () {
        $(this).prop('disabled', true);
        $.ajax({
            url: '/make-order',
            method: 'POST',
            data: {
                data: JSON.stringify(cart),
                totalPrice: shoppingCart.totalCart()
            },
            success: function (req, res) {
                let ids = JSON.stringify(req);
                let text = (cart.length > 1) ? 'Your Order IDs Are - ' + ids : 'Your Order ID Is - ' + ids;
                $('.order-id').text(text);
                $('#cart').modal('hide');
                $(this).prop('disabled', false);
                $('#success_tic').modal('show');
            },
            error: function (req, res) {
                if (req.responseText === "loginerr") window.location.replace('/login');
            }
        })
    });
});
