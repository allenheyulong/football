<template>
    <!--回到顶部组件-->
    <div class="to-top-view" @click="toTop">
        <div class="bg"></div>
        <div>顶部</div>
    </div>
</template>

<script>
    export default {
        props:{
            scroll:Object, // 滑动对象
        },
        methods:{
            toTop(){
                this.scroll.scrollTo(0,0,400)
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .to-top-view
        position fixed
        left 85%
        right 2%
        bottom 15%
        top 77%
        display flex
        flex-direction column
        align-items center
        justify-content center
        border-radius 50%
        background-color #404040
        font-size .55rem
        color #fff
        .bg
            width 50%
            height 25%
            background-image url("./images/top.png")
            background-repeat no-repeat
            background-size 100% 100%
            background-position center center
            margin-bottom .2rem
</style>