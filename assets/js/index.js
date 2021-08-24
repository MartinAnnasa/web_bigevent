$(function() {
  getUserInfo();

  // 退出事件
  $("#btnLogout").on("click", function() {
    // 提示用户是否退出
    layer.confirm("确定退出登录?", { icon: 3, title: "提示" }, function(index) {
      // do something
      // 清空本地存储
      localStorage.removeItem("token");
      //跳转到登录页面
      location.href = "./../../login.html";
      layer.close(index);
    });
  });
});

// 获取用户基本信息
function getUserInfo() {
  $.ajax({
    method: "GET",
    url: "/my/userinfo",
    // headers: {
    //   Authorization: localStorage.getItem("token") || ""
    // },
    success: function(res) {
      if (res.code !== 0) return layui.layer.msg("读取用户信息失败");
      // 成功则调用renderavatar渲染头像
      renderavatar(res.data);
    }
    // // 不论成功失败 都会调用此函数
    // complete: function(res) {
    //   console.log(res);
    //   if (
    //     res.responseJSON.code === 1 &&
    //     res.responseJSON.message === "身份认证失败！"
    //   ) {
    //     // 清空本地存储
    //     localStorage.removeItem("token");
    //     //跳转到登录页面
    //     location.href = "./../../login.html";
    //   }
    // }
  });
}

// 渲染头像
function renderavatar(user) {
  // console.log(user);
  var name = user.nickname || user.username;
  $("#welcome").html("欢迎&nbsp;&nbsp;&nbsp;" + name);
  // 按需渲染头像
  if (user.user_pic !== null) {
    // 渲染图片头像
    $(".layui-nav-img")
      .attr("src", user.user_pic)
      .show(),
      $(".text-avatar").hide();
  } else {
    // 渲染文字头像
    $(".layui-nav-img").hide();
    var first = name[0].toUpperCase();
    $(".text-avatar")
      .html(first)
      .show();
  }
}
