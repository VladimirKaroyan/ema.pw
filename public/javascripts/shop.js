window.price = 0;
window.activeProductCount = 0;
window.activeProductSpeed = 0;
window.activeProduct = 0;
window.activeProductService = 0;
$(document).ready(function () {
    function changeActiveProduct() {
        let activeProduct = $('.tab-pane.active .product.active');
        let prices = [
            $(activeProduct).find('input.productSlowPrice').val(),
            $(activeProduct).find('input.productMediumPrice').val(),
            $(activeProduct).find('input.productFastPrice').val()
        ];
        window.activeProductCount = $('input.productCountText').val();
        window.activeProductSpeed = $('input.productSpeed').val();
        window.price = (prices[activeProductSpeed] * activeProductCount).toFixed(2);
        window.activeProduct = $(activeProduct).find('input.productTaskType').val();
        window.activeProductService = $(activeProduct).find('input.productServiceType').val();
        $('.price').text(window.price);
    }

    $(document).on('input', '.productCount, .productSpeed, .productCountText', changeActiveProduct);
    $(document).on('shown.bs.tab', 'a[data-toggle="tab"]', changeActiveProduct);
    changeActiveProduct();

});