function showDate(a){var b=!1;return 36e3>nowDate-a/1e3&&(b=!0),b}var nowDate=0;window.devicePixelRatio&&window.devicePixelRatio>=2&&$(".cpf-kinds-content").addClass("hairlines"),require(["jquery","jweixin","utils","dot","ext","upreport","share","fastclick","JSSDK"],function(a,b,c,d,e,f,g,h,i){"use strict";h.attach(document.body);var j=c.getParameter("ism")||"",k={init:function(){var b=c.getParameter("ids")||"";f.init(b),a(".cpf-tip").addClass("cpf-tip2").removeClass("hide"),k.initScroll(),k.goScroll(),k.initPara(function(){k.req.getHeader()}),k.addClick(),3==c.getType()?(("miniprogram"!==window.__wxjs_environment||"H5"===c.getAppType())&&("jd"===c.getAppType()||"miniprogram"===window.__wxjs_environment||"yes"!=c.getParameter("ism")&&e.init()),a(".btn-public").addClass("ui-hide")):a(".btn-public").removeClass("ui-hide"),k.initShareInfo(),window.devicePixelRatio&&window.devicePixelRatio>=2&&a(".cpf-kinds-content").addClass("hairlines"),k.setShare()},initPara:function(a){var b=c.getParameter("ids");if(c.isNotEmpty(b)){var d=b.split(",");3==d.length?(k.ids.header=d[0],k.ids.intr=d[1],k.ids.starpool=d[2],k.ids.reqIds=b,a()):console.log("获取参数错误")}},ids:{header:"",intr:"",starpool:"",reqIds:""},isFirst:!0,isLoading:!1,count:"",para:{kindsWidth:2e3,item:[],num:1,top:"",firstTime:0,isTop:!1,isScroll:!1,isLast:!1},addClick:function(){a("#kindsShow").undelegate("li","click").delegate("li","click",function(){a(this).addClass("curr").siblings().removeClass("curr"),a("#kindsShow b").addClass("ui-hide"),a(this).find("b").removeClass("ui-hide"),k.req.getPoolItem()}),a(".cpf-list").undelegate(".item-heart","click").delegate(".item-heart","click",function(){var b=a(this),c=b.data("tag"),d=b.data("commentid"),e=parseInt(b.data("num")),f="";0==c?(c=1,f="image/icon_heart.png",e-=1):(c=0,f="image/icon_heart_se.png",e+=1),k.req.savaInterest(d,c,function(){b.html('<img src="'+f+'">'+e),b.data("tag",c),b.data("num",e)})}),a(".item-img-list").undelegate("ul","click").delegate("ul","click",function(){var d=a(this).children("li").data("commentid");return"miniprogram"===window.__wxjs_environment?void b.miniProgram.navigateTo({url:"/pages/goods/detail2c?id="+d}):void(j?c.goUrl("/goodsDetail.html?itemid="+d):location.href='openapp.paipai://pushToC2CDetail/app?param={"key1":'+d+"}")}),a(".cp-floor").undelegate(".item-comment","click").delegate(".item-comment","click",function(){var d=a(this).data("commentid");return"miniprogram"===window.__wxjs_environment?void b.miniProgram.navigateTo({url:"/pages/goods/detail2c?id="+d}):void(j?c.goUrl("/goodsDetail.html?itemid="+d):location.href='openapp.paipai://pushToC2CDetail/app?param={"key1":'+d+"}")}),a(".cp-floor").undelegate(".item-title","click").delegate(".item-title","click",function(){var d=a(this).data("commentid");return"miniprogram"===window.__wxjs_environment?void b.miniProgram.navigateTo({url:"/pages/goods/detail2c?id="+d}):void(j?c.goUrl("/goodsDetail.html?itemid="+d):location.href='openapp.paipai://pushToC2CDetail/app?param={"key1":'+d+"}")}),a(".btn-public .btn-tap").unbind("click").bind("click",function(){c.setDoubleClick(function(){location.href="openapp.paipai://c2cPublish/app"})}),a(".cpf-item").undelegate(".it-left img","click").delegate(".it-left img","click",function(){var b=a(this).data("uin");j?c.goUrl("/mine/personal/personalSell?ouin="+b):location.href='openapp.paipai://getUserInfo/app?param={"uin":"'+b+'"}'}),a("#scroll-banner").undelegate("a","click").delegate("a","click",function(){var b=a(this).data("href");c.goUrl(b)})},initShareInfo:function(){var a={method:"setAPPInfo",params:{type:1,title:"拍拍二手 - 个人闲置",subTitle:"自主定价、信息真实、最大程度保障交易安全",shareUrl:window.location.href}};c.setAppInfo(a);var b={method:"setAPPInfo",params:{type:3}};c.setAppInfo(b)},setShare:function(){var a,b={url:window.location.href,title:"拍拍二手- 京东订单一键转卖",qzone_title:"拍拍二手- 京东订单一键转卖",wechat_title:"拍拍二手- 京东订单一键转卖",wechat_time_title:"自主定价、信息真实、最大程度保障交易安全",wechat_desc:"自主定价、信息真实、最大程度保障交易安全",qq_desc:"自主定价、信息真实、最大程度保障交易安全",qzone_desc:"自主定价、信息真实、最大程度保障交易安全",img:"https://paipai.m.jd.com/c2c/image/pai-2x.png",isCallBack:"Y"};a="h5"==c.getLoginType()?"":"jd",setTimeout(g.init(b,a),300)},initScroll:function(){window.addEventListener("scroll",function(){var b=document.documentElement&&document.documentElement.scrollTop||document.body.scrollTop,d=c.setUrlParam(window.location.href,"translateY",b),e=(new Date).getTime(),f=k.para.firstTime;e-f>5e3&&(k.para.firstTime=e,history.replaceState("",document.title,d)),c.scrollLoad({loadData:function(){k.para.isLast||(k.para.num++,k.req.getPoolItem(!0))}}),k.para.isScroll?k.para.isScroll=!1:c.isNotEmpty(k.para.top)&&b>=k.para.top?(a(".cpf-kinds-list").css({position:"fixed",top:"0"}),k.para.isTop=!0,a(".cpf-list").addClass("addminheight")):k.para.top-b<40&&3!=c.getType()&&k.para.isLast?(a(".cpf-kinds-list").css({position:"fixed",top:"0"}),k.para.isTop=!0,a(".cpf-list").addClass("addminheight")):(a(".cpf-kinds-list").css({position:"relative",top:"0"}),k.para.isTop=!1,a(".cpf-list").removeClass("addminheight"))})},goScroll:function(){var a=c.getParameter("translateY");null!=a&&window.scrollTo(0,a)},req:{getHeader:function(){var b={url:c.getHost()+"/cms",data:{ids:k.ids.reqIds}};c.load(b).then(function(b){if(c.isNotEmpty(b)&&"0"==b.code){if(c.isNotEmpty(b.data[k.ids.header])){var d={method:"h5TitleEdit",params:{key1:b.data[k.ids.header][0].title}};c.setAppInfo(d),"jd"===c.getAppType()?i.WebView.setTitleText(b.data[k.ids.header][0].title||"个人闲置"):2!=c.getDevicesType()&&a("title").html(b.data[k.ids.header][0].title||"个人闲置"),a(".top-image").children("img").attr("src",getImageIcon("/paipai/",b.data[k.ids.header][0].bgImg,"")),a(".img-text-1").html(b.data[k.ids.header][0].firstText),a(".img-text-1").css("color",b.data[k.ids.header][0].titleColor),a(".img-text-2").html(b.data[k.ids.header][0].secondText),a(".img-text-2").css("color",b.data[k.ids.header][0].titleColor)}c.isNotEmpty(b.data[k.ids.intr])&&(a(".cpt-text-title").html(b.data[k.ids.intr][0].title),a(".cpt-text-title").css("color",b.data[k.ids.intr][0].titleColor),a(".cpt-text-contain").html(b.data[k.ids.intr][0].introduce)),c.isNotEmpty(b.data[k.ids.starpool])&&(k.render.pool(b.data[k.ids.starpool]),k.para.top=a(".cpf-kinds-list").offset().top)}else c.isNotEmpty(b.tip)?c.lightToast(b.tip):console.log("顶部信息获取异常")},function(a){c.lightToast("网络有误 请再试一次")})},getPoolItem:function(b,d,e){c.isEmpty(b)&&(k.para.num=1);var f=a("#kindsShow  .curr").data("poolid");if(c.isNotEmpty(f)){var g={url:c.getHost()+"/item/v1/getPoolItem",data:{poolId:f,pageIndex:k.para.num,pageSize:10}};c.isNotEmpty(e)&&(g.data={poolId:d,pageSize:50,pageIndex:1,flag:1}),c.load(g).then(function(a){k.isLoading=!1,nowDate=a.currentTime,"0"==a.code?c.isNotEmpty(e)?e(a.data):(k.render.itemList(a.data),c.isEmpty(a.data)||c.isNotEmpty(a.data)&&0==a.data.length?k.para.isLast=!0:k.para.isLast=!1):(k.para.num=k.para.num-1,c.isNotEmpty(a.tip)?c.lightToast(a.tip):console.log("获取商品池信息异常"))},function(a){k.para.num=k.para.num-1,console.log("num:",k.para.num),c.lightToast("网络有误 请再试一次"),c.para.last++})}},savaInterest:function(a,b,d){var e={url:c.getHost()+"/interest/save",data:{commodityId:a,isInterest:b}};c.load(e).then(function(a){"0"==a.code?(0==b&&c.lightToast("收藏成功在我的收藏查看"),c.isNotEmpty(d)&&d()):c.isNotEmpty(a.tip)?c.lightToast(a.tip):console.log("获取商品池信息异常")},function(a){c.lightToast("网络有误 请再试一次")})}},render:{pool:function(b){b=b||[],b.length>0?a("#kindsShow").html(d.template(a(".pool").text())(b)):c.log("广告数据异常"),k.setPoolSelect(),k.addClick(),a("#kindsShow").attr("clstag","pageclick|keycount|PaiPai_201712112|18")},header_text:function(b){var c=a(".img-text-1");b&&b.length>0?c?c.append(d.template(a(".itemList").text())(b)):(a(".cpf-list").html(d.template(a(".itemList").text())(b)),k.para.isTop&&window.scrollTo(0,k.para.top)):console.log("这里没有数据"),k.addClick()},itemList:function(b){b&&b.length>0?(1!=k.para.num?a(".cpf-list").append(d.template(a(".itemList").text())(b)):(a(".cpf-list").html(d.template(a(".itemList").text())(b)),k.para.isTop?(a(".cpf-list").addClass("addminheight"),k.para.isScroll=!0,window.scrollTo(0,k.para.top)):a(".cpf-list").removeClass("addminheight")),a(".cpf-list").removeClass("hide"),a(".bgview").addClass("hide")):(1==k.para.num&&(a(".bgview").removeClass("hide").addClass("bgview2"),a(".cpf-list").addClass("hide"),a(".bgview p").text("你查看的商品不见了~")),console.log("这里没有数据")),k.addClick(),a(".item-heart").attr("clstag","pageclick|keycount|PaiPai_201712112|19"),a(".item-comment").attr("clstag","pageclick|keycount|PaiPai_201712112|20")}},setPoolSelect:function(){var b=c.getParameter("poolId");c.isNotEmpty(b)?a("#kindsShow li").each(function(){a(this).data("poolid")==b&&a(this).click()}):a("#kindsShow li").first().click()}};k.init(),window.onpageshow=function(a){a.persisted&&k.initShareInfo()}});