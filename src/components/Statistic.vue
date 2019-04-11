<template>
 <div>
     <ul class="sta-nav1">
         <li>
            <div class="sta-totalSale">
                <span class="span1">总销售额</span><br>
                <span class="span2">￥{{crr[1]}}</span><br>
                 <hr>
                <span class="span3">日销售额 ￥{{daliSale}}</span>
            </div>
         </li>
         <li>
             <div class="sta-check">
                <span class="span1">支付笔数</span><br>
                <span class="span2" >{{crr[0]}}</span><br>
                 <hr>
                <span class="span3">转化率 66%</span>
            </div>
         </li>
         <li>
              <div class="sta-check1">
                <span class="span1">访问量</span><br>
                <span class="span2">{{jrr[0]}}</span><br>
                  <hr>
                <span class="span3">3</span>
            </div>
         </li>
     </ul>
     
       
      <div class="sta-nav clearfix" >
               <h4>销售统计</h4>
            <el-tabs    class="tab">
                <el-tab-pane label="今日">
                        <div id="sta-main1" ></div>
                </el-tab-pane>
                <el-tab-pane label="本周">
                      <div id="charts" >
                        
                        <div id="sta-main"></div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="本月">
                      <div id="charts2">
                          <div id="sta-main2">  
                        </div>
                      </div>
                        
                        
                 
                </el-tab-pane>
                <!-- <el-tab-pane label="年度">
                      <div id="charts3">
                          <div id="sta-main3"></div>
                      </div>
                        
                        
                    
                </el-tab-pane> -->
            </el-tabs>
          <div class="block">
    <!-- <span class="demonstration">带快捷选项</span> -->
                <el-date-picker
                v-model="value7"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions2">
                </el-date-picker>
                <el-button type="primary" icon="el-icon-search">搜索</el-button>
           </div>
	  </div>
	  
 </div>
</template>

<script>
var echarts = require('echarts');
 export default {
   name : '',    
    data() {
      return {
          //日历插件
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value7: '',
        brr:[],//销售商品名称
        err:[],//当日销售额
        crr:[],//订单数量
        drr:[],//总销售额
        frr:[],//本周销售额
        grr:[],//本月销售额
        hrr:[],//年度销售额
        jrr:[],//访问量
      };
    },
   components: {
   },
  mounted() {
              this.drawBar();
              this.drawLine1();
              this.drawLine2();
              // this.drawLine3()
 
 },
 computed: {
     daliSale(){
         return this.err[0]+this.err[1]
     }
 },
 created () {
    //  this.$axios.get('http://localhost:1015/getGoodsList').then
    //  ((res)=>{
    //     //  console.log(res.data)
    //      var brr0=res.data.data[0].s_name
    //     //  console.log(res.data.data[0].s_name)
    //      this.brr.push(brr0)
    //      var brr1=res.data.data[1].s_name
    //      this.brr.push(brr1)
    //      var brr2=res.data.data[2].s_name
    //      this.brr.push(brr2)
    //     //  var brr3=res.data.data[3].s_name
    //     //  this.brr.push(brr3)
    //     //  console.log(this.brr)
    //      this.drawBar(this.brr[0],this.brr[1],this.brr[2])
    //  }).catch((err)=>{
    //      console.log(err)
    //  })

    // 
     //获取总销售额和订单数量
    this.$axios.get('http://localhost:1015/getOrderSum').then
    ((res)=>{
       
        // console.log(res.data.data)
        var crr0=res.data.data.oSum
        var crr1=res.data.data.oTotal
        this.crr.push(crr0)
        this.crr.push(crr1)
        // var crr1=res.data.data.oPrice
        // this.crr.push(crr1)
        // console.log(this.crr)
    }),

    //获取当日销售额
      this.$axios.get('http://localhost:1015/getDaliOrder').then
    ((res)=>{
        
        // console.log(res.data.data)
        // console.log(res.data.data[0])
        // console.log(res.data.data[0].daliType)
        // console.log(res.data.data[1])
        // console.log(res.data.data[1].daliPrice)
        // console.log(res.data.data[1].daliNum)
        // console.log(res.data.data[0].daliType)
        
        var err0=res.data.data[0].daliPrice*res.data.data[0].daliNum;
        var err1=res.data.data[1].daliPrice*res.data.data[1].daliNum;
        //当日各类别销售额
        this.err.push(err0);
        this.err.push(err1);

        //商品类别
        this.brr.push(res.data.data[0].daliType)
        this.brr.push(res.data.data[1].daliType)
        // var crr1=res.data.data.oPrice
        // this.crr.push(crr1)
        // console.log(this.err)
        // console.log(this.brr)
        this.drawBar(this.brr[0],this.brr[1])
        // this.drawBar(this.brr[0])
    }),


    //获取本周销售额
    this.$axios.get('http://localhost:1015/getWeekOrder').then
    ((res)=>{
        var frr0=res.data.data[0].wNumber*res.data.data[0].of_price;
        var frr1=res.data.data[1].wNumber*res.data.data[1].of_price;
        var frr2=res.data.data[2].wNumber*res.data.data[2].of_price;
        var frr3=res.data.data[3].wNumber*res.data.data[3].of_price;
        var frr4=res.data.data[4].wNumber*res.data.data[4].of_price;
        var frr5=res.data.data[5].wNumber*res.data.data[5].of_price;
        var frr6=res.data.data[6].wNumber*res.data.data[6].of_price;
        
        this.frr.push(frr0)
        this.frr.push(frr1)
        this.frr.push(frr2)
        this.frr.push(frr3)
        this.frr.push(frr4)
        this.frr.push(frr5)
        this.frr.push(frr6)
        // console.log(this.frr)
        this.drawLine1(this.frr[1],this.frr[2],this.frr[3],this.frr[4],this.frr[5],
        this.frr[6],this.frr[0])
    }),

    //获取本月销售额
    this.$axios.get('http://localhost:1015/getMonthOrder').then
       ((res)=>{
        //获取本月销售额
        // console.log(res.data)
        // console.log(res.data.data[0])
        // console.log(res.data.data[1].of_total)
        // console.log(Number(res.data.data[1].of_total))
        
        
        
           let grr0=Number(res.data.data[0].of_total);
           let grr1=Number(res.data.data[1].of_total);
           let grr2=Number(res.data.data[2].of_total);
           let grr3=Number(res.data.data[3].of_total);
           let grr4=Number(res.data.data[4].of_total);
           let grr5=Number(res.data.data[5].of_total);
           let grr6=Number(res.data.data[6].of_total);
           let grr7=Number(res.data.data[7].of_total);
           let grr8=Number(res.data.data[8].of_total);
           let grr9=Number(res.data.data[9].of_total);
           let grr10=Number(res.data.data[10].of_total);
           let grr11=Number(res.data.data[11].of_total);
           let grr12=Number(res.data.data[12].of_total);
           let grr13=Number(res.data.data[13].of_total);
           let grr14=Number(res.data.data[14].of_total);
           let grr15=Number(res.data.data[15].of_total);
           let grr16=Number(res.data.data[16].of_total);
           let grr17=Number(res.data.data[17].of_total);
           let grr18=Number(res.data.data[18].of_total);
           let grr19=Number(res.data.data[19].of_total);
           let grr20=Number(res.data.data[20].of_total);
           let grr21=Number(res.data.data[21].of_total);
           let grr22=Number(res.data.data[22].of_total);
           let grr23=Number(res.data.data[23].of_total);
           let grr24=Number(res.data.data[24].of_total);
           let grr25=Number(res.data.data[25].of_total);
           let grr26=Number(res.data.data[26].of_total);
           let grr27=Number(res.data.data[27].of_total);
           let grr28=Number(res.data.data[28].of_total);
           let grr29=Number(res.data.data[29].of_total);
           let grr30=Number(res.data.data[30].of_total);
           this.grr.push(grr0);
           this.grr.push(grr1);
           this.grr.push(grr2);
           this.grr.push(grr3);
           this.grr.push(grr4);
           this.grr.push(grr5);
           this.grr.push(grr6);
           this.grr.push(grr7);
           this.grr.push(grr8);
           this.grr.push(grr9);
           this.grr.push(grr10);
           this.grr.push(grr11);
           this.grr.push(grr12);
           this.grr.push(grr13);
           this.grr.push(grr14);
           this.grr.push(grr15);
           this.grr.push(grr16);
           this.grr.push(grr17);
           this.grr.push(grr18);
           this.grr.push(grr19);
           this.grr.push(grr20);
           this.grr.push(grr21);
           this.grr.push(grr22);
           this.grr.push(grr23);
           this.grr.push(grr24);
           this.grr.push(grr25);
           this.grr.push(grr26);
           this.grr.push(grr27);
           this.grr.push(grr28);
           this.grr.push(grr29);
           this.grr.push(grr30);
    this.drawLine2(this.grr[0],this.grr[1],this.grr[2],this.grr[3],this.grr[4],
    this.grr[5],this.grr[6],this.grr[7],this.grr[8],this.grr[9],this.grr[10],
    this.grr[11],this.grr[12],this.grr[13],this.grr[14],this.grr[15],this.grr[16],
    this.grr[17],this.grr[18],this.grr[19],this.grr[20],this.grr[21],this.grr[22],
    this.grr[23],this.grr[24],this.grr[25],this.grr[26],this.grr[27],this.grr[28],
    this.grr[29],this.grr[30])
   }),
   //获取访问量
     this.$axios.get('http://localhost:1015/getUserFang').then(
         (res)=>{
             // console.log(res.data.data[0].Fang)
             let jrr0=res.data.data[0].Fang;
             this.jrr.push(jrr0);
         }
     )


//    //获取年度销售额
//    this.$axios.get('http://localhost:1015/getYearOrder',
//    {
//         params:{
//            year:2019-1
//        }
//    }
      
//    ).then((res)=>{
//           console.log(res)
//           console.log(res.data.data[0].yTotal)
//           let hrr0=res.data.data[0].yTotal
//           let hrr1=res.data.data[1].yTotal
//           let hrr2=res.data.data[2].yTotal
//         //   let hrr3=res.data.data[3].yTotal
//         //   let hrr0=res.data.data[0].yTotal
//         //   let hrr0=res.data.data[0].yTotal
//         //   let hrr0=res.data.data[0].yTotal
//         //   let hrr0=res.data.data[0].yTotal
//         //   let hrr0=res.data.data[0].yTotal
//        })
},

 methods: {
     /*ECharts图表*/

       // 本周数据统计
 drawLine1(a,b,c,d,e,f,g){
     var myChart = echarts.init(document.getElementById('sta-main'));
     myChart.setOption ({
       title : {
        text: '本周销售额统计（单位:元）',
        
        x:'center'
    },
    color: ['#3398DB'],
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'销售额',
            type:'bar',
            barWidth: '40%',
            data:[a, b,c , d, e, f,g]
        }
    ]
});

 },

// 年度数据统计
// drawLine3(){
//     var myChart3 = echarts.init(document.getElementById('sta-main3'));
//  myChart3.setOption ({
//        title : {
//         text: '年度销售额统计（单位:元）',
//
//         x:'center'
//     },
//     color: ['#3398DB'],
//     tooltip : {
//         trigger: 'axis',
//         axisPointer : {            // 坐标轴指示器，坐标轴触发有效
//             type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
//         }
//     },
//     grid: {
//         left: '3%',
//         right: '4%',
//         bottom: '3%',
//         containLabel: true
//     },
//     xAxis : [
//         {
//             type : 'category',
//             data : ['一月 ', '二月', '三月', '四月', '五月', '六月', '七月',
//             '八月','九月','十月','十一月','十二月'],
//             axisTick: {
//                 alignWithLabel: true
//             }
//         }
//     ],
//     yAxis : [
//         {
//             type : 'value'
//         }
//     ],
//     series : [
//         {
//             name:'销售额',
//             type:'bar',
//             barWidth: '60%',
//             data:[1, 52, 200, 334, 390, 330, 220]
//         }
//     ]
// });
// },


// 今日数据统计
drawBar(a,b,c=0){
    let myChart1 = echarts.init(document.getElementById('sta-main1'));
 
 myChart1.setOption  ({
     title : {
        text: '今日销售额统计（单位:元）',
        
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: [a,b,c]
    },
    series : [
        {
            name: '销售额',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:this.err[0], name:a},
                {value:this.err[1], name:b},
                // {value:234, name:c},
                // {value:135, name:'d'}
               
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
});
},
 

// 本月数据统计
drawLine2(a,b,c,d,e,f,g,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,a1,a2,a3,a4){
    var myChart2 = echarts.init(document.getElementById('sta-main2'));
 
   
 myChart2.setOption ({
       title : {
        text: '当月销售额统计（单位:元）',
        
        x:'center'
    },
    color: ['#3398DB'],
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : ['1', '2', '3', '4', '5', '6', '7','8','9',
            '10','11','12','13','14','15','16','17','18','19','20'
            ,'21','22','23','24','25','26','27','28','29','30','31'],
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'销售额',
            type:'bar',
            barWidth: '60%',
            data:[a,b,c,d,e,f,g,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,a1,a2,a3,a4]
        }
    ]
});
 
}
 
 }
 };
 
</script>

<style scoped lang="less">
       .sta-nav1{
           width:100%;
           height:150px ;
            
        //    border: 1px solid red;
           margin-left: -40px;
           margin-top: 20px;
           
           li{
               float: left;
               margin-left: 145px;
                // border: 1px solid red;
                
               background: #fff;
               hr{
                   width: 150px;
                   margin-left: 25px;
                   margin-top: 23px;
                   color: #ccc;
               }
                      .sta-totalSale{
          height: 150px;
          width: 200px;
        //   border: 1px solid red;
         position: relative;
         
          .span1{
               font-size: 14px;
              height: 20px;
              line-height: 20px;
              text-align: center;
              display: inline-block;
              margin-left: 25px;
                //  border: 1px solid red;
                 margin-top: 15px;
          }
          .span2{
                font-size: 30px;
                line-height: 38px;
                height: 38px;
                display: inline-block;
              margin-left: 25px;
              margin-top: 15px;
            
          }
          .span3{
            font-size: 14px;
            line-height: 22px;
            position: absolute;
            left: 25px;
            bottom: 10px;
          }
      }
      .sta-check{
           height: 150px;
          width: 200px;
        //   border: 1px solid red;
          
          position: relative;
           .span1{
               font-size: 14px;
              height: 20px;
              line-height: 20px;
              text-align: center;
              display: inline-block;
              margin-left: 25px;
              margin-top: 15px;

          }
          .span2{
                font-size: 30px;
                line-height: 38px;
                height: 38px;
                display: inline-block;
              margin-left: 25px;
               margin-top: 15px;
            
          }
          .span3{
            font-size: 14px;
            line-height: 22px;
            position: absolute;
            left: 25px;
            bottom: 10px;
          }
    }
    .sta-check1{
           height: 150px;
          width: 200px;
        //   border: 1px solid red;
          
          position: relative;
           .span1{
               font-size: 14px;
              height: 20px;
              line-height: 20px;
              text-align: center;
              display: inline-block;
              margin-left: 25px;
              margin-top: 15px;

          }
          .span2{
                font-size: 30px;
                line-height: 38px;
                height: 38px;
                display: inline-block;
              margin-left: 25px;
               margin-top: 15px;
            
          }
          .span3{
            font-size: 14px;
            line-height: 22px;
            position: absolute;
            left: 25px;
            bottom: 10px;
          }
    }       

       }  
      
               
           }
    
      .sta-nav{
          height: 45px;
          width:1050px;
          margin-left: 30px;
          background: #fff;
          margin-top: 15px;
            // border: 1px solid red;
            position: relative;
            
            h4{
               position: absolute;
               top: 0px;
               left: 0;
               line-height: 45px;
           }
        
          .tab{
            // width:1000px;
            // height: 350px;
            // border: 1px solid red;
            margin-left: 75px;
            margin-top: 5px;
            position: absolute;
           
            
            
          }
      }
       .block{
           line-height: 30px;
           
            // border: 1px solid red;
            position: absolute;
            right: 30px;
            margin-top: 2.1px;
          

       }
       .tab{
           
        //    #charts{
        //  width: 800px;
        //  height: 350px;
        // //   border: 1px solid red;
         #sta-main{
             width: 897px;
         height: 345px;
        //  border: 1px solid red;
          background: #fff;
         }
      

     } 
        #sta-main1{
           width: 897px;
         height: 345px;
            background: #fff;
         }
         #sta-main2{
           width:897px;
         height: 345px;
            background: #fff;
         }
         #sta-main3{
           width:897px;
         height: 345px;
            background: #fff;
         }
       
     
 
</style>


