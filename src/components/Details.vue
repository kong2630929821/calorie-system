
<template>
    <div class="wrapper">
        <el-container>
            <el-header height="20px">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item><i class="el-icon-goods"></i>商品管理</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: 'Shops?uid='+u_id+''}">商品列表</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{path:'Details?uid='+u_id+''}">商品详情</el-breadcrumb-item>
                </el-breadcrumb>
            </el-header>
            <el-main>
                <ul class="box">
                    <li class="goods-name">
                        <span>商品名称:</span>
                        <el-input
                            placeholder="请输入内容"
                            v-model="goodsname"
                            clearable
                            class="name">
                        </el-input>
                    </li>
                    <li class="goods-type">
                        <span>商品种类:</span>
                        <el-select v-model="goodstype" clearable placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </li>
                    <li class="goods-upDate">
                        <span>商品上架日期:</span>
                        <el-date-picker
                            v-model="goodsupdate"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                        
                    </li>
                    
                    <li class="goods-spec">
                        <span>商品规格:</span>
                        <el-tag
                            :key="tag"
                            v-for="tag in dynamicTags"
                            closable
                            :disable-transitions="false"
                            @close="handleClose(tag)">
                            {{tag}}
                            </el-tag>
                        <el-input
                            class="input-new-tag name"
                            v-if="inputVisible"
                            v-model="inputValue"
                            ref="saveTagInput"
                            size="small"
                            @keyup.enter.native="handleInputConfirm"
                            @blur="handleInputConfirm"
                            >
                        </el-input>
                        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                    </li>
                    <li class="goods-inventory">
                        <el-button type="success" plain @click="setgoods">设置商品参数</el-button>
                    </li>
                </ul>
            </el-main>
        </el-container>
        <el-dialog
            title="商品参数"
            :visible.sync="dialogVisible"
            width="40%"
            :before-close="handleCloseBox">
            <div v-if="flag==1">
                <span>上传展示图片</span>
                <el-upload
                    class="upload-demo"
                    ref="upload"
                    action="http://localhost:1015/uploadImg"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :on-success="returnFile"
                    :file-list="fileList"
                    :auto-upload="false"
                    :multiple="true">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
                </el-upload>
            </div>
            <div v-if="flag==2">
                <span>上传参数图片</span>
                <el-upload
                    class="upload-demo"
                    ref="upload"
                    action="http://localhost:1015/uploadImg"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :on-success="returnFile1"
                    :file-list="fileList1"
                    :auto-upload="false"
                    :multiple="true">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload1">上传到服务器</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
                </el-upload>
            </div>
            <div v-if="flag==3">
                <span>设置规格</span>
                <li v-for="(value,index) in goodsdata" :key="index">
                    <div>0{{index+1}}--{{value.spec}}</div>
                    <span>价格：<el-input v-model="value.price" placeholder="请输入内容" size="small" class="numInput">"></el-input></span>
                    <span>库存：<el-input v-model="value.inventory" placeholder="请输入内容" size="small" class="numInput"></el-input></span>
                    <div>
                        <el-upload
                        class="upload-demo"
                        action="http://localhost:1015/uploadImg"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :on-success="submitImg"
                        :limit="1"
                        :file-list="fileList2">
                        <el-button size="small" type="primary" @click="showlist($event)" :data-spec="value.spec">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
                        </el-upload>
                    </div>
                </li>
                <div><el-button type="success" @click="submitInfo">保存</el-button></div>
            </div>
            </el-dialog>
    </div>
</template>

<script>
    export default {
        name:'Details',
        components:{},
        props:{},
        data(){
            return {
                u_id:'',
                options: [{
                        value: '体脂秤',
                        label: '体脂秤'
                        }, {
                        value: '瑜伽',
                        label: '瑜伽'
                        }, {
                        value: '护具',
                        label: '护具'
                        }, {
                        value: '健身',
                        label: '健身'
                        },],
                        goodstype:'',
                        goodsname: '',
                        goodsupdate: '',
                        dynamicTags: ['红色', '黄色', '蓝色'],
                        inputVisible: false,
                        inputValue: '',
                        dialogImageUrl: '',
                        dialogVisible: false,
                        img:{},
                        fileList:[],
                        fileList1:[],
                        fileList2:[],
                        goods:[],
                        goodsid:0,
                        dialogVisible: false,
                        flag:0,
                        goodsdata:[],
                        imgInfo:[],
                        goodsspec:'',
            }
        },
        creat(){
            // this.url = url;
        },
        watch:{},
        computed:{},
        methods:{
            showlist(e){
                console.log(e.currentTarget.getAttribute("data-spec"))
                this.goodsspec=e.currentTarget.getAttribute("data-spec")

            },
            submitInfo(){
              let that=this;
                for(let i=0;i<this.goodsdata.length;i++){
                    for(let j=0;j<this.imgInfo.length;j++){
                        if(this.goodsdata[i].spec==this.imgInfo[j].goodsspec){
                            this.goodsdata[i].img=this.imgInfo[j].goodsimg;
                            this.goodsdata[i].goodsid=this.goodsid;
                        }
                    }
                }
                console.log(this.goodsdata)
                this.$axios({
                    method:'post',
                    url:'/api/addSpecImg',
                    data:this.goodsdata,
                    }).then((res)=>{
                        console.log(1)
                        this.$router.replace('Shops?uid='+that.u_id+'');
                    });
            },
            submitImg(response,file,fileList){
                console.log(file,fileList)
                let goodsimg='';
                goodsimg='http://localhost:1015/images/push/'+file.name;
                this.imgInfo.push({
                    goodsspec:this.goodsspec,
                    goodsimg:goodsimg
                })
                console.log(this.imgInfo)
            },
            handleClose(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            },
            returnFile(response, file, fileList){
                console.log(fileList)
                let goodsimg='';
                let goodsShowImg=[];
                for(let i=0;i<fileList.length;i++){
                    goodsimg='http://localhost:1015/images/push/'+fileList[i].name;
                    goodsShowImg.push({
                        goodsid:this.goodsid,
                        goodsimg:goodsimg
                    })
                }
                this.$axios({
                    method:'post',
                    url:'/api/addGoodsShow',
                    data:goodsShowImg,
                    }).then((res)=>{
                        this.flag=2;
                    });
            },
            returnFile1(response, file, fileList){
                console.log(fileList)
                let goodsimg='';
                let goodsDetailImg=[];
                for(let i=0;i<fileList.length;i++){
                    goodsimg='http://localhost:1015/images/push/'+fileList[i].name;
                    goodsDetailImg.push({
                        goodsid:this.goodsid,
                        goodsimg:goodsimg
                    })
                }
                this.$axios({
                    method:'post',
                    url:'/api/addGoodsDetail',
                    data:goodsDetailImg,
                    }).then((res)=>{
                        this.$axios({
                        method:'post',
                        url:'/api/getGoodsData',
                        data:{goodsid:this.goodsid},
                        }).then((res)=>{
                            console.log(res.data.data)
                            this.goodsdata=[];
                            let goodsData=[];
                            goodsData=res.data.data;
                            for(let i=0;i<goodsData.length;i++){
                                this.goodsdata.push({
                                    spec:goodsData[i].ss_color,
                                    price:goodsData[i].ss_price,
                                    inventory:goodsData[i].ss_inventory
                                })
                            }
                            this.flag=3;
                            this.imgInfo=[];
                        });
                        
                    });
            },
            setgoods(){
                console.log(this.goodsname,this.goodstype,this.goodsupdate,this.dynamicTags)
                this.goods=[];
                this.goodsid=0;
                for(let i=0;i<this.dynamicTags.length;i++){
                    this.goods.push({
                        goodsname:this.goodsname,
                        goodstype:this.goodstype,
                        goodsupdate:this.goodsupdate,
                        goodsspec:this.dynamicTags[i]
                    })
                }
                console.log(this.goods)
                this.$axios({
                method:'post',
                url:'/api/addGoods',
                data:this.goods,
                }).then((res)=>{
                    console.log(res.data.data[0].s_id)
                    this.goodsid=res.data.data[0].s_id
                    this.$axios({
                    method:'post',
                    url:'/api/addGoodsSpec',
                    data:{
                            goods:this.goods,
                            goodsid:this.goodsid
                        },
                    }).then((res)=>{
                        this.flag=1;
                        this.dialogVisible = true
                    });
                });
            },
            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
                });
            },
            handleCloseBox(done) {
                this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
            },
            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                this.dynamicTags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },
            submitUpload() {
                this.$refs.upload.submit();
            },
            submitUpload1() {
                this.$refs.upload.submit();
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                this.img=file;
                console.log(file);
            },
                },
        created(){},
        mounted(){
          this.u_id=location.hash.match(/(?<==)\d+/g)[0];
        }
    }
</script>
<style lang="less" scoped>
    .wrapper{
        height: 100%;
        li{
            margin-top: 15px;
        }
        .box .name{
            width: 200px;
        }
        .spec-img{
            width: 50px;
            height: 50px;
        }
        .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
        }
        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 60px;
            height: 60px;
            line-height: 60px;
            text-align: center;
        }
        .avatar {
            width: 60px;
            height: 60px;
            display: block;
        }
        .numInput{
            width: 200px;
        }
        li{
            margin-top: 10px;
            div{
                margin-top: 10px;
            }
        }
    }
</style>
