$(document).ready(function () {
    $('#login').click(function () {
        let userName = $('#userName').val();
        let passWord = $('#passWord').val();
        $.ajax({
            url: '/login/user',
            data: {username: userName, password: passWord},
            success: function () {
                console.log('Hoorah!! You are logged in');
            },
            error: function () {
                alert('Uncorrect username or password');
            }
        });
        return false;
    })
});
