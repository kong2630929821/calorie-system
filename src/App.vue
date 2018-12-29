<template>
  <div id="app">
    <div>
      <div class="top">
        <div class="t-left">C a l o r i e</div>
        <div class="t-right"></div>
      </div>
      <div class="bottom">
        <div class="b-left">
            <img src="./assets/users.jpg" alt="">
            <p>calorie店</p>
            <span class="span1">17774645192</span>
            <ul>
              <router-link to="/Counts" tag="li"><em class="fa fa-pie-chart"></em><span>统计报表</span></router-link>
              <router-link to="/Customs" tag="li"><em class="fa fa-address-book"></em><span>客户管理</span></router-link>
              <router-link to="/Videos" tag="li"><em class="el-icon-service"></em><span>视频管理</span></router-link>
              <router-link to="/Shops" tag="li"><em class="fa fa-shopping-cart"></em><span>商品管理</span></router-link>
              <router-link to="/Orders" tag="li"><em class="el-icon-edit"></em><span>订单管理</span></router-link>
            </ul>
        </div>
        <div class="b-right">
            <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  components:{

  }
}
</script>
<style scoped lang="less">
  *{
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .top{
    width: 1366px;
    height: 66px;
  .t-left{
    width: 256px;
    height: 66px;
    background: #627AAD;
    float: left;
    font-size: 25px;
    color: white;
    font-weight: bold;
    line-height: 66px;
    text-align: center;
  }
  .t-right{
    width: 1110px;
    height: 66px;
    background: rgba(255,255,255,0.8);
  }
  }
  .bottom{
    width: 1366px;
    height: 590px;
  .b-left{
    width: 256px;
    height: 100%;
    float: left;
    overflow: hidden;
    background: #333333;
    img{
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin-left: 84px;
      margin-top: 40px;
    }
    p{
      text-align: center;
      color: whitesmoke;
    }
    ul{
      margin-top: 20px;
      overflow: hidden;
    }
    .span1{
      display: block;
      text-align: center;
      color: whitesmoke;
      font-size: 12px;
      font-weight: bold;
      margin-top: 3px;
    }
    li{
      width: 256px;
      height: 40px;
      margin-top: 3px;
      line-height: 40px;
      color: #fff;
      cursor: pointer;
      em{
        margin-left: 50px;
      }
      span{
        margin-left: 32px;
      }
      &:hover{
        color: #ffd04b;
        background: #545c64;
      }
    }
  }
  .b-right{
<<<<<<< HEAD
    width: 1110px;
=======
    width: 1366px;
>>>>>>> d70ee778fd7c64f06e9b59f54ceb5af684def72d
    height: 100%;
    float: right;
    background: #f2efeb;
  }
  }
</style>
