function callBack(a){var a={id:"id",params:{param1:"param1",param2:"param2",param3:"param3"}};console.log(JSON.stringify(a).toString());var b='{"id":"id","params":{"param1":"param1","param2":"param2","param3":"param3"}}';console.log(JSON.parse(b))}require(["jquery","utils","paipaiSDK"],function(a,b,c){var d={init:function(){this.bottomBanner(),this.callPpSdk(),this.getPpSdk(),this.setPpSdk()},iphoneOpenAppLt500:function(a,b){return'openapp.jdmobile://communication?params={"action":"'+b+'","title":"'+a.title+'","content":"'+a.content+'","shareUrl":"'+a.url+'","iconUrl":"'+a.img+'","isCallBack":"'+a.callbackSwitcher+'"}'},bottomBanner:function(){a(".submenu").on("click",function(){var b=a(this),c=b.index();b.hasClass("selected")||(b.addClass("selected").siblings().removeClass("selected"),a(".content ul").addClass("hide").eq(c).removeClass("hide"))})},callPpSdk:function(){a("#openJdShare").on("click",function(){var a={title:"京东超市，天天低价抢购！",content:"每日京喜好货，都在京东超市天天抢购！早市、午市、晚市，三个时段，不让品质低价偷偷溜走！",url:"http://h5.m.jd.com/active/rushbuying/index.html",img:"http://m.360buyimg.com/n1/s120x120_jfs/t2566/341/1119128176/23675/6356333b/568e3d86Naa36a750.jpg",channel:"",callback:null};location.href=d.iphoneOpenAppLt500(a,"syncShareData")}),a("#callCamera").on("click",function(){var a=-1!=UA.indexOf("supportJDSHWK/1")||1==window._is_jdsh_wkwebview;if(a){var b={method:"showNativeUpload"};window.webkit.messageHandlers.MobileNavi.postMessage(b)}else window.MobileNavi&&window.MobileNavi.showNativeUpload();window.location.href="objc://callCamera"}),a("#openNews").on("click",function(){var a={method:"news",params:{bizType:b.getParameter("bizType")}},c=b.getParameter("noticeType");b.isNotEmpty(c)&&(a.params.noticeType=c),location.href="openapp.paipai://callapp/app?param="+encodeURIComponent(JSON.stringify(a))}),a("#pushToHome").on("click",function(){c.call.pushToHome()}),a("#pushToProfileHome").on("click",function(){c.call.pushToProfileHome(11078)}),a("#getUserInfo").on("click",function(){c.call.getUserInfo(11161)}),a("#pushToOthersHome").on("click",function(){c.call.pushToOthersHome(11078)}),a("#close").on("click",function(){c.call.close()}),a("#myMarket").on("click",function(){c.call.myMarket()}),a("#marketHome").on("click",function(){c.call.marketHome()}),a("#marketCreate").on("click",function(){c.call.marketCreate()}),a("#marketInviteList").on("click",function(){c.call.marketInviteList(15)}),a("#marketDetail").on("click",function(){c.call.marketDetail(15)}),a("#pushToC2CDetail").on("click",function(){c.call.pushToC2CDetail(215937)}),a("#pushToB2CDetail").on("click",function(){c.call.pushToB2CDetail(8415430901,2)}),a("#c2cPublish").on("click",function(){c.call.c2cPublish()}),a("#goodsEdit").on("click",function(){c.call.goodsEdit(1404466)}),a("#pushToMessageList").on("click",function(){c.call.pushToMessageList()}),a("#pushToSearch").on("click",function(){c.call.pushToSearch("手机")}),a("#showSearchPage").on("click",function(){c.call.showSearchPage("手机",12)}),a("#pushToGoodsClassify").on("click",function(){c.call.pushToGoodsClassify()}),a("#publish").on("click",function(){c.call.publish()}),a("#publishMask").on("click",function(){c.call.publishMask()}),a("#pubWithActC2C").on("click",function(){c.call.pubWithAct(0,11)}),a("#pubWithAct").on("click",function(){c.call.pubWithAct(1,11)}),a("#fengkong").on("click",function(){c.call.fengkong()}),a("#scanQRCodeOpenWebPage").on("click",function(){try{c.call.scanQRCodeOpenWebPage()}catch(a){}}),a("#pushToHuanXinChat").on("click",function(){c.call.pushToHuanXinChat(70078717507)}),a("#im").on("click",function(){c.call.im(323926,11315)}),a("#showBigPic").on("click",function(){c.call.showBigPic(["//m.360buyimg.com/paipai/s160x160_jfs/t9814/5/1752052061/307111/80455dc6/59e59be8Nb0f40f97.jpg!cc_1x1"],0)}),a("#getPhoneInfo").on("click",function(){c.call.getPhoneInfo(function(a){0!==a.error&&alert("app版本 "+JSON.stringify(a))}),c.call.getPhoneInfo()}),a("#showSearchList").on("click",function(){c.call.showSearchList()}),a("#poolPublish").on("click",function(){c.call.poolPublish(122011)}),a("#showLoginViewController").on("click",function(){c.call.showLoginViewController("//paipai.m.jd.com/c2c/orderDetail.html?dealId=220426")}),a("#logOut").on("click",function(){c.call.logOut()}),a("#openLocation").on("click",function(){c.call.openLocation()}),a("#pickImage").on("click",function(){c.call.pickImage(0)}),a("#takePhotos").on("click",function(){c.call.takePhotos(1,!1)}),a("#pushToResaleOrder").on("click",function(){var a='{"address":"北京大兴区五环至六环之间经海路与科创十二街交叉口东北角京东总部","buttonType":0,"charactersDesc":"片仔癀 痘痘清（乳）40ml（男女控油祛痘 祛痘印去粉刺） 感兴趣的话给我留言吧","classId":13768,"commodityTitle":"片仔癀 痘痘清（乳）40ml（男女控油祛痘 祛痘印去粉刺）","consumeLevel":3,"dealId":71540937878,"disDealId":"71540937878","invoiceType":0,"isResale":0,"key":"72-_-71540937878-_-1-_-0-_-0-_-","mainPic":"jfs/t18754/202/1061568732/175138/7cc4c5df/5ab9f07cNee760399.jpg","orderTime":1519384651,"originalCost":"143.00","otherClassId":1391,"otherPlatformCommodityId":"1209152","parentClassId":0,"resellState":0,"telIsAudit":0,"tradeId":"71540937878"}';c.call.pushToResaleOrder(encodeURIComponent(a))}),a("#pushToActivity").on("click",function(){c.call.pushToActivity("//paipai.m.jd.com/c2c/unused.html?poolId=122011")}),a("#webViewNavigationBarClick").on("click",function(){c.call.webViewNavigationBarClick({url:"http://gm.m.paipai.com/c2c/mine/order?type=1",tag:"",list:[{icon:"jfs/t19732/126/2055283868/9392/62025b9e/5ae447f4N42cf39a3.png",value:"全部",key:"-1"},{icon:"jfs/t18430/171/2014439368/9392/62025b9e/5ae44806N97e6169f.png",value:"自营",key:"1"},{icon:"jfs/t19312/334/2075479085/9392/62025b9e/5ae44a10N615e961f.png",value:"商家",key:"2"},{icon:"jfs/t19630/352/2094537033/9392/62025b9e/5ae44a2aN753a9c6f.png",value:"分期用",key:"3"},{icon:"jfs/t19969/295/82100108/9392/62025b9e/5ae44a42N4db9a586.png",value:"闲置",key:"4"}]})})},getPpSdk:function(){a("#scanQRCode").on("click",function(){c.get.scanQRCode(function(a){})}),a("#share").on("click",function(){var a={title:"拍拍分享",subTitle:"我的分享描述信息",imageUrl:"//img10.360buyimg.com/n2/jfs/t2626/251/3761720974/105038/4dd496f3/5799c04aN945cc84f.jpg!q95.webp",shareUrl:"//huishou.m.jd.com"};try{c.get.share(a)}catch(b){}}),a("#permissionToCheck").on("click",function(){var b=function(a,b){alert("type="+a+"；check="+b)};c.get.permissionToCheck(a("#permissionToCheckInput").val(),b)})},setPpSdk:function(){a(".setRigthInfo").on("click",function(){var b=a(this).attr("data-type"),d={};1==b||(2==b?(d.type=1,d.shareType=0):3==b?(d.type=1,d.shareType=1):4==b&&(d.type=1,d.shareType=2));try{c.set.setRigthInfo(d)}catch(e){}}),a("#saveImage").on("click",function(){c.set.saveImage("//m.360buyimg.com/paipai/s160x160_jfs/t18214/10/482649219/68937/64d86f08/5a90fc64N914c0e81.jpg!cc_1x1")}),a("#h5TitleEdit").on("click",function(){c.set.h5TitleEdit("我的title")}),a("#changeNickname").on("click",function(){c.set.changeNickname()}),a("#setTopBarShare").on("click",function(){var a={title:"拍拍分享",subTitle:"我的分享描述信息",imageUrl:"//img10.360buyimg.com/n2/jfs/t2626/251/3761720974/105038/4dd496f3/5799c04aN945cc84f.jpg!q95.webp",shareUrl:"//huishou.m.jd.com"};try{c.set.setTopBarShare(a)}catch(b){}}),a("#setTopBarSearch").on("click",function(){var a={searchType:1,key:"手机"};try{c.set.setTopBarSearch(a)}catch(b){}}),a("#callAlert").on("click",function(){}),c.call.callAlert(option)}};d.init()});var option={title:"测试标题",content:"测试内容",buttons:[{id:"btn1",text:"按钮文本1"},{id:"btn2",text:"按钮文本2"}],maskId:"maskId"};paipaiSDK.call.showAlert(option);