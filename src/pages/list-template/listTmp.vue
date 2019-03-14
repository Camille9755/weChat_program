<template>
  <div class="tmpContainer" @tap="toDetail">
    <div class="avatar_data">
      <img :src="list.avatar" >
      <span>{{list.date}}</span>
    </div>
    <p class="list_title">{{list.title}}</p>
    <img class="list_big_image":src="list.detail_img">
    <p class="list_content">{{list.detail_content}}</p>
    <div class="list_icon">
      <img src="/static/images/icon/star.png" alt="">
      <span>{{list.love_count}}</span>
      <img src="/static/images/icon/view.png" alt="">
      <span>{{list.attention_count}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    props:['list','index'],
    methods:{
      toDetail(){
        wx.navigateTo({
          url:'/pages/detail/main?index='+this.index
        })
      }
    }
  }
</script>

<style>
  .tmpContainer{
    display: flex;
    flex-direction: column;
    bodder-bottom:1px solid #eee;
  }
  .avatar_data{
    padding:10rpx;
  }
  .avatar_data img{
    width: 50rpx;
    height: 50rpx;
    vertical-align: middle;
    margin-right: 10rpx;
  }
  .avatar_data span{
    font-size:28rpx;
    font-color:#ccc;
  }
  .list_title{
    font-weight: bold;
    margin-left: 10rpx;
  }
  .list_big_image{
    width:100%
  }
  .list_content{
    font-size:32rpx;
    letter-spacing: 1rpx;
    text-indent: 32rpx;
  }
  .list_icon img{
    width: 30rpx;
    height: 30rpx;
    vertical-align: middle;
    margin-right: 10rpx;
  }
  .list_icon span{
    font-size:28rpx;
    font-color:#ccc;
    margin-right: 10rpx;
  }
</style>
