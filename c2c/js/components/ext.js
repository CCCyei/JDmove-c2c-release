/*工具类*/
define('ext', ['jquery'], function ($) {
    var ext = {
        // app 下载
        // 添加样式
        defaultOpt:{
            scheme_IOS: 'openapp.paipai://pushToHome/app',//  唤起协议
            scheme_Adr: 'openapp.paipai://pushToHome/app'
        },
        init:function(options){
            $.extend(true,this.defaultOpt,options);
            this.appendCss();
            this.appendHtml();
            this.bind();
            this.loadOrOpenApp();
        },
        //添加样式
        appendCss: function () {
            var head = document.getElementsByTagName("head")[0];
            var c = document.createElement("STYLE");
            c.innerHTML =
                '.ui-down{width:100%;height:1.83901919rem;background:rgba(0,0,0,.6);position:fixed;left:0;bottom:0;z-index:999}.ui-down div{float:left}.ui-down .ui-img{width:1.3326226rem;height:1.3326226rem;border-radius:.13326226rem;margin-left:.26652452rem;margin-top:.26652452rem;overflow:hidden}.ui-down .ui-img img{width:1.3326226rem;height:1.3326226rem}.ui-down .ui-txt{width:4.74413646rem;font-size:.34648188rem;color:#fff;margin-top:.46641791rem;margin-left:.25319829rem}.ui-down .ui-txt .ui-p1{font-size:.37313433rem}.ui-down #ui-btn{width:2.31876333rem;height:.85287846rem;line-height:.85287846rem;border-radius:.42643923rem;text-align:center;background:#fc5247;font-size:.37313433rem;color:#fff;margin-top:.49307036rem}.ui-down .ui-close{width:.26652452rem;height:.26652452rem;margin-top:.74626866rem;margin-left:.39978678rem}.ui-down .ui-close img{display:block;width:.26652452rem;height:.26652452rem}.ui-open{width:100%;height:1.83901919rem;background:#fff;position:fixed;left:0;bottom:0}.ui-open div{float:left}.ui-open .ui-img{width:.85287846rem;height:.85287846rem;border-radius:.13326226rem;margin-left:.3065032rem;margin-top:.53304904rem;overflow:hidden}.ui-open .ui-img img{width:.85287846rem;height:.85287846rem}.ui-open .ui-txt{width:5.19722814rem;font-size:.31982942rem;color:#464646;margin-top:.46641791rem;margin-left:.22654584rem}.ui-open .ui-txt .ui-p1{font-size:.37313433rem;color:#171717}.ui-open .ui-btn{width:2.31876333rem;height:.85287846rem;line-height:.85287846rem;border-radius:.42643923rem;text-align:center;background:#fff;font-size:.37313433rem;color:#fc5247;margin-top:.49307036rem;border:.02665245rem solid #fc5247}.ui-open .ui-close{float:right;width:.26652452rem;height:.26652452rem;margin-top:.53304904rem;margin-right:.42643923rem}.ui-open .ui-close img{width:.26652452rem;height:.26652452rem}.ui-look{width:100%;height:1.34594883rem;position:fixed;left:0;bottom:0}';
            head.appendChild(c)
        },
        // 绑定事件
        bind: function(){
            //关闭底部
            $('.ui-close').click(function () {
                $(this).parents('.ui-open').hide();
                $(this).parents('.ui-down').hide();
            })

        },
        // 添加html 代码
        appendHtml: function () {
            var html = '\
                    <div class="ui-down">\
                        <div class="ui-img">\
                            <img src="image/pai-2x.png">\
                        </div>\
                        <div class="ui-txt">\
                            <p class="ui-p1">拍拍二手</p>\
                            <p>卖的省心 买的放心</p>\
                        </div>\
                        <div id="ui-btn" clstag="pageclick|keycount|goods__201708106|1">打开App</div>\
                        <div class="ui-close"><img src="image/close_x.png"></div>\
                    </div>'
            $('body').append(html);
        },
        loadOrOpenApp: function () {
            var that=this;
            var ua = navigator.userAgent.toLowerCase();
            var t;
            var config = {

                state: function () {
                    return {
                        scheme_IOS:that.defaultOpt.scheme_IOS,
                        scheme_Adr:that.defaultOpt.scheme_Adr
                    }
                },
                //download_url:www.jd.com ,// document.getElementById('download-app').value,
                timeout: 1000
            };
            //alert(config.state().scheme_Adr)
            //alert(typeof (config.state().scheme_Adr))
            function openclient() {
                var startTime = Date.now();

                var ifr = document.createElement('iframe');

                ifr.src = ua.indexOf('os') > 0 ? config.state().scheme_IOS : config.state().scheme_Adr;
                console.log("ios"+config.state().scheme_IOS);
                console.log("android"+config.state().scheme_Adr);
                ifr.style.display = 'none';
                document.body.appendChild(ifr);
                var t = setTimeout(function () {
                    var endTime = Date.now();

                    if (!startTime || endTime - startTime < config.timeout + 200) {
                        //ifr.src = ua.indexOf('os') > 0 ? config.scheme_IOS : config.scheme_Adr;
                        window.location = ua.indexOf('os') > 0 ? 'appDown.html' : 'appDown.html';
                        // http://storage.jd.com/paipaiapk/app-armeabi-v7a-release.apk
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
            $('#ui-btn').unbind("click").bind("click", openclient);

        }
    };
    return ext;
});
