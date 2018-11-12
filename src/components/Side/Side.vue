<template>
    <transition name="fade">
        <div class="side-view">
            <div class="header-container" :style="{'backgroundImage':'url('+ imgURL +')'}">
                <h2>懂球帝</h2>
                <div class="text">一个纯粹而有爱的足球世界</div>
                <div class="button">立即登录</div>
            </div>
            <div class="content">
                <div class="content-item">
                    <img src="./images/notice.png" alt="">
                    <div class="text">我的通知</div>
                </div>
                <div class="content-item">
                    <img src="./images/star.png" alt="">
                    <div class="text">收藏/历史</div>
                </div>
                <div class="content-item">
                    <img src="./images/msg.png" alt="">
                    <div class="text">系统信息</div>
                </div>
                <div class="content-item">
                    <img src="./images/order.png" alt="">
                    <div class="text">我的订单</div>
                </div>
            </div>
            <div class="modules-wrap">
                <div class="modules" v-for="(item,index) in modules" :key="index">
                    <div class="icon" :style="{'backgroundImage':'url('+ item.image +')'}"></div>
                    <div class="text">{{item.name}}</div>
                </div>
            </div>
            <footer>
                <div>
                    <img src="./images/advice.png" alt="">
                    <div class="text">反馈</div>
                </div>
                <div>
                    <img src="./images/search.png" alt="">
                    <div class="text">搜索</div>
                </div>
                <div>
                    <img src="./images/setting.png" alt="">
                    <div class="text">设置</div>
                </div>
            </footer>
        </div>
    </transition>
</template>

<script>
    import {reqSide} from '../../api/index'

    export default {
        data() {
            return {
                modules:[], // 模块数据
                imgURL:'', // 头部图片路径
            }
        },
        async created(){
            const response = await reqSide()
            const {modules,config} = response
            this.modules = modules
            this.imgURL = config.sidebar_bg_image
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../assets/css/mixins.styl"

    .fade-enter
        width 0
    .fade-enter-to
        width 82%
    .fade-leave
        width 82%
    .fade-leave-to
        width 0

    .fade-enter-active {
        transition: all .4s ease;
    }
    .fade-leave-active {
        transition: all .4s ease;
    }

    .side-view
        position absolute
        left 0
        top 0
        bottom 0
        right 18%
        z-index 1006
        background-color #ececec
        opacity 1 !important
        .header-container
            display flex
            flex-direction column
            justify-content center
            align-items center
            height 7.7rem
            background-repeat no-repeat
            background-size 100% 100%
            color #fff
            >h2
                font-size 1rem
            .text
                font-size .55rem
                margin .4rem 0
            .button
                font-size .75rem
                padding .2rem 1rem
                border .05rem solid #fff
                border-radius .3rem
        .content
            background-color #f7f7f7
            padding-left .8rem
            margin .4rem 0
            .content-item
                display flex
                align-items center
                height 2rem
                border-bottom-1px(#ebebeb)
                img
                    margin-right .4rem
                    width 1rem
                    height 1rem
                .text
                    display flex
                    align-items center
                    flex auto
                    color #1f1f1f
                    font-size .65rem
        .modules-wrap
            display flex
            flex-wrap wrap
            background-color #f7f7f7
            .modules
                width 33.333%
                display flex
                flex-direction column
                align-items center
                margin .4rem 0
                .icon
                    width-height(2rem,1.8rem)
                    background-size 100% 100%
                    background-repeat no-repeat
                .text
                    font-size .55rem
                    color #555
                    margin-top .2rem
        >footer
            position fixed
            bottom 0
            left 0
            right 18%
            z-index 1007
            display flex
            height 2.2rem
            background-color #f7f7f7
            >div
                display flex
                align-items center
                justify-content center
                flex 1
                >img
                    width-height(1rem,1rem)
                    margin-right .2rem
                .text
                    font-size .7rem
                    color #222
</style>