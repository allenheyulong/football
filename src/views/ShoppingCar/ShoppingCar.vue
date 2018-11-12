<template>
    <!--购物车-->
    <div class="shopping-car-view">
        <Header type="2">
            <span class="title" slot="title">我的购物车</span>
            <span slot="right"></span>
        </Header>
        <div class="content">
            <img src="./images/car.png" alt="">
            <div class="text">购物车还空空如也哦</div>
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
    .shopping-car-view
        padding-top 1.95rem
        .content
            padding-top 6rem
            text-align center
            img
                width 5rem
                margin-bottom 1rem
            .text
                font-size .6rem
                color #7a7a7a
                text-align center
</style>