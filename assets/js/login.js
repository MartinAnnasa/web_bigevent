$(function() {
  // 点击注册账号
  $("#link_reg").on("click", function() {
    $(".login-box").hide();
    $(".reg-box").show();
  });

  // 点击登录
  $("#link_login").on("click", function() {
    $(".login-box").show();
    $(".reg-box").hide();
  });

  // 从layui中获取form方法
  var form = layui.form;
  // 通过form.verify()函数自定义校验规则
  form.verify({
    // 自定义名为pwd的校验规则
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    repwd: function(value) {
      // 通过形参拿到的是确认密码框中的内容，还需要拿到密码框的内容，然后进行比较
      var pwd = $(".reg-box [name=password]").val();
      if (pwd !== value) return "两次密码不一致";
    }
  });

  var layer = layui.layer;
  // 注册账号
  // 监听注册表单事件
  $("#form_reg").on("submit", function(e) {
    // 阻止表单的默认提交
    e.preventDefault();
    var data = {
      username: $("#form_reg [name=username]").val(),
      password: $("#form_reg [name=password]").val(),
      repassword: $("#form_reg [name=repassword]").val()
    };
    $.post("/api/reg", data, function(res) {
      if (res.code !== 0) {
        return layer.msg(res.message);
      }
      layer.msg("注册成功，请登录");
      // 模拟登录点击事件
      $("#link_login").click();
    });
  });

  // 登录账号
  // 监听登陆事件
  $("#form_login").submit(function(e) {
    e.preventDefault();

    $.ajax({
      url: "/api/login",
      method: "POST",
      //快速获取表单数据
      data: $(this).serialize(),
      success: function(res) {
        if (res.code !== 0) return layer.msg(res.message);
        layer.msg("登录成功");
        // 将登录成功后的token存到本地存储里
        localStorage.setItem("token", res.token);
        location.href = "/index.html";
      }
    });
  });
});
