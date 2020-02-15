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
        let prodPreviewImage = $(dataCol).find('.prod_preview_image').val().replace('$', '');
        modal.find('#prod-code').prop('value', prodCode);
        modal.find('#prod-name').prop('value', prodName);
        modal.find('#prod-line').prop('value', prodLine);
        modal.find('#prod-desc').prop('value', prodDesc);
        modal.find('#prod-qty').prop('value', prodQty);
        modal.find('#prod-price').prop('value', prodPrice);
        modal.find('#prod-preview-image').prop('value', prodPreviewImage);
    });

    $('#updBlogPostModal').on('show.bs.modal', function (event) {
        let modal = $(this);
        let dataCol = $(event.relatedTarget).closest('tr');
        let postId = $(dataCol).find('.post_id').text();
        let postTitle = $(dataCol).find('.post_title').text();
        let postContent = $(dataCol).find('.post_content_all').text().trim();
        let postCategory = $(dataCol).find('.post_category').text();
        let prodPreviewImage = $(dataCol).find('.prod_preview_image').text();
        modal.find('#post-id').prop('value', postId);
        modal.find('#post-title').prop('value', postTitle);
        modal.find('#post-content').prop('value', postContent);
        modal.find('#post-category').prop('value', postCategory);
        modal.find('#post-prew-image').prop('value', prodPreviewImage);
    })
});