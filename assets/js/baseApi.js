// 每次调用ajax之前会先调用此函数
$.ajaxPrefilter(function(options) {
  options.url = "http://www.liulongbin.top:3008" + options.url;

  // 统一为有权限的接口，设置headers请求头
  if (options.url.indexOf("/my/") !== -1) {
    options.headers = {
      Authorization: localStorage.getItem("token") || ""
    };
  }

  // 全局挂载complete回调函数
  options.complete = function(res) {
    console.log(res);
    if (
      res.responseJSON.code === 1 &&
      res.responseJSON.message === "身份认证失败！"
    ) {
      // 清空本地存储
      localStorage.removeItem("token");
      //跳转到登录页面
      location.href = "./../../login.html";
    }
  };
});
