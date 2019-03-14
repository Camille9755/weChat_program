<template>
  <div class="listContainer">
    <swiper indicator-dots indicator-color="pink" indicator-active-color="green">
      <swiper-item v-for="(list,index) in listData" :key="index">
        <img :src="list.detail_img">
      </swiper-item>
    </swiper>
    <div >
      <ListTmp v-for="(list,index) in listData" :key="index" :index="index" :list="list"/>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import ListTmp from '../list-template/listTmp'
  export default {
    components:{
      ListTmp
    },
    beforeMount() {
      this.$store.dispatch('getListTmp')
    },
    computed:{
      ...mapState(['listData'])
    }
  }
</script>

<style >
  .listContainer swiper{
   width:100%;
   height: 400rpx;
  }
  .listContainer swiper img{
    width:100%;
    height:100%;
  }
</style>
