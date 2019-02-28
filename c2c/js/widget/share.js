define('share', ['jquery'], function ($) {
    'use strict';

    var share = {};
    var writeObj=function (obj) {
        var description = "";
        for (var i in obj) {
            var property = obj[i];
            description += i + " = " + property + "\n";
        }
        return description;
    };
    share.h5Share = function (config) {
        var browser = "";
        var doc = document;
        var check = function () {
            if (mqq.iOS || mqq.android) {
                return browser = "qq";
            }
            else {
                var ua = window.navigator.userAgent.toLowerCase();
                return ua.match(/micromessenger/i) == 'micromessenger' ? browser = "wechat" : "";
            }
        };

        //设定导航栏分享按钮文案
        var base = function () {
            if (browser == "qq") {
                window.setTimeout(function () {
                    mqq.ui.setOnShareHandler(function (type) {
                        hidesharetip();
                        var urlitem;
                        if (config.ptag) {
                            urlitem = addPtag(type == 0 ? config.ptag.q2q : (type == 1 ? config.ptag.q2z : (type == 2 ? config.ptag.q2w : config.ptag.q2t)));
                        } else {
                            urlitem = config.url;
                        }
                        mqq.ui.shareMessage({
                            'title': type == 0 ? config.qq_title : (type == 1 ? config.qzone_title : (type == 2 ? config.wechat_title : config.wechat_time_title)),
                            'desc': type == 0 ? config.qq_desc : (type == 1 ? config.qzone_desc : config.wechat_desc),
                            'share_type': type,
                            'share_url': urlitem,
                            'image_url': config.img,
                            'back': true,
                            'shareElement': 'news',
                            'flash_url': '',
                            'puin': '',
                            'appid': '',
                            'uinType': ''
                        }, function (e) {
                            //wxz 2014-12-28 12:57:04 增加回调事件处理
                            if (typeof(config.callback) == "function") {
                                config.callback(e);
                            }
                        });
                    })
                }, 500);
            } else if (browser == "wechat") {
                var sendMessage = function () {
                    WeixinJSBridge.on('menu:share:timeline', function (argv) {
                        wechatInvoke('shareTimeline');
                    });
                    WeixinJSBridge.on('menu:share:appmessage', function (argv) {
                        wechatInvoke('sendAppMessage');
                    });
                    WeixinJSBridge.on('menu:share:weibo', function (argv) {
                        wechatInvoke('shareWeibo');
                    });
                    WeixinJSBridge.on('menu:share:email', function (argv) {
                        wechatInvoke('sendEmail');
                    });
                };

                if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
                    sendMessage();
                } else {
                    if (doc.addEventListener) {
                        doc.addEventListener("WeixinJSBridgeReady", sendMessage, false);
                    } else if (doc.attachEvent) {
                        doc.attachEvent("WeixinJSBridgeReady", sendMessage);
                        doc.attachEvent("onWeixinJSBridgeReady", sendMessage);
                    }
                }
            } else {
                hideshare();
            }

        };

        var wechatInvoke = function (action) {
            hidesharetip();
            if (action == "shareWeibo") {
                WeixinJSBridge.invoke(action, {
                    "url": addPtag(config.ptag ? config.ptag.w2b : ""),
                    "content": config.wechat_title,
                    "type": "link"
                }, function (res) {
                    if (typeof(config.callback) == "function") {
                        config.callback(res);
                    }
                });
            } else if (action == "sendEmail") {
                WeixinJSBridge.invoke(action, {
                    "title": config.wechat_title,
                    "content": addPtag(config.ptag ? config.ptag.w2e : "")
                }, function (res) {
                    if (typeof(config.callback) == "function") {
                        config.callback(res);
                    }
                });
            } else if (action == "shareTimeline") {
                WeixinJSBridge.invoke(action, {
                    img_url: config.img,
                    img_width: "240",
                    img_height: "240",
                    link: addPtag(config.ptag ? config.ptag.w2t : ""),
                    desc: config.wechat_desc,
                    title: config.wechat_time_title
                }, function (res) {
                    if (typeof(config.callback) == "function") {
                        config.callback(res);
                    }
                });
            } else {
                WeixinJSBridge.invoke(action, {
                    img_url: config.img,
                    img_width: "240",
                    img_height: "240",
                    link: addPtag(config.ptag ? config.ptag.w2w : ""),
                    desc: config.wechat_desc,
                    title: config.wechat_title
                }, function (res) {
                    if (typeof(config.callback) == "function") {
                        config.callback(res);
                    }
                });
            }
        }

        var addPtag = function (pNum) {
            var itemUrl = config.url;
            if (pNum) {
                if (itemUrl.indexOf("?") != -1) {
                    itemUrl = itemUrl.split('?');
                    itemUrl = itemUrl.splice(0, 1) + "?ptag=" + pNum + "&" + itemUrl.join("&");
                } else if (itemUrl.indexOf("#") != -1) {
                    itemUrl = itemUrl.split('#');
                    itemUrl = itemUrl.splice(0, 1) + "?ptag=" + pNum + "#" + itemUrl.join("#");
                } else {
                    itemUrl += "?ptag=" + pNum;
                }
            }
            return itemUrl;
        }

        var hidesharetip = function () {
            var obj = doc.getElementById("shareTipBox");
            if (obj) {
                obj.style.display = "none";
            }
        };

        var hideshare = function () {
            var obj = doc.getElementById("shareBox");
            if (obj) {
                obj.style.display = "none";
            }
        };

        var formatData = function () {
            config.qq_title = config.qq_title || config.title;
            config.qzone_title = config.qzone_title || config.qq_title;
            config.wechat_title = config.wechat_title || config.title;
            config.wechat_time_title = config.wechat_time_title || config.wechat_title;
        };

        var init = function () {
            formatData();
            var _doc = doc.getElementsByTagName('head')[0];
            var script = doc.createElement('script');
            script.setAttribute('type', 'text/javascript');
            script.setAttribute('src', './js/components/qqapi.custom.js?_bid=152');
            _doc.appendChild(script);
            script.onload = script.onreadystatechange = function () {
                if (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') {
                    check();
                    base();
                }
                else {
                    hideshare();
                }
                script.onload = script.onreadystatechange = null;
            }
        }();
    };
    share.shareInfo = {
        "url": "https://paipai.m.jd.com/c2c/personalSet.html",
        "title": "标题",
        "qzone_title": "标题",
        "wechat_title": "标题",
        "wechat_time_title": "描述",
        "wechat_desc": "描述",
        "qq_desc": "描述",
        "qzone_desc": "描述",
        "img": "https://img30.360buyimg.com/da/jfs/t2851/78/1028174550/2857/76f4df1e/572ffa71Nda9f8644.png",
        "isCallBack": "Y",//京东分享兼容
        "callback": function (e) {//分享回调
            var retstr = writeObj(e);
            if (retstr.indexOf('ok') == -1 && retstr.indexOf('0') == -1 && retstr.indexOf('confirm') == -1) {
                return;
            }
        }
    };
    share.jdShare = function () {
        if (navigator.userAgent.toLowerCase().indexOf("jdapp") > -1) {
            /*只在京东APP内的WebActivity打开M页才有效 E*/
            if (navigator.userAgent.toLowerCase().indexOf("iphone") > -1) {
                location.href = "openapp.jdmobile://communication?params={\"action\":\"syncShareData\",\
                    \"title\":\"" + share.shareInfo.title + "\",\
                    \"content\":\"" + share.shareInfo.qq_desc + "\",\
                    \"shareUrl\":\"" + share.shareInfo.url + "\",\
                    \"iconUrl\":\"" + share.shareInfo.img + "\"}";
            } else {
                shareHelper.setShareInfoCallback(
                    share.shareInfo.title,//分享标题
                    share.shareInfo.qq_desc,//分享描述
                    share.shareInfo.url, //分享的url
                    share.shareInfo.img,//分享的图片url
                    share.shareInfo.isCallBack //是否需要回调
                );
            }
            /*只在京东APP内的WebActivity打开M页才有效 E*/

            window.jdappShareRes = function (result) {
                share.shareInfo.callback(result);
                /**
                 * 返回结果：
                 * obj.shareResult：0，成功；1：失败；2，取消；
                 * obj.shareChannel：weixin：微信好友和微信朋友圈；qq：QQ好友；qzone：QQ空间；weibo：新浪微博；
                 */
            }
        }

    };
    share.init = function (option, type) {
        //todo 二手app 禁用分享
        share.shareInfo = $.extend(share.shareInfo, option);
        var ua = navigator.userAgent.toLowerCase();
        if(ua.match(/jdappershou/))
        {
            return;
        }
        // end

        if (type == "jd") {
            setTimeout(share.jdShare(), 300);
        } else {
            setTimeout(share.h5Share(share.shareInfo), 300);//todo 待优化
        }
    }

    return share;
});