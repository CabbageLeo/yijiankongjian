<template>
  <div id="order_detail">
    <div class="topbar">订单中心<span>>订单详情</span></div>
    <div class="order_data">
      <div class="titlebar">基本信息</div>
      <table class="basic_inf">
        <tr>
          <td>订单编号</td>
          <td>{{singleorder.order_id}}</td>
          <td>项目经理</td>
          <td>{{singleorder.info.pmname}}</td>
        </tr>
        <tr>
          <td>供应商名称</td>
          <td>{{singleorder.info.supplyName}}</td>
          <td>供应商</td>
          <td>{{singleorder.info.materialmanName}}</td>
        </tr>
        <tr>
          <td>施工地址</td>
          <td>{{singleorder.work_address}}</td>
          <td>施工金额</td>
          <td>￥{{singleorder.amount}}</td>
        </tr>
        <tr>
          <td>发货日期</td>
          <td>{{singleorder.start_date}}</td>
          <td>订单状态</td>
          <td>{{statustranslate(singleorder.status)}}</td>
        </tr>
      </table>
      <div class="titlebar">订单明细表</div>
      <table class="detail_table">
        <tr>
          <td >序号</td>
          <td>材料名称</td>
          <td>品牌</td>
          <td>型号</td>
          <td>数量</td>
          <td>单位</td>
          <td>单价</td>
          <td>合计</td>
        </tr>
        <tr v-for="data in detail_table">
          <td class="no">{{data.no}}</td>
          <td>{{data.mateName}}</td>
          <td>{{data.brand}}</td>
          <td>{{data.model}}</td>
          <td>{{data.buyNum}}</td>
          <td>{{data.unit}}</td>
          <td>{{data.price}}</td>
          <td>￥{{data.total}}</td>
        </tr>
        <tr>
          <td colspan="8" style="text-indent: 80%;color: #f89354;">￥{{singleorder.amount}}</td>
        </tr>
      </table>
      <div class="order_info">
        <p>订单备注:<span>{{singleorder.order_desc}}</span></p>
        <div><img v-for="data in singleorder.photoList" :src="data.photoAddress" alt=""></div>
      </div>
      <div class="detail_info">
        <p>明细备注:<span>{{singleorder.source_detail}}</span></p>
        <div><img :src="data.photoAddress" alt="" v-for="data in singleorder.detailList"></div>
      </div>
      <div class="buttons">
        <button style="background: #4e6994;" @click="print">打印订单</button>
        <button style="background: #f89354;">导出订单</button>
      </div>
    </div>
    <div class="order_process" >
      <div class="titlebar">订单状态更新进度</div>
      <div class="msg" v-for="data in singleorder.logs">
        <img :src="imagelocation(data.head_image)" alt="" class="photo">
        <div class="photolayer"><img src="" alt=""></div>
        <div class="name">{{data.user_name}}</div>
        <div class="date">date</div>
        <div class="operation">{{statustranslate(data.opt_item)}}</div>
        <div class="info">备注:{{data.description}}<img src="../../static/img/msgbubble_angular.png" alt=""></div>
      </div>
    </div>
  </div>
</template>
<script>
  import global from "./global.vue"
  export default{
      data:function () {
        return{
          singleorder:global.database.singleorder,
          detail_table:global.database.singleorder.mateList
        }
      },
    methods:{
      statustranslate:function (sta) {
        return global.statustransform(sta)
      } ,
      photoview:function (imgul) {
            $("#order_detail .photolayer").attr("src",data)
            $("#order_detail .photolayer").fadeIn()
          },
      hidethis:function (e) {
        $(e.currentTarget).fadeOut()
      },
      statustranslate:function (data) {
        return global.statustransform(data)
      },
      //图片地址拼接
      imagelocation:function (url) {
        return "http://test.yjzone.cn/homeimage"+url
      },
      //打印
      print:function () {
          console.log()
        $("#order_detail .order_data").jqprint()
      }
    },
    beforeMount:function () {
          this.singleorder==""?window.location.href="./index.html":""
    },
    mounted:function () {
          global.setindex("#order_detail .no")
    }
  }
</script>
<style>
  #order_detail{
    width: 100%;
    height: 100%;
    overflow: auto;
    position: absolute;
    left: 0;
    top: 0;
    background: #a0a0a0;}
  #order_detail table{
    border-collapse: collapse}
  #order_detail .order_data{
    border-radius:4px;
    width: 100%;
    padding: 0 48px;
    margin-bottom: 37px;
    background: #FFF;
    min-height: 1027px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;}
  #order_detail .order_process{
    border-radius:4px;
    width: 100%;
    padding: 0 48px;
    min-height: 331px;
    background: #FFF;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;}
  #order_detail .order_process .msg:last-child{
    border: none;}
  #order_detail .topbar{
    text-align: left;
    height: 35px;
    font-size: 20px;
    color: #FFF;}
  #order_detail .topbar span{
    font-size: 14px;
    line-height: 25px;}
  #order_detail .titlebar{
    font-size: 16px;
    color: #385178;
    text-align: left;
    height: 60px;
    line-height: 60px;
    text-shadow: 0 0 1px rgba(56,81,120,0.5);}
  #order_detail .basic_inf{
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding-left: 10px;
    border-bottom: 1px solid #eee;
    font-size: 14px;
    text-align: left;
    width: 495px;
    height: 124px;
    padding-bottom: 15px;}
  #order_detail .basic_inf td:nth-of-type(2n){
    color: #a0a0a0;}
  #order_detail .detail_table{
    width: 100%;}
  #order_detail .detail_table td{
    text-align: center;
    height: 36px;}
  #order_detail .detail_table tr:nth-of-type(2n){
    background: #d2d2d2;}
  #order_detail .order_info,#order_detail .detail_info{
    height: 147px;}
  #order_detail .order_info p,#order_detail .detail_info p{
    line-height: 60px;
    text-align: left;
    height: 60px;
    color: #dcdcdc;}
  #order_detail .detail_info p{
    clear: both;}
  #order_detail .order_info img,#order_detail .detail_info img{
    display: block;
    width: 88px;
    height: 88px;
    float: left;
    margin-right: 19px;
    background: #dcdcdc;}
  #order_detail .order_info span,#order_detail .detail_info span{
    color: #30324B;}
  #order_detail .order_data .buttons{
    margin-top: 43px;
    margin-bottom: 57px;}
  #order_detail .order_data .buttons button{
    height: 44px;
    line-height: 44px;
    width: 150px;
    text-align: center;
    color: #FFF;
    margin: 0 11px;
    font-size: 18px;
    border: none;
    border-radius:4px; }
  #order_detail .order_process .titlebar{
    height: 68px;
    line-height: 68px;
    color: #f89354;
    font-size: 18px;
    text-shadow: 0 0 1px #f89354;}
  #order_detail .order_process .msg{
    clear: both;
    text-align: left;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding-left: 27px;
    height: 88px;
    position: relative;
    margin-left: 21px;
    font-size: 18px;

    border-left: 1px solid #F89354;}
  #order_detail .order_process .msg .photo{
    width: 40px;
    height: 40px;
    background: #f18d6c;
    border-radius:40px;
    position: absolute;
    left: -20px;
    top: 0;}
  #order_detail .order_process .msg .name{
    line-height: 22px;
    text-shadow: 0 0 1px #000;}
  #order_detail .order_process .msg .date{
    font-size: 12px;
    color: #999;
    text-shadow: 0 0 1px #ddd;
    line-height: 22px;}
  #order_detail .order_process .msg .info{
    height: 30px;
    background: #F89354;
    color: #FFF;
    text-shadow: 0 0 1px #fff;
    font-size: 14px;
    display: inline-block;
    line-height: 30px;
    border-radius: 4px;
    border-bottom-left-radius: 0;
    padding: 0 15px;
    position: absolute;
    top: 16px;
    left: 50%;}
  #order_detail .order_process .msg .info img{
    position: absolute;
    right: 100%;
    bottom: 0;}
  #order_detail .order_process .msg .operation{
    font-size: 18px;
    color: #F89354;
    text-shadow: 0 0 1px #F89354;
    position: absolute;
    left: 115px;
    top: 20px;}
  #order_detail .photolayer{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.4);
    position: fixed;
    left: 0;
    top: 0;
    display: none;}
</style>
