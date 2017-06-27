<template>
  <div id="app">
    <div id="topbar">
      <h1><img src="../static/img/logo_interface.png" alt=""></h1>
      <div class="userinfo">
        <img :src="userinfo.headImage" alt="" class="photo">
        <p class="username">{{userinfo.userName}}</p>
        <img src="../static/img/arrow.png" alt="" class="arrow">
        <ul class="options">
          <li>修改</li>
          <li>登出</li>
        </ul>
      </div>
    </div>
    <div id="main">
      <div id="leftbar" >
        <div  v-for="data in menulist" :class="data.class">
          <router-link :to="data.link"></router-link>
          <img :src="data.img" >
          {{data.title}}
        </div>
      </div>
      <div id="rightbar">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import global from "./components/global.vue"
  import iscroll from "iscroll"
export default {
  name: 'app',
  data:function () {
    return{
      menulist:[
        {
          title:"订单中心",
          img:"./static/img/logo_order_center.png",
          link:"/order_center",
          class:""
        },
        {
          title:"材料库管理",
          img:"./static/img/logo_mot_store.png",
          link:"/mat_manage"
        },
        {
          title:"系统设置",
          img:"./static/img/logo_settings.png",
          link:"/account_edit"
        }
      ],
      userinfo:""
    }
  },
  methods:{
  },
  beforeMount:function () {
    var that=this
    localStorage.setItem("idstation",53)
    localStorage.getItem("idstation")==""?window.location.href="login.html":""
    global.database.account_id=localStorage.getItem("idstation")
    localStorage.setItem("idstation","")
    global.getuserdata(global.database.account_id,function (data) {
      data.result.headImage=global.IMAGE_URL+data.result.headImage
      that.userinfo=data.result
      global.database.user_data=data.result
    })
  },
  mounted:function () {
    //左侧选项样式初始化
    $("#leftbar div").siblings().css({background:"none"})
    $("#leftbar div").eq(global.pagecode).css({background:"#FFF"})
    //尺寸适应
    $("#main").css({height:$(window).height()-72+"px"})
    $("#rightbar").css({width:$(window).width()-$("#leftbar").width()})
    $(window).resize(function () {
      $("#main").css({height:$(window).height()-72+"px"})
      $("#rightbar").css({width:$(window).width()-$("#leftbar").width()})
    })
global.getorderlist(0,"",global.database.account_id,function (data) {
  console.log(data)
})
  },
  updated:function () {
    $("#leftbar div").siblings().css({background:"none"})
    $("#leftbar div").eq(global.pagecode).css({background:"#FFF"})
    $("#app").css({backgroundImage:"none"})
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  background-color: #a0a0a0;
}
  #topbar{
    width: 100%;
    height: 72px;
    background: #f89354;}
  #topbar h1{
    position: absolute;
    top: 0;
    left: 0;}
  #main{
    min-height: 728px;
    width: 100%;}
  #leftbar{
    height: 100%;
    background: #d9d9d9;
    width: 260px;
    float: left;}
  #rightbar{
    min-width: 1000px;
    height: 100%;
    float: left;}
  #leftbar a{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;}
  #leftbar div{
    position: relative;
    width: 100%;
    height: 100px;
    line-height: 100px;
    text-align: left;
    font-size: 18px;}
  #leftbar img{
    margin-top: 34px;
    margin-left: 26px;
    width: 37px;
    height: 37px;
    display: block;
    float: left;
    margin-right: 18px;}
  #topbar .userinfo{
    width: 185px;
    height: 72px;
    display: flex;
    align-items: center;
  }
  #topbar .userinfo{
    position: relative;
    float: right;
    height: 100%;}
  #topbar .userinfo .photo{
    width: 40px;
    height: 40px;
    border-radius: 40px;
    background: #FFF;
    margin-right: 10px;}
  #topbar .username{
    color: #FFF;
    margin-right:5px;}
  #topbar .options{
    display: none;
    transition:all 1s linear;
    position: absolute;
    left: 0;
    top: 100%;
    width: 100%;
    z-index: 1;
    box-shadow: 1px 1px 2px 0 rgba(0,0,0,0.4)}
  #topbar .userinfo:hover .options{
    display: block;}
  #topbar .options li{
    list-style-type: none;
    width: 100%;
    text-align: center;
    line-height: 30px;
    font-size: 20px;
    transition:all 0.5s linear;
    background: #fff;}
  #topbar .options li:hover{
    background: red;
    color: #fff;}
  #rightbar{
    background: #a0a0a0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding-left: 35px;
    padding-right: 45px;
    padding-top: 25px;
    display: flex;
    align-items:stretch;
    justify-items:stretch;}
  #leftbar .selected{
    background: #FFF;}
</style>
