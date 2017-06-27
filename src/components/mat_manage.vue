<template>
  <div id="mat_manage">
    <div class="topbar">
      <div class="title">材料库管理</div>
      <input type="text" placeholder="请输入要搜索的内容">
      <img src="../../static/img/startsearch.png" alt="" class="searchbutton">
      <select name="" id="">
        <option value="">选择材料类型</option>
      </select>
      <p>材料类型</p>
    </div>
    <div class="tablearea">
      <div class="row">
        <div class="">序号</div>
        <div class="">供应商名称</div>
        <div class="">材料类型</div>
        <div class="">材料名称数</div>
        <div class="">品牌数量</div>
        <div class="">联系人</div>
        <div class="">联系电话</div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
      </div>
      <div class="row"v-for="data in matlist">
        <div class="no":title="data.no">{{data.no}}</div>
        <div class="sup":title="data.sup">{{data.sup}}</div>
        <div class="matcount":title="data.matype">{{data.matype}}</div>
        <div class="matcount":title="data.matcount">{{data.matcount}}</div>
        <div class="brandcount":title="data.brandcount">{{data.brandcount}}</div>
        <div class="contacts":title="data.contacts">{{data.contacts}}</div>
        <div class="phone":title="data.phone">{{data.phone}}</div>
        <div class="export"title="导出"><img src="../../static/img/mat_export.png" alt="">导出</div>
        <div class="import"title="导入"><img src="../../static/img/mat_import.png" alt="">导入</div>
        <div class="recover"title="恢复"><img src="../../static/img/mat_recover.png" alt="">恢复</div>
      </div>
    </div>
    <div class="pagination">
      <div class="leftarrow"><img src="../../static/img/pagination_leftarrow.png" alt=""></div>
      <div class="rightarrow"><img src="../../static/img/pagination_rightarrow.png" alt=""></div>
    </div>
  </div>
</template>
<script>
  import global from "./global.vue"
  export default{
      data:function () {
        return{
            matlist:[
              {
                no:"1",
                sup:"上海企家建材科研有限公司",
                matype:"木工",
                matcount:10,
                brandcount:4,
                contacts:"张三",
                phone:"123456789101",
              },
              {
                no:"1",
                sup:"上海企家建材科研有限公司",
                matype:"木工",
                matcount:10,
                brandcount:4,
                contacts:"张三",
                phone:"123456789101",
              },
              {
                no:"1",
                sup:"上海企家建材科研有限公司",
                matype:"木工",
                matcount:10,
                brandcount:4,
                contacts:"张三",
                phone:"123456789101",
              },
              {
                no:"1",
                sup:"上海企家建材科研有限公司",
                matype:"木工",
                matcount:10,
                brandcount:4,
                contacts:"张三",
                phone:"123456789101",
              },
              {
                no:"1",
                sup:"上海企家建材科研有限公司",
                matype:"木工",
                matcount:10,
                brandcount:4,
                contacts:"张三",
                phone:"123456789101",
              },
            ]
        }
      },
      beforeMount:function () {
        global.pagecode=1
      }
  }
</script>
<style>
  #mat_manage{
    width: 100%;
    height: 100%;}
  #mat_manage .topbar{
    width: 100%;
    height: 42px;
    position: relative;
    margin-bottom: 8px;}
  #mat_manage .title{
    position: absolute;
    left: 0;
    top: 0;
    font-size: 20px;
    color: #FFF;}
  #mat_manage input{
    float: left;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    height: 100%;
    border: 1px solid #f89354;
    width: 282px;
    float: right;
    margin-left: 25px;
    padding-left: 44px;
    padding-right: 10px;
    border-radius:4px;
    outline: none;}
  #mat_manage .topbar .searchbutton{
    position: absolute;
    right: 240px;}
  #mat_manage .topbar select{
    float: right;
    width: 182px;
    height: 100%;
    outline: none;
    margin-left: 10px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    border: 1px solid #f89354;}
  #mat_manage .topbar p{
    height: 100%;
    float: right;
    line-height: 48px;
    color: #FFF;
    font-size: 20px;}
  #mat_manage .pagination{
    width: 274px;
    float: right;
    height: 21px;
    line-height: 21px;
    display: flex;
    justify-content:space-between;}
  #mat_manage .tablearea{
    overflow: auto;
    height: 70%;
    background: #FFF;
    width: 100%;
    min-height: 472px;
    margin-bottom: 40px;}
  #mat_manage .tablearea .row{
    display: table;
    width: 100%;
    height: 56px;
    background: #FFF;}
  #mat_manage .tablearea .row:first-of-type div{
    color: #F89354;}
  #mat_manage .tablearea .row:nth-child(2n){
    background: #e3e3e3;}
  #mat_manage .tablearea .row div{
    font-size: 14px;
    width: 10%;
    white-space:nowrap;
    float: left;
    overflow: hidden;
    height: 100%;
    line-height: 56px;
    color: #30324B;}
  #mat_manage .tablearea .row div:nth-of-type(1){
    width: 6%;}
  #mat_manage .tablearea .row div:nth-of-type(2){
    width: 20%;}
  #mat_manage .tablearea .row div:nth-of-type(3){
    width: 10%;}
  #mat_manage .tablearea .row div:nth-of-type(4){
    width: 8%;}
  #mat_manage .tablearea .row div:nth-of-type(5){
    width: 10%;}
  #mat_manage .tablearea .row div:nth-of-type(6){
    width: 6%;}
  #mat_manage .tablearea .row div:nth-of-type(7){
    width: 16%;}
  #mat_manage .tablearea .row div:nth-of-type(8){
    cursor: pointer;
    width: 7%;}
  #mat_manage .tablearea .row div:nth-of-type(9){
    cursor: pointer;
    width: 7%;}
  #mat_manage .tablearea .row div:nth-of-type(10){
    cursor: pointer;
    width: 7%;}
  #mat_manage .tablearea .row div img{
    margin-right: 5px;}
</style>
