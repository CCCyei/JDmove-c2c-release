/**
 *  paipaiSDK
 * 拍拍app 对外协议sdk，旨在对协议进行封装，页面无需对接协议，直接调用sdk中的方法就可以，
 * 协议分为三类，
 * 唤起协议，只唤起原生页面或者方法，app内或者浏览器都可以使用
 * 回调协议，调用原生方法或者原生功能，有执行回调
 * 设置协议，设置一些原生属性
 */

;
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root['paipaiSDK'] = factory(); // 如果没有AMD/CMD和CommonJS就挂在全局对象下
  }
})(typeof window !== "undefined" ? window : this, function() {

  /**
   * 工具类
   * @type {Object}
   */
  var utils = {
    /**
     * 是否为拍拍app
     * @return {boolean} true/false
     */
    isPPAPP: function() {
      var ua = navigator.userAgent.toLowerCase();
      if (ua.indexOf('jdappershou') != -1) {
        return true;
      } else {
        return false;
      }
    },
    /**
     * 是否为京东app
     * @return {boolean} [description]
     */
    isJDAPP: function() {
      var ua = navigator.userAgent.toLowerCase();
      if (ua.indexOf('jdapp') != -1 && !isPPAPP()) {
        return true;
      } else {
        return false;
      }
    },
    /**
     * 获取设备类型
     * @return {int} 0,其他， 1，android 2，IOS
     */
    getDevicesType: function() {
      var devicesType = 0,
        ua = navigator.userAgent;
      var isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1; //android终端或者uc浏览器
      var isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        devicesType = 1;
      } else if (isiOS) {
        devicesType = 2;
      }
      return devicesType;
    },
    messageHandlers:function (params) {
      if(info.devicesType===1){
          window.android.ppAppMessageHandler(encodeURIComponent(JSON.stringify(params)));
      }else if(info.devicesType===2){
          alert(JSON.stringify(params))
          window.webkit.messageHandlers.ppAppMessageHandler.postMessage(params);
      }
      // 前进或者后退时候也会重置
      document.body.addEventListener('onpageshow',function () {
        if(info.devicesType===1){
            window.android.ppAppMessageHandler(encodeURIComponent(JSON.stringify(params)));
        }else if(info.devicesType===2){
            alert(JSON.stringify(params))
          window.webkit.messageHandlers.ppAppMessageHandler.postMessage(params);
        }
      })
    }


  }
  /**
   * 基础信息
   * @type {Object}
   */
  var info = {
    version: '1.0.0',
    ua: navigator.userAgent,
    devicesType: utils.getDevicesType()
  }

  /**
   * 唤起协议
   * @type {Object}
   */
  var onlyCallprotocol = {

    /**
     * 唤起风控协议
     * @return {[type]} [description]
     */
    fengkong: function() {
      location.href = 'openapp.paipai://fengkong/app';
    },
    /**
     * 唤起爱回收自动检测
     * @return {[type]} [description]
     */
    checkPhone: function() {
        location.href = 'openapp.paipai://AiHuiShouDetect/app';
    },
    /**
     * 唤起爱回收重新自动检测
     * @return {[type]} [description]
     */
    reCheckPhone: function() {
      location.href = 'openapp.paipai://AiHuiShouRedetect/app';
    },
    /**
     * 回到app首页
     * @return {[type]} [description]
     */
    openAppHomePage:function () {
      alert('打开app首页')
      location.href = 'openapp.paipai://pickImage/app';
    },
    /**
     * 打开我的首页
     * @return {[type]}        [description]
     */
    openMyHomePage:function () {
      alert('我的首页')
      location.href ='openapp.paipai://pushToProfileCenter/app'

    },
    /**
     * 打开用户首页
     * @param  {[type]} userId [description]
     * @return {[type]}        [description]
     */
    openUserHomePage:function (uin) {
      alert('去用户首页'+ uin)
      location.href ='openapp.paipai://getUserInfo/app??param={"uin":"'+ uin+'"}'
    },
    /**
     * 打开消息列表
     * @return {[type]} [description]
     */
    openMessageList:function () {
      alert('打开消息列表');
      location.href ='openapp.paipai://pushToMessageList/app'
    },
    /**
     * 打开原生搜索
     * @param  {[type]} keyword [description]
     * @return {[type]}         [description]
     */
    openSearch:function (keyword) {
      alert('打开搜索：'+keyword);
      location.href ='openapp.paipai://pushToSearch/app?param={"key1":"'+keyword+'"}'
    },
    /**
     * 打开原生分类页
     * @return {[type]} [description]
     */
    openCategory:function () {
      alert('打开原生分类');
      location.href ='openapp.paipai://pushToGoodsClassify/app'
    },
    /**
     * 打开C2CS商品详情页
     * @param  {[type]} url [description]
     * @return {[type]}     [description]
     */
    openActivity:function (url) {
      alert('活动页url： '+url);
      location.href ='openapp.paipai://pushToActivity/app?param={"key1":"'+url+'"}'
    },
    /**
     * 跳转原c2c详情
     * @param  {[type]} goodsId C2C商品id
     * @return {[type]}         [description]
     */
    openC2CDetail:function (goodsId) {
      alert('商品id： '+goodsId);
      location.href ='openapp.paipai://pushToC2CDetail/app?param={"key1":"'+goodsId+'"}'
    },
    /**
     * 一键转卖我的京东商品
     * @param  {[type]} goodsId 商品id
     * @return {[type]}         [description]
     */
    openReSale:function (dealId) {
      alert('订单id： '+dealId);
      location.href ='openapp.paipai://pushToResaleOrder/app?param={"key1":"'+dealId +'"}'
    },
    /**
     * 打开原生商品编辑
     * @param  {[type]} dealId c2c商品id
     * @return {[type]}        [description]
     */
    openGoodsEdit:function (goodsId) {
      alert('订单id： '+goodsId);
      location.href ='openapp.paipai://goodsEdit/app?param={"key1":"'+goodsId +'"}'
    },
    /**
     * 打开环信聊天
     * @param  {[type]} chatid [description]
     * @return {[type]}        [description]
     */
    openhuanxinChat:function (chatid) {
      alert('订单id： '+chatid);
      location.href ='openapp.paipai://pushToHuanXinChat/app?param={"key1":"'+chatid +'"}'
    },
    /**
     * 打开聊天室
     * @param  {[type]} chatid [description]
     * @return {[type]}        [description]
     */
    openIMHome:function (chatid) {
      alert('聊天室id '+chatid);
      location.href ='openapp.paipai://im/app?param={"key1":"'+chatid +'"}'
    },
    openBigImg:function (imgurl) {
      alert('图片url： '+imgurl);
      location.href =' openapp.paipai://showBigPic/app?param={"key1":"'+imgurl +'"}'
    },
    closePage:function () {
      alert('关闭页面');
      location.href ='openapp.paipai://close/app'
    },
    /**
     * 搜索结果
     * @param  {[type]} keyword 搜索关键词
     * @param  {[type]} type    12 二手优品， 13 备件库
     * @return {[type]}         [description]
     */
    openSearchResult:function (keyword,type) {
      alert('搜索结果页');
      location.href ='openapp.paipai://showSearchPage/app?param={"searchKey":"'+keyword+'", "searchType":"'+type+'"}'
    },
    openPublish:function () {
      alert('发布蒙层');
      location.href ='openapp.paipai://publish/app'
    },
    /**
     * 打开商品详情页
     * @param  {[type]} id [description]
     * @return {[type]}    [description]
     */
    openB2CDetail:function (goodsId) {
      location.href ='openapp.paipai://pushToB2CDetail/app?param={"key1":"'+goodsId+'"}';
      return;
      if(goodsId){
        var para ={
          method:'pushToB2CDetail',
          params:{
            key1:goodsId
          }
        };
      utils.messageHandlers(para);
      }
    }

  };
  /**
   * 回调协议
   * @type {Object}
   */
  var callBackProtocol = {
      openScan:function(){
        location.href ='openapp.paipai://scanQRCode/app';
      }


  };
  /**
   * 设置协议
   * @type {Object}
   */
  var setProtocol = {
    /**
     * 设置头部
     * @param  {string} title 头部内容，不能为空
     * @return {[type]}       [description]
     */
    setTitle: function(title) {
      if (title) {
        location.href = 'openapp.paipai://h5TitleEdit/app?param={"key1":"' + title + '"}';
      } else {
        throw new Error('title is empty')
      }

    },
    /**
     * 设置顶部bar显示分享按钮
     * @param  {obj} option 分享配置
     * @return {[type]}        [description]
     */
    setTopBarShare: function(option) {
      var config ={
        method: "setAPPInfo",
        params:{
          type: 1,
          title:option.title ||'',
          subTitle:option.subTitle ||'',
          imageUrl:option.imageUrl ||'',
          shareUrl:option.shareUrl ||''
        }
      }
      utils.messageHandlers(config);
    },
    /**
     * 设置顶部搜索按钮
     * @param  {obj} option 搜索类型，搜索关键字
     * @return {[type]}        [description]
     */
    setTopBarSearch: function(option) {
      var config ={
        method: "setAPPInfo",
        params:{
          type: 2,
          title: option.title ||'',
          searchType: option.searchType ||1,
          key: option.key ||''
        }
      };
      utils.messageHandlers(config);
    }
  }
  var paipaiSDK = paipaiSDK || {};
  /**
   * 获得基本信息
   * @return {[type]} [description]
   */
  paipaiSDK.info = info;
  paipaiSDK.utils = utils;
  paipaiSDK.call = onlyCallprotocol;
  paipaiSDK.get = callBackProtocol;
  paipaiSDK.set = setProtocol;


  return paipaiSDK;
});
