<template>
  <div id="app">
    <div>
      <div class="top">
        <div class="t-left">C a l o r i e</div>
        <div class="t-right"></div>
      </div>
      <div class="bottom">
        <div class="b-left"></div>
        <div class="b-right"></div>
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
    width: 1349px;
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
    width: 1093px;
    height: 66px;
    background: rgba(255,255,255,0.8);
  }
  }
  .bottom{
    width: 1349px;
    height: 590px;
  .b-left{
    width: 256px;
    height: 100%;
    float: left;
    background: #333333;
  }
  .b-right{
    width: 1093px;
    height: 100%;
    float: right;
    background: #f2efeb;
  }
  }
</style>
