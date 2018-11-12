<template>
    <!--联赛导航条-->
    <div class="bar-container" :style="{'backgroundImage':'url(' + topics.background_image + ')'}">
        <div :class="{'row':type === '2','item':type==='1'}" v-for="(item,index) in topics.items" :key="index">
            <div class="bg" :style="{'backgroundImage':'url(' + item.icon + ')'}"></div>
            <div class="text">{{item.title}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            type:String, // 导航显示模式，1表示元素垂直排列，2表示元素水平排列
            topics:Object, // 描述对象
        },
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../assets/css/mixins.styl"
    .bar-container
        display flex
        padding .4rem 0
        margin .1rem 0
        background-color #f2f2f2
        .item
            display flex
            flex 1
            flex-direction column
            align-items center
            .bg
                margin .2rem 0
                height 1.6rem
                width 1.6rem
        .row
            flex-center()
            flex 1
            .bg
                margin 0 .2rem
                height 1rem
                width 1rem
        .bg
            background-size 100% 100%
            background-position center center
            background-repeat no-repeat
        .text
            font-size .55rem
            color #555
            text-align center
            letter-spacing .05rem
</style>