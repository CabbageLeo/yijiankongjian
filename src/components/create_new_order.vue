<template>
  <div id="create_new_order">
    <div class="form">
      <div class="part titlebar">新建订单</div>
      <div class="part part1">
        <div class="cell">
          <p>材料类型</p>
          <select class="select1">
            <option value="">-</option>
            <option value="">木工</option>
            <option value="">瓦工</option>
            <option value="">水电</option>
            <option value="">油漆</option>
            <option value="">综合</option>
          </select>
        </div>
        <div class="cell">
          <p>供应商</p>
          <select class="select2">
            <option value="" v-for="data in suplist">{{data.matName}}</option>
          </select>
        </div>
        <div class="cell">
          <p>施工地址</p>
          <select class="select3">
            <option value="">选择施工地址</option>
          </select>
        </div>
        <div class="cell">
          <p>送货日期</p>
          <input class="select4" id="date" style="width: 160px;" readonly="readonly">

        </div>
      </div>
      <div class="mats">
        <div class="part part2">
          <div class="cell">
            <p>材料名称</p>
            <select class="select1">
              <option value="">选择材料名称</option>
            </select>
          </div>
          <div class="cell">
            <p>品牌</p>
            <select class="select2">
              <option value="">选择品牌</option>
            </select>
          </div>
          <div class="cell">
            <p>型号</p>
            <select class="select3">
              <option value="">选择型号</option>
            </select>
          </div>
          <div class="cell">
            <p>数量</p>
            <input type="text">
            <div class="quantifier">张</div>
            <p class="price">单价<span>  元</span></p>
          </div>
        </div>
        <div class="part part2">
          <div class="cell">
            <p>材料名称</p>
            <select class="select1">
              <option value="">选择材料名称</option>
            </select>
          </div>
          <div class="cell">
            <p>品牌</p>
            <select class="select2">
              <option value="">选择品牌</option>
            </select>
          </div>
          <div class="cell">
            <p>型号</p>
            <select class="select3">
              <option value="">选择型号</option>
            </select>
          </div>
          <div class="cell">
            <p>数量</p>
            <input type="text">
            <div class="quantifier">张</div>
            <p class="price">单价<span>  元</span></p>
          </div>
        </div>
      </div>


      <div class="info">
        <textarea></textarea>
        <div class="addphoto"></div>
      </div>
      <div class="buttons">
        <div class="complete">确认下单</div>
        <div class="cancel">取消下单<router-link to="/order_center"></router-link></div>
      </div>
    </div>
  </div>
</template>
<script>
  import global from "./global.vue"
  export default{
      name:"create_new_order",
    data:function () {
          return{
              suplist:"",
          }
    },
      methods:{
          cancelcreating:function () {
            alert(1)
            window.location.href="/"
          }
      },
    befoereMount:function () {
    },
    mounted:function () {
      var that=this
      //日历插件加载
      var cdr=xvDate({
        targetId:"date",
        hms:"off"
      })
      //根据选择动态加载供应商列表
      $(".part1 .cell select").eq(0).change(function (e) {
        var url="http://test.yjzone.cn/home/account.json"
        var data={
          "jsonrpc": "2.0",
          "method": "findMateEntsByCat",
          "params": {
            "categoryId":e.currentTarget.selectedIndex
          },
          "auth": "",
          "id":24010
        }
        $.ajax({
          type: 'POST',
          url:  url,
          data: JSON.stringify(data),
          contentType: 'text/plain;charset=UTF-8',
          success: function (data) {
              that.suplist=data.result.dataList
            console.log(that.suplist)
          },
          dataType: 'json'
        });
      })
      /*
            $(".cell select").dropkick({
              mobile:true
            })
      */
    }
  }
</script>
<style>
#create_new_order{
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.4);
  position: fixed;
  left: 0;
  top: 0;
}
#create_new_order .form{
   width: 600px;
   height: 750px;
   background: #FFF;
   position: absolute;
   top: 50%;
   left: 50%;
   margin-top: -375px;
   margin-left: -300px;
   border-top-left-radius:10px;
   border-top-right-radius:10px;
   overflow: hidden;}
  #create_new_order .part{
    width: 100%;
    margin-bottom: 4px;
    height: 140px;}
  #create_new_order .titlebar{
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    height: 50px;
    padding-left: 20px;
    line-height: 50px;
    font-size: 24px;
    color: #FFF;
    background-color:#f89354;}
#create_new_order .part1{
  background: #fff;}
#create_new_order .part2{
  background: #eee;}
  #create_new_order .info{
    width: 528px;
    height: 146px;
    border: 1px solid #F89354;
    margin: 22px 34px 25px 34px;
    border-radius:4px;
    position: relative;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;}
  #create_new_order .info textarea{
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    outline: none;
    border: none;
    padding: 10px;
    padding-bottom: 30px;
    background: none;
    line-height: 1;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;}
  #create_new_order .info .addphoto{
    position: absolute;
    right: 20px;
    bottom: 20px;
    width: 52px;
    height: 52px;
    background: url("../../static/img/addphoto.png");}
  #create_new_order .buttons div{
    line-height: 44px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    display: inline-block;
    position: relative;
    width: 150px;
    height: 44px;
    border-radius:5px;
    border: none;
    margin: 0 12px;
    color: #FFF;
    font-size: 16px;}
  #create_new_order .buttons div *{
    left: 0;
    top: 0;
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;}
  #create_new_order .complete{
    background-color: #F89354;}
  #create_new_order .cancel{
    background: #4e6994;}
  #create_new_order .cell{
    position: relative;
    line-height: 40px;
    text-align: right;
    margin-top: 20px;
    width: 285px;
    height: 40px;
    float: left;}
  #create_new_order .part .cell p{
    margin-right: 17px;
    width: 105px;
    height: 40px;
    float: left;}
  #create_new_order .part .cell select{
    width: 160px;
    height: 38px;
    float: left;
    border: 1px solid #f89354;
    outline: none;
    border-radius:4px;}
  #create_new_order .quantifier{
    position: absolute;
    left: 170px;}
  #create_new_order .cell input{
    border-radius:4px;
    width: 68px;
    height: 40px;
    float: left;
    padding-left: 5px;
    line-height: 38px;
    padding-right: 20px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #f89354;
    outline: none;}
  #create_new_order .price{
    width: 72px!important;
    float: left;
    margin-left: 20px;
    margin-right: 0 !important;
    text-align: left!important;}
  #create_new_order .mats{
    width: 100%;
    height: 290px;
    overflow: auto;}
  li{
    list-style-type: none!important;}
</style>
