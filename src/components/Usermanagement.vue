<template>
    <div id="djw">
      <h3>客户管理</h3>
      <el-input
        clearable
        placeholder="请输入搜索内容"
        @clear="born"
        prefix-icon="el-icon-search"
        v-model="input">
      </el-input>
      <el-button type="primary" icon="el-icon-search" @click="Search">搜索</el-button>
      <el-table
        :data="tableData"
        border
        style="width:900px">
        <el-table-column
          prop="u_id"
          label="ID"
          >
        </el-table-column>
        <el-table-column
          prop="u_img"
          label="头像"
          >
          <template slot-scope="scope">
            <img :src="scope.row.u_img" style="width:40px;height:40px;" class="headimg">
          </template>
        </el-table-column>
        <el-table-column
          prop="u_name"
          label="昵称"
          >
        </el-table-column>
        <el-table-column
          prop="u_account"
          label="账号"
          >
        </el-table-column>
        <el-table-column
          prop="u_phone"
          label="手机号码"
          >
        </el-table-column>
        <el-table-column
          prop="u_sex"
          label="性别"
          >
        </el-table-column>
        <el-table-column
          prop="reset"
          label="重置(慎用)"
          >
          <template slot-scope="scope">
            <el-button type="danger" icon="el-icon-refresh" @click="open7(scope.row.u_id)">重置</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page.sync="currentPage"
        @current-change="changePage()"
        background
        layout="prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "Usermanagement",
        data:function () {
          return{
            input: '',
            total:0,
            currentPage:1,
            tableData: []
          }
        },
      methods:{
        Search(){
            if(this.input!=''){
              this.currentPage=1;
              this.$axios.get('http://localhost:1015/Dusersearch', {
                params: {
                  str:this.input,
                  page:this.currentPage
                }
              }).then((res)=> {
                console.log(res.data);
                this.tableData=res.data.data;
                this.total=res.data.long*10;
              }).catch((err)=> {
                console.log(err);
              });
            }else{
              this.currentPage=1;
              this.showUser();
              this.showBtn();
            }
        },
        changePage(){
          this.showUser();
        },
        showUser() {
          if(this.input==''){
            this.$axios.get('http://localhost:1015/Duserpage', {
              params: {
                page:this.currentPage,
              }
            }).then((res)=> {
              this.tableData=res.data.data;
            }).catch((err)=> {
              console.log(err);
            });
          }else{
            this.$axios.get('http://localhost:1015/Dusersearch', {
              params: {
                str:this.input,
                page:this.currentPage
              }
            }).then((res)=> {
              this.tableData=res.data.data;
            }).catch((err)=> {
              console.log(err);
            });
          }
        },
        showBtn() {
          this.$axios.get('http://localhost:1015/Duserbtn')
            .then((res)=> {
              this.total=res.data.long*10;
            }).catch((err)=> {
            console.log(err);
          });
        },
        open7(id) {
          this.$confirm('此操作将重置该用户的密码, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true,
          }).then(() => {
            this.$axios.get('http://localhost:1015/Duserreset', {
              params: {
                id:id,
              }
            }).then((res)=> {
              this.$message({
                type: 'success',
                message: '重置成功!'
              });
            }).catch((err)=> {
              console.log(err);
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消重置'
            });
          });
        },
        born(){
          this.currentPage=1;
          this.showUser();
          this.showBtn();
        }
      },
      mounted(){
        this.showUser();
        this.showBtn();
      }
    }
</script>
<style lang="less">
#djw h3{
  text-align: center;
  margin: 30px auto;
  color:#606266;
}
#djw .el-input--prefix{
  width: 200px;
  margin-left: 105px;
}
#djw .el-table{
  margin: 20px auto 0;
}
#djw .is-background{
  margin-top: 30px;
  margin-left: 600px;
}
#djw .el-table th{
  padding:10px 0;
  text-align: center;
}
#djw .el-table td{
  padding: 5px 0;
  text-align: center;
}
#djw .headimg{
  border-radius: 50%;
}
</style>
