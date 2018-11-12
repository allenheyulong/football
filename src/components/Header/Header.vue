<template>
    <!--应用头部-->
    <header id="header">
        <div class="left">
            <img v-if="type === '1'" src="./images/avatar.png" @click.prevent.stop="handleClick">
            <img class="back" v-if="type === '2'" src="./images/back.png" @click.prevent.stop="backToMall">
            <slot name="app_name"></slot>
        </div>
        <slot name="title"></slot>
        <slot name="right"></slot>
    </header>
</template>

<script>
    export default {
        props:{
            type:String, //控制头部左上方显示头像还是显示返回箭头，1代表头像，2代表箭头
        },
        methods:{
            handleClick(){
                this.$store.dispatch('saveData',{data:{key:'isSide',value:true}})
            },
            backToMall(){
                this.$router.back()
            }
        },
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../assets/css/mixins.styl"

    #header
        position absolute
        left 0
        right 0
        top 0
        height 1.95rem
        background-color #16b13b
        z-index 1004
        padding-left .4rem
        padding-right .8rem
        display flex
        justify-content space-between
        align-items center
        margin 0
        .left
            display flex
            align-items center
            >img
                border-radius 50%
                width-height(1.4rem,1.4rem)
                margin-right .2rem
            .back
                width-height(1rem,1rem)
            .app-name
                font-size 1rem
                font-weight 400
                color #fff
        .title
            position absolute
            left 50%
            top 50%
            transform translate(-50%,-50%)
            font-size .8rem
            font-weight 400
            color #fff
        .right
            flex-center()
            height 100%
            line-height 1.95rem
            .image
                width 1rem
                height 1rem
                margin-right .2rem
            >span
                font-size .75rem
                color #fff
            .home-link
                font-size .65rem
                color #66e483
                margin-right .4rem
                letter-spacing 1px
                height 100%
                &:last-child
                    margin-right 0
            .cur
                position relative
                height 100%
                color #fff
                &::after
                    content ''
                    display block
                    position absolute
                    background-image url("./images/bg.png")
                    background-repeat no-repeat
                    background-size 100% 100%
                    bottom 0
                    top 75%
                    left 25%
                    right 25%
</style>