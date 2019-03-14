<template>
   <div class="indexContainer">
     <img v-if="isShow" :src="userInfo.avatarUrl" alt="">
     <button open-type="getUserInfo"
             @getuserinfo="getUserInfo"
             class="btn"
             v-else>授权信息</button>
     <p>hello {{userInfo.nickName}}</p>
     <button @tap="toList">进入小程序</button>
   </div>
</template>

<script>
    export default {
      data(){
        return {
          isShow:false,
          userInfo:{}
        }
      },
      beforeMount() {
        this.handleGetUserInfo()
      },
      methods:{
        handleGetUserInfo(){
          wx.getUserInfo({
            success:(data)=>{
              console.log(data)
              this.userInfo = data.userInfo,
              this.isShow = true
            },
            fail:()=>{
              console.log('获取失败');
            }
          })
        },
        getUserInfo(data){
          console.log(data)
          if(data.mp.detail.rawData){
            // 用户授权
            this.handleGetUserInfo()
          }
        },
        toList(){
          console.log('toList');
          wx.navigateTo({
            url:'/pages/list/main'
          })
          //question is 使用switchtab不跳转怎么破
        }
      }
    }
</script>

<style >
  page { background: gray; height:100%; }
  .indexContainer { display: flex; flex-direction: column; align-items: center; }
  .indexContainer img { width:200rpx;height:200rpx; border-radius: 100rpx; margin:100rpx 0; }
  .btn{ width:300rpx; height:300rpx; border-radius: 150rpx; margin:100rpx 0; line-height: 300rpx; }
  .indexContainer p { font-size: 40rpx; font-weight: bold; margin:100rpx 0; }
  .indexContainer button { background: #009ee0; font-size: 32rpx; }
</style>
