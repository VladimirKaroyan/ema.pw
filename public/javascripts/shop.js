$(document).ready(function () {
    function changeActiveProduct() {
        let activeProduct = $('.tab-pane.active .product.active');
        let prices = [
            $(activeProduct).find('input.productSlowPrice').val(),
            $(activeProduct).find('input.productMediumPrice').val(),
            $(activeProduct).find('input.productFastPrice').val()
        ];
        let activeProductCount = $('input.productCountText').val();
        let activeProductSpeed = $('input.productSpeed').val();
        let productPrice = (prices[activeProductSpeed] * activeProductCount).toFixed(2);
        $('.price').text(productPrice);
    }

    $(document).on('input', '.productCount, .productSpeed, .productCountText', changeActiveProduct);
    changeActiveProduct();

});