$(function() {
    // 链接跳转,切换表单
    $('#tosign_in').on('click', () => {
        $('#form_login').hide();
        $('#form_register').show();
    })
    $('#tologin').on('click', () => {
        $('#form_login').show();
        $('#form_register').hide();
    })

    // 表单验证
    layui.form.verify({
        username: function(value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }
            if (value.length < 2 || value.length > 6) {
                return '用户名长度请保持在 2 ~ 6 位之间';
            }
        }

        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        ,
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        resetpwd: function(data) {
            if ($('#form_register [name=password]').val() !== data) return '请确认两次密码保持一致'
        }
    });

    // 登录表单提交
    $('#form_login').on('submit', function(e) {
        // 阻止默认提交事件
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0 && res.message !== '登录成功！') return layui.layer.msg('登录失败');
                console.log(res);
                layui.layer.msg('登录成功');
                location.href = 'http://localhost:5500/index.html';
            }
        })
    })

    // 注册表单提交
    $('#form_register').on('submit', function(e) {
        // 阻止默认提交事件
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/api/reguser',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0 && res.message !== '注册成功！') return layui.layer.msg('注册失败!');
                layui.layer.msg('注册成功!去登录');
                $('#tologin').click();
            }
        })
    })

})