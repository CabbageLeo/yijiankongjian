<template xmlns:>
  <div id="order_center">
    <div id="order_center_titlebar">
      <p>订单中心</p>
      <div class="createorder">新建订单<router-link to="/order_center/create_new_order"></router-link></div>
      <div class="searchorder">
        <input type="text" name="" id="">
        <div class="startsearch" @mousedown="startsearch"><img src="../../static/img/startsearch.png" alt=""></div>
      </div>
    </div>
    <ul class="tablelist">
      <li @click="tablecardclick(data.click)" v-for="data in tablecards" :class="data.class" >{{data.title}}</li>
    </ul>
    <div class="tablearea">
      <div class="tablehead tr2">
        <div class="location">施工地址</div>
        <div class="matype">材料类型</div>
        <div class="supporter">供应商</div>
        <div class="date">送货日期</div>
        <div class="amount">订单金额</div>
        <div class="status">订单状态</div>
        <div class="operation">操作</div>
        <div class="todetail"></div>
      </div>
      <div class="oneorder" v-for="data in orderdata">
        <div class="tr1">
          <div class="ordernumber">NO.</div>
          <div class="orderdate">{{data.start_date}}</div>
          <div class="orderid">订单号{{data.order_id}}</div>
        </div>
        <div class="tr2">
          <div class="location" :title="data.work_address">{{data.work_address}}</div>
          <div class="matype" :title="transformmat(data.mateList[0].category )">{{transformmat(data.mateList[0].category )}}</div>
          <div class="supporter":title="data.info.supplyName">{{data.info.supplyName}}</div>
          <div class="date" :title="data.end_date">{{data.end_date}}</div>
          <div class="amount" :title="'￥'+data.amount">{{'￥'+data.amount}}</div>
          <div class="status" :title="transformstc(data.status)">{{transformstc(data.status)}}</div>
          <div class="operation" onload="console.log(1)">-</div>
          <div class="todetail" @mousedown="getorderdetail(data.order_id)"><router-link to="/order_center/order_detail">订单详情</router-link></div>
        </div>
      </div>
    </div>
    <div class="tablecount">订单总数：{{totalordercount}}单，待处理订单：{{uncompordercount}}单</div>
    <div class="pagination">
      <div class="leftarrow"><img src="../../static/img/pagination_leftarrow.png" alt=""></div>
      <div class="rightarrow"><img src="../../static/img/pagination_rightarrow.png" alt=""></div>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  import global from "./global.vue"
  export default{
      name:"order_center",
    data:function () {
      return{
          tablecards:[
            {
              title:"未完成",
              link:"",
              class:"card selected",
              click:1
            },
            {
              title:"已完成",
              link:"",
              class:"card",
              click:2
            },
            {
              title:"已结算",
              link:"",
              class:"card",
              click:3
            },
            {
              title:"全部订单",
              link:"",
              class:"card",
              click:0
            }
          ],
        orderdata:"",
        totalordercount:"",
        uncompordercount:""
      }
    },
    methods:{
      //翻译各项以代号代表的数据,详见global.vue
      transformstc:function (stc) {
        return global.statustransform(stc)
      },
      transformmat:function (mat) {
        return global.materialtranslate(mat)
      },
      translateTime:function (tim) {
        return global.translateTime(tim)
      },
      //顶部选项卡切换操作
      tablecardclick:function (sta) {
          var that=this
        global.getorderlist(sta,"",global.database.account_id,function (data) {
          if (data.result.dataList==null){
            data.result.dataList=[]}
          that.orderdata=data.result.dataList
        })
      },
      //取得点击条目的详情数据
      getorderdetail:function (OID) {
          global.getorderdetail(OID,function (data) {
            global.database.singleorder=data.result
            console.log(global.database.singleorder)
          })
      },
      //订单搜索
      startsearch:function () {
          var that=this
        global.getorderlist(0,$('#order_center .searchorder input').val(),global.database.account_id,function (data) {
          if (data.result.dataList==null){
            data.result.dataList=[]}
          that.orderdata=data.result.dataList
          $("#order_center .tablelist li").removeClass("selected")
        })
      }
    },
    beforeMount:function () {
      //设置订单列表初始化状态
      global.pagecode=0
      var that=this
      global.getorderlist(1,"",global.database.account_id,function (data) {
        if (data.result.dataList==null){
          data.result.dataList=[]}
        that.orderdata=data.result.dataList
      })
      //下方的未完成数量计数
      global.getorderlist(0,"",global.database.account_id,function (data) {
        that.totalordercount=data.result.dataList.length
      })
      global.getorderlist(1,"",global.database.account_id,function (data) {
        that.uncompordercount=data.result.dataList.length
      })
    },
    mounted:function () {
          //顶部选项卡切换UI效果
          $(".tablelist .card").click(function (e) {
            $(e.currentTarget).siblings().removeClass("selected")
            $(e.currentTarget).addClass("selected")
          })
    },
    updated:function () {
      global.setindex("#order_center .ordernumber")
    }
  }
</script>
<style>
  #order_center{
    text-shadow: 0 0 2px #fff;
    width: 100%;
    position: relative;}
  #order_center_titlebar{
    width: 100%;
    height: 44px;
  }
  #order_center_titlebar p{
    float: left;
    color: #FFF;
    font-size: 20px;
  }
  #order_center_titlebar .createorder{
    position: relative;
    width: 112px;
    height: 42px;
    background: #f89354;
    float: right;
    line-height: 42px;
    color: #FFF;
    position: relative;
    top: 1px;
    cursor: default;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;}
  #order_center_titlebar .createorder *{
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;}
  #order_center_titlebar .searchorder{
    height: 42px;
    width: 280px;
    margin-right: 10px;
    float: right;
    border: 1px solid #F89354;
    border-radius:2px;
    position: relative;}
  #order_center_titlebar .searchorder input{
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    background: #ffffff;
    border: none;
    outline: none;
    line-height: 42px;
    font-size: 20px;
    padding-left: 41px;}
  #order_center_titlebar .startsearch{transition:all 0.5s;
    cursor: pointer;
    position: absolute;
    left: 1px;
    top: 1px;
    transform:scale(0.9)}
  #order_center_titlebar .startsearch:hover{transform:scale(1)}
  #order_center .tablelist{
    width: 100%;
    height: 35px;}
  #order_center .tablelist .card{
    text-shadow: 0 0 2px #fff;
    width: 92px;
    list-style-type: none;
    float: left;
    background: #d0d0d0;
    color: #FFF;
    text-align: center;
    cursor: default;
    height: 35px;
    line-height: 35px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;}
  #order_center .tablelist .selected{
    background: #F89354;}
  #order_center .tablearea{
    overflow: auto;
    height: 70%;
    background: #FFF;
    width: 100%;
    min-height: 472px;}
  #order_center .tablearea *{
    cursor: default}
  #order_center .tr1 div,#order_center .tr2 div{
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding-right: 20px;
    overflow: hidden;}
  #order_center .tablecount{
    text-align: left;
    width: 100%;
    height: 77px;
    line-height: 77px;
    font-size: 16px;
    color: #FFF;
  }
  #order_center .pagination{
    width: 274px;
    float: right;
    height: 21px;
    line-height: 21px;
    display: flex;
    justify-content:space-between;
  }
  .tablearea .tr2{
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    padding-left: 22px;
    background: #FFF;
    display: flex;
    justify-content: space-between;
    height: 56px;
    line-height: 56px;
    font-size: 16px;
    color: #385178;
    text-align: left;
    text-shadow: 0 0 1px rgba(56,81,120,0.6);}
  .tablearea .location{
    width: 16%;}
  .tablearea .matype{
    width: 14.5%;}
  .tablearea .supporter{
    width: 11%;}
  .tablearea .date{
    width: 12%;}
  .tablearea .amount{
    width: 12%;}
  .tablearea .status{
    width: 12%;}
  .tablearea .operation{
    width: 8%;}
  .tablearea .todetail{
    width: 12%;
    color: #525cdb;}
  .tablearea .tr1{
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    padding-left: 22px;
    display: flex;
    justify-content: flex-start;
    background: #d0d0d0;
    height: 30px;
    line-height: 30px;
    text-align: left;
    color: #f89354;
    font-size: 14px;
    text-shadow: 0 0 1px rgba(248,147,84,0.5);}
  .tablearea .tr1 .ordernumber{
    width: 7%;}
  .tablearea .tr1 .orderdate{
    width: 13%;}
  .tablearea .tr1 .orderid{}
  .oneorder{
    width: 100%;}
</style>
