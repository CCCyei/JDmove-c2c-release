require(["jquery","utils","share","fastclick"],function(a,b,c,d){d.attach(document.body);var e={init:function(){var a=b.getParameter("dealId");b.isNotEmpty(a)?e.para.dealId=a:(b.log("订单参数不能为null"),e.para.dealId="10121"),e.getDealDetail(),e.getCmsData(),e.addClick()},addClick:function(){a(".ui-pay-bottom span").unbind("click").bind("click",function(){e.setShareInfo(3)})},para:{dealId:"",prodData:{},cmsData:[]},getDealDetail:function(){var a={url:b.getHost(1)+"/order/v1/deal/secGetDealDetail",data:{dealId:e.para.dealId}};b.load(a).then(function(a){a&&0==a.code?(b.log("订单详情信息"+JSON.stringify(a)),e.para.prodData=a.data,e.setShareInfo(4)):b.log("订单数据获取异常"+JSON.stringify(a))},function(a){b.lightToast("网络异常，稍后重试")})},getCmsData:function(){var a={url:b.getHost()+"/cms?ids=share_xcx",data:{}};b.load(a).then(function(a){a&&0==a.code?a.data.share_xcx&&a.data.share_xcx.length>0&&(e.para.cmsData=a.data.share_xcx,e.setShareInfo(4)):b.isNotEmpty(a.tip)?b.lightToast(a.tip):b.lightToast("快递列表数据异常")},function(a){b.lightToast("网络异常，稍后重试")})},setShareInfo:function(a){var c="//paipai.m.jd.com/c2c/image/btn-paywelcome.png",d="买家已经等不及了，快来小程序发货吧！",f="gh_59c4a5d8d8eb";b.isNotEmpty(e.para.prodData.pic)&&e.para.prodData.pic.length>0&&(c=b.getImgUrl(e.para.prodData.pic[0],"120x120")),b.isNotEmpty(e.para.cmsData)&&(d=b.isNotEmpty(e.para.cmsData[0].context)?e.para.cmsData[0].context:d,f=b.isNotEmpty(e.para.cmsData[0].mpId)?e.para.cmsData[0].mpId:f);var g="/pages/c2corder/detail?dealId="+e.para.dealId,h={type:"1",shareType:a,title:d,subTitle:"我的分享描述信息",imageUrl:"分享图片的链接地址",shareUrl:c,mpId:f,mpPath:g,mpIconUrl:c};console.log(JSON.stringify(h)),location.href="openapp.paipai://setAPPInfo/app?param="+encodeURIComponent(JSON.stringify(h))}};e.init()});