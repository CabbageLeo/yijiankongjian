/**
 * Created by Administrator on 2017/6/23.
 */
localStorage.setItem("account_id","")
$(function () {
  //模拟CheckBox元素
  $("#rpw").attr("choice")==="true"?$("#rpw").css({background:"url(static/img/checkbox_selected.png)"}):$("#rpw").css({background:"url(static/img/checkbox_not.png)"});
  $("#rpw").click(function () {
    console.log(1)
    $(this).attr("choice")==="true"?$(this).attr("choice","false").css({background:"url(static/img/checkbox_not.png)"}):$(this).attr("choice",true).css({background:"url(static/img/checkbox_selected.png)"});
  })
//显示/隐藏二维码
  $(".signlink").click(function () {
    $(".layer").fadeIn()
  })
  $(".layer").click(function () {
    console.log(1)
    $(this).fadeOut()
  })
//登录选项切换
  $(".login_select li").click(function () {
    $(".login_select li").css({color:"#4E6994"})
    $(".login_select li").children(".bottom_line").css({display:"none"})
    $(this).css({color:"#F89354"})
    $(this).children(".bottom_line").css({display:"block"})
    $(this).index()==0?($(".pw").fadeIn(0),$(".vc").fadeOut(0)):($(".vc").fadeIn(0),$(".pw").fadeOut(0))
  })

  $("#login_window .login_select li").eq(0).click(function () {
    loginMode="normal"
  })
  $("#login_window .login_select li").eq(1).click(function () {
    loginMode="active"
  })

//通用请求封装
  function req(data) {
    $.ajax({
      type: 'POST',
      url: "http://test.yjzone.cn/home/"+data.url,
      data: JSON.stringify(data.data),
      contentType: 'text/plain;charset=UTF-8',
      success: data.callback,
      dataType: 'json'
    })
  }
  /*
   localStorage.setItem("account_id","")
   */
//登录状态判断
  var accountCheckData={
    url:"account.json",
    data:{
      "jsonrpc": "2.0",
      "method": "getAccount",
      "params": {
        "accountId":localStorage.getItem("account_id")
      },
      "auth": "",
      "id":21004
    },
    callback:function (data) {
      /*
       console.log(data)
       $("#phone_number").val(data.result.mobile)
       $("#pw")[0].type="password"
       $("#pw").val(data.result.password)
       */
      data.result.errmsg=="ok"?window.location.href="index.html":localStorage.setItem("account_id","")
    }
  }
  localStorage.getItem("account_id")?(req(accountCheckData)):localStorage.setItem("account_id","")
//登录方式
  var loginMode="normal"
//输入格式提示
  $("#phone_number").keyup(function () {
    /^[\d]{11}$/.test(this.value)?$("#login_window .error_msg").text("").fadeOut(200):$("#login_window .error_msg").text("请输入正确的11位手机号码").stop().fadeIn(200)
  })
  $("#phone_number").focus(function () {
    /^[\d]{11}$/.test(this.value)?$("#login_window .error_msg").text("").fadeOut(200):$("#login_window .error_msg").text("请输入正确的11位手机号码").stop().fadeIn(200)
  })
  $("#login_window input").blur(function () {
    $("#login_window .error_msg").stop().fadeOut(200).text("")
  })
  //猛戳登录按钮
    //普通登录使用的数据
  var normalLoginData={
    url:"account.json",
    data:{
      "jsonrpc": "2.0",
      "method": "login",
      "params": {
        "mobile":"",
        "password":"",
      },
      "auth": "",
      "id":21001
    },
    callback:function (data) {
      switch (data.result.errcode){
        case 0:
          localStorage.setItem("account_id",data.result.accountId)
          localStorage.setItem("idstation",localStorage.getItem("account_id"))
          $("#rpw").attr("choice")==="true"?"":localStorage.setItem("account_id","")
          window.location.href="index.html"
        break
        case 10003:
          alert("用户名或密码错误,请检查输入是否正确")
          $("#phone_number").trigger("focus")
        break
        default:alert("连接错误,请检查网络情况")
      }
    }
    //验证码登录使用的数据
  }
  var activeLoginData={
    url:"account.json",
    data:{
      "jsonrpc": "2.0",
      "method": "dynamicLogin",
      "params": {
        "mobile":" ",
        "code":" ",
        "type":"1"
      },
      "auth": "",
      "id":21001
    },
    callback:function (data) {
      switch (data.result.errcode){
        case 0:
          localStorage.setItem("idstation",localStorage.getItem("account_id"))
          $("#rpw").attr("choice")==="true"?"":localStorage.setItem("account_id","")
          localStorage.setItem("account_id",data.result.accountId)
          window.location.href="index.html"
          break
        case 10003:
          alert("用户名或验证码错误,请检查输入是否正确")
          $("#phone_number").trigger("focus")
          break
        default:alert("连接错误,请检查网络情况")
      }
    }
  }
  $("#login_window #login").click(function () {
    normalLoginData.data.params.mobile=$("#login_window #phone_number").val()
    normalLoginData.data.params.password=$("#login_window #pw").val()
    activeLoginData.data.params.code=$("#login_window .vc input").val()
    //普通登录
    if(loginMode=="normal"){
      if(/^[\d]{11}$/.test($("#phone_number")[0].value)==false){
        $("#login_window #phone_number").trigger("focus")
      }else if($("#login_window #pw").val().trim()==""){
        $("#login_window .error_msg").text("请输入密码").fadeIn(200)
        $("#login_window #pw").trigger("focus")
      }else{
        req(normalLoginData)
      }
      //验证码登录
    }else if(loginMode=="active"){
      if(/^[\d]{11}$/.test($("#phone_number")[0].value)==false){
        $("#login_window #phone_number").trigger("focus")
      }else if($("#login_window .vc input").val().trim()==""){
        $("#login_window .error_msg").text("请输验证码").fadeIn(200)
        $("#login_window .vc input").trigger("focus")
      }else{
        alert("dengluzhong")
      }
    }
    localStorage.setItem("idstation",localStorage.getItem("account_id"))
    $("#rpw").attr("choice")==="true"?"":localStorage.setItem("account_id","")
  })
})
