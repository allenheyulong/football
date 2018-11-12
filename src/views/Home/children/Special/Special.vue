<template>
    <!--专题模块-->
    <div class="home-second-router special-view">
        <div class="item-wrap" v-for="(item,index) in articles" :key="item.id">
            <div class="bg" :style="{'backgroundImage':'url(' + item.thumb + ')'}"></div>
            <div class="text">{{item.title}}</div>
        </div>
    </div>
</template>

<script>
    import {reqHome} from '../../../../api'

    export default {
        data() {
            return {
                articles:[],
            }
        },
        async created(){
            const response = await reqHome('99')
            this.articles = response.articles
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .special-view
        .item-wrap
            position relative
            height 5.8rem
            padding .4rem
            .bg
                height 100%
                background-repeat no-repeat
                background-position center center
                background-size 100% 100%
            .text
                position absolute
                left .6rem
                bottom .6rem
                letter-spacing .05rem
                font-size .6rem
                color #fff
</style>