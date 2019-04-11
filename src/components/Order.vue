<template>
  <div class="a=box">

    <div class="a-tit">订单管理</div>

      <!--<el-select v-model="value" placeholder="请选择" class="a-select">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>-->
    <div class="search-Box">
      <el-input   placeholder="请输入关键字"
                  icon="search"
                  class="search"
                  v-model="search">

      </el-input>
    </div>


    <div class="a-table">
      <el-table
        :data="tables"
        style="width: 85%"
        class="a-table">
        <el-table-column
          prop="of_data"
          label="支付时间"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="of_num"
          label="订单号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="u_account"
          label="会员账号"
          width="150">
        </el-table-column>

        <!--<el-table-column
          prop="address"
          label="地址"
          width="200">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话"
          width="180">
          <i class="el-icon-edit"></i>
        </el-table-column>-->
        <el-table-column
          prop="state"
          label="状态"
          width="120">
        </el-table-column>
        <el-table-column
          prop="details"
          label="商品详情"
          width="120">
          <template slot-scope="scope">
            <el-button
              icon="el-icon-view"
              size="mini"
              @click="shopDetails(scope.row)">详情</el-button>
            <el-dialog title="商品详情" :visible.sync="dialogTableVisible">
              <el-table :data="gridData">
                <el-table-column property="s_name" label="商品" width="150"></el-table-column>
                <el-table-column property="ss_price" label="单价" width="200"></el-table-column>
                <el-table-column property="goods_num" label="数量"></el-table-column>
              </el-table>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogTableVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
              </div>
            </el-dialog>
          </template>

        </el-table-column>
        <el-table-column
          prop="address"
          label="配送信息"
          width="120">
          <template slot-scope="scope">
            <el-button
              icon="el-icon-view"
              size="mini"
              @click="adderssDetails(scope.row)">详情</el-button>
            <el-dialog title="收货信息" :visible.sync="dialogFormVisible">
              <el-form :model="form" >
                <el-form-item label="收件人姓名" :label-width="formLabelWidth">
                  <el-input v-model="form.a_name" autocomplete="off" value="form.a_name" ></el-input>
                </el-form-item>
                <el-form-item label="电话" :label-width="formLabelWidth">
                  <el-input v-model="form.a_phone" autocomplete="off" value="form.a_phone"></el-input>
                </el-form-item>
                <el-form-item label="收货省" :label-width="formLabelWidth">
                  <el-input v-model="form.a_province" autocomplete="off" value="form.a_province"></el-input>
                  <!--<el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>-->
                </el-form-item>
                <el-form-item label="详细地址" :label-width="formLabelWidth">
                  <el-input v-model="form.a_detailed" autocomplete="off" value="form.a_detailed"></el-input>
                  <!--<el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>-->
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
              </div>
            </el-dialog>
          </template>
        </el-table-column>

      </el-table>
    </div>

    <el-pagination
      :current-page.sync="currentPage"
      @current-change="viewImfor()"
      background
      layout="prev, pager, next"
      :total="total"
      class="a-pag">
    </el-pagination>

  </div>

</template>

<script>
    export default {
        name: "order",
      data() {
        return {
          total:10,
          currentPage:1,
          search: '',
          options: [{
            value: '选项1',
            label: '未发货'
          }, {
            value: '选项2',
            label: '发货中'
          }, {
            value: '选项3',
            label: '已完成'
          }],
          value: '',
          tableData: [
            /*{
            date:'2018-12-13',
            ordernum: '1324563535544',
            name: '@1224663',
            phone:'15678964532',
            state:'完成',

          }, {
            date:'2018-12-13',
            ordernum: '1324563535544',
            name: '@1224663',
            /!*address: '上海市普陀区金沙江路 1518 弄',*!/
            phone:'15678964532',
            state:'完成'
          }, {
            date:'2018-12-13',
            ordernum: '1324563535544',
            name: '@1224663',
            address: '上海市普陀区金沙江路 1518 弄',
            phone:'15678964532',
            state:'完成'
          }, {
            date:'2018-12-13',
            ordernum: '1324563535544',
            name: '@1224663',
            address: '上海市普陀区金沙江路 1518 弄',
            phone:'15678964532',
            state:'完成'
          }*/],
          gridData: [/* {
            shop:'30kg杠铃',
            price:'120',
            num:'1'
          }, {
            shop:'30kg杠铃',
            price:'120',
            num:'1'
          }*/],

          dialogTableVisible: false,
          dialogFormVisible: false,
          form: {
            a_name: '',
            a_phone:'',
            a_province:'',
            a_detailed:''
          },
          formLabelWidth: '120px',
        }
      },
      computed:{
        tables:function(){
          var search=this.search;
          if(search){
            this.total=this.tableData.filter(function(dataNews){
              return Object.keys(dataNews).some(function(key){
                return String(dataNews[key]).toLowerCase().indexOf(search) > -1
              })
            }).length/4*10;
            return this.tableData.filter(function(dataNews){
              return Object.keys(dataNews).some(function(key){
                return String(dataNews[key]).toLowerCase().indexOf(search) > -1
              })
            }).slice((this.currentPage-1)*4,this.currentPage*4)
          }
          this.getPage();
          return this.tableData.slice((this.currentPage-1)*4,this.currentPage*4);
        }
      },

      methods: {
        handleEdit() {
          this.$alert('这是一段内容', '标题名称', {
            confirmButtonText: '确定',
            callback: action => {
              this.$message({
                type: 'info',
                message: `action: ${ action }`
              });
            }
          });
        },
        viewImfor(){
          this.$axios.get('http://localhost:1015/Aorder').then((res)=>{
            this.tableData=res.data.data;
          })
        },
        getPage(){
          this.$axios.get('http://localhost:1015/Aordernum').then((res)=>{

            this.total=res.data.data[0].num/4*10;
          })
        },
        shopDetails(row){

          this.dialogTableVisible = true;
          this.$axios.get('http://localhost:1015/Ashopdetail',{
            params:{
              id:row.of_id
            }
          }).then((res)=>{
            this.gridData=res.data.data;


          })


        },
        adderssDetails(row){
          this.dialogFormVisible = true;
          this.$axios.get('http://localhost:1015/Aaddressdetail',{
            params:{
              id:row.of_id
            }
          }).then((res)=>{
            console.log(res.data)
            this.form=res.data.data[0];

          })
        }
        /*changePage(){
          this.$axios.get('http://localhost:1015/Aorder').then((res)=>{
            this.tableData=res.data.data;

          })
        }*/
      },
      mounted(){

          this.viewImfor();
          this.getPage();
      }
    }

</script>

<style>
  .a-tit{
    color: gray;
    font-size: 23px;
    font-weight: bold;
    margin-top: 30px;
    width: 100%;
    height: 50px;
    text-align: center;
    line-height: 50px;
  }
  .search{
    margin-left: 700px;
    width: 200px;
    /*margin-bottom: 20px;*/
  }
  .a-table{
    padding: 30px;
    margin-left: 20px;
  }

  .a-pag{
    margin-left: 700px;
    margin-top: 30px;

  }

</style>
