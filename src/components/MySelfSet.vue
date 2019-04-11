<template>
    <div class="set">
        <div class="set-left">
            <p>修改密码</p>
            <el-input v-model="oldpass" placeholder="请输入原密码" type="password"></el-input>
            <el-input v-model="newpass" placeholder="请输入新密码" type="password"></el-input>
            <el-input v-model="ispass" placeholder="确认新密码" type="password"></el-input>
            <el-row>
              <el-button type="primary" round @click="setPass">确认修改</el-button>
            </el-row>
        </div>
        <div class="set-right">
            <p>修改头像</p>
            <div class="div1">
                <img :src="u_img" alt="" class="img1">
                <div class="box1"></div>
            </div>
            <canvas id="c1" width="150" height="150"></canvas>
            <input type="file" id="file1" accept="image/jpg,image/jpeg,image/png,image/gif">
          <el-row>
              <el-button type="primary" round>选择图片</el-button>
              <el-button type="primary" round id="btn2">确认上传</el-button>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MySelfSet",
        data(){
            return {
                oldpass:'',
                newpass:'',
                ispass:'',
                u_id:'',
                u_img:''
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
            }
          });
          let oFile=document.querySelector('#file1');
          let oDiv=document.querySelector('.box1');
          var sec=document.querySelector('.div1');
          var oC=document.getElementById('c1');
          var gd=oC.getContext('2d');
          var oImg=document.querySelector('.img1');
          oFile.onchange=function () {
            document.querySelector('.box1').style.display='block';
            var oFReader = new FileReader();
            var file = oFile.files[0];
            oFReader.readAsDataURL(file);
            oFReader.onloadend = function(ev){
              /*或者目标文件的解析结果*/
              var src = ev.target.result;
              oImg.src=src;
            }
          };
          oDiv.onmousedown=function (e) {
            var x=e.offsetX;
            var y=e.offsetY;
            document.onmousemove=function (ev) {
              var l=ev.clientX-sec.offsetLeft-x;
              var t=ev.clientY-sec.offsetTop-y;
              var wc=sec.offsetWidth-oDiv.offsetWidth;
              var wy=sec.offsetHeight-oDiv.offsetHeight;
              if(l<0){
                l=0
              }else if(l>=wc){
                l=wc
              }
              if(t<0){
                t=0
              }else if(t>=wy){
                t=wy
              }
              oDiv.style.left=l+'px';
              oDiv.style.top=t+'px';
            };
            document.onmouseup=function () {
              document.onmousemove=null;
              document.onmouseup=null;
            };
            return false;
          };
          document.getElementById('btn2').onclick=function () {
              if(oFile.value){
                var hei=150/sec.offsetWidth*oImg.naturalWidth;
                var gao=150/sec.offsetHeight*oImg.naturalHeight;
                var l=parseInt(oDiv.style.left);
                var t=parseInt(oDiv.style.top);
                // oC.width=im.naturalWidth/2;
                // oC.height=im.naturalHeight/2;
                gd.clearRect(0,0,oC.width,oC.height);
                gd.drawImage(oImg,l/sec.offsetWidth*oImg.naturalWidth,t/sec.offsetHeight*oImg.naturalHeight,hei,gao,0,0,150,150);
                var formData=new FormData();
                formData.append('files',oC.toDataURL());
                formData.append('u_id',that.u_id);
                that.$axios({
                  method:'post',
                  url:'/api/uploads',
                  data:formData
                }).then((res)=>{
                  if(!res.data.error){
                    document.querySelector('.box1').style.display='none';
                    console.log(oC.toDataURL());
                    that.setImg();
                    document.querySelector('.b-left img').src=oC.toDataURL();
                    document.querySelector('.s_user img').src=oC.toDataURL();
                  }
                })
              }else{
                  that.open6();
              }
          };
        },
        methods:{
          open2() {
            let that=this;
            this.$message({
              message: '修改成功，5秒后请重新登入！',
              type: 'success'
            });
            setTimeout(function () {
                that.$router.replace('/login');
            },5000)
          },
          open3() {
            this.$message({
              message: '新密码和原密码相同，请重新输入！',
              type: 'warning'
            });
          },
          open5() {
            this.$message({
              message: '新密码和确认密码不相同，请重新输入！',
              type: 'warning'
            });
          },
          open4() {
            this.$message.error('原密码错误，怎么会酱紫！');
          },
          open6() {
            this.$message.error('您还没有选择图片，怎么会酱紫！');
          },
          setPass(){
              if(this.newpass==this.ispass){
                let that=this;
                let postData=this.$qs.stringify({
                  oldpass:this.oldpass,
                  newpass:this.newpass,
                  u_id:this.u_id
                });
                this.$axios({
                  method:'post',
                  url:'/api/setPass',
                  data:postData
                }).then(function (res) {
                  if(!res.data.error){
                    that.open2();
                  }else if(res.data.error==1){
                    that.open4()
                  }else{
                    that.open3()
                  }
                });
              }else{
                  this.open5();
              }
          },
          setImg(){
            let that=this;
            this.$message({
              message: '修改头像成功',
              type: 'success'
            });
          }
        }
    }
</script>

<style scoped lang="less">
  *{
    margin: 0;
    padding: 0;
  }
  .el-input{
    width: 264px;
    margin: 20px auto;
    display: block;
  }
  #file1{
    width: 99px;
    height: 30px;
    position: relative;
    top: 40px;
    left: 171px;
    z-index: 10;
    opacity: 0;
    cursor: pointer;
  }
  .box1{
    width: 150px;
    height: 150px;
    border: 1px solid red;
    background: #128dff;
    opacity: 0.3;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 12;
    display: none;
  }
  .set{
    width: 1088px;
    height: 568px;
    margin: 10px auto;
    box-shadow:  0 2px 6px rgba(0,21,41,.35);
    overflow: hidden;
    background: white;
    .set-left{
      width: 50%;
      float: left;
      height: 100%;
      p{
        text-align: center;
        color: #909090;
        margin-top: 20px;
      }
      .el-button{
        display: block;
        margin: 10px auto;
      }
    }
  .set-right{
    width: 50%;
    height: 100%;
    overflow: hidden;
    float: right;
    p{
      text-align: center;
      color: #909090;
      margin-top: 20px;
    }
    canvas{
      margin: 0 auto;
      display: none;
    }
    .div1{
      margin: 20px auto;
      position: relative;
      overflow: hidden;
      width: 300px;
      height: 300px;
      .img1{
        width: 100%;
        height: 100%;
      }
    }
    .el-row{
      text-align: center;
    }
    .el-button{
      margin: 0 auto;
    }
  }

  }

</style>
