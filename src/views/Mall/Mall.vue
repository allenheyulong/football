<template>
    <div class="mall-view">
        <Header type="1">
            <h1 slot="app_name" class="app-name">懂球帝</h1>
            <div slot="title"></div>
            <div slot="right" class="right">
                <router-link class="home-link" to="/">社区</router-link>
                <router-link class="home-link" to="/mall">商城</router-link>
                <router-link class="home-link" to="/play">游戏</router-link>
            </div>
        </Header>
        <div class="content cal-wrapper">
            <div class="wrap">
                <!--下拉刷新动图-->
                <div class="img-wrap">
                    <img v-if="loading_top" src="./images/timg.gif" alt="">
                </div>
                <!--搜索条-->
                <SearchBar :hotwords="hotwords"/>
                <!--走马灯-->
                <Marquee :recommend="mall.slides"/>
                <!--主页导航-->
                <nav>
                    <div class="item" v-for="(item,index) in mall.categories" :key="index">
                        <img :src="item.img_url" alt="">
                        <div class="text">{{item.title}}</div>
                    </div>
                </nav>
                <!--图片列表-->
                <ImgList v-for="(item,index) in mall.modules" :key="index" :img_list="item.data" v-if="mall.modules" :type="item.type" :title="item.name" />
                <!--热门推荐-->
                <Recommend :recommends="recommends" />
                <!--下拉刷新动图-->
                <div class="img-wrap">
                    <img v-if="loading_bottom" src="./images/timg.gif" alt="">
                </div>
            </div>
            <!--回到顶部-->
            <ToTop v-show="scroll.y <= -height" :scroll="scroll" />
        </div>
        <Footer type="mall" />
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import {calHeight} from '../../assets/js/utils'
    import {reqHotWord,reqMall,reqMallRecommend,reqNextRecommend} from '../../api'
    import Marquee from '../../components/Marquee/Marquee'
    import Header from '../../components/Header/Header'
    import SearchBar from '../../components/SearchBar/SearchBar'
    import ToTop from '../../components/ToTop/ToTop'
    import ImgList from '../../components/ImgList/ImgList'
    import Recommend from '../../components/Recommend/Recommend'
    import Footer from '../../components/Footer/Footer'

    export default {
        data(){
            return {
                hotwords:'', // 搜索关键字
                mall:{}, // 商城描述对象
                recommends:{}, // 商城热门推荐对象
                loading_top:false, // 下拉刷新动图是否显示
                loading_bottom:false, // 上拉加载动图是否显示
                next:0, // 下一组数据
                scroll:{}, // 滑动对象
                height:'', // 屏高
            }
        },
        async created(){
            const response = await reqHotWord()
            this.hotwords = response.keyword
            const mall = await reqMall()
            this.mall = mall
            this.getRecommend()
        },
        mounted(){
            this.$nextTick(() => {
                calHeight(1.95)
                this.height = document.documentElement.clientHeight
                this.scroll = new BScroll('.content',{
                    scrollY:true,
                    click:true,
                    pullDownRefresh:{
                        threshold:50,
                        stop:40
                    },
                    pullUpLoad:{
                        threshold:30,
                    }
                })
                let me = this
                // 下拉刷新
                this.scroll.on('pullingDown',async function () {
                    me.loading_top = true
                    setTimeout(() => {
                        me.loading_top = false
                    },1000)
                    me.getRecommend()
                    me.scroll.finishPullDown()
                    me.scroll.refresh()
                })
                // 上拉加载
                this.scroll.on('pullingUp',async function () {
                    me.loadding_bottom = true
                    setTimeout(() => {
                        me.loadding_bottom = false
                    },1000)
                    me.next+= 20
                    const response = await reqNextRecommend(me.next)
                    const list = response.list
                    me.recommends.list.push(...list)
                    me.scroll.finishPullUp()
                    me.scroll.refresh()
                })
            })
        },
        methods:{
            async getRecommend(){
                const recommends = await reqMallRecommend()
                this.recommends = recommends
            }
        },
        components:{Header,Footer,SearchBar,Marquee,ImgList,Recommend,ToTop}
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .mall-view
        padding-top 1.95rem
        background-color #f5f5f5
        .content
            position relative
            .wrap
                padding-bottom 2.2rem
                >.img-wrap
                    text-align center
                    >img
                        margin .2rem auto
                        width .8rem
                        height .8rem
                >nav
                    display flex
                    flex-wrap wrap
                    background-color #fff
                    margin-bottom .4rem
                    padding .4rem 0
                    .item
                        width 20%
                        text-align center
                        img
                            margin .4rem 0 0
                            width 60%
                        .text
                            font-size .55rem
                            color #323232
</style>