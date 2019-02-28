require(["jquery","utils","dot"],function(a,b,c){"use strict";var d={init:function(){d.getAesKey(function(){d.getAddrList(),d.getDefaultPara(),d.addClick()})},isUserSettingCome:"",index:"",para:{name:"",mobile:"",proviceid:"",cityid:"",areaid:"",addressDetail:"",aesKey:""},addClick:function(){a(".ui-layer-ft").unbind("click").bind("click",function(){var a=b.getParameter("backUrl"),c="";c=b.isNotEmpty(a)?"/c2c/newAddr.html?backUrl="+encodeURIComponent(a)+"&add=yes&mgUrl="+encodeURIComponent("/c2c/deliveryGoods.html"):"/c2c/newAddr.html?mgUrl="+encodeURIComponent("/c2c/deliveryGoods.html"),location.replace(c)}),a(".ui-set").unbind("click").bind("click",function(){var c={addressId:a(this).parents(".ui-addr-item").attr("addressid"),receiveName:a(this).parents(".ui-addr-item").attr("receivename"),mobile:a(this).parents(".ui-addr-item").attr("tel"),addressName:a(this).parents(".ui-addr-item").attr("addressinfo"),provinceId:a(this).parents(".ui-addr-item").attr("provinceid"),cityId:a(this).parents(".ui-addr-item").attr("cityid"),countryId:a(this).parents(".ui-addr-item").attr("countyid"),townId:a(this).parents(".ui-addr-item").attr("townid"),index:a(this).parents(".ui-addr-item").attr("index")},e=decodeURIComponent(b.getParameter("backUrl"));if(b.isNotEmpty(e))if("1"===b.getParameter("mark")){var f="receiveName="+escape(c.receiveName)+"&mobile="+c.mobile+"&addressName="+escape(c.addressName)+"&addressId="+escape(c.addressId)+"&provinceId="+c.provinceId+"&cityId="+c.cityId+"&countryId="+c.countryId+"&townId="+c.townId+"&addressId="+c.addressId+"&index="+c.index;b.goUrl(e+f)}else-1!=e.indexOf("?")?location.href=e+"&addressInfo="+encodeURIComponent(JSON.stringify(c)):location.href=e+"?addressInfo="+encodeURIComponent(JSON.stringify(c));else b.isNotEmpty(d.isUserSettingCome)&&b.goUrl("/c2c/userSetting.html?addressInfo="+a(this).attr("addressinfo"))}),a(".modify").unbind("click").bind("click",function(){var c={addressId:a(this).parents(".ui-addr-item").attr("addressid"),name:a(this).parents(".ui-addr-item").attr("name"),mobile:a(this).parents(".ui-addr-item").attr("tel"),provinceid:a(this).parents(".ui-addr-item").attr("provinceid"),cityid:a(this).parents(".ui-addr-item").attr("cityid"),countryid:a(this).parents(".ui-addr-item").attr("countyid"),townid:a(this).parents(".ui-addr-item").attr("townid"),addressDetail:a(this).parents(".ui-addr-item").attr("addressDetail"),addressDefault:a(this).parents(".ui-addr-item").attr("addressDefault")};c=JSON.stringify(c);var d=b.getParameter("backUrl");location.replace("/c2c/editAddr.html?addInfo="+encodeURIComponent(c)+"&refresh=no&backUrl="+encodeURIComponent(d)+"&mgUrl="+encodeURIComponent("/c2c/deliveryGoods.html"))})},getDefaultPara:function(){this.isUserSettingCome=b.getParameter("isUserSettingCome"),this.index=b.getUrlParam("index")},renderAddrInfo:function(e){if(e=e||[],a(".ui-address").html(c.template(a(".receiveAddrInfo").text())(e)),d.addClick(),b.getUrlParam("index")){var f=a(".ui-addr-item").eq(this.index).children(".ui-address-default");console.log(this.index),console.log(f),f.addClass("ui-address-now"),f.find(".now-selected-img").addClass("now-selected-img-show"),f.find(".ui-address-container").addClass("now-selected-container")}},getAesKey:function(a){var c={url:b.getHost()+"/security/aesKey",data:{}};b.load(c).then(function(c){c&&0==c.code?d.para.aesKey=c.data:b.isNotEmpty(c.tip)?b.lightToast(c.tip):b.lightToast("解密key异常"),a()},function(b){a()})},decrypt:function(a,b){var c=CryptoJS.enc.Utf8.parse(b),d=CryptoJS.AES.decrypt(a,c,{mode:CryptoJS.mode.ECB,padding:CryptoJS.pad.Pkcs7});return CryptoJS.enc.Utf8.stringify(d).toString()},getAddrList:function(){var c={url:b.getHost()+"/receiveAddr/secFindReceiveAddrList",data:{}};b.load(c).then(function(c){b.isNotEmpty(c.data)&&d.para.aesKey?(a(".bgview").addClass("hide"),c.data.forEach(function(a){a.name=a.name&&d.decrypt(a.name,d.para.aesKey)||a.name,a.addressDetail=a.addressDetail&&d.decrypt(a.addressDetail,d.para.aesKey)||a.addressDetail,a.fullAddress=a.fullAddress&&d.decrypt(a.fullAddress,d.para.aesKey)||a.fullAddress}),d.renderAddrInfo(c.data)):(a(".bgview").removeClass("hide"),a(".bgview img").attr("src","image/noDeliver1.png"))},function(b){a(".bgview").removeClass("hide"),a(".bgview p").text("数据加载失败，请点击刷新~"),a(".bgview").unbind("click").bind("click",function(){d.getAddrList()})})}};d.init()});