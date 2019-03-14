<template>
  <div class="detailContainer">
    <img class="detail_img" :src="isMusicPlay?detailObj.music.coverImgUrl:detailObj.detail_img">
    <img class="music_img"
         :src="isMusicPlay?'/static/images/music/music-stop.png':'/static/images/music/music-start.png'"
         @tap="toggleMusicPlay"
         alt="">
    <div class="avatar_date">
      <img :src="detailObj.avatar" alt="">
      <span>{{detailObj.author}}</span>
      <span>发布于</span>
      <span>{{detailObj.date}}</span>
    </div>
    <p class="company">{{detailObj.title}}</p>
    <div class="collection_share_container">
      <div class="collection_share">
        <img :src="isCollected?'/static/images/icon/collection.png':'/static/images/icon/collection-anti.png'"
             alt="" @tap="handleCollection">
        <img src="/static/images/icon/share-anti.png" alt=""
             @tap="handleShare">
      </div>
      <div class="line"></div>
    </div>
    <Button open-type="share">转发此文章</Button>
    <p class="content">{{detailObj.detail_content}}</p>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import isPlayObj from '../../datas/isPlay'
  export default {
    data(){
      return {
        detailObj:{},
        isCollected:false,
        isMusicPlay:false,
      }
    },
    beforeMount() {
      this.index = this.$mp.query.index
      this.detailObj = this.listData[this.index]

      let oldStorage = wx.getStorageSync('isCollected')
      if(!oldStorage){
        wx.setStorage({
          key:'isCollected',
          data:{}
        })
      }else{
        this.isCollected = (oldStorage[this.index]?true:false)
      }


      isPlayObj.pageIndex===this.index&&isPlayObj.isPlay?this.isMusicPlay=true:this.isMusicPlay=false

      wx.onBackgroundAudioPlay(()=>{
        this.isMusicPlay = true
        isPlayObj.pageIndex=this.index
        isPlayObj.isPlay=true
      })
      wx.onBackgroundAudioPause(()=>{
        this.isMusicPlay = false
        isPlayObj.isPlay=false
      })
    },
    computed:{
      ...mapState(['listData'])
    },
    methods:{
      handleCollection(){
        this.isCollected = !this.isCollected
        const title=this.isCollected?'收藏成功':'取消收藏'
        wx.showToast({
          title,
          icon:'success'
        })

        let oldStorage = wx.getStorageSync('isCollected')
        oldStorage[this.index] = this.isCollected
        wx.setStorage({
          key:'isCollected',
          data:oldStorage
        })

      },
      handleShare(){
        wx.showActionSheet({
          itemList:[
            '分享到朋友圈',
            '分享到微博',
            '分享给微信好友'
          ]
        })
      },
      toggleMusicPlay(){
        this.isMusicPlay = !this.isMusicPlay
        const {dataUrl,title} = this.detailObj.music
        if(this.isMusicPlay){
          wx.playBackgroundAudio({
            dataUrl,
            title
          })
        }else{
          wx.pauseBackgroundAudio()
        }
      }
    },


  }
</script>

<style>

  .detailContainer {
    display: flex;
    flex-direction: column;
  }

  .detail_img {
    width: 100%;
    height: 460rpx;
  }
  .avatar_date{
    padding:10rpx;
  }
  .avatar_date img {
    width: 64rpx;
    height: 64rpx;
    vertical-align: middle;
  }

  .avatar_date span {
    font-weight: 28rpx;
    margin-left: 6rpx;
  }

  .company {
    font-size: 32rpx;
    font-weight: bold;
    padding:10rpx;
  }

  .collection_share_container {
    position: relative;
  }

  .collection_share {
    float: right;
    margin-right: 30rpx;
  }

  .collection_share img {
    width: 90rpx;
    height: 90rpx;
    margin-right: 20rpx;
  }

  .line {
    position: absolute;
    top: 45rpx;
    left: 5%;
    width: 90%;
    height:1rpx;
    background: #eee;
    z-index: -1;
  }

  .content {
    font-size: 32rpx;
    text-indent: 32rpx;
    letter-spacing: 3rpx;
    line-height: 50rpx;
  }

  .music_img {
    width: 60rpx;
    height: 60rpx;
    position: absolute;
    top: 200rpx;
    left: 50%;
    margin-left: -30rpx;
  }

</style>
