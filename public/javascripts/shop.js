window.price = 0;
window.bosslikepoints = 0;
window.activeProductCount = 0;
window.activeProductSpeed = 0;
window.activeProduct = 0;
window.activeProductService = 0;
let discounts = {
    500: 5,
    1000: 10,
    5000: 15
};
$(document).ready(function () {
    function changeActiveProduct() {
        let activeProduct = $('.tab-pane.active .product.active');
        let prices = [
            $(activeProduct).find('input.productSlowPrice').val(),
            $(activeProduct).find('input.productMediumPrice').val(),
            $(activeProduct).find('input.productFastPrice').val()
        ];
        let bossLikePoints = [
            $(activeProduct).find('input.productSlowBossLikePoints').val(),
            $(activeProduct).find('input.productMediumBossLikePoints').val(),
            $(activeProduct).find('input.productFastBossLikePoints').val()
        ];
        window.activeProductCount = $('input.productCountText').val();
        window.activeProductSpeed = $('input.productSpeed').val();
        window.price = (prices[activeProductSpeed] * activeProductCount).toFixed(2);
        if (window.price >= 500 && window.price < 1000) {
            window.price = parseFloat(window.price - window.price * discounts['500'] / 100).toFixed(2);
            $('.price').addClass('sale').removeClass('sale-10').removeClass('sale-15').addClass('sale-5');
        } else if (window.price >= 1000 && window.price < 5000) {
            window.price = parseFloat(window.price - window.price * discounts['1000'] / 100).toFixed(2);
            $('.price').addClass('sale').removeClass('sale-5').removeClass('sale-15').addClass('sale-10');
        } else if (window.price >= 5000) {
            window.price = parseFloat(window.price - window.price * discounts['5000'] / 100).toFixed(2);
            $('.price').addClass('sale').removeClass('sale-10').removeClass('sale-5').addClass('sale-15');
        }
        else {
            $('.price').removeClass('sale');
        }
        window.bosslikepoints = bossLikePoints[activeProductSpeed];
        window.activeProduct = $(activeProduct).find('input.productTaskType').val();
        window.activeProductService = $(activeProduct).find('input.productServiceType').val();
        $('.price').text(window.price);
    }

    $(document).on('input', '.productCount, .productSpeed, .productCountText', changeActiveProduct);
    $(document).on('shown.bs.tab', 'a[data-toggle="tab"]', changeActiveProduct);
    changeActiveProduct();

});