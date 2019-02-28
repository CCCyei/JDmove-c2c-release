/*工具类*/
define('utils', ['jquery', 'fastclick'], function ($, $fastclick) {
    var utils = {
        isDebug: false,// debug 开关
        //判断参数是否为null
        // loginUrl: "//plogin.m.jd.com/user/login.action?appid=177&a4login=false",
        loginUrl: "//plogin.m.jd.com/user/login.action?appid=177",
        isEmpty: function (text) {
            if (typeof text == "object") {//判断是否为空对象
                for (var x in text) {
                    return false;
                }
                return true;
            } else {
                if (text == null || text == undefined || text == "undefined" || text == "" || text == "null") {
                    return true;
                } else {
                    return false;
                }
            }
        },
        //增加全局init 方法
        initAll: function (callBack, show) {
            //todo 添加一些常用的全局初始化信息
            $fastclick.attach(document.body);//ios 点击事件处理
            //公共头处理
            $(".ui-head").hide();
            // ($utils.getLoginCodeType() == 'wx') && (window.__wxjs_environment !== 'miniprogram')

        },
        /*Toast提示*/
        lightToast: function (text) {
            $('.toast-light').remove();
            var $div = $('<div class="toast-light">' + text + '</div>');
            $('body').append($div);
            if (!$div.hasClass('show')) {
                setTimeout(function () {
                    $div.addClass('show');
                }, 0);
                setTimeout(function () {
                    $('.toast-light').remove();
                    // $div.removeClass('show')
                }, 2000);
            }


        },
        //唤起APP的某个页面scheme是唤起的协议
        openApp: function (scheme) {
            var ua = navigator.userAgent.toLowerCase();
            var t;
            var config = {
                state: function () {
                    return {
                        scheme_IOS: scheme,
                        scheme_Adr: scheme
                    }
                },
                timeout: 1000
            };

            function openclient() {
                var startTime = Date.now();

                var ifr = document.createElement('iframe');

                ifr.src = ua.indexOf('os') > 0 ? config.state().scheme_IOS : config.state().scheme_Adr;
                ifr.style.display = 'none';
                document.body.appendChild(ifr);
                var t = setTimeout(function () {
                    var endTime = Date.now();

                    if (!startTime || endTime - startTime < config.timeout + 200) {
                        window.location = ua.indexOf('os') > 0 ? 'appDown.html' : 'appDown.html';
                    } else {
                        //window.location = ua.indexOf('os') > 0 ? 'https://fir.im/4cv6' : 'http://storage.jd.com/paipaiapk/app-armeabi-v7a-release.apk';
                    }
                }, config.timeout);

                window.onblur = function () {
                    clearTimeout(t);
                };
                document.addEventListener("visibilitychange", function () {
                    clearTimeout(t);
                });
            }

            openclient()

        },
        /*加载等待*/
        addLoading: function () {
            $('.loading').remove();
            var $div = $('<div class="loading"><div class="loading-shade"></div><div class="loading-panel"></div></div>');
            $(document.body).append($div);
            utils.forbidScroll(true);
        },
        /*取消加载等待*/
        removeLoading: function () {
            $('.loading').remove();
            utils.forbidScroll(false);
        },
        /*禁止屏幕滚动*/
        forbidScroll: function () {
            var forbid = false;
            if (!forbid) {
                $('body').css('overflow', 'auto');
                $(document).off('touchmove.noScroll');
            } else {
                $('body').css('overflow', 'hidden');
                $(document).on('touchmove.noScroll', function (e) {
                    e.preventDefault();
                });
            }
        },
        checkLogin: function () {
            var req = {
                url: utils.getHost() + "/login/verify",
                checkLogin: false,
            };
            utils.load(req).then(function (response) {
                if (response.code == 0 && utils.isNotEmpty(response.data)) {
                    utils.setHeadFoot(response.data);
                } else {
                    utils.setHeadFoot();
                }
            }, function () {
                utils.setHeadFoot();
            });
        },
        setHeadFoot: function (pin) {
            if (this.getLoginCodeType() == 'app') {
                return;
            }
            var sid = utils.getCookie('sid') || '';
            var pin = utils.getCookie('pin') || pin || '';
            var mchb = new MCommonHeaderBottom();
            var title = $('body').attr('title') || document.title;
            var downloadAppPlugIn = {
                sourceType: '2',
                sourceValue: '1',
                parameters: null,
                otherApp: {
                    DOWN_IPAD: 'https://itunes.apple.com/cn/app/jing-dong-du-shu/id506583396?mt=8',
                    DOWN_APP_IOS: 'https://itunes.apple.com/cn/app/jing-dong-du-shu/id506583396?mt=8',
                    DOWN_APP_URL: 'http://item.m.jd.com/download/downApp.html',
                    INTENT_URL: 'openapp.jdebook://communication?params={\'type\':\'1\'}'
                }
            };
            //公共头
            var headerArg = {
                hrederId: 'm_common_header',
                title: title,
                sid: sid,
                isShowShortCutButton: true,
                isShowShortCut: false,
                onClickGoback: function () {
                    history.go(-1)
                },
            }
            if (this.getLoginCodeType() != 'wx') {
                mchb.header(headerArg);
            }
            //公共底
            var toPcSkipurl = '//gingyi.m.jd.com';
            var returnurl = encodeURIComponent(location.href);
            var footerPlatforms0 = mchb.platformEnum(toPcSkipurl, sid).enum0;// 0个
            var bottomArg = {
                bottomId: 'm_common_bottom0',
                sid: sid,
                pin: pin,
                footerPlatforms: footerPlatforms0,
                downloadAppPlugIn: downloadAppPlugIn,
                returnurl: returnurl
            };
            mchb.bottom(bottomArg);
            //下载浮层
            // var tipArg = {tipId : 'm_common_tip',
            //     sid : sid,
            //     isfloat: true,
            //     copyWrite:'自己自定义的文案<br>返卷100哦！',
            //     onClickTrynow: function(){},
            //     onClickTipX: function(){alert("自定义点击事件,并默认执行关闭app事件")},
            //     };
            // mchb.jdTip(tipArg);
        },
        /*获取请求域名*/
        getHost: function (type) {
            var buildType = false;

            var str;
            // if (window.location.host == 'gm.m.paipai.com') {
            //     buildType = true;
            // }
            if (utils.isNotEmpty(type)) {
                switch (type) {
                    case 1:
                        if (buildType) {
                            str = "//dealgwgm.paipai.com";
                        } else {
                            str = "//dealgw.jd.com";
                            // str = "//dealgw.paipai.com";
                        }
                        break;
                    case 2:
                        //配置图片域名
                        str = "http://192.168.150.54/test/";
                        break;

                    case 3:
                        // 商品新域名
                        // str = "//pp-product-ershou.jd.com";
                        str = "//bizgw.jd.com";
                        break;
                    case 4:
                        // 订单新域名
                        // str = "//pp-order-ershou.jd.com";
                        str = "//dealgw.jd.com";
                        break;
                    default:
                        // str = "//lucy.jd.com";
                        if (buildType) {
                            str = "//bizgwgm.paipai.com";
                        } else {
                            str = "//bizgw.jd.com";
                            // str = "//bizgw.paipai.com";
                        }
                }
            } else {
                // str = "//lucy.jd.com";
                if (buildType) {
                    str = "//bizgwgm.paipai.com";
                } else {
                    str = "//bizgw.jd.com";
                    // str = "//bizgw.paipai.com";
                }
            }
            return str;
        },
        //判断参数不为null
        isNotEmpty: function (text) {
            return !this.isEmpty(text);
        },
        getJdPin: function (name) {
            reg = new RegExp("(^| )" + name + "(?:=([^;]*))?(;|$)")
            val = document.cookie.match(reg);
            return val ? (val[2] ? this.decodeUTF8((val[2])) : "") : null;
        },
        getCookie: function (name) {
            reg = new RegExp("(^| )" + name + "(?:=([^;]*))?(;|$)")
            val = document.cookie.match(reg);
            return val ? (val[2] ? unescape((val[2])) : "") : null;
        },
        setCookie: function (name, value, expires, path, domain, secure) {
            var exp = new Date(), expires = arguments[2] || null, path = arguments[3] || "/",
                domain = arguments[4] || null, secure = arguments[5] || false;
            expires ? exp.setMinutes(exp.getMinutes() + parseInt(expires)) : "";
            document.cookie = name + '=' + escape(value) + (expires ? ';expires=' + exp.toGMTString() : '') + (path ? ';path=' + path : '') + (domain ? ';domain=' + domain : '') + (secure ? ';secure' : '');
        },
        delCookie: function (name) {
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval = this.getCookie(name);
            if (cval != null)
                document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
        },
        setDoubleClick: function (callBack) {
            var that = this;
            var nowTime = new Date().getTime();
            var clickTime = that.isNotEmpty(that.getCookie("firstTime")) ? that.getCookie("firstTime") : 0;
            if ((nowTime - clickTime) > 3000) {
                that.setCookie("firstTime", nowTime);
                if (that.isNotEmpty(callBack)) {
                    callBack();
                }
            }
        },
        //支持汉字的没乱码
        getParameter: function (name, str) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
            var results
            if (this.isEmpty(str)) {
                results = regex.exec(location.search);
            } else {
                results = regex.exec(str);
            }
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        },
        getUrlParam: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                r = decodeURIComponent(unescape(r[2]));
                return this.stripscript(r);
            } else {
                return null;
            }
        },
        getLoctionUrlParam: function (locaUrl, name) {
            if (locaUrl.indexOf('?') != -1) {
                locaUrl = locaUrl.replace(/(\?)/, '&')
            }
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = locaUrl.substr(1).match(reg);
            if (r != null) {
                r = decodeURIComponent(unescape(r[2]));
                return this.stripscript(r);
            } else {
                return null;
            }
        },
        setUrlParam: function (location, name, value) {
            var url = location;
            var splitIndex = url.indexOf("?") + 1;
            var paramStr = url.substr(splitIndex, url.length);
            var newUrl = url.substr(0, splitIndex);
            // - if exist , replace
            var arr = paramStr.split('&');
            for (var i = 0; i < arr.length; i++) {
                var kv = arr[i].split('=');
                if (kv[0] == name) {
                    newUrl += kv[0] + "=" + value;
                } else {
                    if (kv[1] != undefined) {
                        newUrl += kv[0] + "=" + kv[1];
                    }
                }
                if (i != arr.length - 1) {
                    newUrl += "&";
                }
            }

            // - if new, add
            if (newUrl.indexOf(name) < 0) {
                newUrl += splitIndex == 0 ? "?" + name + "=" + value : "&" + name + "=" + value;
            }
            return newUrl;
        },
        stripscript: function (s) {
            var pattern = new RegExp("[`~!@#$^&*()=|{}';',\\[\\].<>/?~！@#￥……&*（）—|{}【】‘；：”“'。，、？]");
            var rs = "";
            for (var i = 0; i < s.length; i++) {
                rs = rs + s.substr(i, 1).replace(pattern, '');
            }
            return rs;
        },

        createScript: function (src) {
            var varScript = document.createElement("script");
            if (src != "") {
                varScript.src = src;
            }
            varScript.language = "javascript";
            varScript.type = "text/javascript";
            document.body.appendChild(varScript);
        },
        para: {
            last: 0
        },
        scrollLoad: function (options) {
            var defaults = {
                scrollTop: (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop,
                scrollHeight: (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight,
                loadData: function () {
                },
                last: 0
            };
            options = $.extend(defaults, options);
            if ((options.scrollTop + window.innerHeight + 150) >= options.scrollHeight) {
                if (utils.para.last != options.scrollHeight && utils.loadtime <= 0) {
                    options.loadData();
                    utils.para.last = options.scrollHeight;
                }
            }
        },
        //去登录
        goLogin: function (goUrl) {
            if (utils.isNotEmpty(goUrl)) {
                window.location.href = utils.loginUrl + "&returnurl=" + encodeURIComponent(goUrl);
            } else {
                window.location.href = utils.loginUrl + "&returnurl=" + encodeURIComponent(location.href);
            }
        },
        //请求次数
        loadtime: 0,
        //网络加载数据封装
        load: function (options) {
            _this = this;
            //定义默认值
            this.defaultOpt = {
                type: 'GET',
                url: "",//必传
                timeout: 5000,//超时时间
                dataType: 'jsonp',
                data: {},//key-value,
                checkLogin: true,
                // jsonpCallback:Math.random(),//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
            };
            var opt = {};    //如果不声明新变量，以后设置会互相污染
            opt = $.extend(opt, this.defaultOpt, options);
            opt.data.optSource = this.getType();
            opt.data.machineKey = 'test';
            var comonParam = _this.addComonParam();
            if (_this.isNotEmpty(comonParam)) {
                opt.data = $.extend({}, opt.data, comonParam);
            }
            utils.loadtime += 1;
            $('.ui-loading').show();
            if (opt.type == 'POST') {
                opt.dataType = 'json',
                    opt.xhrFields = {withCredentials: true},
                    opt.data.machineKey = 'test';
                opt.data.protocol = location.protocol.indexOf('https') > -1 ? 2 : 1;
            }
            var a = $.ajax(opt), d = $.Deferred();
            a.then(function (response) {
                utils.loadtime -= 1;
                if (utils.loadtime <= 0) {
                    $('.ui-loading').hide();
                }
                //
                var ptkey = utils.getCookie('pwdt_id');
                // ppLogin 0 未登录过 1 登录成功了
                if (utils.isNotEmpty(ptkey)) {
                    utils.setCookie('ppLogin', '1')
                }
                // 777 未登陆
                if (response && response.code == 777) {
                    if (opt.checkLogin) {
                        if (_this.getType() != 3) {
                            // 先退出，后刷新 设置cookie 增加标识
                            if (_this.getType() == 2) { // ios
                                var ppLogin = utils.getCookie('ppLogin');
                                if (utils.isNotEmpty(ppLogin)) { // 登录成功的时候还返回777，需要重新登录
                                    if (ppLogin == '1') {
                                        location.href = "openapp.paipai://logOut/app";
                                    } else {
                                        utils.setCookie('ppLogin', '0')
                                        window.location.href = "openapp.paipai://showLoginViewController/app?param=" + encodeURIComponent(JSON.stringify({"key1": location.href}));
                                    }
                                } else {
                                    utils.setCookie('ppLogin', '0')
                                    window.location.href = "openapp.paipai://showLoginViewController/app?param=" + encodeURIComponent(JSON.stringify({"key1": location.href}));
                                }
                            } else {// android
                                window.location.href = "openapp.paipai://showLoginViewController/app?param=" + encodeURIComponent(JSON.stringify({"key1": location.href}));
                            }
                        } else {
                            window.location.href = utils.loginUrl + "&returnurl=" + encodeURIComponent(location.href);
                        }
                    } else {
                        d.resolve(response);
                    }
                } else {
                    d.resolve(response);
                }
            }, function (a, b, c) {
                d.reject(a, b, c);
            });
            a.fail(function () {
                utils.loadtime -= 1;
                if (utils.loadtime <= 0) {
                    $('.ui-loading').hide();
                }
                d.reject('[Request Failed]');
            });
            return d.promise();
        },

        //获得设备类型 1：安卓 ; 2：IOS
        getDevicesType: function () {
            var devicesType = 0;
            var u = navigator.userAgent, app = navigator.appVersion;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if (isAndroid) {
                devicesType = 1;
            } else if (isiOS) {
                devicesType = 2;
            }
            return devicesType;
        },

        //获取移动端场景类型，判断是否微信、手Q、浏览器   wx：微信；qq：手Q；其他：浏览器
        getLoginCodeType: function () {
            var loginCodeType = '';
            const ua = navigator.userAgent.toLowerCase();
            var isWX = window.WeixinJSBridge;
            var isMQQ = false;
            var isJDApp = false;
            var isPaipaiApp = false;

            if (!isWX) {
                isWX = !!ua.match(/micromessenger/);
            }
            if (/qq\/([\d\.]+)*/.test(ua)) {
                isMQQ = true;
            }
            if (ua.indexOf('jdapp') > -1) {
                isJDApp = true;
            }
            if (ua.indexOf('jdappershou') > -1) {
                isJDApp = false;
                isPaipaiApp = true;
            }
            if (isWX) {
                loginCodeType = 'wx';
            } else if (isMQQ) {
                loginCodeType = 'qq';
            } else if (isJDApp) {
                loginCodeType = 'app';
            } else if (isPaipaiApp) {
                loginCodeType = 'paipaiApp';
            }
            return loginCodeType;
        },
        // 返回值 apple 苹果客户端 ,android android 客户端 ,m 其他
        getTypeWord: function () {
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/jdappershou_ios/) && ua.match(/iphone/)) {
                return '2';
            } else if (ua.match(/jdappershou_android/) && ua.match(/android/)) {
                return '1'
            } else {
                return '3';
            }

        },
        // 返回值 3: H5、1: Android、2: IOS
        getType: function () {
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/jdappershou_ios/)) {
                return 2;
            } else if (ua.match(/jdappershou_android/) && ua.match(/android/)) {
                return 1;
            } else {
                return 3;
            }

        },

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
        //定位 未使用
        setLocation: function (callback) {
            var _this = this;
            if (this.isNotEmpty(BMap)) {
                var geolocation = new BMap.Geolocation();
                geolocation.getCurrentPosition(function (r) {
                    if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                        _this.setCookie("lat", r.point.lat);
                        _this.setCookie("lon", r.point.lng);
                        _this.setCookie("city_id", r.address.city_code == 0 ? '' : r.address.city_code);
                        _this.setCookie("city_name", r.address.city);
                        _this.setCookie("province", r.address.province);
                        _this.setCookie("districe", r.address.districe); //区域
                        _this.setCookie("street", r.address.street); //街道
                    } else {
                        _this.setCookie("city_name", "北京市");
                        _this.setCookie("city_id", "1");
                    }
                }, {enableHighAccuracy: true})
                if (_this.isNotEmpty(callback)) {
                    callback();
                }
            } else {
                if (_this.isNotEmpty(callback)) {
                    callback();
                }
            }

        },

        //定位 使用中
        getLocationInfo: function (successcallback, faildcallback) {
            // alert("调用登录");
            if (utils.isEmpty(successcallback)) {
                successcallback = function () {
                };
            }
            if (utils.isEmpty(faildcallback)) {
                faildcallback = function () {
                };
            }
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition, showError, {
                    maximumAge: 60000,
                    timeout: 50000,
                    enableHighAccuracy: true
                });
            } else {
                faildcallback(-1, 'geolocation', 'Geolocation is not supported by this browser.');
            }

            function showPosition(position) {
                //坐标转换完之后的回调函数
                translateCallback = function (data) {
                    if (data.status === 0) {
                        // alert("定位成功了"+JSON.stringify(data));
                        utils.setCookie("lat", !data.points[0].lat ? "" : data.points[0].lat);
                        utils.setCookie("lon", !data.points[0].lng ? "" : data.points[0].lng);
                        return true;
                    }
                }

                var ggPoint = new BMap.Point(!position.coords.longitude ? "" : position.coords.longitude, !position.coords.latitude ? "" : position.coords.latitude);
                var convertor = new BMap.Convertor();
                var pointArr = [];
                pointArr.push(ggPoint);
                convertor.translate(pointArr, 1, 5, translateCallback);//这个类就是转换的对象
            }

            function showError(error) {
                // alert("error");
                //定位失败默认定位北京
                if (utils.isEmpty(utils.getCookie('city_name')) || utils.isEmpty(utils.getCookie('city_id'))) {
                    utils.setCookie("city_name", "北京市");
                    utils.setCookie("city_id", "1");
                }
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        faildcallback(error.code, 'getCurrentPosition', 'User denied the request for Geolocation.');
                        break;
                    case error.POSITION_UNAVAILABLE:
                        faildcallback(error.code, 'getCurrentPosition', 'Location information is unavailable.');
                        break;
                    case error.TIMEOUT:
                        faildcallback(error.code, 'getCurrentPosition', 'The request to get user location timed out.');
                        break;
                    case error.UNKNOWN_ERROR:
                        faildcallback(error.code, 'getCurrentPosition', 'An unknown error occurred.');
                        break;
                }

                return false;
            }
        },


        /**
         * 时间戳转日期 返回格式yyyy-MM-dd hh:mm:ss
         * @timestamp 时间戳 单位毫秒
         */
        formatDate: function (timestamp) {
            var _date = new Date(timestamp);
            var year = _date.getFullYear();
            var month = _date.getMonth() + 1;
            var date = _date.getDate();
            var hour = _date.getHours();
            var minute = _date.getMinutes();
            var second = _date.getSeconds();
            month = month < 10 ? ('0' + month) : month;
            date = date < 10 ? ('0' + date) : date;
            hour = hour < 10 ? ('0' + hour) : hour;
            minute = minute < 10 ? ('0' + minute) : minute;
            second = second < 10 ? ('0' + second) : second;
            return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
        },

        /**
         * 日期转时间戳 返回毫秒数
         * @date 格式yyyy-MM-dd hh:mm:ss
         */
        getTimestamp: function (date) {
            re = /(\d{4})(?:-(\d{1,2})(?:-(\d{1,2}))?)?(?:\s+(\d{1,2}):(\d{1,2}):(\d{1,2}))?/.exec(date);
            return new Date(re[1], (re[2] || 1) - 1, re[3] || 1, re[4] || 0, re[5] || 0, re[6] || 0).getTime();
        },

        //获取当前时间
        getNowTime: function () {
            var currentDate = new Date($.ajax({
                async: false,
                type: "get",
                url: window.location.href + "?random=" + Math.random()
            }).getResponseHeader("Date"));
            var nd = currentDate.getTime();
            return nd;
        },

        countDateFormat: function (timestamp, format, isSecond) {
            if (timestamp < 0) return '已过期';
            //初始化格式字符串
            format = 'undefined' === typeof format || format.constructor !== String ? '#H#小时#i#分#s#秒' : format;
            if ('undefined' === typeof isSecond || isSecond === false) {
                timestamp = parseInt(timestamp / 1000);
            }
            var days = 0, hours = 0, minutes = 0, seconds = 0;
            //js执行替换
            if (format.indexOf('#D#') > -1) {
                days = parseInt(timestamp / 86400);
                format = format.replace(/#D#/, days);
            }
            if (format.indexOf('#H#') > -1) {
                hours = parseInt((timestamp - days * 86400) / 3600);
                format = format.replace(/#H#/, hours);
            }
            if (format.indexOf('#i#') > -1) {
                minutes = parseInt((timestamp - days * 86400 - hours * 3600) / 60);
                format = format.replace(/#i#/, minutes);
            }
            seconds = timestamp - days * 86400 - hours * 3600 - minutes * 60;
            format = format.replace(/#s#/, parseInt(seconds));
            return format;
        },
        /**
         * 校验手机号格式是否正确
         * @mobile 手机号
         */
        checkoutMobileReg: function (mobile) {
            var isMobile = true;
            var mobileReg = /^(((1[34578]{1}[0-9]{1}))+\d{8})$/;
            if (!mobileReg.test(mobile)) {
                isMobile = false;
            }
            return isMobile;
        },
        //判断主站APP和拍拍APP
        getAppType: function () {
            var result = "H5";
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/jdappershou_ios/) && ua.match(/iphone/) || ua.match(/jdappershou_android/) && ua.match(/android/)) {
                result = "ershou";
            } else if (ua.match(/jdapp/) && ua.match(/iphone/) || ua.match(/jdapp/) && ua.match(/android/)) {
                result = "jd";
            }
            return result;
        },
        /* 追加公参*/
        addComonParam: function () {
            var result = {};
            var ua = navigator.userAgent.toLowerCase();
            var isH5ForJD = this.isEmpty(this.getParameter("ism")) ? false : true;
            if (ua.match(/jdappershou_ios/) || ua.match(/jdappershou_android/)) {
                var version = ua.split(";")[0];
                var _version = version.split(".");
                if (_version.length == 3 && _version.length >= 3) {
                    result.clientVersion = version
                }
            } else if (ua.match(/jdapp/ || isH5ForJD)) {
                result.entrance = 'jd'
            }
            // if(this.getLoginCodeType() =='wx' && window.__wxjs_environment !== 'miniprogram'){
            //     result.mpSource='5'
            // }
            return result;
        },
        /*获取app v 需要支持的版本号*/
        getAppVersion: function (v) {
            var result = false;
            var ua = navigator.userAgent.toLowerCase();
            // ua='1222';
            if (ua.match(/jdappershou_ios/) || ua.match(/jdappershou_android/)) {
                var version = ua.split(";")[0];
                if (version == v) {
                    result = false;
                } else {
                    var _version = version.split(".");
                    var _v = v.split(".");
                    if (_v.length == 3 && _version.length >= 3) {
                        for (var i = 0; i < 3; i++) {
                            if (parseInt(_version[i]) > parseInt(_v[i])) {
                                result = true;
                                break;
                            }
                        }
                    }
                }
            }
            return result;
        },
        /**
         * 判断是否是京东登录
         */
        getLoginTypeForJD: function () {
            var str = "h5";
            var ua = navigator.userAgent.toLowerCase();
            var u = navigator.userAgent;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if (ua.match(/jdapp/) || ua.match(/jdapp/)) {
                if (isAndroid) {
                    str = "Android";
                } else if (isiOS) {
                    str = "IOS";
                }
            } else {
                str = "h5";
            }
            return str;
        },
        /**
         * 获取登录设置类型 和app 联调时可以参照
         */
        getLoginType: function () {
            var str;
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/jdapp/) && ua.match(/android/)) {
                str = "Android";
            } else if (ua.match(/jdapp/) && ua.match(/apple/)) {
                str = "IOS";
            } else {
                str = "h5";
            }
            return str;
        },
        encodeUTF8: function (str) {
            var temp = "", rs = "";
            for (var i = 0, len = str.length; i < len; i++) {
                temp = str.charCodeAt(i).toString(16);
                rs += "\\u" + new Array(5 - temp.length).join("0") + temp;
            }
            return rs;
        },
        decodeUTF8: function (str) {
            return str.replace(/(\\u)(\w{4}|\w{2})/gi, function ($0, $1, $2) {
                return String.fromCharCode(parseInt($2, 16));
            });
        },

        /**
         * 判断是否在h5打开
         */
        getIsH5: function () {
            var str = utils.getLoginType();
            if (str == "IOS" || str == "Android") {
                return false;
            } else {
                return true;
            }
        },
        back: function () {
            history.go(-1);
        },
        setHead: function (title) {
            /*主app打开无法更改head*/
            if (utils.getLoginType() != "h5" && utils.getDevicesType() != 2) {
                $("title").html(title);
            }
        },
        //上拉刷新
        loadingUp: function (f) {
            $(window).scroll(function () {
                var scrollTop = $(this).scrollTop();
                var scrollHeight = $(document).height();
                var windowHeight = $(this).height();

                //滚动到底&&没有联网&&不是全部
                if (scrollHeight <= (scrollTop + windowHeight)) {
                    //f();
                    $(".loading_up").show();
                }
            });
        },

        /*下拉刷新 S*/
        slideDownStep1: function (dist) {
            dist = dist < -300 ? -300 : dist;
            $(".mod_loading2").css({"margin-top": (-dist) - 0 + "px"});//浮动下来,因为在屏幕外-17px开始的，所以要减17，才会看到从屏幕外出来
            $(".mod_loading2_in").css({
                "transform": "rotate(" + -4 * dist + "deg)",
                "-webkit-transform": "rotate(" + -4 * dist + "deg)"
            });//控制旋转
        },

        //第二步：下拉，然后松开，
        slideDownStep2: function () {
            $(".mod_loading2").css({"margin-top": "0px"});//松开后要复原回到屏幕外
        },
        canslide: true,
        slideDown: function (dom, way) {
            //return false;
            $(dom).prepend('<div class="mod_loading2">\
            <div class="mod_loading2_in" style="transform: rotate(75.2deg);"></div>\
            </div>');

            //第一步：下拉过程
            var _start = 0,
                _end = 0,
                _startwith = 0,
                _endwith = 0,
                sysAdd = utils.getDevicesType() == 2 ? 150 : 150;//安卓等于0，iOS等于150

            _content = $(dom)[0];
            _content.addEventListener("touchstart", touchStart, false);
            _content.addEventListener("touchmove", touchMove, false);
            _content.addEventListener("touchend", touchEnd, false);

            function touchStart(event) {
                var touch = event.targetTouches[0],
                    scrollTop = $(window).scrollTop();
                // 不在顶部的不让刷新
                if (scrollTop > 0) {
                    _start = 99999;
                } else {
                    if (way == "x") {
                        _start = touch.pageX;
                        _startwith = touch.pageY;
                    } else {
                        _start = touch.pageY;
                        _startwith = touch.pageX;
                    }
                }
            }

            function touchMove(event) {
                //此代码 当菜单框显示时 不可下拉刷新
                if (!utils.canslide) {
                    return;
                }
                var touch = event.targetTouches[0];
                if (way == "x") {
                    _end = (_start - touch.pageX);
                    _endwith = (_startwith - touch.pageY);
                } else {
                    _end = (_start - touch.pageY);
                    _endwith = (_startwith - touch.pageX);
                    //下滑才执行操作
                    if (_end < 0 && (Math.abs(_end) > Math.abs(_endwith))) {
                        utils.slideDownStep1(_end / 2);
                    }
                }
                if (_end < -1 && document.body.scrollTop == 0 && (Math.abs(_end) > Math.abs(_endwith))) {
                    event.preventDefault(); //阻止冒泡
                }
            }

            function touchEnd(event) {

                if ((Math.abs(_end) > Math.abs(_endwith)) && _end <= -70 - sysAdd && $(window).scrollTop() <= 0) {
                    // $('title').text(_end+'##'+_start);
                    location.reload();
                }
                utils.slideDownStep2();
            }
        },
        /*下拉刷新 E*/
        /*获取屏幕高*/
        getHeight: function () {
            var screenHeight = document.documentElement.clientHeight || document.body.clientHeight;
            return screenHeight;
        },
        /*获取屏幕宽*/
        getWidth: function () {
            var screenWidth = document.documentElement.clientWidth || document.body.clientWidth;
            return screenWidth;
        },
        bodyScroll: function (e) {
            e.preventDefault();
            return false;
        },
        unscroll: function (doc, canslide) {
            if (canslide != true) {
                utils.canslide = false;
            }
            doc = doc || document.body;
            doc.addEventListener('touchmove', utils.bodyScroll, false);

        },
        scroll: function (doc) {
            doc = doc || document.body;
            utils.canslide = true;
            doc.removeEventListener('touchmove', utils.bodyScroll, false);
        },
        getImgUrl: function (url, str) {
            if (utils.isNotEmpty(url) && url.indexOf("img.com") == -1) {
                if (utils.isNotEmpty(str)) {
                    url = "//img11.360buyimg.com/paipai/s" + str + "_" + url;
                } else {
                    url = "//img11.360buyimg.com/paipai/s80x80_" + url;
                }
            }
            return url;
        },
        getItemUrl: function () {
            var type = utils.getLoginCodeType();
            var goUrl;
            if (type == "wx") {
                goUrl = "//wq.jd.com/item/view?sku={{=skuid}}";
            } else if (type == "qq") {
                goUrl = "//wq.jd.com/mitem/view?sku={{=skuid}}";
            } else {
                goUrl = "//item.m.jd.com/product/{{=skuid}}.html?sku={{=skuid}}";
            }
            return goUrl;
        },
        goUrl: function (href) {
            var temp = href.charAt(0);
            var result = ""

            if (href.indexOf('//') !== -1 || temp === '.') {
                result = href;
            } else if (temp === '/') {
                if (href.indexOf('c2c/') === 1) {
                    result = "//" + location.host + href;
                } else {
                    result = "//" + location.host + '/c2c' + href;
                }

            } else if (temp.indexOf('#/') !== -1) {
                result = "//" + location.host + href;
            } else if (href.indexOf('paipai.m.jd.com') === 0) {
                result = "//" + href;
            } else {
                result = "//" + location.host + href;
            }
            if (utils.getLoginCodeType() === 'app' || utils.getParameter("ism") === "yes") {
                if (result.indexOf('?') !== -1) {
                    if (result.indexOf('ism') === -1) {
                        result += '&ism=yes';
                    }
                } else {
                    result += '?ism=yes';
                }
                const lng = utils.getParameter('lng');
                const lat = utils.getParameter('lat');

                if (!utils.isEmpty(lng) && !utils.isEmpty(lat) && utils.isEmpty(utils.getParameter(result, 'lat')) && utils.isEmpty(utils.getParameter(result, 'lng'))) {
                    if (result.indexOf('?') !== -1) {
                        result = result+'&lng='+lng+'&lat='+lat;
                    } else {
                        result = result+'?lng='+lng+'&lat='+lat;
                    }
                }
            }
            if (this.isNotEmpty(result)) {
                location.href = result;
            }

        },
        getBackUrl: function () {
            var backUrl = this.getParameter("backUrl");
            var result = '';
            if (this.isNotEmpty(backUrl)) {
                var temp = backUrl.charAt(0);

                if (backUrl.indexOf("//") != -1 || temp == '.') {
                    result = backUrl
                } else {
                    if (temp == '/') {
                        result = "." + backUrl;
                    } else {
                        result = "//" + location.host + backUrl;
                    }
                }
            }
            return result;
        },
        //获取当前去参url地址
        getCurUrlNoArgs: function () {
            var curUrlNoArgs = location.protocol + "//" + location.hostname + location.pathname;
            return curUrlNoArgs;
        },

        //添加上报
        addUnify: function (options) {
            //定义默认值
            this.defaultOpt = {
                event_id: '',//上报id
                event_param: '',//上报参数
                page_name: '',
                event_level: ''//订单分级
            };
            var opt = {};    //如果不声明新变量，以后设置会互相污染
            opt = $.extend(opt, this.defaultOpt, options);
            try {
                var eventId = opt.event_id;			 // 必选参数，事件id
                var click = new MPing.inputs.Click(eventId);         // 构造click 请求
                click.event_param = opt.event_param;		 // 设置click的参数
                click.event_level = opt.event_level;		 // 设置事件等级
                click.page_name = opt.page_name;		 //页面地址
                click.updateEventSeries();                           // 更新事件串

                var mping = new MPing();				 // 构造上报实例
                mping.send(click); 					 // 上报click
            } catch (e) {
            }
        },

        // 输入框计算已输入字数与最大字数
        changeLength: function (obj, num, callback) {
            $(obj).bind('input propertychange', function () {
                var len = $(obj).val();
                var spanObj = $(obj).siblings(".reverse-remark-count").find("span");
                var arr = len.match(/[^\/r|/n|//s]/g);
                var arrLen = 0;
                if (arr != null) {
                    arrLen = arr.length;
                }
                spanObj.text(arrLen + ' ');
                if (arrLen >= num) {
                    spanObj.text(num + ' ');
                    len = len.substring(0, num)
                    $(obj).val(len);
                }
                callback(len);
            });
        },

        // selectFloat 浮层通用方法 obj:{id,arr:[{name,value}]}  callback
        selectFloat: function (obj, callback) {
            var _this = this;
            var arr = obj.arr || [];
            var id = obj.id || '';
            var title = obj.title || '请选择';
            var bindId = id ? '#' + id : '.reverse-select';
            if ($(bindId)) {
                $(bindId).remove();
            }
            if (arr.length) {
                var tempHtml = '';
                tempHtml += '<div class="reverse-select" id="' + id + '">' +
                    '<div class="reverse-select-box"><div class="reverse-select-title">' + title + '<img src="image/close_x.png"/></div>' +
                    '<div class="reverse-select-type">';
                for (var i = 0; i < arr.length; i++) {
                    var item = arr[i];
                    tempHtml += '<div class="reverse-select-type-row" data-value="' + item.value + '">' + item.name;
                    if (item.sub) {
                        tempHtml += '<label>' + item.sub + '</label>'
                    }
                    tempHtml += '</div>';
                }
                // tempHtml += '</div>' +
                //     '<div class="reverse-select-cancel">取消' +
                //     '</div>' +
                //     '</div>' +
                //     '</div>';
                $('body').append(tempHtml);
                $('.reverse-select').bind('click', function () {
                    $('.reverse-select').hide();
                });
                $('.reverse-select .reverse-select-cancel').bind('click', function () {
                    $('.reverse-select').hide();
                });
                $('.reverse-select-title img').bind('click', function () {
                    $('.reverse-select').hide();
                });
                $(bindId).delegate('.reverse-select-type-row', 'click', function () {
                    callback(this);
                });
            } else {
                _this.log('警告：arr为空！');
            }
        },

        //添加页脚
        footerInit: function (arr, isTrue) {
            var htmlStr = '';
            var one = (arr.length === 1 && isTrue) ? 'reverse-footer-one' : '';
            htmlStr += '<div class="reverse-footer-station"></div><div class="reverse-footer ' + one + '">';
            for (var i = 0; i < arr.length; i++) {
                var btn = arr[i];
                htmlStr += '<div id="' + btn.id + '"><span';
                if (btn.pageclick) {
                    htmlStr += ' clstag="' + btn.pageclick + '"';
                }
                htmlStr += '>' + btn.name + '</span></div>';
            }
            htmlStr += '</div>';
            $('body').append(htmlStr);
        },
        // 按钮倒计时60s
        btnCountDown: function (dom, callBack) {
            var _this = this;
            $(dom).unbind('click').bind('click', function () {
                var wait = 60;

                function time() {
                    if (wait == 0) {
                        $(dom).text("发送手机验证码");
                        $(dom).parent().css('background-color', '#fc5247');
                        $(dom).parent().removeClass('isCountDown');
                        wait = 60;
                    } else {
                        $(dom).text("重新发送(" + wait + ")");
                        $(dom).parent().css('background-color', 'rgb(140,140,140)');
                        $(dom).parent().addClass('isCountDown');
                        wait--;
                        setTimeout(function () {
                            time()
                        }, 1000)
                    }
                }

                if (!$(dom).parent().hasClass('isCountDown')) {
                    time();
                    if (_this.isNotEmpty(callBack)) {
                        callBack();
                    }
                }
            });
        },
        // 秒数计算天数时间 restTime 单位秒
        restTimeCountDown: function (restTime) {
            var d = Math.floor(restTime / 60 / 60 / 24);
            restTime = restTime - (d * 60 * 60 * 24);
            var h = Math.floor(restTime / 60 / 60);
            restTime = restTime - (h * 60 * 60);
            var m = Math.floor(restTime / 60);
            restTime = restTime - (m * 60);
            var s = Math.floor(restTime);
            h = h < 10 ? '0' + h : h;
            m = m < 10 ? '0' + m : m;
            s = s < 10 ? '0' + s : s;
            return d + '天' + h + '小时' + m + '分' + s + '秒';
        },
        //兼容ios禁止屏幕滚动李振亚2017-10-24
        smartScroll: function (container, selectorScrollable) {
            // 如果没有滚动容器选择器，或者已经绑定了滚动时间，忽略
            if (!selectorScrollable || container.data('isBindScroll')) {
                return;
            }

            // 是否是搓浏览器
            // 自己在这里添加判断和筛选
            var isSBBrowser;

            var data = {
                posY: 0,
                maxscroll: 0
            };

            // 事件处理
            container.on({
                touchstart: function (event) {
                    var events = event.touches[0] || event;

                    // 先求得是不是滚动元素或者滚动元素的子元素
                    var elTarget = $(event.target);

                    if (!elTarget.length) {
                        return;
                    }

                    var elScroll;

                    // 获取标记的滚动元素，自身或子元素皆可
                    if (elTarget.is(selectorScrollable)) {
                        elScroll = elTarget;
                    } else if ((elScroll = elTarget.parents(selectorScrollable)).length == 0) {
                        elScroll = null;
                    }

                    if (!elScroll) {
                        return;
                    }

                    // 当前滚动元素标记
                    data.elScroll = elScroll;

                    // 垂直位置标记
                    data.posY = events.pageY;
                    data.scrollY = elScroll.scrollTop();
                    // 是否可以滚动
                    data.maxscroll = elScroll[0].scrollHeight - elScroll[0].clientHeight;
                },
                touchmove: function () {
                    // 如果不足于滚动，则禁止触发整个窗体元素的滚动
                    if (data.maxscroll <= 0 || isSBBrowser) {
                        // 禁止滚动
                        event.preventDefault();
                    }
                    // 滚动元素
                    var elScroll = data.elScroll;
                    // 当前的滚动高度
                    var scrollTop = elScroll.scrollTop();

                    // 现在移动的垂直位置，用来判断是往上移动还是往下
                    var events = event.touches[0] || event;
                    // 移动距离
                    var distanceY = events.pageY - data.posY;

                    if (isSBBrowser) {
                        elScroll.scrollTop(data.scrollY - distanceY);
                        elScroll.trigger('scroll');
                        return;
                    }

                    // 上下边缘检测
                    if (distanceY > 0 && scrollTop == 0) {
                        // 往上滑，并且到头
                        // 禁止滚动的默认行为
                        event.preventDefault();
                        return;
                    }

                    // 下边缘检测
                    if (distanceY < 0 && (scrollTop + 1 >= data.maxscroll)) {
                        // 往下滑，并且到头
                        // 禁止滚动的默认行为
                        event.preventDefault();
                        return;
                    }
                },
                touchend: function () {
                    data.maxscroll = 0;
                }
            });

            // 防止多次重复绑定
            container.data('isBindScroll', true);
        },
        //加载分页李振亚2017-09-30
        loadMore: function (element, callback) {
            var windowHeight = window.screen.availHeight;//显示浏览器的屏幕的可用高度，以像素计
            var dpr = window.devicePixelRatio;//获取设备的dpr

            var startY = 0,
                endY = 2000;

            //记录开始位置
            element.addEventListener('touchstart', function (e) {
                var event = e || window.event;
                startY = event.touches[0].clientY;
            }, {passive: true});
            //记录滑动中不断变化的位置
            element.addEventListener('touchmove', function (e) {
                var event = e || window.event;
                endY = event.touches[0].clientY;
            }, {passive: true});
            //结束做判断
            element.addEventListener('touchend', function (e) {
                if (startY - endY > 150) {
                    var y = startY - endY;
                    console.log(y);
                    loadMore();
                }
            }, {passive: true});

            function loadMore() {
                // 页面指定了DOCTYPE后，document.body.scrollTop一直为0
                var scrollTop
                    = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
                if (scrollTop + windowHeight * dpr >= element.scrollHeight) {
                    callback();
                }
            }
        },

        //唤起APP的某个页面scheme是唤起的协议
        openApp: function (scheme) {
            var ua = navigator.userAgent.toLowerCase();
            var t;
            var config = {
                state: function () {
                    return {
                        scheme_IOS: scheme,
                        scheme_Adr: scheme
                    }
                },
                timeout: 1000
            };

            function openclient() {
                var startTime = Date.now();

                var ifr = document.createElement('iframe');

                ifr.src = ua.indexOf('os') > 0 ? config.state().scheme_IOS : config.state().scheme_Adr;
                ifr.style.display = 'none';
                document.body.appendChild(ifr);
                var t = setTimeout(function () {
                    var endTime = Date.now();

                    if (!startTime || endTime - startTime < config.timeout + 200) {
                        window.location = ua.indexOf('os') > 0 ? 'appDown.html' : 'appDown.html';
                    } else {
                        //window.location = ua.indexOf('os') > 0 ? 'https://fir.im/4cv6' : 'http://storage.jd.com/paipaiapk/app-armeabi-v7a-release.apk';
                    }
                }, config.timeout);

                window.onblur = function () {
                    clearTimeout(t);
                };
                document.addEventListener("visibilitychange", function () {
                    clearTimeout(t);
                });
            }

            openclient()

        },

        // 秒数计算天数时间 restTime 单位秒,是0的隐藏消失
        restTimeCountDownc2c: function (restTime) {
            var d = Math.floor(restTime / 60 / 60 / 24);
            restTime = restTime - (d * 60 * 60 * 24);
            var h = Math.floor(restTime / 60 / 60);
            restTime = restTime - (h * 60 * 60);
            var m = Math.floor(restTime / 60);
            restTime = restTime - (m * 60);
            var s = Math.floor(restTime);
            h = h < 10 ? h : h;
            m = m < 10 ? m : m;
            s = s < 10 ? s : s;
            if (d < 1 && h > 0 && m > 0) {
                return h + '小时' + m + '分';
            } else if (d < 1 && h < 1 && m > 0) {
                return m + '分';
            } else if (d < 1 && h < 1 && m < 1) {
                return s + '秒';
            } else {
                return d + '天' + h + '小时' + m + '分';
            }

        },
        checkBase64:function (strBase64) {
            var reg = /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*?)\s*$/i;

            if(reg.test(strBase64)){
                return true;
            }else{
                return false;
            }
        },
        setAppInfo: function (para) {
            if (this.getType() == 1) {
                para.params = JSON.stringify(para.params);
                window.android.ppAppMessageHandler(encodeURIComponent(JSON.stringify(para)));
            } else if (this.getType() == 2) {
                window.webkit.messageHandlers.ppAppMessageHandler.postMessage(para);
            }
        },
        log: function (str) {
            if (utils.isDebug) {
                console.log(str);
            }
        },
        isURL: function (str) {
            return !!str.match(/(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g);
        },
        //新闻轮播
        scrollNews: function (obj) {
            var $self = obj.find("ul:first"); //找到第一个ul元素
            var lineHeight = $self.find("li:first").height(); //获取第一个li元素的行高
            $self.animate({"marginTop": -lineHeight + "px"}, 600, function () {
                //alert($self.css({marginTop:0}).find("li:first").text());//逐条获取
                //把所有匹配的元素追加到$self元素的后面,所以才出现这种周而复始滚动的效果
                $self.css({marginTop: 0}).find("li:first").appendTo($self); //appendTo能直接移动元素
            })
        },
        getImageHost: function (str) {
            return 'http://m.360buyimg.com/paipai/' + str;
        },
        // m端埋点
        addMping: function (opts) {
            try {
                /**
                 *
                 * @type {{eventId: string, event_param: string, event_level: string}}
                 */
                var defaultOpt = {
                    event_id: 'Jshop_ProductID', // 事件id
                    event_level: '', // 事件等级
                    event_param: '', // 事件参数
                    page_name: '', // 当前页面类名或（M页）去参URL
                    page_param: '', // 当前页面参数
                }
                var opt = {};    //如果不声明新变量，以后设置会互相污染
                opt = $.extend(opt, defaultOpt, opts);
                // console.log("上报参数"+JSON.stringify(opt))
                var eventId = opt.event_id;                         // 必选参数，事件id
                var click = new MPing.inputs.Click(eventId);        // 构造click请求
                click.event_param = opt.event_param;         // 设置click的参数
                click.event_level = opt.event_level;                                      // 设置事件等级
                click.page_name = opt.page_name;                                      // 设置事件等级
                click.page_param = opt.page_param;                                      // 设置事件等级
                click.updateEventSeries();                                   // 更新事件串
                var mping = new MPing();                                    // 构造上报实例
                mping.send(click);                                                // 上报click

            } catch (e) {

            }
        }
    };
    (function () {
        //公共头部处理
        var sid = '1874745ert23';
        var mchb = new MCommonHeaderBottom();
        var title = $('body').attr('title') || document.title;

        var headerArg = {
            hrederId: 'm_common_header',
            title: title,
            sid: sid,
            isShowShortCutButton: utils.getParameter('enter') == 'm' ? true : false,
            isShowShortCut: false,
        }
        mchb.header(headerArg);
        $('a').each(function () {
            var _href = $(this).attr('href');
            if (utils.getParameter('enter') == 'm') {
                if (utils.isNotEmpty(_href) && _href.indexOf("javascript:;") == -1 && _href.indexOf("tel:") == -1) {
                    _href = utils.setUrlParam(_href, 'enter', 'm');
                    $(this).attr('href', _href);
                }
            }
        });
    })();
    return utils;
});
