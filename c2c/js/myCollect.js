!function(){function a(a){document.body.scrollTop=document.documentElement.scrollTop=a}function b(){return document.body.scrollTop||document.documentElement.scrollTop}var c=0;open.onclick=function(){c=b(),document.body.classList.add("dialog-open"),document.body.style.top=-c+"px",mask.style.display="block"},close.onclick=function(){mask.style.display="none",document.body.classList.remove("dialog-open"),a(c)}}(),require(["jquery","utils","dot"],function(a,b,c){"use strict";var d={commodityId:"",page:"",uin:"",desc:""},e={page:1,pageSize:20,isLoading:!1,isAllLoad:!1,init:function(){e.getBuyList(e.page,e.pageSize),e.addScorll()},addScorll:function(){a(window).on("scroll",function(){var b=a(window).scrollTop(),c=a(window).height(),d=document.body.scrollHeight;!e.isLoading&&!e.isAllLoad&&b+c+300>d&&(e.page+=1,e.isLoading=!0,e.getBuyList(e.page,e.pageSize))})},bodyScollHandler:function(){a(".reverse-dialog").is(":visible")?a("body").addClass("dialog-open"):a("body").removeClass("dialog-open")},getBuyList:function(c,f){var g={url:b.getHost()+"/interest/list",data:{currentPage:c,pageSize:f}};b.load(g).then(function(c){var f=c.data.result;(f||[]).forEach(function(a){a.pic=JSON.parse(a.pic);var b=2.9*a.pic.length+"rem";a["with"]=b}),"0"==c.code?c.data.result&&c.data.result.length>0?(e.renderBuyListInfo(c.data.result),d.page=Math.ceil(c.data.totalCount/20),e.isLoading=!1,(!c.data.result||c.data.result.length<e.pageSize)&&(e.isAllLoad=!0),3==b.getType()||(a(".ui-hd-img").unbind("click").bind("click",function(){return d.uin=a(this).attr("uin"),location.href='openapp.paipai://pushToOthersHome/app?param={"key1":'+d.uin+"}",!1}),a(".ui-hd-name").unbind("click").bind("click",function(){return d.uin=a(this).attr("uin"),location.href='openapp.paipai://pushToOthersHome/app?param={"key1":'+d.uin+"}",!1}))):1==e.page?(a(".bgview").removeClass("hide"),a(".bgview p").text("快去收藏卖家的商品吧~"),a(".bgview img").attr("src","image/noClect.png")):b.lightToast("没有更多了"):b.isNotEmpty(c.tip)?b.lightToast(c.tip):b.lightToast("我收藏的商品异常")},function(a){})},renderBuyListInfo:function(f){f=f||[],a("body").append(c.template(a(".renderBuyListInfo").text())(f)),a(".ui-attention").unbind("click").bind("click",function(){var b=a(this).attr("commodityId");a(".reverse-dialog").show(),e.bodyScollHandler(),a("#success").unbind("click").bind("click",function(){e.delCollect(b),e.bodyScollHandler()}),a("#cancel").click(function(){a(".reverse-dialog").hide(),e.bodyScollHandler()}),a(".reverse-dialog").click(function(){a(".reverse-dialog").hide(),e.bodyScollHandler()})}),3==b.getType()?(a(".ui-sell-img").unbind("click").bind("click",function(){d.commodityId=a(this).attr("itemid"),b.goUrl("/goodsDetail.html?ism=yes&itemid="+d.commodityId)}),a(".ui-detail").unbind("click").bind("click",function(){d.commodityId=a(this).attr("itemid"),b.goUrl("/goodsDetail.html?ism=yes&itemid="+d.commodityId)})):(a(".ui-sell-img").unbind("click").bind("click",function(){d.commodityId=a(this).attr("itemid"),location.href='openapp.paipai://pushToC2CDetail/app?param={"key1":'+d.commodityId+"}"}),a(".ui-detail").unbind("click").bind("click",function(){d.commodityId=a(this).attr("itemid"),location.href='openapp.paipai://pushToC2CDetail/app?param={"key1":'+d.commodityId+"}"}))},delCollect:function(c){var d={url:b.getHost()+"/interest/save",data:{commodityId:c,isInterest:"1"}};b.load(d).then(function(d){b.log("取消关注"+JSON.stringify(d)),"0"==d.code?(a(".reverse-dialog").hide(),a("div[commodityId="+c+"]").parents(".ui-box").remove()):b.isNotEmpty(d.tip)?b.lightToast(d.tip):b.lightToast("取消关注异常")},function(a){})}};e.init()});