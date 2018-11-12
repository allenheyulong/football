<template>
    <div class="play-view">
        <Header>
            <h1 slot="app_name" class="app-name">懂球帝</h1>
            <div slot="title"></div>
            <div slot="right" class="right">
                <router-link class="home-link" to="/">社区</router-link>
                <router-link class="home-link" to="/mall">商城</router-link>
                <router-link class="home-link" to="/play">游戏</router-link>
            </div>
        </Header>
        <NavBar v-if="nav_list" :nav_list="nav_list" :default_index="0" type="play" :scroll="scroll" />
        <div class="wrap cal-wrapper">
            <div class="content">
                <!--下拉刷新动图-->
                <div class="img-wrap">
                    <img v-if="loading_top" src="./images/timg.gif" alt="">
                </div>
                <Tag v-if="description.tags && description.tags.length" :tag="description.tags" />
                <ArticleList v-if="description" :articles="description.articles" />
                <!--上拉加载动图-->
                <div class="img-wrap">
                    <img v-if="loading_bottom" src="./images/timg.gif" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import {mapState} from 'vuex'
    import {calHeight,requireStart} from '../../assets/js/utils'
    import {reqGameNav,reqGame,reqGameUp} from '../../api'
    import Header from '../../components/Header/Header'
    import Tag from '../../components/Tag/Tag'
    import ArticleList from '../../components/ArticleList/ArticleList'
    import NavBar from '../../components/NavBar/NavBar'

    export default {
        data(){
            return {
                nav_list:'', // 导航数据
                loading_bottom:false,
                loading_top:false,
                start:'',
                scroll:'',
            }
        },
        created(){
            this.$store.dispatch('saveData',{data:{key:'selectIndex',value:0}})
            // 获取导航数据
            this.getNav()
            // 获取内容区数据,该模块默认显示第一个导航元素对应的内容
            this.getGame()
        },
        mounted(){
            this.$nextTick(() => {
                // calHeight(3.55)
                this.scroll = new BScroll('.cal-wrapper',{
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
                this.scroll.on('pullingDown',function () {
                    me.loading_top = true
                    setTimeout(() => {
                        me.loading_top = false
                    },1000)
                    me.getGame(me.nav_list[me.selectIndex].channel_id)
                    me.scroll.finishPullDown()
                    me.scroll.refresh()
                })
                // 上拉加载
                this.scroll.on('pullingUp',function () {
                    if(me.start){
                        me.loading_bottom = true
                        setTimeout(() => {
                            me.loading_bottom = false
                        },1000)
                        me.gameUp(me.nav_list[me.selectIndex].channel_id)
                        me.scroll.finishPullUp()
                        me.scroll.refresh()
                    }
                })
            })
        },
        methods:{
            // 导航
            async getNav(){
                const response = await reqGameNav()
                if(response.code === 0){
                    this.nav_list = response.data.channels
                }
            },
            // 内容区数据
            async getGame(id=0){
                const response = await reqGame(id)
                if(response.code === 0){
                    this.$store.dispatch('saveData',{data:{key:'description',value:response.data}})
                    this.start = requireStart(response.data.next)
                }
            },
            // 上拉加载数据
            async gameUp(id=0){
                const response = await reqGameUp(id,this.start)
                if(response.code === 0){
                    const {articles,next} = response.data
                    if(next){
                        this.start = requireStart(next)
                    }
                    this.description.articles.push(...articles)
                }
            }
        },
        watch:{
            selectIndex(){
                if(this.scroll){
                    // 一旦导航选择项改变，则需要重新设置better-scroll的高度,页面回到顶部
                    this.scroll.scrollTo(0,0,0)
                    this.scroll.refresh()
                }
                return this.selectIndex
            }
        },
        computed:{
            ...mapState(['selectIndex','description'])
        },
        components:{Header,NavBar,Tag,ArticleList}
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .play-view
        padding-top 1.95rem
        >.wrap
            position absolute
            top 3.55rem
            left 0
            right 0
            bottom 0
            background-color #ececec
            .content
                >.img-wrap
                      text-align center
                      >img
                          margin .2rem auto
                          width .8rem
                          height .8rem
</style>