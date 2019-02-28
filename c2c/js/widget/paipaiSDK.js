/**
 *  paipaiSDK
 * 拍拍app 对外协议sdk，旨在对协议进行封装，页面无需对接协议，直接调用sdk中的方法就可以，
 * 协议分为三类，
 * 唤起协议，只唤起原生页面或者方法，app内或者浏览器都可以使用
 * 回调协议，调用原生方法或者原生功能，有执行回调
 * 设置协议，设置一些原生属性
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root['paipaiSDK'] = factory(); // 如果没有AMD/CMD和CommonJS就挂在全局对象下
    }
})(typeof window !== "undefined" ? window : this, function () {

    /**
     * 工具类
     * @type {Object}
     */
    var utils = {
        /**
         * 是否为拍拍app
         * @return {boolean} true/false
         */
        isPPAPP: function () {
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
        isJDAPP: function () {
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
        getDevicesType: function () {
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
        messageHandlers: function (params) {
            if (info.devicesType === 1) {
                params.params = JSON.stringify(params.params);
                window.android.ppAppMessageHandler(encodeURIComponent(JSON.stringify(params)));
            } else if (info.devicesType === 2) {
                window.webkit.messageHandlers.ppAppMessageHandler.postMessage(params);
            }
            // 前进或者后退时候也会重置
            document.body.addEventListener('onpageshow', function () {
                if (info.devicesType === 1) {
                    params.params = JSON.stringify(params.params);
                    window.android.ppAppMessageHandler(encodeURIComponent(JSON.stringify(params)));
                } else if (info.devicesType === 2) {
                    window.webkit.messageHandlers.ppAppMessageHandler.postMessage(params);
                }
            })
        },
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
        /**
         * app首页
         * @return {[type]} [description]
         */
        pushToHome: function () {
            //location.href = 'openapp.paipai://pushToHome/app';
            var config = {
                method: 'pushToHome'
            };
            utils.messageHandlers(config)
        },
        /*
         * 打开我的个人中心
         * */
        pushToProfileHome:function (uin) {
            /*  location.href = `openapp.paipai://pushToProfileHome/app?param=${encodeURIComponent(JSON.stringify({key1: uin}))}`*/
            var para = {
                method: 'pushToProfileHome',
                params: {
                    key1: uin
                }
            };
            utils.messageHandlers(para)
        },
        /**
         * 查看指定用户(uin)的个人主页(1)
         * @param  {[type]} userId [description]
         * @return {[type]}        [description]
         */
        getUserInfo: function (uin) {
            /* location.href =  `openapp.paipai://getUserInfo/app?param=${encodeURIComponent(JSON.stringify({uin: uin}))}`*/
            var para = {
                method: 'getUserInfo',
                params: {
                    uin: uin
                }
            };
            utils.messageHandlers(para)
        },

        /*
         *
         * 查看指定用户(uin)的个人主页(2)
         * */
        pushToOthersHome:function (uin) {
            /* location.href = `openapp.paipai://pushToOthersHome/app?param=${encodeURIComponent(JSON.stringify({key1: uin}))}`;*/
            var para = {
                method: 'pushToOthersHome',
                params: {
                    key1: uin
                }
            };
            utils.messageHandlers(para)
        },
        /*
         * 关闭当前页面
         * @return {[type]} [description]
         * */
        close: function () {
            // location.href ='openapp.paipai://close/app'
            var config = {
                method: 'close'
            };
            utils.messageHandlers(config)
        },

        /*
        *
        * 唤起我的订单title-bar点击事件
        * */
        /*
         * 唤起我的集市页
         * */
        myMarket:function () {
            //location.href = 'openapp.paipai://myMarket/app';
            var config = {
                method: 'myMarket'
            };
            utils.messageHandlers(config)
        },


        /*
         * 唤起我的集市首页
         * */
        marketHome:function () {
            //location.href = 'openapp.paipai://marketHome/app';
            var config = {
                method: 'marketHome'
            };
            utils.messageHandlers(config)
        },

        /*
         * 唤起创建集市
         * */
        marketCreate:function () {
            // location.href = 'openapp.paipai://marketCreate/app';
            var config = {
             method: 'marketCreate'
             };
             utils.messageHandlers(config)
        },
        /*
         *  唤起集市已邀请列表
         * */
        marketInviteList:function (marketId) {
            /*  location.href = `openapp.paipai://marketInviteList/app?param=${encodeURIComponent(JSON.stringify({
             id: marketId
             }))}`;*/
            var para = {
                method: 'marketInviteList',
                params: {
                    id: marketId
                }
            }
            utils.messageHandlers(para)
        },

        /*
         * 唤起集市详情
         * */
        marketDetail:function (markId,uin) {
            /*  location.href = `openapp.paipai://marketDetail/app?param=${encodeURIComponent(JSON.stringify({
             id: markId,
             uin
             }))}`*/
            var para = {
                method: 'marketDetail',
                params: {
                    id: markId,
                    uin:uin
                }
            }
            utils.messageHandlers(para)
        },

        /**
         * 打开C2C商品详情
         * @param  {[type]} goodsId C2C商品id
         * @return {[type]}         [description]
         */
        pushToC2CDetail: function (goodsId) {
            /* location.href = `openapp.paipai://pushToC2CDetail/app?param=${encodeURIComponent(JSON.stringify({key1: goodsId}))}`*/

            var para = {
                method: 'pushToC2CDetail',
                params: {
                    key1: goodsId
                }
            };
            utils.messageHandlers(para)
        },


        /**
         * 打开B2C商品详情
         * @param  {[type]} id [description]
         * @return {[type]}    [description]
         */
        pushToB2CDetail: function (goodsId,type) {
            //location.href = `openapp.paipai://pushToB2CDetail/app?param=${encodeURIComponent(JSON.stringify({key1: goodsId,type:type}))}`
            if (goodsId) {
                var para = {
                    method: 'pushToB2CDetail',
                    params: {
                        key1: goodsId,
                        type:type
                    }
                };
                utils.messageHandlers(para);
            }
        },

        /*
         * 打开C2C发布页面
         * */
        c2cPublish: function () {
            // location.href='openapp.paipai://c2cPublish/app'
            var config = {
                method: 'c2cPublish',
            };
            utils.messageHandlers(config);
        },


        /**
         * 打开编辑发布页面商品
         * @param  {[type]} dealId c2c商品id
         * @return {[type]}        [description]
         */
        goodsEdit: function (goodsId) {
            /*location.href = `openapp.paipai://goodsEdit/app?param=${encodeURIComponent(JSON.stringify({key1: goodsId}))}`*/
            var para = {
                method: 'goodsEdit',
                params: {
                    key1: goodsId
                }
            }
            utils.messageHandlers(para)
        },


        /**
         * 打开消息列表
         * @return {[type]} [description]
         */
        pushToMessageList: function () {
            //location.href = 'openapp.paipai://pushToMessageList/app'
            var config = {
                method: 'pushToMessageList'
            };
            utils.messageHandlers(config)
        },


        /**
         * 打开原生搜索
         * @param  {[type]} keyword [description]
         * @return {[type]}         [description]
         */
        pushToSearch: function (keyword) {
            /* location.href = `openapp.paipai://pushToSearch/app?param=${encodeURIComponent(JSON.stringify({key1: keyword}))}`*/
            var para = {
                method: 'pushToSearch',
                params: {
                    key1: keyword
                }
            };
            utils.messageHandlers(para)
        },

        /**
         * 搜索结果
         * @param  {[type]} keyword 搜索关键词
         * @param  {[type]} type    12 二手优品， 13 备件库
         * @return {[type]}         [description]
         */
        showSearchPage: function (keyword, type) {
            /* location.href =  `openapp.paipai://showSearchPage/app?param=${encodeURIComponent(JSON.stringify({searchKey: keyword,searchType:type}))}`*/
            var para = {
                method: 'showSearchPage',
                params: {
                    searchKey: keyword,
                    searchType: type
                }
            };
            utils.messageHandlers(para)
        },


        /**
         * 打开原生商品分类
         * @return {[type]} [description]
         */
        pushToGoodsClassify: function () {
            // location.href ='openapp.paipai://pushToGoodsClassify/app'
            var config = {
                method: 'pushToGoodsClassify'
            };
            utils.messageHandlers(config)
        },

        /*
         * 打开一键转卖列表页面
         * @return {[type]}   [description]
         * */
        publish: function () {
            //location.href ='openapp.paipai://publish/app'
            var config = {
                method: 'publish'
            };
            utils.messageHandlers(config)
        },


        /*
         * 点击鹈鹕按钮遮罩层
         * */
        publishMask: function () {
            //location.href='openapp.paipai://publishMask/app'
            var config = {
                method: 'publishMask'
            };
            utils.messageHandlers(config)
        },

        /*
         * 发布商品支持活动
         *
         * */
        pubWithAct:function (type,id) {
            //location.href = `openapp.paipai://pubWithAct/app?param=${encodeURIComponent(JSON.stringify({ type: ' ',id: ' ' }))}`
            var para = {
                method: 'pubWithAct',
                params: {
                    type: type,
                    id: id
                }
            }
            utils.messageHandlers(para)
        },

        /*
         * 唤起风控协议
         * @ return {[type]} [description]
         */
        fengkong: function () {
            const config = {
                method: 'fengkong',
                params: {
                    methodName:'setCommonParams'
                }
            };
           // location.href=`openapp.paipai://fengkong/app?param=${encodeURIComponent(JSON.stringify({methodName:'setCommonParams'}))}`
            utils.messageHandlers(config);
        },

        /**
         * 扫描二维码
         * @param callback
         */
        scanQRCodeOpenWebPage: function () {
            const config = {
                method: 'scanQRCodeOpenWebPage',
            };
            //location.href=`openapp.paipai://scanQRCodeOpenWebPage/app`
            utils.messageHandlers(config);
        },

        /**
         * 打开环信聊天
         * @param  {[type]} chatid [description]
         * @return {[type]}        [description]
         */
        pushToHuanXinChat: function (chatid) {
            /* location.href = `openapp.paipai://pushToHuanXinChat/app?param=${encodeURIComponent(JSON.stringify({key1: chatid}))}`*/
            var para = {
                method: 'pushToHuanXinChat',
                params: {
                    key1: chatid
                }
            };
            utils.messageHandlers(para)
        },

        /**
         * 打开im聊天室
         * @param  {[type]} chatid [description]
         * @return {[type]}        [description]
         */
        im: function (sku,uin) {
            /*location.href = `openapp.paipai://im/app?param=${encodeURIComponent(JSON.stringify({sku: sku,uin:uin}))}`*/
            var para = {
                method: 'im',
                params: {
                    sku: sku,
                    uin:uin
                }
            };
            utils.messageHandlers(para)
        },

        /*
         * 查看大图协议
         * @param {[type]} imgurl [The path of the picture ]
         * @return {[type]}       [The path of the picture ]
         * */
        showBigPic: function (imgUrl,index) {

             //location.href = "openapp.paipai://showBigPic/app?param="+encodeURIComponent(JSON.stringify(param));
            var para = {
                method: 'showBigPic',
                params: {
                    pics: imgUrl,
                    index:index
                }
            };
            utils.messageHandlers(para)
        },

        /*
         * 获取拍拍APP版本号
         * @type {Object}
         * */
        getPhoneInfo: function (callback) {
            var config = {
                method: 'getPhoneInfo'
            };
            var timer = null;
            callback({error:0});
            window.getIphoneType = function (msg) {
                clearTimeout(timer);
                callback(JSON.parse(decodeURIComponent(msg)));
            }
            //location.href = 'openapp.paipai://getPhoneInfo/app';
            utils.messageHandlers(config)
            // 定时器，若规定时间内原生未返回结果，则自己调用
            timer = window.setTimeout(function () {
                callback({error:1});
            }, 2000);
        },

        /*
         * 唤起店铺搜索
         * */
        showSearchList: function (options) {
            /* location.href = `openapp.paipai://showSearchList/app?param=${encodeURIComponent(JSON.stringify({shopId: markId, uin }))}`*/
            var defaultOpt = {
                method: 'showSearchList',
                params: {
                    shopId: '',
                    searchKey: '',
                    searchType: '',
                }
            };
            options = $.extend(defaultOpt.params, options);
            var opts = {};
            $.extend(true, opts, defaultOpt);
            utils.messageHandlers(opts);
        },

        /**
         * 发布商品到活动商品池
         * @param poolId
         * @param source
         */
        poolPublish: function (poolId, source) {
            //  location.href='openapp.paipai://poolPublish/app?param={"poolId":"122011"}'
            var config = {
                method: 'poolPublish',
                params: {
                    poolId: poolId,
                    source: source
                }
            };
            utils.messageHandlers(config);

        },
        /*
         * 登录
         * @ key1 {[Jump to the specified link address]}
         *  @type {Object} type 可传可不传
         * */
        showLoginViewController: function (imgUrl) {
            /* location.href = `openapp.paipai://showLoginViewController/app?param=${encodeURIComponent(JSON.stringify({key1:imgUrl}))}`*/
            var para = {
                method: 'showLoginViewController',
                params: {
                    key1: imgUrl
                }
            };
            utils.messageHandlers(para)
        },
        /*
         * 退出登录
         *
         * */
        logOut: function () {
            //location.href = 'openapp.paipai://logOut/app'
            var config = {
                method: 'logOut'
            };
            utils.messageHandlers(config)
        },

        /*
         * 打开定位
         * @return {[type]} [description]
         * */
        openLocation: function () {
            // location.href='openapp.paipai://openLocation/app';
            var config = {
                method: 'openLocation'
            };
            utils.messageHandlers(config)
        },

        /*
         * 唤起手机相册
         * @param {string} {[Save the picture address]}
         * */
        pickImage: function (type) {
            /*location.href = `openapp.paipai://pickImage/app?param=${encodeURIComponent(JSON.stringify({key1:type}))}`;*/
            var para = {
                method: 'pickImage',
                params: {
                    key1: type
                }
            };
            utils.messageHandlers(para)
        },
        /*
        *  唤起手机相册
        * */

        takePhotos:function (num,ishead) {
            //location.href = `openapp.paipai://takePhotos/app?param=${encodeURIComponent(JSON.stringify({num:num,ishead:ishead}))}`
            var para = {
                method: 'takePhotos',
                params: {
                    num: num,
                    ishead:ishead
                }
            };
            utils.messageHandlers(para)
        },




        /**
         * 跳转含有商品信息的发布页面
         * @param  {[type]} goodsId 商品id
         * @return {[type]}         [description]
         */
        pushToResaleOrder: function (goodsDetail) {
            // location.href ='openapp.paipai://pushToResaleOrder/app?param={"key1":"'+dealId +'"}'
            location.href= `openapp.paipai://pushToResaleOrder/app?param=${encodeURIComponent(JSON.stringify({key1:goodsDetail}))}`
            var para = {
                method: 'pushToResaleOrder',
                params: {
                    key1: goodsDetail
                }
            };
            utils.messageHandlers(para)
        },
        /**
         * 打开活动页
         * @param  {String} url 活动页地址
         */
        pushToActivity:function(imgUrl) {
            //location.href= `openapp.paipai://pushToActivity/app?param=${encodeURIComponent(JSON.stringify({key1:imgUrl}))}`
            const para = {
                method: 'pushToActivity',
                params: {
                    key1: imgUrl
                }
            };
          utils.messageHandlers(para);
        },

        /*
        * 唤起我的订单title-bar点击事件
        * */
        webViewNavigationBarClick:function(params) {
            const config = {
                method: 'webViewNavigationBarClick',
                params
            };

            utils.messageHandlers(config);

            // location.href = `openapp.paipai://webViewNavigationBarClick/app?param=${encodeURIComponent(JSON.stringify(params))}`;
        },

        callAlert:function (params) {
            const config = {
                method: 'webViewNavigationBarClick',
                params
            };

            utils.messageHandlers(config);
        },
        news:function (params) {
            const config = {
                method: 'news',
                params
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
         }*/
        /*
         * 扫描条形码
         * @type {Object}
         * */
        scanQRCode: function (callback) {
            window.scanQRCodeCallBack = function (num) {
                callback(num);
            };
            const config = {
                method: 'scanQRCode'
            };
            location.href =
                'openapp.paipai://scanQRCode/app?param=%7b%22methodName%22%3a%22scanQRCodeCallBack%22%7d';
           // location.href = 'openapp.paipai://scanQRCode/app?param=%7b%22methodName%22%3a%22scanQRCodeCallBack%22%7d';
            //location.href=`openapp.paipai://scanQRCode/app?param=${encodeURIComponent(JSON.stringify({methodName:'scanQRCodeCallBack'}))}`
            //utils.messageHandlers(config);
        },

        /*
         * 分享
         * */
        share: function (title,subTitle,imageUrl,shareUrl) {
            //location.href=`openapp.paipai://share/app?param=${encodeURIComponent(JSON.stringify({title:'title',subTitle:'subTitle',imageUrl:'imageUrl',shareUrl:'shareUrl'}))}`
            var para = {
                method: 'share',
                params: {
                    title:title,
                    subTitle:subTitle,
                    imageUrl:imageUrl,
                    shareUrl:shareUrl
                }
            }
            utils.messageHandlers(para);
        },

        /*
        * 权限校验协议
        * */
        permissionToCheck:function (type, callback) {
            console.log(type);
          //  location.href = `openapp.paipai://permissionToCheck/app?param=${encodeURIComponent(JSON.stringify({key:type}))}`;
            var para = {
                method: 'permissionToCheck',
                params: {
                    key: type
                }
            };
            window.permissionToCheckCallback = function (type, check) {
                callback(type, check);
            }
            utils.messageHandlers(para)
        }

    };
    /**
     * 设置协议
     * @type {Object}
     */
    var setProtocol = {
        /**
         * 设置跳转活动页面
         * @param  {obj} option 分享配置
         * @return {[type]}        [description]
         */
        setRigthInfo: function (options) {
            var defaultOpt = {
                method: "setAPPInfo",
                params: {
                    type: 4,
                    goUrl: '',
                    logoUrl: '',
                    contentTip: '',
                }
            };
            $.extend(defaultOpt.params, options);
            //todo 增加版本号判断 jiahuibin
            var opts = {};
            $.extend(true, opts, defaultOpt);
            utils.messageHandlers(opts);
        },


        /*
         * 保存照片协议
         * @param {string} {[Save the picture address]}
         * */
        saveImage: function (imgUrl) {
            //location.href = `openapp.paipai://saveImage/app?param=${encodeURIComponent(JSON.stringify({key1:imgUrl}))}`
            var para = {
                method: 'saveImage',
                params: {
                    key1: imgUrl
                }
            };
            utils.messageHandlers(para)
        },

        /**
         * 修改标题协议(待优化)
         * @param  {string} title 头部内容，不能为空
         * @return {[type]}       [description]
         */
        h5TitleEdit: function (title) {
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

        /*
         * h5修改昵称成功(待测试)
         * */
        changeNickname: function () {
            //location.href = 'openapp.paipai://changeNickname/app'

            var config = {
             method: 'changeNickname'
             };
             utils.messageHandlers(config)
        },

        /**
         * 设置顶部bar显示分享按钮
         * @param  {obj} option 分享配置
         * @return {[type]}        [description]
         */
        setTopBarShare: function (option) {
            var config = {
                method: "setAPPInfo",
                params: {
                    type: 1,
                    title: option.title || '',
                    subTitle: option.subTitle || '',
                    imageUrl: option.imageUrl || '',
                    shareUrl: option.shareUrl || ''
                }
            };
            utils.messageHandlers(config);
        },


        /*
        *  设置顶部bar显示分享按钮方法二
        * */
        setTopBarShare2: function(option) {
            const config = {
                method: 'setAPPInfo'
            };

            // shareType 0或不传：图文分享  1：切屏纯图分享  2：url链接纯图分享
            switch (option.shareType) {
                case 1:
                    config.params = Object.assign({}, {
                        type: 1,
                        shareType: 1
                    }, option);
                    break;
                case 2:
                    config.params = Object.assign({}, {
                        type: 1,
                        shareType: 2,
                        imageUrl: '' // 图片 必传
                    }, option);
                    break;
                default:
                    config.params = Object.assign({}, {
                        type: 1,
                        shareType: 0,
                        title: '', // 标题 必传
                        subTitle: '', // 描述 必传
                        imageUrl: '', // 图片 必传
                        shareUrl: '' // 分享链接 必传
                    }, option);
            }

            utils.messageHandlers(config);
        },


        /**
         * 设置顶部搜索按钮
         * @param  {obj} option 搜索类型，搜索关键字
         * @return {[type]}        [description]
         */
        setTopBarSearch: function (option) {
            var config = {
                method: "setAPPInfo",
                params: {
                    type: 2,
                    title: option.title || '',
                    searchType: option.searchType || 1,
                    key: option.key || ''
                }
            };
            utils.messageHandlers(config);
        },


        /*
        *  设置顶部bar显示搜索按钮（2）
        * */

        setTopBarSearch2:function(option) {
            const config = {
                method: 'setAPPInfo',
                params: {
                    type: 2,
                    searchType: option.searchType || 1, // 搜索类型 必传
                    key: option.key || '' // 关键词 必传
                }
            };

            utils.messageHandlers(config);
        },
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
