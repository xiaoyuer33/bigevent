$(function(){
    //  点击“去注册账号”的链接
    $('#link_reg').on('click', function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })

    //  点击“去登陆”的链接
    $('#link_login').on('click', function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })

    //  自定义一个校验规则
    //  从 layui 中获取form对象
    var form = layui.form
    var layer = layui.layer
    //  调用 form.verify() 方法自定义一个校验规则
    form.verify({
        //  自定义一个叫做 pwd 的校验规则
        pwd:[/^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'],
        repwd:function(value){
            //  通过形参得到的是再次输入密码里的值
            //  还需要拿到密码框里的值
            //  然后进行一次等于的判断
            //  如果判断失败，则return一个提示消息即可
            var pwd = $('.reg-box [name=password]').val()
            if(pwd !== value) {
                return '两次密码不一致'
            }
        }

    })

    //  监听注册表单的提交事件
    $('#form_reg').on('submit',function(e){
        //  1. 阻止默认的提交行为
        e.preventDefault()
        //  2. 发起一个ajax的post请求
        var data = {username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()}
        $.post('/api/reguser',data,function(res){
            if(res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功！,请登录')
            //  模拟人的点击行为
            $('#link_login').click()

        })
    })

    //  监听登录表单的提交事件
    $('#form_login').submit(function(e){
        //  1. 阻止默认的提交行为
        e.preventDefault()
        //  2. 发起一个ajax的post请求
        $.ajax({
            url:'/api/login',
            method:'POST',
            //  快速获取表单中的数据
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                //  将登陆成功的 token 字符串，存储在 localstorage 中
                localStorage.setItem('token', res.token)
                //  跳转到后台主页
                location.href = './index.html'
            }
        })
    })
})