require(["jquery","utils","dot"],function(a,b,c){"use strict";var d={debug:!1,init:function(){d.queryCustomIdByJdPin(),d.addClick(),b.btnCountDown(".bind-tel-left span",function(){var c=a(".bind-tel-left span").parent().data("tel");d.debug&&(c="18911020124"),b.isNotEmpty(c)&&d.getVerifyCode(c)})},addClick:function(){a(".bind-go-left").unbind("click").bind("click",function(){d.viewHandler(3)}),a(".bind-open img").unbind("click").bind("click",function(){var b=a(this).data("tag"),c="",d=a(".bind-state3 .bind-buttom");0!=b?(c="image/btn-qianbao-weikaitong.png",b="0",d.addClass("disable")):(c="image/btn-xuanzhong.png",b="1",d.removeClass("disable")),a(".bind-open img").data("tag",b),a(".bind-open img").attr("src",c)}),a(".bind-state3 .bind-buttom").unbind("click").bind("click",function(){a(".bind-open img").data("tag");a(this).hasClass("disable")||d.creatAccount()}),a(".bind-state1 .bind-buttom").unbind("click").bind("click",function(){var b=a(".bind-st-item img[src='image/btn-xuanzhong.png']").parent(),c=b.data("tel"),e=b.data("id");a(".bind-state2 .bind-buttom").data("tel",c),a(".bind-state2 .bind-buttom").data("id",e),a(".bind-tel-left").data("tel",c),a(".bind-tel-top span").html(c),d.viewHandler(2)}),a(".bind-state2 .bind-buttom").unbind("click").bind("click",function(){var c=a(this).data("tel"),e=a(this).data("id"),f=a(".bind-tel-bottom input").val();b.isNotEmpty(f)?d.bindAccount(e,c,f):b.lightToast("验证码不能为空")}),a(".bind-select").undelegate(".bind-st-item","click").delegate(".bind-st-item","click",function(){var c=a(this).data("select");b.log(c),"0"==c&&(a(".bind-st-item").data("select",0).find("img").attr("src","image/btn-qianbao-weikaitong.png"),a(this).data("select",1).find("img").attr("src","image/btn-xuanzhong.png"))})},viewHandler:function(b){switch(a(".bind-state1,bind-state2,.bind-state3").addClass("ui-hide"),parseInt(b)){case 1:a(".bind-state1").removeClass("ui-hide");break;case 2:a(".bind-state2").removeClass("ui-hide");break;case 3:a(".bind-state3").removeClass("ui-hide"),a(".bind-open img").data("tag",0),a(".bind-state3 .bind-open img").attr("src","image/btn-qianbao-weikaitong.png")}},getVerityAuthUser:function(){var a={url:b.getHost()+"/jdWallet/verityAuthUser"};b.load(a).then(function(a){b.log("校验用户是否实名"+JSON.stringify(a))},function(a){b.lightToast("网络异常，稍后重试")})},queryCustomIdByJdPin:function(){var a={url:b.getHost()+"/jdWallet/queryCustomIdByJdPin"};b.load(a).then(function(a){b.log("PIN是否绑定账号ID"+JSON.stringify(a)),d.debug&&(a.code=808,a.data=[]),0==a.code?b.isNotEmpty(a.data)&&b.lightToast("您已开通京东钱包，请勿重复操作"):808==a.code?d.recommendAccount():b.isNotEmpty(a.tip)&&b.lightToast(a.tip)},function(a){b.lightToast("网络异常，稍后重试")})},recommendAccount:function(){var a={url:b.getHost()+"/jdWallet/recommendAccount"};b.load(a).then(function(a){b.log("推荐账号列表"+JSON.stringify(a)),d.debug&&(a={code:"0",currentTime:1503485328,data:[{cusEmail:"",cusMobile:"15866537344",customerId:"360000000002790671",realName:!1,type:"cus"},{cerType:"ID",certNum:"360725197303101159",cusEmail:"",cusMobile:"15277791021",customerId:"360000000002790689",name:"独孤69769",realName:!0,type:"cus"}],tip:"请求成功"},a.data=[{cerType:"ID",certNum:"360725197303101159",cusEmail:"",cusMobile:"15277791021",customerId:"360000000002790689",name:"独孤69769",realName:!0,type:"cus"},{cerType:"ID",certNum:"360725197303101159",cusEmail:"",cusMobile:"15277791021",customerId:"360000000002790689",name:"独孤69769",realName:!0,type:"cus"},{cerType:"ID",certNum:"360725197303101159",cusEmail:"",cusMobile:"15277791021",customerId:"360000000002790689",name:"独孤69769",realName:!0,type:"cus"},{cerType:"ID",certNum:"360725197303101159",cusEmail:"",cusMobile:"15277791021",customerId:"360000000002790689",name:"独孤69769",realName:!0,type:"cus"}]),0==a.code&&b.isNotEmpty(a.data)&&a.data.length>0?(d.renderAccount(a.data),d.viewHandler(1)):d.viewHandler(3)},function(a){b.lightToast("网络异常，稍后重试")})},creatAccount:function(){var a={url:b.getHost()+"/jdWallet/creatAccount"};b.load(a).then(function(a){if(b.log("创建账号并绑定PIN"+JSON.stringify(a)),a&&0==a.code){b.lightToast("开通成功");var c=b.getParameter("backUrl");b.isNotEmpty(c)?location.href=c:3!=b.getType()?location.href="openapp.paipai://close/app":location.href="//paipai.m.jd.com/c2c/m/mine"}else b.isNotEmpty(a.tip)?b.lightToast(a.tip):b.lightToast("开通异常")},function(a){b.lightToast("网络异常，稍后重试")})},bindAccount:function(a,c,d){var e={url:b.getHost()+"/jdWallet/bindAccount",data:{customerId:a,mobile:c,verifyCode:d}};b.load(e).then(function(a){b.log("绑定PIN与账号Id"+JSON.stringify(a)),a&&0==a.code?(b.lightToast("绑定成功"),3!=b.getType()&&(location.href="openapp.paipai://close/app")):b.isNotEmpty(a.tip)?b.lightToast(a.tip):b.lightToast("绑定异常")},function(a){b.lightToast("网络异常，稍后重试")})},getVerifyCode:function(a){var c={url:b.getHost()+"/user/getVerifyCode",data:{mobile:a}};b.load(c).then(function(a){b.log("发送验证码"+JSON.stringify(a)),a&&0==a.code||b.isNotEmpty(a.data.res)&&b.lightToast("取消成功")},function(a){b.lightToast("网络异常，稍后重试")})},renderAccount:function(b){a(".bind-select").html(c.template(a("#walletlist").text())(b))}};d.init()});