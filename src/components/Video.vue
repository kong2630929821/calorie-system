<template>
  <div id="v-box">
    <div id="v-head">
      <span>课程管理</span><br>
      <div><el-input
           @change="page1()"
           v-model="search"
           size="small"
           placeholder="请输入查找内容"
           prefix-icon="el-icon-search"
           >
           </el-input>
           <el-button
             type="primary"
             size="mini"
             plain
             @click="dialogFormVisible=true">
             <i class="el-icon-circle-plus-outline"></i>
             新增</el-button>

      </div>
    </div>
    <div id="v-table">
    <el-table
          :data="tables"
          style="width: 100%">
      <el-table-column
      label="课程ID"
      width="100">
      <template slot-scope="scope">
        <!--<i class="el-icon-time"></i>-->
        <span >{{ scope.row.Type3_id}}</span>
      </template>
    </el-table-column>
      <el-table-column
          label="课程封面"
           width="126">
      <template slot-scope="scope">
        <img :src="scope.row.Type3_src">

        </el-popover>
      </template>
    </el-table-column>
      <el-table-column
            label="课程名"
            width="171">
            <template slot-scope="scope">
              <span >{{ scope.row.Type3_name}}</span>

              </el-popover>
            </template>
          </el-table-column>
      <el-table-column
            label="课程分类1"
            width="171">
            <template slot-scope="scope">
              <span >{{ scope.row.Type1_name }}</span>

              </el-popover>
            </template>
          </el-table-column>
      <el-table-column
            label="课程时长"
            width="110">
            <template slot-scope="scope">
              <span >{{ scope.row.Type3_time}}</span>

              </el-popover>
            </template>
          </el-table-column>
      <el-table-column label="操作" width="216" style="margin-left: 15px" >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="Details(scope.row.Type3_id)">详情</el-button>

            <el-button
              size="mini"
              type="danger"
              @click="Delete(scope.row.Type3_id)">删除</el-button>
          </template>
        </el-table-column>
   </el-table>
   </div>
    <div id="v-foot">
      <el-pagination
        background
        :current-page.sync="currentPage"
        layout="prev, pager, next"
        :total="total"
      size="small">
      </el-pagination>
    </div>
    <!--新增模态框-->
    <el-dialog title="新增课程" :visible.sync="dialogFormVisible">
      <el-form :model="addData">
          <el-form-item label="课程名称" :label-width="formLabelWidth">
          <el-input v-model="addData.name" autocomplete="off"></el-input></el-form-item>
          <el-form-item label="课程分类" :label-width="formLabelWidth">
          <el-select v-model="addData.region1" @change="type2(addData.region1)" filterable placeholder="请选择课程分类一">
          <el-option v-for="v in type1data"
                       :key="v.Type1_id"
                       :label="v.Type1_name"
                       :value="v.Type1_id"
                       ></el-option>
          </el-select>
          <el-select  filterable v-model="addData.region2"  placeholder="请选择课程分类二" v-if="type2data" >

              <el-option v-for="i in type2data"
                         :key="i.Type2_id"
                         :label="i.Type2_name"
                         :value="i.Type2_id"></el-option>
              <!--<el-option label="分类一" value="shanghai"></el-option>-->
            </el-select>
          </el-form-item>
          <el-form-item label="课程封面" :label-width="formLabelWidth">
          <el-upload
            :on-change="addUrl"
            ref="upload"
            :auto-upload="false"
            accept="mp4"
            multer="true"
            action="http://localhost:1015/classUpload"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i> <!--:on-success="addvideo"-->
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>

        </el-form-item>
          <el-form-item label="课程描述" :label-width="formLabelWidth">
          <el-input v-model="addData.describe" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add()">确 定</el-button>
      </div>
  </el-dialog>
    <!--详情模态框-->
    <el-dialog
    title="课程信息"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
      <img class="p1" :src="form.Type2_src" alt=""><br>
      <div id="v-span">
      课程编号：
      <span>{{form.Type3_id}}</span><br>
      课程名：
      <span>{{form.Type3_name}}</span><br>
      <!--视频路径：-->
      <!--<span>{{form.Type3_src}}</span><br>-->
      课程分类1：
      <span>{{form.Type1_name}}</span><br>
        课程分类2：
        <span>{{form.Type2_name}}</span><br>
      课程描述：<br>
      <span>Burpees 是单位时间内燃烧热量最高的健身动作之一</span><br>
      课程强度：
      <span>k{{form.Type2_energy}}</span></div>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
  </el-dialog>
  </div>
</template>
<script>
  export default{
        name:'cVideo',
        data() {
          return {
            type2data:[],
            type1data:[],
            addData:{
              name:'',
              region1:'',
              region2:'',
              src:'',
              describe:''
            },
            dormitory:[],
            total:10,
            currentPage:1,
            dialogVisible: false,
            dialogFormVisible: false,
            form: {},
            formLabelWidth: '120px',
            dialogImageUrl: '',
            dialogVisible: false,
            search: ''
          }
        },
        computed:{
         tables(){
           const search = this.search;
           if (search) {

             this.total=Math.ceil(this.dormitory.filter(data => {
                   // some() 方法用于检测数组中的元素是否满足指定条件;
                   // some() 方法会依次执行数组的每个元素：
                   // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测;
                   // 如果没有满足条件的元素，则返回false。
                   // 注意： some() 不会对空数组进行检测。
                   // 注意： some() 不会改变原始数组。
                   return Object.keys(data).some(key => {
                     // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置，如果没有找到就返回-1；
                     // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
                     return String(data[key]).toLowerCase().indexOf(search) > -1
                   })
                 }).length/4)*10;
             return this.dormitory.filter(data => {
               // some() 方法用于检测数组中的元素是否满足指定条件;
               // some() 方法会依次执行数组的每个元素：
               // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测;
               // 如果没有满足条件的元素，则返回false。
               // 注意： some() 不会对空数组进行检测。
               // 注意： some() 不会改变原始数组。
               return Object.keys(data).some(key => {
                 // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置，如果没有找到就返回-1；
                 // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
                 return String(data[key]).toLowerCase().indexOf(search) > -1
               })
             }).slice((this.currentPage-1)*4,this.currentPage*4)

           }

           this.total=Math.ceil(this.dormitory.filter(data => {
                 // some() 方法用于检测数组中的元素是否满足指定条件;
                 // some() 方法会依次执行数组的每个元素：
                 // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测;
                 // 如果没有满足条件的元素，则返回false。
                 // 注意： some() 不会对空数组进行检测。
                 // 注意： some() 不会改变原始数组。
                 return Object.keys(data).some(key => {
                   // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置，如果没有找到就返回-1；
                   // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
                   return String(data[key]).toLowerCase().indexOf(search) > -1
                 })
               }).length/4)*10;
           return this.dormitory.slice((this.currentPage-1)*4,this.currentPage*4);
         }
    },
        methods:{
          addUrl(file,filelist){
                this.addData.src='./../images/class/upload/'+file.name+'';
              },
          add(){
                this.$refs.upload.submit();
                  this.$axios.get('http://localhost:1015/addData',{
                    params: {
                      Data:this.addData
                  }
                }).then((res)=>{

                  if(!res.data.error){
                    this.dialogFormVisible = false;
                    this.$message({
                      type: 'success',
                      message: '添加成功!'
                    });
                    this.addData={
                      name:'',
                        region1:'',
                        region2:'',
                        src:'',
                        describe:''
                    };
                    this.$refs.upload.clearFiles();
                    this.changePage();
                    this.getPage();
                    this.tables();

                  }else{
                      this.$message({
                        type: 'info',
                        message: '添加失败'
                      });
                    }
                  })
                },
          type2(i){
                this.$axios.get('http://localhost:1015/classtype1-1',{
                  params: {
                    id:i
                  }
                }).then((res)=>{
                  this.addData.region2='';
                  this.type2data=[];
                  this.type2data=res.data.data;

                })
              },
          type1(){
                  this.$axios.get('http://localhost:1015/classtype-onload1').then((res)=>{
                    this.type1data=res.data.data
                  })
              },
          Details(i){
                this.dialogVisible=true;
                this.$axios.get('http://localhost:1015/classdata',{
                  params: {
                    id:i
                  }
                }).then((res)=>{
                  this.form=res.data.data[0];
                  this.form.Type2_src='http://localhost:1015'+this.form.Type2_src.match(/(?<=.\/..).+/)[0];

                })
              },
          getPage(){
                this.$axios.get('http://localhost:1015/classtypeCount').then((res)=>{
                     this.total=res.data.data*10;
                })
              },
          changePage(){
                this.$axios.get('http://localhost:1015/classtypeAll').then((res)=>{
                  this.dormitory=res.data.data;
                  //修改img的路径
                  for(let i=0;i<this.dormitory.length;i++)
                  {
                      this.dormitory[i].Type3_src='http://localhost:1015'+this.dormitory[i].Type3_src.match(/(?<=.\/..).+/)[0];
                  }
                })
              },
          handleEdit(index, row) {
                console.log(index, row);
              },
          handleDelete(index, row) {
                console.log(index, row);
              },
          Delete(id) {
            this.$confirm('此操作将永久删除该课程, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: '1'
            }).then(() => {
              this.$axios.get('http://localhost:1015/dataDelete',{
                params: {
                  id:id
                }
              }).then((res)=>{
               if(!res.data.error){
                 this.$message({
                   type: 'success',
                   message: '删除成功!'
                 });
                 this.changePage();
                 this. getPage();
                 this.tables();

               }else {
                 this.$message({
                   type: 'info',
                   message: '删除失败'
                 });
               }
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
          },
          handleRemove(file, fileList) {
            console.log(file, fileList);

          },
          handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
          },
          handleClose(done) {
            this.$confirm('确认关闭？')
              .then(_ => {
                done();
              })
              .catch(_ => {});
          },
        },
        mounted(){
          this.changePage();
         this. getPage();
          this.type1();

        }

  }
</script>
<style scoped lang="less">
  /deep/.el-button--primary.is-plain{
    height: 30px;
  }
  #v-span{
    font-weight: bold;
    margin-left: 62px;
    font-size: 15px;
    span{
      width: 213px;
      font-weight: 100;
      display:inline-block;
      line-height: 35px;
      font-size: 15px;
    }
  }
#v-box {
  /*text-align: center;*/
  overflow: hidden;
#v-foot {
  margin-top: 20px;
  position: absolute;
  left: 845px;

}
.p1{
  height: 100px;
  display: block;
  margin:0 auto;
}
#v-head {
  color: gray;
  font-size: 23px;
  font-weight: bold;
  margin-top: 30px;

span {
  float: left;
  margin-left: 450px;
}

div {
  float: left;
  overflow: hidden;
  margin-left: 730px;
  width: 300px;


  div{
    margin-bottom: 10px;
    margin-left: 10px;
    width: 150px;
    height: 32px;
  }
}

}
#v-table {
  text-align: center;
  width: 82%;
  margin:10px auto;
  overflow: hidden;
  padding-left: 45px;
  padding-bottom: 6px;
  background-color: white;
img{
 height: 45px;
}
/*box-shadow: #dcdcdc 1px 1px 1px 1px;*/
}



}
</style>
