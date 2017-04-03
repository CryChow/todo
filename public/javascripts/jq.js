/*Created by Cry on 2016/12/17.*/
var sum;
var done = 0;
var xmlhttp;
if (window.XMLHttpRequest)
{// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
}
else
{// code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
}
function deleteContent(id, obj){
    $(obj).parent().remove();
    sum--;
    $("#sum").html(sum);
    $("#remain").html(sum - done);
    xmlhttp.open("GET","/delete?id="+id,true);
    xmlhttp.send();
    if (xmlhttp.status == 200) {
    }
}

$(function(){
    var xmlhttp;
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    function doneContent(id) {
        xmlhttp.open("GET","/statusF?id="+id,true);
        xmlhttp.send();
        if (xmlhttp.status == 200) {
        }
    }
    function removeDone(id) {
        xmlhttp.open("GET","/statusT?id="+id,true);
        xmlhttp.send();
        if (xmlhttp.status == 200) {
        }
    }
    sum = $(":checkbox").length;
    $("#sum").html(sum);
    $("#remain").html(sum - done);

    function addAction() {

        var iptTxt = $("#addTxt").val();
        if (iptTxt == "") {
            alert("Please input a todo!");
        }
        else {
            xmlhttp.open("GET","/add?content="+iptTxt,false);
            xmlhttp.send();
            var id ="'"+ xmlhttp.responseText+"'";
            $("#tdList").append('<li class="list-group-item"><input type="checkbox" name="box" class="td_box" dbId ='+ id +'/><span>' + iptTxt + '</span><button onclick="deleteContent(' + id + ', this)" style="float:right;" type="button" class="am-close" >x</button></li>');
            // 是否为onclick无效，用$(#"del").click(function () {
            //
            // });
        }
        /*var id = xmlhttp.responseText;// buuuuuuuuuug这个id只是最新添加的todo的id 想办法要变成每个单独属性的id
        $(".am-close").click(function () {
            xmlhttp.open("GET","/delete?id="+id,true);
            xmlhttp.send();
            if (xmlhttp.status == 200) {
            }
        });*/
        $("#addTxt").val("");
        sum = $(":checkbox").length;
        $("#sum").html(sum);
        $("#remain").html(sum - done);
        $(':checkbox:last').click(function () {   //判断复选框是否被点击
            done = $(":checked").length;
            $("#remain").html(sum - done);
            var id = $(this).attr("dbId");
            if ($(this).is(":checked")) {    //选中则划掉
                $(this).next().addClass("checkedspan");
                doneContent(id);
            }
            else {
                $(this).next().removeClass("checkedspan");
                removeDone(id);
            }
        });
    }
    $(':checkbox').click(function () {   //判断复选框是否被点击
        done = $(":checked").length;
        $("#remain").html(sum - done);
        var id = $(this).attr("dbId");
        if ($(this).is(":checked")) {    //选中则划掉
            $(this).next().addClass("checkedspan");
            doneContent(id);
        }
        else {
            $(this).next().removeClass("checkedspan");
            removeDone(id);
        }
    });
    $("#submit").click(function () {
        addAction();
    });
    $("#addTxt").bind("keydown",function(e){
        if(e.which==13){
            return false;
        }
    });
    $("#addTxt").bind("keyup",function(e){
        if(e.which==13){
            addAction();
        }
    }); //realize pressing key "enter" to submit
});
