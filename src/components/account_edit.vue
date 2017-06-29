<template>
  <div id="account_edit">
    <div class="editor">
      <img :src="userinfo.headImage" alt="" class="userphoto">
      <p class="account">账号<span>  {{userinfo.mobile}}</span></p>
      <input type="text" class="username" placeholder="姓名">
      <input type="text" onfocus="this.type='passwod'" class="password"placeholder="密码">
      <div class="buttons">
        <div @click="editaccount"class="complate">保存</div>
        <div onclick="window.history.back()"class="cancel" >取消</div>
      </div>
      <p class="ver">信息版本：一键空间 V1.0 内测版 </p>
    </div>
  </div>
</template>
<script>
  import global from "./global.vue"
  import app from "../App.vue"
  export default{
      name:"account_edit",
    data:function () {
      return{
          userinfo:""
      }
    },
    methods:{
      editaccount:function () {
          if(/^[\w\d\u4e00-\u9fa5]{3,8}$/.test($("#account_edit .username").val().trim())!=true/*||/^[\w\d]{8,128}$/.test($("#account_edit .password").val().trim())!=true*/){alert("请使用长度为3-8位的用户名和8位以上的密码")}else {
            if(confirm("确认要修改账户信息?")==true){
              global.login(this.userinfo.mobile,$("#account_edit .password").val().trim(),function (data) {
                  if(data.result.errcode!=0){alert("密码有误,请检查后重新输入")}else{              var dt1={
                    "jsonrpc": "2.0",
                    "method": "modifyAccount",
                    "params": {
                      "accountId":global.database.account_id,
                      "userName":$("#account_edit .username").val(),
                      "sex":"1",
                      "birthDay":"1",
                      "email":"1",
                      "address":"1",
                      "provinceId":"1",
                      "provinceName":"1",
                      "cityId":"1",
                      "cityName":"1",
                      "regionId":"1",
                      "regionName":"1"
                    },
                    "auth": "",
                    "id":21003
                  }
                  global.getdata("account.json",dt1,function (data) {
                    window.location=self
                  })
                  }
              })
            }else{}
          }
      }
    },
      beforeMount:function () {
        var that=this
        global.pagecode=2
        global.getuserdata(global.database.account_id,function (data) {
          data.result.headImage=global.IMAGE_URL+data.result.headImage
          that.userinfo=data.result
          console.log(that.userinfo)
        })
    },
    mounted:function () {
          setTimeout(function () {
            $("#app").css({backgroundImage:"url(/static/img/accountbkg.jpg)"
            })
          },1)
    }
  }
</script>
<style>
  #account_edit{
    width: 100%;
    height: 100%;
    position: relative;}
  #account_edit .editor{
    text-shadow: 0 0 1px rgba(0,0,0,0.3);
    width: 400px;
    height: 520px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -200px;
    margin-top: -260px;
    background: #fff;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    box-shadow: 2px 2px 2px 0px rgba(0,0,0,0.3);}
  #account_edit .userphoto{
    display: block;
    background: #f06e55;
    width: 120px;
    height: 120px;
    margin-left: 137px;
    margin-top: 29px;
    border-radius: 120px;}
  #account_edit .editor p{
    width: 100%;
    font-size: 18px;
    color: #30324B;
    text-align: center;
    margin-top: 30px;
    margin-bottom: 48px;}
  #account_edit .editor span{
    color: #f89354;    text-shadow: 0 0 1px rgba(240,110,85,0.3);}
  #account_edit .editor input{
    width: 100%;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0 auto;
    width: 320px;
    height: 50px;
    border: 1px solid #f89354;
    line-height: 48px;
    padding: 0 21px;
    border-radius: 4px;
    font-size: 18px;
    margin-bottom: 20px;
    text-shadow: 0 0 1px rgba(0,0,0,0.4);
    outline: none;}
  #account_edit .editor .buttons div{
    display: inline-block;
    line-height: 44px;
    width: 150px;
    height: 44px;
    border-radius:4px;
    margin: 0 11px;
    border: none;
    color: #FFF;
    font-size: 18px;
    text-shadow: 0 0 1px #fff;}
  #account_edit .complate{
    background: #F89354;}
  #account_edit .cancel{
    background: #4e6994;}
  #account_edit .editor input::placeholder{
    color: #4E6994;}
  #account_edit .ver{
    position: absolute;
    right: 17px;
    bottom: 17px;
    color: #4E6994;
    font-size: 12px!important;
    text-shadow: 0 0 1px #4E6994;
    display: block;
    margin: 0!important;
    text-align: right!important;}
  #app{
    background-size: 100% auto;
    background-repeat:no-repeat;
    background-position: 72px,right;}
  #rightbar{
    background:none;}
</style>
