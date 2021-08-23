// 每次调用ajax之前会先调用此函数
$.ajaxPrefilter(function(options) {
  options.url = "http://www.liulongbin.top:3008" + options.url;
});
