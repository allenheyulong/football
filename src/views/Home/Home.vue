<template>
    <div class="view home-view" :class="{'side':isSide}" @click="backToHome">
        <Header type="1">
            <h1 slot="app_name" class="app-name">懂球帝</h1>
            <div slot="title"></div>
            <div slot="right" class="right">
                <router-link class="home-link" to="/home">社区</router-link>
                <router-link class="home-link" to="/mall">商城</router-link>
                <router-link class="home-link" to="/play">游戏</router-link>
            </div>
        </Header>
        <NavBar :nav_list="nav_list" :default_index="+default_index" type="home" v-if="nav_list.length" />
        <div class="home-content cal-wrapper">
            <div>
                <!--下拉刷新动图-->
                <div class="img-wrap">
                    <img v-if="loading_top" src="./images/timg.gif" alt="">
                </div>
                <!--搜索条-->
                <SearchBar v-if="isSearchShow" :hotwords="description.hotwords" />
                <!--热门-->
                <Hot v-if="description.id && description.id === 104" :dayList="description.contents" />
                <!--中超话题导航-->
                <LPBar type="1" :topics="description.topics" v-if="description.topics" />
                <!--足彩话题导航-->
                <LPBar type="2" :topics="description.menus" v-if="description.menus" />
                <!--懂球号模块-->
                <KnowBall v-if="description.data" :account_list="description.data.account_list" />
                <!--坑！主页的轮播和其他描述对象的某些单纯用于显示的字段竟然都是recommend!!!-->
                <Marquee :recommend="description.recommend" v-if="recommendShow" />
                <!--重要比赛提示-->
                <Game v-if="important && selectIndex === 1" :important="important" />
                <ArticleList :articles="description.articles" />
                <!--懂球号文章-->
                <ArticleList v-if="description.data && description.data.article_list" :articles="description.data.article_list.list" />
                <!--问答-->
                <ArticleList v-if="description.data && description.data.list" :articles="description.data.list" />
                <!--上拉加载动图-->
                <div class="img-wrap">
                    <img v-if="loading_bottom" src="./images/timg.gif" alt="">
                </div>
            </div>
        </div>
        <Footer type="normal" />
        <Side v-if="isSide" />
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import {mapState} from 'vuex'
    import {reqHomeNav,reqHomePull,reqHomeUp,reqImportant} from '../../api'
    import {calHeight,transLocal} from '../../assets/js/utils'
    import SearchBar from '../../components/SearchBar/SearchBar'
    import ArticleList from '../../components/ArticleList/ArticleList'
    import Marquee from '../../components/Marquee/Marquee'
    import NavBar from '../../components/NavBar/NavBar'
    import LPBar from '../../components/LPBar/LPBar'
    import Header from '../../components/Header/Header'
    import Side from '../../components/Side/Side'
    import Hot from '../../components/Hot/Hot'
    import KnowBall from '../../components/KnowBall/KnowBall'
    import Game from '../../components/Game/Game'
    import Footer from '../../components/Footer/Footer'

    export default {
        data(){
            return {
                nav_list:[], // 导航数据
                default_index:'', // 导航默认显示的模块索引
                isSearchShow:false, // 控制搜索条是否显示
                loading_top:false, // 是否处于加载状态
                loading_bottom:false, // 是否处于加载状态
                important:'', // 重要比赛提示
            }
        },
        async created(){
            // 主页都有导航条，先请求导航数据，再根据路由的参数匹配id，最后发请求，显示页面
            // 请求重要比赛
            const response = await reqImportant()
            response.forEach(item => {
                const _time = transLocal(new Date(item.start_play) / 1000)
                const now = new Date()
                const year = now.getFullYear()
                const month = now.getMonth() + 1
                const day = now .getDate()
                const date = year + '-' + month + '-' + day
                const _date = date === _time.ymd ? '今日' : '明日'
                item._time = _time
                item._date = _date
            })
            this.important = response
            const navResponse = await reqHomeNav()
            if(navResponse.errCode === 0){
                const {list,default_index} = navResponse.data
                this.nav_list = list
                this.default_index = default_index
            }
        },
        mounted(){
            // 计算高度，自定义滑动
            this.$nextTick(() => {
                calHeight(3.55)
                this.scroll = new BScroll('.home-content',{
                    scrollY:true,
                    click:true,
                    pullDownRefresh:{
                        threshold:50,
                        stop:40
                    },
                    pullUpLoad:{
                        threshold:30,
                        stop:50
                    }
                })
                let me = this
                // 下拉刷新
                this.scroll.on('pullingDown',async function () {
                    me.loading_top = true
                    let {selectIndex,default_index,nav_list} = me
                    if(!selectIndex){
                        selectIndex = default_index
                    }
                    setTimeout(() => {
                        me.loading_top = false
                    },1000)
                    const response = await reqHomePull(nav_list[selectIndex].id)
                    me.$store.dispatch('saveData',{data:{key:'description',value:response}})
                    me.scroll.finishPullDown()
                })
                // 上拉加载
                this.scroll.on('pullingUp',async function () {
                    me.loading_bottom = true
                    setTimeout(() => {
                        me.loading_bottom = false
                    },1000)
                    let {selectIndex,default_index,nav_list,description} = me
                    if(!selectIndex){
                        selectIndex = default_index
                    }
                    const response = await reqHomeUp(nav_list[selectIndex].id,description.min,+description.page + 1)
                    const {min,max,page,articles} = response
                    let _articles = description.articles
                    _articles.push(...articles)
                    let _description = {...description,min,max,page,articles:_articles}
                    me.$store.dispatch('saveData',{data:{key:'description',value:_description}})
                    me.scroll.finishPullUp()
                    me.scroll.refresh()
                })
            })
        },
        methods:{
            backToHome(){
                // 控制返回到主页，改变vuex状态，跳转路由，浮层显示才可点击
                if(!this.isSide){
                    return
                }
                this.$router.back()
                this.$store.dispatch('saveData',{name:'SAVE_DATA',data:{key:'isSide',value:false}})
            }
        },
        watch:{
            selectIndex(){
                // 一旦导航选择项改变，则需要重新设置better-scroll的高度,页面回到顶部
                if(this.scroll){
                    this.scroll.scrollTo(0,0,0)
                    this.scroll.refresh()
                }
                return this.selectIndex
            }
        },
        computed:{
            ...mapState(['isSide','description','recommendShow','selectIndex']),
        },
        components:{Header,Footer,NavBar,SearchBar,Marquee,ArticleList,Side,LPBar,KnowBall,Hot,Game}
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .home-content
        background-color #f2f2f2
        >div
            padding-bottom 2.2rem
            .img-wrap
                text-align center
                >img
                    margin .2rem auto
                    width .8rem
                    height .8rem
</style>