require(["jquery","utils","dot"],function(a,b,c){"use strict";var d={key:"",json:{}},e={isLoading:!1,isAllLoad:!1,init:function(){e.getResellList(d.key),e.addScorll()},addScorll:function(){a(window).on("scroll",function(){var b=a(window).scrollTop(),c=a(window).height(),f=document.body.scrollHeight;!e.isLoading&&b+c+300>f&&(e.isLoading=!0,e.getResellList(d.key))})},getResellList:function(c){var f={url:b.getHost(1)+"/order/v1/resale/appList",data:{key:c||""}};b.load(f).then(function(c){if(b.log("获取一键转卖列表"+JSON.stringify(c)),console.log(c),"0"===c.code)if(c.data&&c.data.length>0){for(var f=0;f<c.data.length;f++){var g=c.data[f];d.json[g.dealId+"-"+g.otherPlatformCommodityId]=g}d.key=c.data[c.data.length-1].key,e.renderResellListInfo(c.data),e.isLoading=!1}else""==d.key&&c.data&&0==c.data.length?(a(".bgview").removeClass("hide"),a(".bgview p").text("暂无可转卖的订单~")):b.lightToast("没有更多了");else b.isNotEmpty(c.tip)?b.lightToast(c.tip):b.lightToast("获取一键转卖列表异常");a(".ui-resell-box").click(function(){var b=(a(this).attr("otherPlatformCommodityId"),a(this).attr("isResale")),c=a(this).attr("String");0==b&&(location.href='openapp.paipai://pushToResaleOrder/app?param={"key1":'+JSON.stringify(d.json[c])+"}")})},function(a){})},renderResellListInfo:function(b){b=b||[],a("body").append(c.template(a(".renderResellListInfo").text())(b))}};e.init()});