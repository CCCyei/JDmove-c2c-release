

/**
 * 切换底部导航
 * @return {[type]} [description]
 */
$('.submenu').on('click', function() {
    var $this = $(this),
        index = $this.index();
    if ($this.hasClass('selected')) {
        return;
    } else {
        $this.addClass('selected').siblings().removeClass('selected');
        $('.content ul').addClass('hide').eq(index).removeClass('hide');
    }
});
//console.log(paipaiSDK)
//------ start  call protocol-----------
//唤起我的集市页
$('#mymarket').on('click', function() {

    //location.href = 'openapp.paipai://myMarket/app';
     paipaiSDK.call.myMarket();
});
//唤起我的集市首页
$('#marketHome').on('click', function() {
    console.log(1)
    //location.href = 'openapp.paipai://marketHome/app';
     paipaiSDK.call.marketHome();
});
//唤起创建集市
$('#marketCreate').on('click', function() {
    console.log(1)
    //location.href = 'openapp.paipai://marketCreate/app';
    paipaiSDK.call.marketCreate();
});


//pp
//唤起我的集市页
$('#mymarketpp').on('click', function() {
    //alert('唤起')
    //location.href = 'openapp.paipai://myMarket/app';
    paipaiSDK.call.myMarketpp();
});
//唤起我的集市首页
$('#marketHomepp').on('click', function() {
    //location.href = 'openapp.paipai://marketHome/app';
    paipaiSDK.call.marketHomepp();
});
//唤起创建集市
$('#marketCreatepp').on('click', function() {
    //location.href = 'openapp.paipai://marketCreate/app';
    paipaiSDK.call.marketCreatepp();
});


//唤起集市详情
$('#marketDetail').on('click', function() {
    //location.href = 'openapp.paipai://marketInviteList/app?param={"id":"2"}';
    paipaiSDK.call.marketDetail();
});

//唤起集市已邀请列表
$('#marketInviteList').on('click', function() {

    location.href = 'openapp.paipai://marketInviteList/app?param={"id":"2"}';
    //paipaiSDK.call.marketInviteList(2);
});


//唤起风控协议(已测试)
$('#callfengkong').on('click', function() {
    //alert('fengkong')
    location.href = 'openapp.paipai://fengkong/app';
    //paipaiSDK.call.fengkong();
})
$('#callCheckPhone').on('click', function() {
    paipaiSDK.call.checkPhone();
})
$('#callReCheckPhone').on('click', function() {
    paipaiSDK.call.reCheckPhone();
});
//回到app首页（已测试）
$('#goAppHome').on('click', function() {
    //alert('回到app首页')
    paipaiSDK.call.pushToHome();
});
//回到首页（已测试）
$('#goMyHome').on('click', function() {
    //alert('回到我的首页');
    location.href ='openapp.paipai://pushToProfileCenter/app'
    //paipaiSDK.call.openMyHomePage();
});
// 查看用户首页
$('#goUserHome').on('click', function() {

    location.href ='openapp.paipai://getUserInfo/app?param={"uin":"'+ 11161+'"}'
    paipaiSDK.call.openUserHomePage(11161);
});
//打开消息列表(已测试)
$('#goMessageList').on('click', function() {
    //alert('打开消息列表');
    location.href ='openapp.paipai://pushToMessageList/app'
    //paipaiSDK.call.openMessageList();
});
//原生搜索页面(已测试)
$('#openSearch').on('click', function() {

    paipaiSDK.call.openSearch('测试');
});
//打开分类页面（已测试)
$('#openCategory').on('click', function() {

    location.href ='openapp.paipai://pushToGoodsClassify/app'
    // paipaiSDK.call.openCategory();
});
//打开活动页(唤不起)
$('#openActivity').on('click', function() {

    location.href ='openapp.paipai://pushToActivity/app?param={"key1":"'+m.jd.com+'"}'
    //paipaiSDK.call.openActivity('m.jd.com');
});
//一键转卖商品 已测试
$('#openReSale').on('click', function() {

    location.href ='openapp.paipai://pushToResaleOrder/app?param={"key1":"'+70078717507 +'"}'
    paipaiSDK.call.openReSale(70078717507);
});
//打开商品编辑(已测试)
$('#openGoodsEdit').on('click', function() {

    //location.href ='openapp.paipai://goodsEdit/app?param={"key1":"'+70078717507 +'"}'
    paipaiSDK.call.openGoodsEdit(70078717507);
});
//打开环信 已测试
$('#openhuanxinChat').on('click', function() {

    location.href ='openapp.paipai://pushToHuanXinChat/app?param={"key1":"'+70078717507 +'"}'
    paipaiSDK.call.openhuanxinChat(70078717507);
})
//打开聊天室（已测试）
$('#openIMHome').on('click', function() {

    //location.href = 'openapp.paipai://im/app?param={"key1":"'+70078717507+'"}'
    paipaiSDK.call.openIMHome(70078717507);
})
//查看大图（已测试）
$('#openBigImg').on('click', function() {

    location.href = 'openapp.paipai://showBigPic/app?param={"key1":"{"http://m.360buyimg.com/babel/s380x420_jfs/t13042/107/1374379963/19723/d4ef5c23/5a1f73d3N6a5368a8.jpg!q90"}"}'
    paipaiSDK.call.openBigImg('http://m.360buyimg.com/babel/s380x420_jfs/t13042/107/1374379963/19723/d4ef5c23/5a1f73d3N6a5368a8.jpg!q90');
});
//关闭页面(已测试)
$('#closePage').on('click', function() {

    location.href ='openapp.paipai://close/app'
    // paipaiSDK.call.closePage();
});
//搜索结果页（已测试）
$('#openSearchResult').on('click', function() {

    //location.href ='openapp.paipai://showSearchPage/app?param={"searchKey":"'+keyword+'", "searchType":"'+type+'"}'
    paipaiSDK.call.openSearchResult('手机',12);
});
//打开一键转卖列表页面(已测试)
$('#openPublish').on('click', function() {

    //location.href = 'openapp.paipai://publish/app'
    paipaiSDK.call.openPublish();
})
//唤起B2C商品详情----待审核
//备件库  迟婉秋账号 usedNo=8415430901  type  2
// 二手优品           12762667098       type  1
$('#openB2CDetail').on('click', function() {

    //location.href = 'openapp.paipai://pushToB2CDetail/app?param={"key1":"8415430901"，"type":"2"}'
    paipaiSDK.call.openB2CDetail(8415430901,2);
});

//获取c2c商详（已测试）
$('#openC2CDetail').on('click', function() {
    //215937

    // location.href ='openapp.paipai://pushToC2CDetail/app?param={"key1":"'+215937+'"}';
    paipaiSDK.call.openC2CDetail(215937)
});

//唤起发布页面----测试过
$('#openC2cPublish').on('click',function () {
    //location.href = 'openapp.paipai://c2cPublish/app'
    paipaiSDK.call.openC2cPublish();
});
//唤起店铺搜索 ---- 待审核
/*
 * shopId  你的shopId
 * searchKey 手机
 * searchType 12
 * */

$('#showSearchList').on('click',function () {
    //location.href = 'openapp.paipai://showSearchList/app?param={"shopId":"your shopId","searchKey":"手机", "searchType":"12"}'
    paipaiSDK.call.showSearchList();
});
// 鹈鹕按钮遮罩层(已测试)
$('#publishMask').on('click',function () {

    location.href='openapp.paipai://publishMask/app'
    //paipaiSDK.call.publishMask();
});

//------ end call protocol-------------


//------ start  get protocol-----------
//二维码扫描（已测试）
$('#openScan').on('click', function() {

    location.href='openapp.paipai://scanQRCode/app?param=%7b%22methodName%22%3a%22scanQRCodeCallBack%22%7d';
    //paipaiSDK.call.openScan('%7b%22methodName%22%3a%22scanQRCodeCallBack%22%7d');
});
//打开定位（打不开）
$('#openLocation').on('click',function () {

    location.href='openapp.paipai://openLocation/app';
    paipaiSDK.get.openLocation()
});

//获取本机信息（打不开）
$('#getPhoneInfo').on('click', function() {

    location.href =  'openapp.paipai://getPhoneInfo/app',
        paipaiSDK.call.getPhoneInfo();
});
//打开分享（打不开）
$('#openShare').on('click',function () {

    //location.href = 'openapp.paipai://share/app?param={"key1":"..."}'
    //paipaiSDK.get.share('')
});

//打开登录（打不开）
$('#openLogin').on('click',function () {

    location.href = 'openapp.paipai://showLoginViewController/app?param={"key1":"2"}'
    paipaiSDK.get.login();
});

//退出登录(已测试)
$('#openLogout').on('click',function () {

    location.href = 'openapp.paipai://logOut/app';
    //paipaiSDK.get.logOut()
});
//获取本机信息（打不开）
$('#getPhoneInfo').on('click',function () {

    location.href = 'openapp.paipai://getPhoneInfo/app'
    paipaiSDK.get.getPhoneInfo()
});

//初次获取原生检测协议(打不开)
$('#aiHuiShouDetect').on('click',function () {

    location.href = 'openapp.paipai://AiHuiShouDetect/app'
    paipaiSDK.get.aiHuiShouDetect();
});

//唤起重新检测(打不开)
$('#aiHuiShouRedetect').on('click',function () {

    location.href = 'openapp.paipai://AiHuiShouRedetect/app'
    paipaiSDK.get.aiHuiShouRedetect();
});


//------ end get protocol-------------

//------ start  set protocol-----------
//设置标题（已测试）
$('#setTitle').on('click', function() {

    //location.href = 'openapp.paipai://h5TitleEdit/app?param={"key1":"' + 我的title + '"}'
    paipaiSDK.set.setTitle('我的title');
})
//设置分享 已测试
$('#setTopBarShare').on('click', function() {
    var option = {
        title: '拍拍分享',
        subTitle: '我的分享描述信息',
        imageUrl: '//img10.360buyimg.com/n2/jfs/t2626/251/3761720974/105038/4dd496f3/5799c04aN945cc84f.jpg!q95.webp',
        shareUrl: '//huishou.m.jd.com'
    }
    try {
        paipaiSDK.set.setTopBarShare(option);
    } catch (error) {

    }

})
//设置搜索 (已测试)
$('#setTopBarSearch').on('click', function() {
    var option = {
        searchType: 1,
        key: '手机'
    }
    try {
        paipaiSDK.set.setTopBarSearch(option);
    } catch (error) {

    }

});
//h5修改昵称成功  待审核
$('#changeNickname').on('click', function() {

    location.href = 'openapp.paipai://changeNickname/app'
    //paipaiSDK.set.changeNickname();
});
//保存照片协议 待审核
$('#saveImage').on('click',function () {

    //location.href = 'openapp.paipai://saveImage/app?param={"key1":"//timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1518423840201&di=32edab1fd901117fe786508a08e06b12&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F14%2F05%2F37%2F44g58PICKNd_1024.jpg"}'
    //paipaiSDK.set.saveImage()
});
//选择照片/上传照片 已测试
$('#pickImage').on('click',function () {

    // location.href = 'openapp.paipai://pickImage/app?param={"key1":"//timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1518423840201&di=32edab1fd901117fe786508a08e06b12&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F14%2F05%2F37%2F44g58PICKNd_1024.jpg"}'
    paipaiSDK.set.pickImage('//timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1518423840201&di=32edab1fd901117fe786508a08e06b12&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F14%2F05%2F37%2F44g58PICKNd_1024.jpg')
})

//设置分享场景
$('.setRightInfo').on('click', function () {
   var type = $(this).attr("data-type")
    var opt = {};
    if (type == 1) {
    } else if (type == 2) {
        opt.type = 1;
        opt.shareType = 0;
    } else if (type == 3) {
        opt.type = 1;
        opt.shareType = 1;
    }
    else if (type == 4) {
        opt.type = 1;
        opt.shareType = 2;
    }
    try {
        paipaiSDK.set.setRigthInfo(opt);
    } catch (error) {

    }

})

//设置搜索
$('#scanQRCodeOpenWebPage').on('click', function () {
    try {
        paipaiSDK.set.scanQRCodeOpenWebPage();
    } catch (error) {

    }

})


//------ end set protocol-------------
