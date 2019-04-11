<template>
    <div class="wrapper">
        <div class="title">
            <div class="title-tag">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item><i class="el-icon-goods"></i>商品管理</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: 'Shops?uid='+u_id+''}">商品列表</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{path:'Details?uid='+u_id+''}">商品详情</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="title-button">
                <router-link :to="{path:'Details?uid='+u_id+''}" tag="span">
                    <el-button type="success" plain><i class="el-icon-circle-plus-outline"></i>添加商品</el-button>
                </router-link>
                
            </div>
        </div>
        <div class="center">
            <el-table
            :data="tableData"
            border
            style="width: 100%">
                <el-table-column
                fixed
                prop="update"
                label="上架日期"
                width="120">
                </el-table-column>
                <el-table-column
                prop="goodsid"
                label="商品ID"
                width="80">
                </el-table-column>
                <el-table-column
                prop="goodsstate"
                label="商品状态"
                width="120">
                <img src="" alt="">
                </el-table-column>
                <el-table-column
                prop="goodsname"
                label="商品名称"
                width="120">
                </el-table-column>
                <el-table-column
                label="商品图片"
                width="120">
                <template slot-scope="scope">
                    <img :src="scope.row.goodsimg" class="head_pic"/>
                </template>
                </el-table-column>
                <el-table-column
                prop="goodstype"
                label="商品种类"
                width="120">
                </el-table-column>
                <el-table-column
                prop="price"
                label="商品价格"
                width="120">
                </el-table-column>
                <el-table-column
                prop="inventory"
                label="商品库存"
                width="120">
                </el-table-column>
                <el-table-column
                label="操作"
                width="150">
                <template slot-scope="scope">
                    <el-button @click="flag=1;handleClick(scope.row)" type="text" size="small">查看</el-button>
                    <el-button type="text" size="small" @click="flag=2;handleClick(scope.row)">编辑</el-button>
                </template>
                </el-table-column>
            </el-table>
            <el-dialog
                title="商品信息"
                :visible.sync="dialogVisible"
                width="50%"
                :before-close="handleClose">
                <div class="infoBox" v-if="flag==1">
                    <el-row>
                        <el-col :span="12"><div class="grid-content bg-purple">商品ID：{{goodsData[0].goodsid}}</div></el-col>
                        <el-col :span="12"><div class="grid-content bg-purple-light">商品名称：{{goodsData[0].goodsname}}</div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12"><div class="grid-content bg-purple">商品种类：{{goodsData[0].goodstype}}</div></el-col>
                        <el-col :span="12"><div class="grid-content bg-purple-light">商品状态：{{goodsData[0].goodsstate}}</div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12"><div class="grid-content bg-purple">上架日期：{{goodsData[0].update}}</div></el-col>
                        <el-col :span="12"><div class="grid-content bg-purple-light">商品销量：{{goodsData[0].goodssale}}</div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12"><div class="grid-content bg-purple">颜色/规格：</div></el-col>
                    </el-row>
                    <el-row v-for="(value,index) in goodsData" :key="index">
                        <el-col :span="4"><div class="grid-content bg-purple infoTitle">0{{index+1}}--{{value.goodsspec}}</div></el-col>
                        <el-col :span="4"><div class="grid-content bg-purple-light"><img :src="value.goodsimg" class="head_pic"/></div></el-col>
                        <el-col :span="4"><div class="grid-content bg-purple infoTitle">价格：{{value.price}}</div></el-col>
                        <el-col :span="4"><div class="grid-content bg-purple-light infoTitle">库存：{{value.inventory}}</div></el-col>
                    </el-row>
                    <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="dialogVisible = false;changeData()">确 定</el-button>
                    </span>
                </div>
                <div class="infoBox" v-if="flag==2">
                    <el-row>
                        <el-col :span="8"><div class="grid-content bg-purple">商品ID：{{goodsData[0].goodsid}}</div></el-col>
                        <el-col :span="12"><div class="grid-content bg-purple-light">商品名称：{{goodsData[0].goodsname}}</div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8"><div class="grid-content bg-purple">商品种类：{{goodsData[0].goodstype}}</div></el-col>
                        <el-col :span="12"><div class="grid-content bg-purple-light">商品状态：<el-select v-model="goodsData[0].goodsstate" 
                        :placeholder="goodsData[0].goodsstate" size="small">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select></div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12"><div class="grid-content bg-purple">上架日期：<el-date-picker
                            v-model="goodsData[0].update"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            size="small">
                            </el-date-picker>
                        </div></el-col>
                        <el-col :span="8"><div class="grid-content bg-purple-light">商品销量：{{goodsData[0].goodssale}}</div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12"><div class="grid-content bg-purple">颜色/规格：</div></el-col>
                    </el-row>
                    <el-row v-for="(value,index) in goodsData" :key="index">
                        <el-col :span="4"><div class="grid-content bg-purple infoTitle">0{{index+1}}--{{value.goodsspec}}</div></el-col>
                        <el-col :span="4"><div class="grid-content bg-purple-light"><img :src="value.goodsimg" class="head_pic"/></div></el-col>
                        <el-col :span="4"><div class="grid-content bg-purple infoTitle">价格：<el-input v-model="value.price" placeholder="请输入内容" size="small" class="numInput"></el-input></div></el-col>
                        <el-col :span="4"><div class="grid-content bg-purple-light infoTitle">库存：<el-input v-model="value.inventory" placeholder="请输入内容" size="small" class="numInput"></el-input></div></el-col>
                    </el-row>
                    <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="dialogVisible = false;changeData()">确 定</el-button>
                    </span>
                </div>
            </el-dialog>

        </div>
        <div class="bottom">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage1"
                :page-size="5"
                layout="total, prev, pager, next"
                :total="dataLength">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name:'GoodsList',
        components:{},
        props:{},
        data(){
            return {
                u_id:'',
                tableData:[],
                flag:0,
                options:[{
                        value: '已上架',
                        label: '上架'
                        }, {
                        value: '已下架',
                        label: '下架'
                        }],
                goodsData:[{
                            goodsid:0,
                            goodsstate:0,
                            goodsstate:'',
                            goodsname:0,
                            goodstype:0,
                            goodsspec:0,
                            goodssale:0,
                            goodsimg:0,
                            price:0,
                            inventory:0
                        }],
                dataLength:0,
                currentPage1:10,
                dialogVisible: false
            }
        },
        watch:{},
        computed:{},
        methods:{
            handleClick(row) {
                this.dialogVisible = true;
                this.$axios({
                    method:'post',
                    url:'/api/getGoodsInfo',
                    data:{goodsid:row.goodsid},
                }).then((res)=>{
                    this.goodsData=[];
                    // console.log(res.data.data)
                    let goodsInfo=res.data.data;
                    for(let i=0;i<goodsInfo.length;i++){
                        if(goodsInfo[i].s_state==1){
                            goodsInfo[i].s_state='已上架';
                        }else if(goodsInfo[i].s_state==0){
                            goodsInfo[i].s_state='已下架';
                        }
                        // goodsInfo[i].ss_colorImg='http://localhost:1015'+goodsInfo[i].ss_colorImg.match(/(?<=..).+/)[0];
                        this.goodsData.push({
                            goodsid:goodsInfo[i].s_id,
                            update:goodsInfo[i].s_uptime.match(/.+(?=T)/)[0],
                            goodsstate:goodsInfo[i].s_state,
                            goodsimg:goodsInfo[i].ss_colorImg,
                            goodsstate:goodsInfo[i].s_state,
                            goodsname:goodsInfo[i].s_name,
                            goodssale:goodsInfo[i].s_salevolume,
                            goodstype:goodsInfo[i].s_type,
                            goodsspec:goodsInfo[i].ss_color,
                            price:goodsInfo[i].ss_price,
                            inventory:goodsInfo[i].ss_inventory
                        });
                    }
                });
            },
            changeData(){
                let goodsInfo=this.goodsData;
                this.$axios({
                method:'post',
                url:'/api/changeGoodsInfo',
                data:goodsInfo,
            }).then((res)=>{
                for(let i=0;i<this.tableData.length;i++){
                    if(this.tableData[i].goodsid==this.goodsData[0].goodsid){
                        this.tableData[i].update=this.goodsData[0].update;
                        this.tableData[i].goodsstate=this.goodsData[0].goodsstate;
                        this.tableData[i].price=this.goodsData[0].price;
                        let totalInv=0;
                        for(let j=0;j<this.goodsData.length;j++){
                            totalInv+=parseInt(this.goodsData[j].inventory)
                        }
                        this.tableData[i].inventory=totalInv;
                    }
                    
                }
            });
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
            },
            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                // console.log(`当前页: ${val}`);
            }


        },
        create(){
            
        },
        created(){
            this.$axios({
                method:'get',
                url:'/api/getGoods',
            }).then((res)=>{
                // console.log(res.data.data)
                let goodsInfo=res.data.data;
                this.dataLength=goodsInfo.length;
                for(let i=0;i<goodsInfo.length;i++){
                    if(goodsInfo[i].s_state==1){
                        goodsInfo[i].s_state='已上架';
                    }else if(goodsInfo[i].s_state==0){
                        goodsInfo[i].s_state='已下架';
                    }
                    // goodsInfo[i].s_showimg='http://localhost:1015'+goodsInfo[i].s_showimg.match(/(?<=..).+/)[0];
                    this.tableData.push({
                        update:goodsInfo[i].s_uptime.match(/.+(?=T)/)[0],
                        goodsid:goodsInfo[i].s_id,
                        goodsstate:goodsInfo[i].s_state,
                        goodsname:goodsInfo[i].s_name,
                        goodsimg:goodsInfo[i].s_showimg,
                        goodstype:goodsInfo[i].s_type,
                        price:goodsInfo[i].ss_price,
                        inventory:goodsInfo[i].inventory
                    })
                }
            });
        },
        mounted(){
          this.u_id=location.hash.match(/(?<==)\d+/g)[0];
        }
    }
</script>
<style lang="less" scoped>
    .wrapper{
        img{
            width: 60px;
            height: 60px;
        }
        .selBox{
          width: 60px;
        }
        .grid-content{
            line-height: 60px;
        }
        .infoTitle{
            line-height: 60px;
        }
        height: 100%;
        i{
            font-weight: 600;
        }
        .title-tag{
            height: 30px;
            
        }
        .dialog-footer{
            margin-left: 80%;
        }
        .title-button{
            height: 50px;
            border-left: 2px solid red;
            span{
                margin-left: 20px;
                margin-top: 5px;
            }
        }
        .bottom{
            .el-pagination{
                text-align: right;
            }
        }
        .numInput{
            width: 60px;
        }
    }
</style>
