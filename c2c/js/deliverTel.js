require(["jquery","utils","dot"],function(a,b,c){var d={init:function(){d.getDealDetail()},addClick:function(){a(".ui-tel-pic").unbind("click").bind("click",function(){var c=a(this).parents(".ui-box").index();a(this).attr("clstag","pageclick|keycount|PaiPai_201712072|"+(27+c));var d=a(this).attr("telnum");2==b.getType()?window.location.href="openapp.paipai://callWithNumberForHelpCenter/app?param="+encodeURIComponent('{"key0":"'+d+'"}'):window.location.href="tel:"+d})},getDealDetail:function(){var a={url:b.getHost()+"/cms?ids=call_express",data:{}};b.load(a).then(function(a){console.log("快递列表信息"+JSON.stringify(a)),a&&0==a.code?a.data.call_express&&a.data.call_express.length>0&&(d.renderProductInfo(a.data.call_express),d.addClick()):b.isNotEmpty(a.tip)?b.lightToast(a.tip):b.lightToast("快递列表数据异常")},function(a){b.lightToast("网络异常，稍后重试")})},renderProductInfo:function(b){a("body").html(c.template(a(".product-info").text())(b))}};d.init()});