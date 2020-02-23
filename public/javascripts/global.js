$(document).ready(function () {
    $('.carousel').on('slide.bs.carousel', function (e) {
        /*
            CC 2.0 License Iatek LLC 2018 - Attribution required
        */
        var $e = $(e.relatedTarget);
        var idx = $e.index();
        var itemsPerSlide = 3;
        var totalItems = $(this).find('.carousel-item').length;
        var carInner = $(this).find('.carousel-inner');
        if ($(this).find('.carousel-inner ul').length) carInner = $(this).find('.carousel-inner ul');

        if (idx >= totalItems-(itemsPerSlide-1)) {
            var it = itemsPerSlide - (totalItems - idx);
            for (var i=0; i<it; i++) {
                // append slides to end
                if (e.direction=="left") {
                    $(this).find('.carousel-item').eq(i).appendTo(carInner);
                }
                else {
                    $(this).find('.carousel-item').eq(0).appendTo(carInner);
                }
            }
        }
    });
    MathUtils = {
        roundToPrecision: function (subject, precision) {
            return +((+subject).toFixed(precision));
        }
    };
    // ************************************************
// Shopping Cart API
// ************************************************

    let shoppingCart = (function () {
        // =============================
        // Private methods and propeties
        // =============================
        cart = [];

        // Constructor
        function Item(name, service_type, task_type, count, speed, price, bosslike_points, service_url) {
            this.name = name;
            this.service_type = service_type;
            this.task_type = task_type;
            this.count = count;
            this.speed = speed;
            this.price = price;
            this.bosslike_points = bosslike_points;
            this.service_url = service_url;
        }

        // Save cart
        function saveCart() {
            localStorage.setItem('shoppingCart', JSON.stringify(cart));
        }

        // Load cart
        function loadCart() {
            cart = JSON.parse(localStorage.getItem('shoppingCart'));
        }

        if (localStorage.getItem("shoppingCart") != null) {
            loadCart();
        }


        // =============================
        // Public methods and propeties
        // =============================
        let obj = {};

        // Add to cart
        obj.addItemToCart = function (name, service_type, task_type, count, speed, price, bosslike_points, service_url) {
            let item = new Item(name, service_type, task_type, count, speed, price, bosslike_points, service_url);
            cart.push(item);
            saveCart();
        };
        // Set count from item
        // obj.setCountForItem = function (name, count) {
        //     for (let i in cart) {
        //         if (cart[i].name === name) {
        //             cart[i].count = count;
        //             break;
        //         }
        //     }
        //     saveCart();
        // };
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
        obj.removeItemFromCartAll = function (item) {
            cart.splice(item, 1);
            if (cart.length === 0) {
                $('#cart').modal('hide');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
            }
            saveCart();
        };

        // Clear cart
        obj.clearCart = function () {
            cart = [];
            saveCart();
            displayCart();
        };

        // Count cart
        obj.totalCount = function () {
            return cart.length;
        };

        // Total cart
        obj.totalCart = function () {
            let totalCart = 0;
            for (let item in cart) {
                totalCart += parseFloat(cart[item].price);
            }
            return totalCart.toFixed(2);
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
    $('#addToCart').click(function (event) {
        event.preventDefault();
        let name = $('.tab-pane.active .product.active').find('.productDesc').text();
        let service_type = window.activeProductService;
        let task_type = window.activeProduct;
        let count = window.activeProductCount;
        let speed = window.activeProductSpeed;
        let price = window.price;
        let bosslike_points = window.bosslikepoints;
        let service_url = $('#profile_url').val();
        shoppingCart.addItemToCart(name, service_type, task_type, count, speed, price, bosslike_points, service_url);
        $('#cart').modal('show');
        displayCart();
    });

// Clear items
    $('.clear-cart').click(function () {
        shoppingCart.clearCart();
        displayCart();
    });

    // function getItem(itemSelector) {
    //     let name = $(itemSelector).find('.item-name').text();
    //     let price = parseFloat($(itemSelector).find('.item-price').text().replace('$', ''));
    //     let count = (parseInt($(itemSelector).find('.item-count').prop('value')) >= 1) ? parseInt($(itemSelector).find('.item-count').prop('value')) : 0;
    //     let productCode = (parseInt($(itemSelector).find('.item-count').prop('value')) >= 1) ? parseInt($(itemSelector).find('.item-count').prop('value')) : 0;
    //     return [name, price, count, productCode];
    // }

    function displayCart() {
        let cartArray = shoppingCart.listCart();
        let output = "";
        for (let i in cartArray) {
            output += `<tr class='item' data-id='${i}'>`
                + "<td><div class='item-name'>" + cartArray[i].name + "</div></td>"
                + "<td><div class='item-price'>" + MathUtils.roundToPrecision(cartArray[i].price / cartArray[i].count, 1) + " руб</div></td>"
                + "<td><div class='item-count'>" + cartArray[i].count + "</div></td>"
                + "<td>" + cartArray[i].price + " руб</td>"
                + "<td><button class='delete-item btn btn-danger'>X</button></td>"
                + "</tr>";
        }
        $('.show-cart tbody').html(output);
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
        let itemId = $(this).closest('tr').data('id');
        shoppingCart.removeItemFromCartAll(itemId);
        displayCart();
    });


// -1
//     $('.show-cart').on("click", ".minus-item", function (event) {
//         let item = getItem($(this).closest('.item'));
//         let count = item[2] - 1;
//         if (item[2] <= 1) {
//             shoppingCart.removeItemFromCartAll(item[0], count);
//         }
//         shoppingCart.setCountForItem(item[0], count);
//         displayCart();
//     });
// +1
//     $('.show-cart').on("click", ".plus-item", function (event) {
//         let item = $(this).closest('tr').data('id');
//         let count = item[2] + 1;
//         shoppingCart.setCountForItem(item[0], count);
//         displayCart();
//     });

// Item count input
//     $('.show-cart').on("change", ".item-count", function (event) {
//         let name = $(this).data('name');
//         let count = Number($(this).val());
//         shoppingCart.setCountForItem(name, count);
//         displayCart();
//     });
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
                let orderResponse = req;
                if (orderResponse['error']) {
                    $('.order-message').html(orderResponse['message']);
                    $('.swal2-animate-success-icon').addClass('d-none');
                    $('.swal2-animate-error-icon').removeClass('d-none');
                } else {
                    $('.order-message').text(orderResponse['message']);
                    $('.userBalance').text(orderResponse['newBalance']);
                    $('.swal2-animate-success-icon').removeClass('d-none');
                    $('.swal2-animate-error-icon').addClass('d-none');
                    shoppingCart.clearCart();
                }
                $('#cart').modal('hide');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
                $(this).prop('disabled', false);
                $('#success_tic').modal('show');
            },
            error: function (req, res) {
                if (req.responseText === "loginerr") window.location.replace('/login');
            }
        })
    });
});
