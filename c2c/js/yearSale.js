require(["jquery","utils","share","fastclick"],function(a,b,c,d){d.attach(document.body);var e={init:function(){e.imgLoad(),e.addClick(),e.initShareInfo(),e.setShare()},imgLoad:function(){function b(){d+=1,d==c&&a(".year-sale").show()}var c,d=0;a(document).ready(function(){c=a(".year-sale img").length,a(".year-sale img").each(function(){var c=new Image;c.src=a(this).attr("src"),c.complete?b():c.onload=b})})},addClick:function(){a(".btn-sale").unbind("click").bind("click",function(){console.log("现在就去卖"),b.setDoubleClick(function(){location.href="openapp.paipai://c2cPublish/app"})}),a(".btn-look").unbind("click").bind("click",function(){console.log("现在就去看"),b.goUrl("/classifyDetails1.html?ids=header_3_c_ozKu5uSt,intr_3_c_tlEzfSRo,starpool_3_c_7HSYGWB7")})},initShareInfo:function(){var a={method:"setAPPInfo",params:{type:1,title:"上拍拍二手，能赚钱",subTitle:"现在把闲置的年会奖品换成钱，还能领222新人红包哦",shareUrl:window.location.href,imgUrl:"http://paipai.m.jd.com/c2c/image/pai-2x.png"}};b.setAppInfo(a)},setShare:function(){var a,d={url:window.location.href,title:"上拍拍二手，能赚钱",qzone_title:"上拍拍二手，能赚钱",wechat_title:"上拍拍二手，能赚钱",wechat_time_title:"上拍拍二手，能赚钱",wechat_desc:"现在把闲置的年会奖品换成钱，还能领222新人红包哦",qq_desc:"现在把闲置的年会奖品换成钱，还能领222新人红包哦",qzone_desc:"现在把闲置的年会奖品换成钱，还能领222新人红包哦",img:"https://paipai.m.jd.com/c2c/image/pai-2x.png",isCallBack:"Y"};a="h5"==b.getLoginType()?"":"jd",setTimeout(c.init(d,a),300)}};e.init(),window.onpageshow=function(a){a.persisted&&e.initShareInfo()}});