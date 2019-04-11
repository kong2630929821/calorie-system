<template>
    <div class="reg">
        <div class="font t-c">C</div>
        <div class="font t-a">A</div>
        <div class="font t-l">L</div>
        <div class="font t-o">O</div>
        <div class="font t-r">R</div>
        <div class="font t-i">I</div>
        <div class="font t-e">E</div>
        <div class="register">
            <p>账密登录</p>
            <img :src="u_img" alt="">
            <el-input v-model="users" placeholder="请输入账号" @input="changes"></el-input>
            <el-input v-model="pass" placeholder="请输入密码" type="password"></el-input>
            <el-row>
                <el-button type="success" plain size="medium" @click="login">登入</el-button>
            </el-row>
        </div>
        <div class="box3">
            <img src="../assets/images/1.png" alt="" class="i1">
            <img src="../assets/images/2.png" alt="" class="i2">
            <img src="../assets/images/3.png" alt="" class="i3">
            <img src="../assets/images/4.png" alt="" class="i4">
            <img src="../assets/images/5.png" alt="" class="i5">
            <img src="../assets/images/6.png" alt="" class="i6">
            <img src="../assets/images/7.png" alt="" class="i7">
            <img src="../assets/images/8.png" alt="" class="i8">
            <img src="../assets/images/9.png" alt="" class="i9">
        </div>
    </div>
</template>

<script>
    export default {
        name: "Register",
        data(){
            return {
                users:'',
                pass:'',
                u_img:'../../static/users.jpg'
            }
        },
        mounted(){
          setTimeout(function () {
              let arr=[0,0,0,118,0,232,116,0,116,118,116,236,232,0,232,118,232,236];
              let obj=document.querySelectorAll('.box3 img');
              let j=0;
              for(var i=0;i<obj.length;i++){
                  obj[i].style.top=arr[j++]+'px';
                  obj[i].style.left=arr[j++]+'px';
              }
          },1);
          document.querySelector('.box3').addEventListener('transitionend',function () {
            document.querySelector('.box3').style.display='none';
            document.querySelector('.register').style.display='block';
          });
        },
        methods:{
          open2() {
            this.$message({
              message: '登入成功！',
              type: 'success'
            });
          },
            changes(){
                let json=localStorage;
                let arr=[];
                for(var i=0;i<json.length;i++){
                  if(json[i]){
                    arr.push(JSON.parse(json[i]))
                  }
                }
                for(var i=0;i<arr.length;i++){
                    if(this.users==arr[i].users){
                        this.u_img=arr[i].img;
                        break;
                    }else if(this.users!=arr[i].users){
                        this.u_img='../../static/users.jpg'
                    }
                }
            },
            login(){
              let that=this;
              let json={};
                let postData=this.$qs.stringify({
                    users:this.users,
                    pass:this.pass
                });
                this.$axios({
                    method:'post',
                    url:'/api/loginSysterm',
                    data:postData
                }).then(function (res) {
                    if(res.data.data.length){
                      json.users=res.data.data[0].u_account;
                      json.img=res.data.data[0].u_img;
                      localStorage.setItem(res.data.data[0].u_id,JSON.stringify(json));
                      that.open2();
                      setTimeout(function () {
                        that.$router.replace('index/Counts?uid='+res.data.data[0].u_id+'');
                      },1000)
                    }else{
                      that.open4();
                      let oIpt=document.querySelectorAll('input')[1];
                      oIpt.focus();
                      oIpt.value='';
                      oIpt.style.borderColor='red';
                      oIpt.oninput=function () {
                          oIpt.style.borderColor='rgb(64,158,255)'
                      }
                    }

                });
            },
            open4() {
              this.$message.error('账号或密码错误，怎么会酱紫！');
            }
        }

    }

</script>

<style scoped lang="less">
  .reg{
    width: 1366px;
    height: 656px;
    background: url("../assets/images/loginbg.jpg")no-repeat;
    .font{
      position: absolute;
      font-size: 100px;
      color: #EDF1F5;
      background: rgba(242,242,242,0);
    }
    .t-c{
       left: 150px;
       top: 150px;
       transition: all 2s;
        &:hover{
            transform: rotateX(200deg) rotateZ(160deg) rotateX(60deg) translateY(50px);
         }
     }
  .t-a{
    left: 210px;
    top: 190px;
    transition: all 2s;
    &:hover{
    transform: rotateX(-200deg) rotateZ(60deg) rotateX(160deg) translateY(-50px);
     }
  }
  .t-l{
    left: 280px;
    top: 270px;
    transition: all 2s;
    &:hover{
       transform: rotateX(100deg) rotateZ(260deg) rotateX(-160deg) translateZ(50px);
     }
  }
  .t-o{
    left: 360px;
    top: 180px;
    transition: all 2s;
    &:hover{
    transform: rotateX(300deg) rotateZ(60deg) rotateX(260deg) translateZ(-50px);
     }
  }
  .t-r{
    left: 500px;
    top: 210px;
    transition: all 2s;
    &:hover{
    transform: rotateX(-90deg) rotateZ(60deg) rotateX(30deg) translateY(-50px);
     }
  }
  .t-i{
    left: 446px;
    top: 240px;
    transition: all 2s;
    &:hover{
      transform: rotateX(170deg) rotateZ(-60deg) rotateX(-60deg) translateZ(-50px) translateY(-50px);
     }
  }
  .t-e{
    left: 570px;
    top: 200px;
    transition: all 2s;
    &:hover{
      transform: rotateX(-100deg) rotateZ(160deg) rotateX(60deg) translateX(-50px);
     }
  }
  .register{
    width: 356px;
    height: 350px;
    background: rgba(242,242,242,0.3);
    overflow: hidden;
    display: none;
    position: absolute;
    top: 133px;
    left: 795px;
    p{
      text-align: center;
      margin-top: 20px;
      font-size: 18px;
      font-weight: bold;
      color: white;
    }
    img{
      width: 60px;
      height: 60px;
      display: block;
      margin: 20px auto 0;
      border-radius: 50%;
    }
    .el-input{
      width: 264px;
      margin: 20px auto;
      display: block;
    }
    .el-button--success{
      width: 264px;
      display: block;
      margin: 0 auto;
    }
  }
  .box3{
    width: 356px;
    height: 350px;
    position: absolute;
    top: 133px;
    left: 795px;
    img{
      position: absolute;
      transition: all 2s;
    }
    .i1{
      top: -116px;
      left: -118px;
    }
    .i2{
      top: -116px;
      left: 118px;
    }
    .i3{
      top: -116px;
      left: 354px;
    }
    .i4{
      top: 116px;
      left: -118px;
    }
    .i5{
      top: 116px;
      left: 118px;
    }
    .i6{
      top: 116px;
      left: 354px;
    }
    .i7{
      top: 348px;
      left: -118px;
    }
    .i8{
      top: 348px;
      left: 118px;
    }
    .i9{
      top: 348px;
      left: 354px;
    }
  }
  }
</style>
