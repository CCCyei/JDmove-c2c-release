/*业务相关工具类集合，根据项目进行扩展*/
define( ['jquery','utils'], function ($,$utils) {
  var utilsExt = {
    //判断参数是否为null
    showToast: function (msg,callback) {

      $(".ui-alertdialog span").html(msg);
      $(".ui-alertdialog").show();
      var timeOut=3000;
      if(callback){
        timeOut=1500;
      }
      setTimeout(function () {
        utilsExt.hideToast();
        if(callback){
          callback();
        }
      }, timeOut);
    },

    hideToast: function () {
      $(".ui-alertdialog span").html("");
      $(".ui-alertdialog").hide();
    },



    showTopToast: function (msg) {
      if (msg != null && msg != "") {
        $(".top-toast-hit").html(msg);
      } else {
        $(".top-toast-hit").html("网络请求失败,请检查您的网络设置");
      }
      $(".top-toast").show();

    },
    hideTopToast: function (msg) {
      $(".top-toast").hide();
    },
    //获取部署路径，方便部署，可根据项目不同调整
    getBasePath: function () {
      var url = "";
      if (this.isDebug) {
        url = "//" + window.location.host;
      } else {
        url = "//" + window.location.host + "/h5";
      }
      return url;
    },


    //以旧换新文案提示
    tips: {
      netError: "网络请求失败，请检查网络设置",//无网络
      loading: "加载中，请稍后……",  //网络差
      systemError: "服务器开小差，重新加载……",  //服务器请求失败
      error:"加载失败，请重新尝试",
      huishou_priceIt10: "商品价格太低，请与其他商品合并提交结算", //回收商品低于10元不能立即回收
      netErrorToast: "网络偷懒，再点一下试试看", //断网加入回收车失败Toast提示
      notLogin: "去登录结算喽",    //用户未登录
      inquiry_cartGt20: "回收车已慢慢，先结算再来吧", //回收车已满超出20个

      cart_delSuccess: "删除成功",   //删除成功
      cart_delFail: "删除失败，再点一下试试看",//删除失败
      cart_netError: "网络开小差，检查后再试吧",//提交回收断网

      search_resultEmpty: "暂无结果",//提交回收断网

      parameterError: "参数异常"
    },
    /*回到顶部*/
    gotoTop: function (options) {
      var defaults = {
        showHeight: window.screen.height,//默认在一屏幕的高度
        speed: 1000, //移动速度
        toTop: "",//滚动的对象
        top: "",//点击的对象
        callback: function () {//自定义回调函数，可以设置返回按钮和底部的高度
        }
      };
      var options = $.extend(defaults, options);
      var $toTop = $(options.toTop);
      var $top = $(options.top);
      $toTop.scroll(function () {
        var that = this;
        var scrolltop = $(this).scrollTop();
        if (scrolltop >= options.showHeight) {
          options.callback();
          $top.show();
        }
        else {
          $top.hide();
        }
        /*点击返回顶部*/
        $top.unbind("click").bind("click", function () {
          $(that).scrollTop(0, 0);
        })
      });
    },
    /*设置后退*/
    setHistory:function () {
      history.replaceState('', document.title, 'index.html');
    },
    subString:function (size,string) {
      if(string.length >size){
        return string.substring(0,size-2)+'...'
      }else {
        return string;
      }
    }
  }
  return utilsExt;
})
