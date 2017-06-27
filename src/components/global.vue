<script>
  //这里是全局数据交互以及方法集合。请在每个新模块import此模块
  export default{
    name:"global",
    database:{
        singleorder:"",
      //用于请求数据时验证身份
      account_id:"",
      singleOrderId:""
    },
    pagecode:"",
    //翻译status码
    statustransform:function (statuscode) {
      statuscode={
        "100": "待发单",
        "110": "",
        "120": "发货时间待确认",
        "130": "已接单",
        "140": "已接单",
        "200": "已发货",
        "210": "已收货",
        "220": "退货申请中",
        "230": "确认退货",
        "240": "待补货",
        "241": "补货已发货",
        "250": "已收货",//完成收货
        "260": "退货中",
        "300": "明细待审核",
        "400": "已完成",
        "310": "修改明细",
        "410": "确认修改明细",
        "500": "待结算订单",
        "501": "提交审核",
        "502": "待结算",
        "503": "转款",
        "508": "已结算",
        "900": "订单已取消"
      }[statuscode]
      return statuscode
      console.log(statuscode,"燚")
    },
    //材料类型翻译
    materialtranslate:function (mat) {
      mat=['木工','瓦工','水电','油漆','综合'][mat-1]
      return mat
    },
    //ajax封装
    SERVER_URL: "http://test.yjzone.cn/home/",
    IMAGE_URL: "http://test.yjzone.cn/homeimage",
    getdata:function (url, data, callback) {
      $.ajax({
        type: 'POST',
        url: this.SERVER_URL + url,
        data: JSON.stringify(data),
        contentType: 'text/plain;charset=UTF-8',
        success: callback,
        dataType: 'json'
      });
    },
    //登入 phone：手机号，password：密码
    login:function (phone,password,callback) {
      var data = {
        "jsonrpc": "2.0",
        "method": "login",
        "params": {
          "mobile": phone,
          "password": password
        },
        "auth": "",
        "id": 21001
      }
      this.getdata("account.json",data,callback)
    },
    //取得短信验证码 phone：手机号，type：类型 1=注册，2=验证
    getvalidatecode: function(mobile, type, callback) {
        var data = {
          "jsonrpc": "2.0",
          "method": "sendCode",
          "params": {
            "mobile":mobile,
            "type":type
          },
          "auth": "",
          "id":10005
        }
        this.getdata('system.json', data, callback);
    },
    //注册 code：验证码，password：设定密码,accounttype：账户类型 1=企业 2=供应商 3=客户
    signin: function(phone, code, password,accounttype, callback) {
        var data = {
          "jsonrpc": "2.0",
          "method": "reg",
          "params": {
            "mobile":phone,
            "password":password,
            "guidMobile":"",
            "accoType":accounttype,
            "validateCode":code
          },
          "auth": "",
          "id":24009
        }
        this.getdata('account.json', data, callback);
    },
    //修改密码
    setpassword:function(accountId, oldPassword, newPassword, type, callback){
      var data = {
        "jsonrpc": "2.0",
        "method": "modifyPassword",
        "params": {
          "accountId":accountId,
          "oldPassword":oldPassword,
          "newPassword":newPassword,
          "type":type
        },
        "auth": "",
        "id":24007
      }
      this.getdata('account.json', data, callback);
    },
    //取得订单列表 status：1=未完成 2=已完成 3=已结算 0=所有，keywords：搜索关键词
    getorderlist: function(status, keywords,accountid, callback){
      var data = {
        "jsonrpc": "2.0",
        "method": "getOrderList",
        "params": {
          "keywords":keywords,
          "projectId":"0",
          "accountId":accountid,
          "status":status+"",
          "isDel":"0",
          "pageSize":"60",
          "pageNum":"1"
        },
        "auth": "",
        "id":31005
      }
      this.getdata('order.json', data, callback);
    },
    //取得订单详情
    getorderdetail:function (orderid,callback) {
        var data={
          "jsonrpc": "2.0",
          "method": "getOrderVO",
          "params": {
            "orderId":orderid
          },
          "auth": "",
          "id":31003
        }
        this.getdata("order.json",data,callback)
    }
  }
</script>
