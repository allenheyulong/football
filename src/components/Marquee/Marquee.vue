<template>
    <!--走马灯-->
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <router-link tag="div" :to="{path:'/search/' + item.scheme.slice(23)}" class="swiper-slide" v-for="(item,index) in recommend" :key="index">
                <a href="javascript:" class="link-item">
                    <img :src="item.thumb ? item.thumb : item.img_url">
                    <span>{{item.title}}</span>
                </a>
            </router-link>
        </div>
        <!-- 分页器 -->
        <div class="swiper-pagination"></div>
    </div>
</template>

<script>
    import Swiper from 'swiper'
    import 'swiper/dist/css/swiper.min.css'

    export default {
        props:{
            recommend:Array, // 轮播数组
        },
        watch:{
            recommend(){
                // 解决swiper 4显示不出分页器问题
                if(this.recommend.length){
                    this.$nextTick(() => {
                        new Swiper('.swiper-container',{ // 默认水平滑动，垂直才需要配置
                            loop: true, // 循环模式选项
                            autoplay: true,// 自动滑动
                            pagination: {
                                el: '.swiper-pagination',
                            },
                        })
                    })
                }
            }
        },
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .link-item
        position relative
        img
            width 100%
            height 6.6rem
        span
            position absolute
            left .4rem
            bottom .4rem
            color #fefaf9
            font-size .65rem
    .swiper-pagination
        text-align right
        .swiper-pagination-bullet
            background-color #555
        .swiper-pagination-bullet-active
            background-color #16b13b
</style>