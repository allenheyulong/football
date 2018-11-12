<template>
    <!--应用底部导航-->
    <footer id="footer">
        <div v-if="type === 'normal'">
            <router-link class="item" to="/home">
                <div class="site-bg bg"></div>
                <div>首页</div>
            </router-link>
            <router-link class="item" to="/match">
                <div class="match-bg bg"></div>
                <div>比赛</div>
            </router-link>
            <router-link class="item add" to="/add">
                <div class="bg-wrapper">
                    <div class="bg"></div>
                </div>
            </router-link>
            <router-link class="item" to="/forum">
                <div class="forum-bg bg"></div>
                <div>圈子</div>
            </router-link>
            <router-link class="item" to="/data">
                <div class="data-bg bg"></div>
                <div>数据</div>
            </router-link>
        </div>
        <div v-else>
            <router-link class="item" to="/mall">
                <div class="home-bg bg"></div>
                <div>首页</div>
            </router-link>
            <router-link class="item" to="/category">
                <div class="category-bg bg"></div>
                <div>分类</div>
            </router-link>
            <router-link class="item" to="/shoppingCar">
                <div class="car-bg bg"></div>
                <div>购物车</div>
            </router-link>
            <router-link class="item" to="/shoppingMall">
                <div class="shopping-mall-bg bg"></div>
                <div>我的商城</div>
            </router-link>
        </div>
    </footer>
</template>

<script>
    export default {
        props:{
            type:String
        },
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../assets/css/mixins.styl"

    #footer
        height 2.2rem
        position fixed
        left 0
        right 0
        bottom 0
        z-index 1004
        background-color #f7f7f7
        >div
            display flex
            height 100%
            .item
                display flex
                flex 1
                flex-direction column
                align-items center
                font-size .5rem
                color #555
            .add
                justify-content center
                >div
                    flex-center()
                    width 100%
                    height 100%
        .bg
            width-height(1rem,1rem)
            margin .2rem 0
            background-repeat no-repeat
            background-position center center
            background-size 100% 100%
        .add
            .bg-wrapper
                background-image url("./images/add.png")
                background-repeat no-repeat
                background-position center center
                background-size 100% 100%
        .site-bg
            background-image url("./images/site.png")
        .match-bg
            background-image url("./images/match.png")
        .forum-bg
            background-image url("./images/forum.png")
        .data-bg
            background-image url("./images/data.png")
        .home-bg
            background-image url("./images/home.png")
        .category-bg
            background-image url("./images/category.png")
        .car-bg
            background-image url("./images/car.png")
        .shopping-mall-bg
            background-image url("./images/shopping-mall.png")
        .cur
            >.site-bg
                background-image url("./images/site-active.png")
            >.match-bg
                background-image url("./images/match-active.png")
            >.forum-bg
                background-image url("./images/forum-active.png")
            >.data-bg
                background-image url("./images/data-active.png")
            >.bg-wrapper
                background-image url("./images/add-active.png")
            >.home-bg
                background-image url("./images/home-active.png")
            >.category-bg
                background-image url("./images/category-active.png")
            >.car-bg
                background-image url("./images/car-active.png")
            >.shopping-mall-bg
                background-image url("./images/shopping-mall-active.png")
</style>