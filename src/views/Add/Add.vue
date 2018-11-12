<template>
    <!--关注页面-->
    <div class="add-view">
        <Header type="1">
            <span class="title" slot="title">懂球帝</span>
            <span slot="right"></span>
        </Header>
        <div class="content">
            <div class="wrap">
                <div class="bg"></div>
                <p class="text">设置最爱球队，亮出你的身份</p>
                <p class="love">定制你自己的懂球帝，选择关注的球队，球员</p>
                <div class="button">马上开启</div>
            </div>
        </div>
        <Footer type="normal" />
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
    .add-view
        padding-top 1.95rem
        position absolute
        left 0
        right 0
        top 0
        bottom 2.2rem
        background-color #f5f5f5
        .content
            .wrap
                text-align center
                .bg
                    width 100%
                    height 6rem
                    margin 4rem 0
                    background url("./images/bg.png")
                    background-repeat no-repeat
                    background-position center center
                    background-size 100% 100%
                p
                    text-align center
                    line-height 1.2rem
                .text
                    color #4d4d4d
                .love
                    font-size .6rem
                    color #565656
                .button
                    display inline-block
                    width 50%
                    box-sizing border-box
                    font-size .65rem
                    color #16b13c
                    padding .4rem 0
                    margin-top .4rem
                    border .1rem solid #16b23c
                    border-radius .2rem
</style>