require(["jquery","utils","dot"],function(a,b,c){"use strict";var d={reportTitle:"",reportReason:"",deg:"true",reportContext:""},e=b.getUrlParam("commodityId"),f={init:function(){f.addClick(),f.getReportReasonList()},getResellList:function(){var a={url:b.getHost()+"/commodity/v1/addCommodityReport",data:{commodityId:e,reportTitle:d.reportTitle||"违规信息",reportReason:d.reportReason||"1",reportContext:d.reportContext||""}};b.load(a).then(function(a){"0"==a.code?(b.log(a),b.lightToast("举报成功"),d.deg="false",setTimeout(function(){location.href='openapp.paipai://pushToC2CDetail/app?param={"key1":'+e+"}",location.href="openapp.paipai://close/app"},1e3)):"1"==a.code?(d.deg="false",b.lightToast("举报次数已达上限"),setTimeout(function(){d.deg="true"},2e3)):b.isNotEmpty(a.tip)?b.lightToast(a.tip):b.lightToast("举报异常")},function(a){})},getReportReasonList:function(){var c={url:b.getHost()+"/commodity/v1/getReportReasonList",data:{}};b.load(c).then(function(c){b.log("获取举报原因"+JSON.stringify(c)),"0"==c.code&&c.data&&c.data.length>0?(f.renderReportReasonList(c.data),a(".ui-why").click(function(){d.reportTitle=a(this).text(),d.reportReason=a(this).attr("code"),a(this).addClass("active").siblings().removeClass("active")})):b.isNotEmpty(c.tip)?b.lightToast(c.tip):b.lightToast("获取举报原因异常")},function(a){})},renderReportReasonList:function(b){b=b||[],a(".ui-report").append(c.template(a(".renderReportReasonList").text())(b))},addClick:function(){a(".ui-btn").click(function(){d.reportContext=a("textarea").val(),d.deg&&f.getResellList()})}};f.init()});