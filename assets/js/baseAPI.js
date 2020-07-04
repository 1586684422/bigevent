$(function() {
    $.ajaxPrefilter((options, originalOptions, jqXHR) => {
        // 拼接url地址
        options.url = 'http://ajax.frontend.itheima.net' + options.url;
    });
})