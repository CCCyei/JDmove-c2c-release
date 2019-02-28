/**
 *  paipaiSDK
 * 拍拍app 对外协议sdk，旨在对协议进行封装，页面无需对接协议，直接调用sdk中的方法就可以，
 * 协议分为三类，
 * 唤起协议，只唤起原生页面或者方法，app内或者浏览器都可以使用
 * 回调协议，调用原生方法或者原生功能，有执行回调
 * 设置协议，设置一些原生属性
 */
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
                params.params=JSON.stringify(params.params);
                window.android.ppAppMessageHandler(encodeURIComponent(JSON.stringify(params)));
            }else if(info.devicesType===2){
                window.webkit.messageHandlers.ppAppMessageHandler.postMessage(params);
            }
            // 前进或者后退时候也会重置
            document.body.addEventListener('onpageshow',function () {
                if(info.devicesType===1){
                    params.params=JSON.stringify(params.params);
                    window.android.ppAppMessageHandler(encodeURIComponent(JSON.stringify(params)));
                }else if(info.devicesType===2){
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
    };

    /**
     * 唤起协议
     * @type {Object}
     */
    var onlyCallprotocol = {
        /*
         * 唤起店铺搜索
         * */
        showSearchList:function (options) {
            var defaultOpt = {
                method : 'showSearchList',
                params: {
                    shopId: '',
                    searchKey: '',
                    searchType: 12,
                }
            };
            options = $.extend(defaultOpt.params, options);
            var opts={};
            $.extend(true,opts, defaultOpt);
            utils.messageHandlers(opts);
        },
        /**
         * 唤起风控协议
         * @return {[type]} [description]
         */
        fengkong: function() {

            // location.href = 'openapp.paipai://fengkong/app';
            var config = {
                method:'fengkong'
            };
            utils.messageHandlers(config)
        },
        /**
         * 唤起爱回收自动检测
         * @return {[type]} [description]
         */
        checkPhone: function() {
            //location.href = 'openapp.paipai://AiHuiShouDetect/app';
            var config = {
                method:'AiHuiShouDetect'
            };
            utils.messageHandlers(config)
        },
        /**
         * 唤起爱回收重新自动检测
         * @return {[type]} [description]
         */
        reCheckPhone: function() {
            // location.href = 'openapp.paipai://AiHuiShouRedetect/app';
            var config = {
                method:'AiHuiShouRedetect'
            };
            utils.messageHandlers(config)
        },
        /*
         * 打开定位
         * @return {[type]} [description]
         * */
        openLocation:function () {
            // location.href='openapp.paipai://openLocation/app';
            var config = {
                method:'openLocation'
            };
            utils.messageHandlers(config)
        },

        /**
         * 回到app首页
         * @return {[type]} [description]
         */
        openAppHomePage:function () {
            //location.href = 'openapp.paipai://pickImage/app';
            var config = {
                method:'pickImage'
            };
            utils.messageHandlers(config)
        },
        /**
         * 打开我的首页
         * @return {[type]}        [description]
         */
        openMyHomePage:function () {
            // location.href ='openapp.paipai://pushToProfileCenter/app'
            var config = {
                method:'pushToProfileCenter'
            };
            utils.messageHandlers(config)
        },
        /**
         * 打开用户首页
         * @param  {[type]} userId [description]
         * @return {[type]}        [description]
         */
        openUserHomePage:function (uin) {
            // location.href ='openapp.paipai://getUserInfo/app??param={"uin":"'+ uin+'"}'
            var para = {
                method:'getUserInfo',
                params:{
                    uin:uin
                }
            };
            utils.messageHandlers(para)
        },
        /**
         * 打开消息列表
         * @return {[type]} [description]
         */
        openMessageList:function () {
            // location.href ='openapp.paipai://pushToMessageList/app'
            var config = {
                method:'pushToMessageList'
            }
            utils.messageHandlers(config)
        },
        /**
         * 打开原生搜索
         * @param  {[type]} keyword [description]
         * @return {[type]}         [description]
         */
        openSearch:function (keyword) {
            // location.href ='openapp.paipai://pushToSearch/app?param={"key1":"'+keyword+'"}'
            var para = {
                method:'pushToSearch',
                params:{
                    key1:keyword
                }
            };
            utils.messageHandlers(para)
        },
        /**
         * 打开原生分类页
         * @return {[type]} [description]
         */
        openCategory:function () {
            //location.href ='openapp.paipai://pushToGoodsClassify/app'
            var config = {
                method:'pushToGoodsClassify'
            };
            utils.messageHandlers(config)
        },
        /**
         * 打开C2CS商品详情页
         * @param  {[type]} url [description]
         * @return {[type]}     [description]
         */
        openActivity:function (url) {
            //location.href ='openapp.paipai://pushToActivity/app?param={"key1":"'+url+'"}'
            var para = {
                method : 'pushToActivity',
                params:{
                    key1:url
                }
            };
            utils.messageHandlers(para)
        },
        /**
         * 跳转原c2c详情
         * @param  {[type]} goodsId C2C商品id
         * @return {[type]}         [description]
         */
        openC2CDetail:function (goodsId) {
            console.log(123)
            //location.href ='openapp.paipai://pushToC2CDetail/app?param={"key1":"'+goodsId+'"}'
            var para = {
                method : 'pushToC2CDetail',
                params :{
                    key1 : goodsId
                }
            };
            utils.messageHandlers(para)
        },
        /**
         * 一键转卖我的京东商品
         * @param  {[type]} goodsId 商品id
         * @return {[type]}         [description]
         */
        openReSale:function (dealId) {
            // location.href ='openapp.paipai://pushToResaleOrder/app?param={"key1":"'+dealId +'"}'
            var para = {
                method : 'pushToResaleOrder',
                params :{
                    key1 : dealId
                }
            };
            utils.messageHandlers(para)
        },
        /**
         * 打开原生商品编辑
         * @param  {[type]} dealId c2c商品id
         * @return {[type]}        [description]
         */
        openGoodsEdit:function (goodsId) {
            // location.href ='openapp.paipai://goodsEdit/app?param={"key1":"'+goodsId +'"}'
            var para = {
                method : 'goodsEdit',
                params : {
                    key1 : goodsId
                }
            }
            utils.messageHandlers(para)
        },
        /**
         * 打开环信聊天
         * @param  {[type]} chatid [description]
         * @return {[type]}        [description]
         */
        openhuanxinChat:function (chatid) {
            // location.href ='openapp.paipai://pushToHuanXinChat/app?param={"key1":"'+chatid +'"}'
            var para = {
                method : 'pushToHuanXinChat',
                params : {
                    key1 : chatid
                }
            };
            utils.messageHandlers(para)
        },
        /**
         * 打开聊天室
         * @param  {[type]} chatid [description]
         * @return {[type]}        [description]
         */
        openIMHome:function (chatid) {
            //location.href ='openapp.paipai://im/app?param={"key1":"'+chatid +'"}'
            var para = {
                method : 'im',
                params : {
                    key1 : chatid
                }
            };
            utils.messageHandlers(para)
        },
        /*
         * 查看大图协议
         * @param {[type]} imgurl [The path of the picture ]
         * @return {[type]}       [The path of the picture ]
         * */
        openBigImg:function (imgurl) {
            //location.href =' openapp.paipai://showBigPic/app?param={"key1":"'+imgurl +'"}'
            var para = {
                method : 'showBigPic',
                params : {
                    key1 : imgurl
                }
            };
            utils.messageHandlers(para)
        },
        /*
         * 关闭页面
         * @return {[type]} [description]
         * */
        closePage:function () {
            // location.href ='openapp.paipai://close/app'
            var config = {
                method : 'close'
            };
            utils.messageHandlers(config)
        },
        /**
         * 搜索结果
         * @param  {[type]} keyword 搜索关键词
         * @param  {[type]} type    12 二手优品， 13 备件库
         * @return {[type]}         [description]
         */
        openSearchResult:function (keyword,type) {
            // location.href ='openapp.paipai://showSearchPage/app?param={"searchKey":"'+keyword+'", "searchType":"'+type+'"}'
            var para = {
                method : 'showSearchPage',
                params : {
                    searchKey: keyword,
                    searchType : type
                }
            };
            utils.messageHandlers(para)
        },
        /*
         * 打开发布遮罩层
         * @return {[type]}   [description]
         * */
        openPublish:function () {
            //location.href ='openapp.paipai://publish/app'
            var config = {
                method : 'publish'
            };
            utils.messageHandlers(config)
        },
        /**
         * 打开商品详情页
         * @param  {[type]} id [description]
         * @return {[type]}    [description]
         */
        openB2CDetail:function (goodsId) {
            //location.href ='openapp.paipai://pushToB2CDetail/app?param={"key1":"'+goodsId+'"}';
            //return;
            if(goodsId){
                var para ={
                    method:'pushToB2CDetail',
                    params:{
                        key1:goodsId
                    }
                };
                utils.messageHandlers(para);
            }
        },
        /*
         * 分享
         * */
        share:function (shareUrl) {
            //location.href = 'openapp.paipai://share/app?param={"key1":"..."}'
            var para = {
                method : 'share',
                params : {

                }
            }
        },
        /*
         * 点击鹈鹕按钮遮罩层
         * */
        publishMask:function () {
            //location.href='openapp.paipai://publishMask/app'
            var config={
                method:'publishMask'
            };
            utils.messageHandlers(config)
        },

        poolPublish:function (poolId, source){
            //  location.href='openapp.paipai://poolPublish/app'
            var config = {
                method: 'poolPublish',
                params: {
                    poolId:poolId,
                    source:source
                }
            };
            utils.messageHandlers(config);
        }

    };
    /**
     * 回调协议
     * @type {Object}
     */
    var callBackProtocol = {
        /* openScan:function(){
         location.href ='openapp.paipai://scanQRCode/app';
         }*/
        /*
         * 扫描二维码
         * @type {Object}
         * */
        openScan :function () {
            var config = {
                method:'scanQRCode'
            };
            utils.messageHandlers(config)
        },

        /*
         * 登录
         * @ key1 {[Jump to the specified link address]}
         *  @type {Object} type 可传可不传
         * */
        login:function (type) {
            //location.href = 'openapp.paipai://showLoginViewController/app?param={"key1":"type"}' ;
            var para = {
                method : 'showLoginViewController',
                params : {
                    key1 :type
                }
            };
            utils.messageHandlers(para)
        },

        /*
         * 退出登录
         *
         * */
        logOut : function () {
            //location.href = 'openapp.paipai://logOut/app'
            var config = {
                method : 'logOut'
            };
            utils.messageHandlers(config)
        },
        /*
         * 获取本机信息
         * @type {Object}
         * */
        getPhoneInfo :function () {
            //window.location = 'openapp.paipai://getPhoneInfo/app',
            var config = {
                method : 'getPhoneInfo'
            };
            utils.messageHandlers(config)
        },

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
        setTitle: function (title) {
            /* if (title) {
             location.href = 'openapp.paipai://h5TitleEdit/app?param={"key1":"' + title + '"}';
             } else {
             throw new Error('title is empty')
             }
             */
            if (title) {
                var para = {
                    method: 'h5TitleEdit',
                    params: {
                        key1: title
                    }
                };
                utils.messageHandlers(para)
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
            };
            utils.messageHandlers(config);
        },
        /**
         * 设置跳转活动页面
         * @param  {obj} option 分享配置
         * @return {[type]}        [description]
         */
        setRigthInfo: function(options) {
            var defaultOpt ={
                method: "setAPPInfo",
                params:{
                    type: 4,
                    goUrl:'',
                    logoUrl:'',
                    contentTip:'',
                }
            };
            $.extend(defaultOpt.params, options);
            var opts={};
            $.extend(true,opts, defaultOpt);
            utils.messageHandlers(opts);
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
        },
        /*
         * 保存照片协议
         * @param {string} {[Save the picture address]}
         * */
        saveImage:function (imageUrl) {
            // location.href = 'openapp.paipai://saveImage/app?param={"key1":"imageUrl"}'
            var para = {
                method : 'saveImage',
                params : {
                    key1 : imageUrl
                }
            };
            utils.messageHandlers(para)
        },
        /*
         * 选择照片/上传照片
         * @param {string} {[Save the picture address]}
         * */
        pickImage : function (imageUrl) {
            // location.href = 'openapp.paipai://pickImage/app?param={"key1":"type"}'
            var para = {
                method : 'pickImage',
                params :{
                    key1 : imageUrl
                }
            };
            utils.messageHandlers(para)
        }

    };
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
