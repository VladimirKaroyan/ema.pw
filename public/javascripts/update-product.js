$(document).ready(function () {
    $('#updProdModal').on('show.bs.modal', function (event) {
        let modal = $(this);
        let dataCol = $(event.relatedTarget).closest('tr');
        let prodCode = $(dataCol).find('.prod_code').text();
        let prodName = $(dataCol).find('.prod_name').text();
        let prodLine = $(dataCol).find('.prod_line').text();
        let prodDesc = $(dataCol).find('.prod_desc').text();
        let prodQty = $(dataCol).find('.prod_qty').text();
        let prodPrice = $(dataCol).find('.prod_price').text().replace('$', '');
        modal.find('#prod-code').prop('value', prodCode);
        modal.find('#prod-name').prop('value', prodName);
        modal.find('#prod-line').prop('value', prodLine);
        modal.find('#prod-desc').prop('value', prodDesc);
        modal.find('#prod-qty').prop('value', prodQty);
        modal.find('#prod-price').prop('value', prodPrice);
    })
});