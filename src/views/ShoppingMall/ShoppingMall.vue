<template>
    <!--我的商城模块-->
    <div class="shopping-mall-view">
        <Header type="2">
            <span class="title" slot="title">我的商城</span>
            <div class="right" slot="right">
                <img class="image" src="./images/message.png" alt="">
                <span>消息</span>
            </div>
        </Header>
        <div class="wrap">
            <header>
                <div class="login">立即登录</div>
            </header>
            <div class="content">
                <div class="modules">
                    <div class="item">
                        <div class="title">全部订单</div>
                        <div class="img-wrap">
                            <span class="text">查看更多订单</span>
                            <span class="bg"></span>
                        </div>
                    </div>
                    <div class="main">
                        <div class="event">
                            <img src="./images/pay.png" alt="">
                            <div class="text">待付款</div>
                        </div>
                        <div class="event">
                            <img src="./images/send.png" alt="">
                            <div class="text">待发货</div>
                        </div>
                        <div class="event">
                            <img src="./images/reach.png" alt="">
                            <div class="text">待收货</div>
                        </div>
                        <div class="event">
                            <img src="./images/comment.png" alt="">
                            <div class="text">待评价</div>
                        </div>
                        <div class="event">
                            <img src="./images/sell.png" alt="">
                            <div class="text">退款/售后</div>
                        </div>
                    </div>
                </div>
                <div class="modules">
                    <div class="item">
                        <div class="title">优惠券</div>
                        <div class="img-wrap">
                            <span class="text"></span>
                            <span class="bg"></span>
                        </div>
                    </div>
                    <div class="item">
                        <div class="title">折扣卡</div>
                        <div class="img-wrap">
                            <span class="text"></span>
                            <span class="bg"></span>
                        </div>
                    </div>
                    <div class="item">
                        <div class="title">收货地址</div>
                        <div class="img-wrap">
                            <span class="text"></span>
                            <span class="bg"></span>
                        </div>
                    </div>
                    <div class="item">
                        <div class="title">发票服务</div>
                        <div class="img-wrap">
                            <span class="text"></span>
                            <span class="bg"></span>
                        </div>
                    </div>
                </div>
                <div class="modules">
                    <div class="item">
                        <div class="title">帮助与客服</div>
                        <div class="img-wrap">
                            <span class="text"></span>
                            <span class="bg"></span>
                        </div>
                    </div>
                    <div class="item">
                        <div class="title">客服中心</div>
                        <div class="img-wrap">
                            <span class="time">在线时间 8:30-23:00</span>
                            <span class="bg"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer type="mall" />
    </div>
</template>

<script>
    import Header from '../../components/Header/Header'
    import Footer from '../../components/Footer/Footer'

    export default {
        data() {
            return {}
        },
        components:{Header,Footer}
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../assets/css/mixins.styl"

    .shopping-mall-view
        padding-top 1.95rem
        .wrap
            >header
                flex-center()
                height 3rem
                background-color #16b13b
                border-bottom .4rem solid #ececec
                .login
                    padding .4rem 1rem
                    border-1px(#d9ffee)
                    color #fff
                    font-size .7rem
                    border-radius 5px
            .content
                .modules
                    padding 0 .4rem
                    border-bottom .4rem solid #ececec
                    background-color #f7f7f7
                    &:last-child
                        border-bottom none
                    .main
                        display flex
                        .event
                            display flex
                            flex-direction column
                            align-items center
                            flex 1
                            padding-bottom .4rem
                            img
                                width 50%
                                padding .4rem 0
                            .text
                                font-size .55rem
                                color #4a4a4a
                .item
                    display flex
                    justify-content space-between
                    font-size .7rem
                    color #333
                    height 2rem
                    border-bottom-1px(#e7e7e7)
                    .title
                        line-height 2rem
                    .img-wrap
                        line-height 2rem
                        .bg
                            display inline-block
                            height .5rem
                            width .5rem
                            background-image url("./images/right.png")
                            background-repeat no-repeat
                            background-size 100% 100%
                            background-position center center
                        .time
                            font-size .55rem
                            color #979797



</style>