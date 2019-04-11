<template>
  <div class="calorie">
    <div class="top">
      <div class="t-left">C a l o r i e</div>
      <div class="t-right">
          <div class="s_personal">
            <div class="s_personal_box">
              <div class="s_user">
                <img :src="u_img" alt="">
                <span class="s_name">{{u_name}}</span>
              </div>
              <ol class="s_personal_list">
                <li><span class="el-icon-star-off"></span> &nbsp;<span>个人中心</span></li>
                <li @click="set" style="border-bottom: 1px solid #d9d9d9"><span class="el-icon-setting"></span> &nbsp;<span>个人设置</span></li>
                <li @click="exit"><span class="fa fa-circle-o-notch"></span> &nbsp;<span>退出登录</span></li>
              </ol>
            </div>
          </div>
      </div>
    </div>
    <div class="bottom">
      <div class="b-left">
        <img :src="u_img" alt="" @click="set">
        <p>{{u_name}}</p>
        <span class="span1">{{u_phone | firster}}</span>
        <ul>
          <router-link :to="{path:'/index/Counts?uid='+u_id+''}" tag="li"><em class="fa fa-pie-chart"></em><span>统计报表</span></router-link>
          <router-link :to="{path:'/index/Customs?uid='+u_id+''}" tag="li"><em class="fa fa-address-book"></em><span>客户管理</span></router-link>
          <router-link :to="{path:'/index/Videos?uid='+u_id+''}" tag="li"><em class="el-icon-service"></em><span>视频管理</span></router-link>
          <router-link :to="{path:'/index/Shops?uid='+u_id+''}" tag="li"><em class="fa fa-shopping-cart"></em><span>商品管理</span></router-link>
          <router-link :to="{path:'/index/Orders?uid='+u_id+''}" tag="li"><em class="el-icon-edit"></em><span>订单管理</span></router-link>
          <router-link :to="{path:'/index/NewPass?uid='+u_id+''}" tag="li"><em class="fa fa-cog"></em><span>个人设置</span></router-link>
        </ul>
      </div>
      <div class="b-right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Calorie",
        data(){
            return {
                u_id:'',
                u_img:'',
                u_name:'',
                u_phone:''
            }
        },
        filters:{
          firster:function (val) {
              if(!val){
                  return ''
              }
              val=val.toString();
              return val.replace(/(\d{3})\d{4}(\d{4})/,'$1****$2');
          }
        },
        methods:{
            exit(){
              this.$router.replace('/login');
            },
            set(){
              this.$router.replace('/index/NewPass?uid='+this.u_id+'');
            }
        },
        mounted(){
            let that=this;
            this.u_id=location.hash.match(/(?<==)\d+/g)[0];
            let n=this.$qs.stringify({
                u_id:that.u_id
            });
            this.$axios({
                method:'post',
                url:'/api/findUser',
                data:n
            }).then((res)=>{
                if(res.data.data.length){
                    let json=res.data.data[0];
                    this.u_img=json.u_img;
                    this.u_name=json.u_name;
                    this.u_phone=json.u_phone;
                }
            })
        }
    }
</script>

<style scoped lang="less">
  *{
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .router-link-active{
  em{
    color: #ffd04b;
  }
  span{
    color: #ffd04b;
  }
  background: #545c64;
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
    float: right;
    position: relative;
    box-shadow:  0 2px 6px rgba(0,21,41,.35);
    background: rgba(255,255,255,0.8);
  .s_personal{
    float: right;
    width: 180px;
    height: 64px;
  &:hover .s_personal_list{
     height: 117px;
   }
  .s_personal_box{
    cursor: pointer;
  .s_user{
    margin-top: 16px;
  }
  }
  img{
    width: 30px;
    height: 30px;
    border-radius: 50%;
    vertical-align: middle;
  }
  .s_name{
    color: #909090;
    height: 24px;
    vertical-align: middle;
  }
  .s_personal_list{
    z-index: 99;
    margin-top: 28px;
    width: 160px;
    height: 0;
    position: absolute;
    right: 40px;
    overflow: hidden;
    white-space : nowrap;//强制不换行
  background: #fff;
    border-radius: 3px;
    box-shadow:  0 2px 6px rgba(0,21,41,.35);
    transition: all .3s;
    font-size: 15px;
  li{
    padding: 6px 30px;
    margin: 5px 0;
    cursor: pointer;
    color: #909090;
  &:hover{
     background: #E6F7FF;
     color: #333;
     transition: all .2s;
   }
  }
  }
  }
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
    width: 1110px;
    height: 100%;
    float: right;
    background: #f2efeb;
  }
  }
</style>
