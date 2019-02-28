require(["jquery","utils","dot","jquery.lazyload","swiper"],function(a,b,c){"use strict";function d(){for(var b=0;b<arguments.length;b++){var c=arguments[b],d=a(c).offset().top;f[d]=c}}function e(b){var c=a(document).scrollTop();for(var d in b){var e=b[d];parseInt(d,10)<c?a(e).addClass("top"):a(e).removeClass("top")}c>h?(a('.recyle-tab-type span[data-name="recyle"]').removeClass("recyle-tab-type-active"),a('.recyle-tab-type span[data-name="buy-used"]').addClass("recyle-tab-type-active")):(a('.recyle-tab-type span[data-name="buy-used"]').removeClass("recyle-tab-type-active"),a('.recyle-tab-type span[data-name="recyle"]').addClass("recyle-tab-type-active"))}var f={},g=a("#recyle").offset().top,h=a("#buy-used").offset().top;d(".recyle-tab-type"),a(window).resize(function(){e(f)}),a(".recyle-tab-type").delegate("span","click",function(){var b=a(this).attr("data-name");"recyle"===b?window.scrollTo(0,g):"buy-used"===b&&window.scrollTo(0,h+20)}),b.slideDown("body","y");var i=a(window).scrollTop();i>a(window).height()&&a(".ui-back-top").show();var j={isload:!1,isall:!0};a(".recommend-seckill-time").delegate("div span:first-child","click",function(){a(".recommend-seckill-time span").removeClass("recommend-seckill-active"),a(this).addClass("recommend-seckill-active");var b=a(this).attr("data-id");k.getSeckill(b)}),a(".goods-type").delegate(".goods-type-tab","click",function(){a(".goods-type-tab").removeClass("goods-type-tab-active"),a(this).addClass("goods-type-tab-active");var b=a(this).attr("data-name");"hot"==b?(a(".nearby-list").hide(),a(".goods-list").show()):"nearby"==b&&(a(".goods-list").hide(),a(".nearby-list").show())}),a(window).scroll(function(){e(f);var b=a(window).scrollTop();b>a(window).height()?a(".ui-back-top").show():a(".ui-back-top").hide();var c=document.documentElement&&document.documentElement.scrollHeight||document.body.scrollHeight;if(!j.isload&&j.isall&&b+window.innerHeight>=c-200){j.isload=!0;var d="none"==a(".goods-list").css("display");d?k.getNearby():k.getGoods()}});var k={obj:{imgUrlBase:"http://192.168.150.54/test/"},init:function(){b.log("初始化完成"),k.getContentModule(),k.getSeckill(),k.getMarket(),k.getMarkActive()},getContentModule:function(){var d={url:b.getHost()+"/cms",data:"ids=1,2,3,4,5,6,7,8"};b.load(d).then(function(d){var e=d.data;for(var f in e)switch(f){case"1":case"2":case"3":(e[f]||[]).forEach(function(a){a.img=b.getHost(2)+a.img});var i=c.template(a("#floor123").text());a(".recyle-box-row:eq("+(f-1)+")").html(i({array:e[f]}));break;case"4":var j=e[f];j=j.length?j[0]:{},a("section.ad a").attr("href",j.url),a("section.ad img").attr("src",b.getHost(2)+j.img);break;case"5":(e[f]||[]).forEach(function(a){a.img=b.getHost(2)+a.img});var i=c.template(a("#floor5").text());a(".swiper-wrapper").html(i({array:e[f]}));break;case"6":(e[f]||[]).forEach(function(a){a.img=b.getHost(2)+a.img});for(var k=e[f],l=c.template(a("#floor6").text()),m=0;m<k.length;m++){var j=k[m];0===m?(j.type="big",a(".activity-text").html(l(j)),a(".activity-text").attr("data-url",j.url)):m>0&&3>m?a(".activity-row:eq(0) .activity-colum").append(l(j)):a(".activity-row:eq(1)").append(l(j))}break;case"7":(e[f]||[]).forEach(function(a){a.img=b.getHost(2)+a.img});for(var k=e[f],l=c.template(a("#floor7").text()),m=0;m<k.length;m++){var j=k[m];m>=0&&3>m?(j.type="main",a(".question-box").append(l(j))):m>=3&&6>m?a(".question-box-info:eq(0)").append(l(j)):m>=6&&9>m?a(".question-box-info:eq(1)").append(l(j)):m>=9&&12>m&&a(".question-box-info:eq(2)").append(l(j))}break;case"8":(e[f]||[]).forEach(function(a){a.img=b.getHost(2)+a.img});for(var k=e[f],l=c.template(a("#floor8").text()),m=0;m<k.length;m++){var j=k[m];m>=0&&4>m?a(".recommend-type-row:eq(0)").append(l(j)):a(".recommend-type-row:eq(1)").append(l(j))}}a(".recyle-box-row").delegate(".recyle-box-thing img","click",function(){var c=a(this).attr("data-url");c&&b.goUrl(a(this).attr("data-url"))}),a(".swiper-wrapper").delegate(".swiper-slide","click",function(){var c=a(this).attr("data-url");c&&b.goUrl(a(this).attr("data-url"))}),a(".activity-row").delegate(".activity-text","click",function(){var c=a(this).attr("data-url");c&&b.goUrl(a(this).attr("data-url"))}),a(".activity-row").delegate(".activity-common","click",function(){var c=a(this).attr("data-url");c&&b.goUrl(a(this).attr("data-url"))}),a(".question-box").delegate(".question-box-info","click",function(){var c=a(this).attr("data-url");c&&b.goUrl(a(this).attr("data-url"))}),a(".question-box").delegate(".question-box-title","click",function(){var c=a(this).attr("data-url");c&&b.goUrl(a(this).attr("data-url"))}),a(".recommend-type-row").delegate(".recomend-type-click","click",function(){var c=a(this).attr("data-url");c&&b.goUrl(a(this).attr("data-url"))});new Swiper(".swiper-container",{pagination:".swiper-pagination",grabCursor:!0,loop:!0,autoplay:3e3,autoplayDisableOnInteraction:!1});g=a("#recyle").offset().top,h=a("#buy-used").offset().top},function(a){console.log(a)})},getSeckill:function(d){var e=d?"secKillId="+d:"",f={url:b.getHost()+"/search/v1/secKill",data:e};b.load(f).then(function(e){if(0==e.code){var f=e.data,g=c.template(a("#seckillTime").text());a(".recommend-seckill-time").html(g({array:f.secKillList}));var h={};d?(f.secKillList||[]).forEach(function(a){d==a.secKillId&&(h=a)}):h=f.secKillList[0];var i=0;h.items.forEach(function(a){a.mainPic=b.getHost(2)+a.mainPic,i+=3.03}),a(".recommend-seckill-list ul").css("width",i+"rem");var j=c.template(a("#seckillList").text());a(".recommend-seckill-list ul").html(j(h)),d?a(".recommend-seckill-time span[data-id="+d+"]").addClass("recommend-seckill-active"):a(a(".recommend-seckill-time div span:first-child")[0]).addClass("recommend-seckill-active"),a("img.lazy-seckill").lazyload({placeholder:"",effect:"fadeIn",threshold:180,container:a(".recommend-seckill-list ul")})}else a(".recommend .recommend-seckill").hide()},function(a){console.log(a)})},getMarket:function(){var d={url:b.getHost()+"/search/v1/circleRecommend"};b.load(d).then(function(d){if(0==d.code){var e=d.data,f=c.template(a("#marketTmp").text()),g=2.2,h=e.circleRecommendList;h.forEach(function(a){for(var c=0;c<a.items.length;c++){var d=a.items[c];d.mainPic=b.getHost(2)+d.mainPic}g+=6.8}),a(".market-list ul").css("width",g+"rem"),a(".market-list ul li").before(f({array:h}))}else a(".market").hide()},function(a){console.log(a)})},getMarkActive:function(){var a={url:"/data/home/market-active.json",data:"ids=56,57,58,59,100",dataType:"json"};b.load(a).then(function(a){},function(a){console.log(a)})},getGoods:function(){var d={url:b.getHost()+"/search/v1/hot"};b.load(d).then(function(d){var e=d.data,f=e.recommendItemList;if(f.length)for(var g=0;g<f.length;g++){var h=a("#goods-list-left"),i=a("#goods-list-right"),k=h.outerHeight(),l=i.outerHeight(),m=f[g];m.mainPic=b.getHost(2)+m.mainPic;var n=c.template(a("#goodsTmp").text());k>l?i.append(n(m)):h.append(n(m))}else{var h=a("#goods-list-left"),i=a("#goods-list-right"),k=h.outerHeight(),l=i.outerHeight();a(".goods-list").css("height",k>l?k:l),j.isall=!1}j.isload=!1},function(a){console.log(a)})},getNearby:function(){var d={url:b.getHost()+"/search/v1/nearby"};b.load(d).then(function(d){var e=d.data,f=e.nearbyItemList,g=c.template(a("#nearbyTmp").text());return f.length?(f.forEach(function(a){var c=0;a.mainPic=b.getHost(2)+a.mainPic;for(var d=0;d<a.pics.length;d++)a.pics[d]=b.getHost(2)+a.pics[d],c+=2.975;a.width=c+"rem"}),a(".nearby-list").append(g({array:f})),void(j.isload=!1)):void(j.isall=!1)},function(a){b.lightToast("网络异常，稍后重试")})}};k.init()});