function showDate(a){var b=!1;return 36e3>nowDate-a/1e3&&(b=!0),b}var nowDate=0;window.devicePixelRatio&&window.devicePixelRatio>=2&&$(".cpf-kinds-content").addClass("hairlines"),require(["jquery","utils","dot","ext","swipe","upreport","share","fastclick"],function(a,b,c,d,e,f,g,h){"use strict";h.attach(document.body);var i,j={init:function(){f.init(),a(".cpf-tip").addClass("cpf-tip2").removeClass("hide"),j.goScroll(),j.req.getCms(j.ids.reqIds),j.addClick(),3==b.getType()?(d.init(),a(".btn-public").addClass("ui-hide")):a(".btn-public").removeClass("ui-hide"),j.initShareInfo(),window.devicePixelRatio&&window.devicePixelRatio>=2&&a(".cpf-kinds-content").addClass("hairlines"),j.initScroll(),j.setShare()},isFirst:!0,isLoading:!1,count:"",para:{kindsWidth:2e3,item:[],num:1,top:"",firstTime:0,isTop:!1,isScroll:!1,isLast:!1},addClick:function(){a("#topbanner").undelegate(".item","click").delegate(".item","click",function(){var c=a(this).data("url");b.isNotEmpty(c)&&(location.href=c)}),a("#kindsShow").undelegate("li","click").delegate("li","click",function(){a(this).addClass("curr").siblings().removeClass("curr"),a("#kindsShow b").addClass("ui-hide"),a(this).find("b").removeClass("ui-hide"),j.req.getPoolItem()}),a(".cpf-list").undelegate(".item-heart","click").delegate(".item-heart","click",function(){var b=a(this),c=b.data("tag"),d=b.data("commentid"),e=parseInt(b.data("num")),f="";0==c?(c=1,f="image/icon_heart.png",e-=1):(c=0,f="image/icon_heart_se.png",e+=1),j.req.savaInterest(d,c,function(){b.html('<img src="'+f+'">'+e),b.data("tag",c),b.data("num",e)})}),a(".item-img-list").undelegate("ul","click").delegate("ul","click",function(){var c=a(this).children("li").data("commentid");b.setDoubleClick(function(){location.href='openapp.paipai://pushToC2CDetail/app?param={"key1":'+c+"}"})}),a(".cp-floor").undelegate(".item-comment","click").delegate(".item-comment","click",function(){var c=a(this).data("commentid");b.setDoubleClick(function(){location.href='openapp.paipai://pushToC2CDetail/app?param={"key1":'+c+"}"})}),a(".cp-floor").undelegate(".item-title","click").delegate(".item-title","click",function(){var c=a(this).data("commentid");b.setDoubleClick(function(){location.href='openapp.paipai://pushToC2CDetail/app?param={"key1":'+c+"}"})}),a(".btn-tap").unbind("click").bind("click",function(){b.setDoubleClick(function(){location.href="openapp.paipai://c2cPublish/app"})}),a(".cpt-bottom-list").unbind("click").bind("click","click",function(){b.setDoubleClick(function(){location.href=" openapp.paipai://c2cPublish/app"})}),a(".cpf-item").undelegate(".it-left img","click").delegate(".it-left img","click",function(){var c=a(this).data("uin");b.setDoubleClick(function(){location.href='openapp.paipai://getUserInfo/app?param={"uin":"'+c+'"}'})})},initTopSwiper:function(){b.initAll();var c=a("html").css("font-size");new e("#topbanner .swiper-container",{pagination:"#topbanner .swiper-pagination",startSlide:1,continuous:!0,autoplayDisableOnInteraction:!1,autoplay:!1,offsetPxBefore:.4*parseFloat(c),offsetPxAfter:.4*parseFloat(c),loop:!1,slidesPerView:"auto",paginationClickable:!0,loopedSlides:2,roundLengths:!0,onSlideChangeStart:function(a){}})},initShareInfo:function(){var a={method:"setAPPInfo",params:{type:1,title:"拍拍二手 - 个人闲置",subTitle:"自主定价、信息真实、最大程度保障交易安全",shareUrl:window.location.href}};b.setAppInfo(a);var c={method:"setAPPInfo",params:{type:3}};b.setAppInfo(c)},setShare:function(){var a,c={url:window.location.href,title:"拍拍二手- 京东订单一键转卖",qzone_title:"拍拍二手- 京东订单一键转卖",wechat_title:"拍拍二手- 京东订单一键转卖",wechat_time_title:"自主定价、信息真实、最大程度保障交易安全",wechat_desc:"自主定价、信息真实、最大程度保障交易安全",qq_desc:"自主定价、信息真实、最大程度保障交易安全",qzone_desc:"自主定价、信息真实、最大程度保障交易安全",img:"https://paipai.m.jd.com/c2c/image/pai-2x.png",isCallBack:"Y"};a="h5"==b.getLoginType()?"":"jd",setTimeout(g.init(c,a),300)},ids:{pool_gg:"pool_gg",idle_pool:"idle_pool",img_foor:"img_foor",idle_header:"idle_header",idle_title:"idle_title",reqIds:"pool_gg,idle_pool,img_foor,idle_header,idle_title"},initScroll:function(){window.addEventListener("scroll",function(){var c=document.documentElement&&document.documentElement.scrollTop||document.body.scrollTop,d=b.setUrlParam(window.location.href,"translateY",c),e=(new Date).getTime(),f=j.para.firstTime;e-f>300&&(j.para.firstTime=e,history.replaceState("",document.title,d)),b.scrollLoad({loadData:function(){j.para.isLast||(j.para.num++,j.req.getPoolItem(!0))}}),j.para.isScroll?j.para.isScroll=!1:b.isNotEmpty(j.para.top)&&c>=j.para.top?(a(".cpf-kinds-list").css({position:"fixed",top:"0"}),j.para.isTop=!0,a(".cpf-list").addClass("addminheight")):j.para.top-c<40&&3!=b.getType()&&j.para.isLast?(a(".cpf-kinds-list").css({position:"fixed",top:"0"}),j.para.isTop=!0,a(".cpf-list").addClass("addminheight")):(a(".cpf-kinds-list").css({position:"relative",top:"0"}),j.para.isTop=!1,a(".cpf-list").removeClass("addminheight"))})},goScroll:function(){var a=b.getParameter("translateY");null!=a&&window.scrollTo(0,a)},req:{getCms:function(c,d){var e={url:b.getHost()+"/cms",data:{ids:c,jap:jap}};b.load(e).then(function(c){if(b.isNotEmpty(c)&&"0"==c.code){if(b.isNotEmpty(d))d(c);else if(b.isNotEmpty(c.data[j.ids.idle_pool])&&j.render.pool(c.data[j.ids.idle_pool]),b.isNotEmpty(c.data[j.ids.pool_gg])&&j.render.scrollBanner(c.data[j.ids.pool_gg]),b.isNotEmpty(c.data[j.ids.img_foor])&&j.render.floor(c.data[j.ids.img_foor]),b.isNotEmpty(c.data[j.ids.idle_header])&&j.render.banner(c.data[j.ids.idle_header]),b.isNotEmpty(c.data[j.ids.idle_title])){var e=c.data[j.ids.idle_title];if(b.isNotEmpty(e)&&e.length>0){a("title").html(e[0].title);var f={method:"h5TitleEdit",params:{key1:e[0].title}};b.setAppInfo(f)}}setTimeout(function(){j.para.top=a(".cpf-kinds-list").offset().top},300)}else b.isNotEmpty(c.tip)?b.lightToast(c.tip):console.log("顶部信息获取异常"),setTimeout(function(){j.para.top=a(".cpf-kinds-list").offset().top},300)},function(c){j.para.top=a(".cpf-kinds-list").offset().top,b.isNotEmpty(c)&&console.log(c),b.lightToast("网络有误 请再试一次")})},getPoolItem:function(c,d,e){b.isEmpty(c)&&(j.para.num=1),b.isEmpty(d)&&(d=a("#kindsShow  .curr").data("poolid"));var f={url:b.getHost()+"/item/v1/getPoolItem",data:{poolId:d,pageIndex:j.para.num,pageSize:10}};b.isNotEmpty(e)&&(f.data={poolId:d,pageSize:50,pageIndex:1,flag:1}),b.load(f).then(function(a){j.isLoading=!1,nowDate=a.currentTime,"0"==a.code?b.isNotEmpty(e)?e(a.data):(j.render.itemList(a.data),b.isEmpty(a.data)||b.isNotEmpty(a.data)&&0==a.data.length?j.para.isLast=!0:j.para.isLast=!1):b.isNotEmpty(a.tip)?b.lightToast(a.tip):console.log("获取商品池信息异常")},function(a){b.lightToast("网络有误 请再试一次"),b.para.last++})},savaInterest:function(a,c,d){var e={url:b.getHost()+"/interest/save",data:{commodityId:a,isInterest:c}};b.load(e).then(function(a){"0"==a.code?(0==c&&b.lightToast("收藏成功在我的收藏查看"),b.isNotEmpty(d)&&d()):b.isNotEmpty(a.tip)?b.lightToast(a.tip):console.log("获取商品池信息异常")},function(a){b.lightToast("网络有误 请再试一次")})}},render:{banner:function(d){d=d||[],d.length>0?(a(".swiper-wrapper").html(c.template(a("#banner").text())(d)),j.initTopSwiper()):b.log("广告数据异常"),j.addClick()},floor:function(d){if(d&&d.length>0){var e="";d.forEach(function(a){e=b.isNotEmpty(e)?e+","+a.imgmodule:a.imgmodule}),j.req.getCms(e,function(b){d.forEach(function(a){0==b.code&&b.data&&(a.itemList=b.data[a.imgmodule])}),a(".cpt-bottom").html(c.template(a("#floor").text())(d))}),j.addClick()}else console.log("参数异常")},pool:function(d){d=d||[],d.length>0?a("#kindsShow").html(c.template(a(".pool").text())(d)):b.log("广告数据异常"),j.setPoolSelect(),j.addClick(),a("#kindsShow").attr("clstag","pageclick|keycount|PaiPai_201712112|27")},header_text:function(b){var d=a(".img-text-1");b&&b.length>0?d?d.append(c.template(a(".itemList").text())(b)):(a(".cpf-list").html(c.template(a(".itemList").text())(b)),j.para.isTop&&window.scrollTo(0,j.para.top)):console.log("这里没有数据"),j.addClick()},itemList:function(b){b&&b.length>0?(1!=j.para.num?a(".cpf-list").append(c.template(a(".itemList").text())(b)):(a(".cpf-list").html(c.template(a(".itemList").text())(b)),j.para.isTop?(a(".cpf-list").addClass("addminheight"),j.para.isScroll=!0,window.scrollTo(0,j.para.top)):a(".cpf-list").removeClass("addminheight")),a(".cpf-list").removeClass("hide"),a(".bgview").addClass("hide")):(1==j.para.num&&(a(".bgview").removeClass("hide").addClass("bgview2"),a(".cpf-list").addClass("hide"),a(".bgview p").text("你查看的商品不见了~")),console.log("这里没有数据")),j.addClick(),a(".item-heart").attr("clstag","pageclick|keycount|PaiPai_201712112|28"),a(".item-comment").attr("clstag","pageclick|keycount|PaiPai_201712112|29"),a(".item-comment").attr("pageId","154")},scrollBanner:function(d){var e=d||[],f=[];if(d&&d.length>0){e=d[0];var g={};g.desc="闲置物品都卖掉！换成钱！",g.ids="闲置物品都卖掉！换成钱！",g.img="./image/icon_channel_first.png",g.title="拍拍小迷妹",f.push(g),a("#scroll-banner ul").html(c.template(a("#scroll").text())(f)),j.req.getPoolItem(!1,e.poolId,function(d){if(d.forEach(function(a,c){var d={},e=b.isNotEmpty(a.nickname)?a.nickname:"匿名";d.desc=b.isNotEmpty(a.commodityTitle)?a.commodityTitle:a.charactersDesc,d.ids=a.commodityId,d.img=a.icon,b.isNotEmpty(e)&&e.length>=2?d.title=e.substring(0,1)+"***"+e.substring(e.length-1,e.length):d.title=e;var g={key1:a.commodityId},h=d.desc.split("\\n");h.length>0?d.desc=h[0]:d.desc=d.desc,d.url="openapp.paipai://pushToC2CDetail/app?param="+encodeURIComponent(JSON.stringify(g)),f.push(d)}),f.length>0?a("#scroll-banner ul").html(c.template(a("#scroll").text())(f)):b.log("广告数据异常"),a("#scroll-banner ul").length>0){var e=a("#scroll-banner");b.isNotEmpty(i)&&clearInterval(i),i=setInterval(function(){b.scrollNews(e)},3e3)}j.addClick()})}else console.log("参数异常")}},setPoolSelect:function(){var c=b.getParameter("poolId");b.isNotEmpty(c)?a("#kindsShow li").each(function(){a(this).data("poolid")==c&&a(this).click()}):a("#kindsShow li").first().click()}};j.init(),window.onpageshow=function(a){a.persisted&&j.initShareInfo()}});