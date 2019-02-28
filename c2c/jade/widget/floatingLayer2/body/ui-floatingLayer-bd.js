/**
 * Created by lizhenya on 2017/7/14.
 */

$(function () {
    var num=$('.ui-num').val();
    $('.ui-add').click(function () {
        if($('.ui-num').val()<1){
            $('.ui-num').val(0)
        }
        var num=$('.ui-num').val();
        num++;
        $('.ui-num').val(num)
    })
    $('.ui-subtract').click(function () {
        if($('.ui-num').val()<1){
            $('.ui-num').val(0)
        }
        var num=$('.ui-num').val();
        num--;
        if(num<1){
            num=1
        }
        $('.ui-num').val(num)
    })

})