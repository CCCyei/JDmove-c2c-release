require(["jquery","utils","dot"],function(a,b,c){"use strict";var d={orderId:b.getUrlParam("orderId"),lat:b.getParameter("lat"),lng:b.getParameter("lng"),commodityId:""},e={isLoading:!1,isAllLoad:!1,init:function(){location.replace("../resell/#/sell-money/?orderId="+b.getUrlParam("orderId")+"&lat="+b.getParameter("lat")+"&lng="+b.getParameter("lng"))},addScorll:function(){a(window).on("scroll",function(){var b=a(window).scrollTop(),c=a(window).height(),f=document.body.scrollHeight;!e.isLoading&&b+c+300>f&&(e.isLoading=!0,e.getResellList(d.key))})},addClick:function(){a(".ui-right-btn").unbind("click").bind("click",function(){var c=a(this).text(),e=a(this).parents(".ui-bottom").attr("skuId");if("一键转卖"==c)setTimeout(function(){b.goUrl("/WXresellListPulish.html?skuId="+e+"&orderId="+d.orderId+"&lat="+d.lat+"&lon="+d.lng)},300);else if("查看"==c){var f=a(this).attr("commodityId");a(this).attr("resellButtonType"),a(this).attr("resellState");setTimeout(function(){b.goUrl("/goodsDetail.html?itemid="+f+"&hsshow=yes")},300)}}),a(".ui-right-clect").unbind("click").bind("click",function(){var b=a(this).attr("recycleButtonUrl");setTimeout(function(){location.href="//"+b},300)})},getResellList:function(){var c={url:b.getHost(1)+"/order/middlePage",data:{orderId:d.orderId}};b.load(c).then(function(c){b.log("获取卖了换钱列表"+JSON.stringify(c)),console.log(c),"0"===c.code?c.data&&c.data.orderProductList.length>0&&(d.orderId=c.data.orderId,a(".ui-top").html("订单编号:"+c.data.orderId),e.renderResellListInfo(c.data.orderProductList),e.isLoading=!1,e.addClick()):b.isNotEmpty(c.tip)?b.lightToast(c.tip):b.lightToast("获取卖了换钱列表异常")},function(a){})},getHref:function(){var c={url:b.getHost(1)+"/order/sellForCashCheck",data:{oids:d.orderId,lat:d.lat,lon:d.lng}};b.load(c).then(function(c){b.log("获取跳转链接"+JSON.stringify(c)),console.log(c),"0"===c.code?c.data&&c.data[d.orderId].show&&1==c.data[d.orderId].type?e.getResellList():c.data&&c.data[d.orderId].show&&2==c.data[d.orderId].type?location.replace(c.data[d.orderId].url):(a(".bgview").removeClass("hide"),a(".bgview p").text("好像不能转卖哦~")):b.isNotEmpty(c.tip)?b.lightToast(c.tip):b.lightToast("获取跳转异常")},function(a){})},renderResellListInfo:function(b){b=b||[],a(".ui-box>div").append(c.template(a(".renderResellListInfo").text())(b))}};e.init()});