let price;
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
        price = (prices[activeProductSpeed] * activeProductCount).toFixed(2);
        $('.price').text(price);
    }

    $(document).on('input', '.productCount, .productSpeed, .productCountText', changeActiveProduct);
    $(document).on('shown.bs.tab', 'a[data-toggle="tab"]', changeActiveProduct);
    changeActiveProduct();

});