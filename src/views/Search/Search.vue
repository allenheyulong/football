<template>
    <!--商城搜索模块-->
    <div class="search-view">
        <header v-if="!+$route.params.page">
            <img class="back" src="./images/back.png" @click.prevent.stop="backToMall">
            <form class="search-form" @submit.prevent="">
                <span class="iconfont icon-sousuo"></span>
                <input class="search-input" type="text" :placeholder="keyword" v-model="search" @keyup.prevent.enter="handleSearch">
            </form>
        </header>
        <header v-else>
            <img class="back" src="./images/back.png" @click.prevent.stop="backToMall">
            <span class="title" v-if="description">{{description.title}}</span>
        </header>
        <div class="feature-wrap">
            <div class="feature-content">
                <div class="feature-img" v-if="description">
                    <img :src="description.img_url" alt="">
                </div>
                <!--搜索容器-->
                <div class="content" v-if="!search_result && !+$route.params.page">
                    <!--搜索历史-->
                    <div class="search-history" v-if="searchHistory.length">
                        <div class="item" v-for="(item,index) in searchHistory" :key="index" @click="getCommodity(item)">{{item}}</div>
                        <div class="clear" @click="clearHistory">清空历史记录</div>
                    </div>
                    <!--大家都在搜-->
                    <div class="we-search" v-if="recommend">
                        <header>大家都在搜</header>
                        <div class="wrap">
                            <div class="item" v-for="(item,index) in recommend" :key="index" @click="getCommodity(item)">{{item}}</div>
                        </div>
                    </div>
                    <!--搜索尺码试一试-->
                    <div class="search-size" v-if="size">
                        <header>搜索尺码试一试</header>
                        <div class="wrap">
                            <div class="item" v-for="(item,index) in size" :key="index" @click="getCommodity(item)">{{item}}</div>
                        </div>
                    </div>
                </div>
                <!--商品展示容器-->
                <div class="commodity" v-else>
                    <nav :style="{position:+$route.params.page ? 'static' : 'absolute'}">
                        <div class="nav-item">
                            <div class="wrap">
                                <span class="text" :class="{current:selectIndex === 1}" @click="changeSort(1)">推荐排序</span>
                            </div>
                        </div>
                        <div class="nav-item">
                            <div class="wrap">
                                <span class="text" :class="{current:selectIndex === 2}" @click="changeSort(2)">按价格</span>
                                <span class="bg" :class="{asc:price_sort === 'asc',desc:price_sort === 'desc'}"></span>
                            </div>
                        </div>
                        <div class="nav-item">
                            <div class="wrap">
                                <span class="text" :class="{current:selectIndex === 3}" @click="changeSort(3)">按销量</span>
                                <span class="bg" :class="{asc:sales === 'asc',desc:sales === 'desc'}"></span>
                            </div>
                        </div>
                        <div class="nav-item">
                            <div class="wrap ls">
                                <span class="text" :class="{current:selectIndex === 4}" @click="changeSort(4)">上架时间</span>
                                <span class="bg" :class="{asc:add_time === 'asc',desc:add_time === 'desc'}"></span>
                            </div>
                        </div>
                    </nav>
                    <div :style="{position:+$route.params.page ? 'static' : 'absolute'}" class="com-wrap cal-wrapper">
                        <div class="wrapper">
                            <!--下拉刷新动图-->
                            <div class="img-wrap">
                                <img v-if="loading_top" src="./images/timg.gif" alt="">
                            </div>
                            <Commodity v-if="search_result" :commodity_list="search_result"></Commodity>
                            <!--没有更多数据了-->
                            <div v-if="msg" class="alert">{{msg}}</div>
                            <!--上拉刷新动图-->
                            <div class="img-wrap">
                                <img v-if="loading_bottom" src="./images/timg.gif" alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <!--回到商城首页-->
                <div class="back" v-if="description" @click="$router.replace('/mall')">回到首页逛逛</div>
            </div>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import {mapState} from 'vuex'
    import {reqHotWord,reqWordList,reqSize,reqCommodity,reqFeatures} from '../../api'
    import {unique} from '../../assets/js/utils'
    import Commodity from '../../components/Commodity/Commodity'

    export default {
        data() {
            return {
                keyword:'', // 热搜关键词
                recommend:'', // 关键字推荐列表
                size:'',// 尺码热搜
                search:'', // 搜索条文本内容
                description:'', // 专题搜索结果描述对象
                search_result:'', // 搜索结果
                page:1, // 商品显示页数
                selectIndex:1, // 导航默认显示
                loading_top:false,
                loading_bottom:false,
                scroll:'',
                time:0,
                msg:'', // 提醒用户信息
                price_sort:'asc', // 价格默认按照升序排列
                sales:'desc', // 销量默认按照降序排列
                add_time:'desc', // 上架时间默认按照降序排列
                p_count:0, // 价格计数器
                s_count:0, // 销量计数器
                a_count:0, // 上架时间计数器
                currentSelect:'recommend', // 当前选择的导航模块,默认显示推荐排序
                sort:'desc', // 排序方式
            }
        },
        created(){
            console.log(this.$route.params)
            // 走马灯跳转的过来的专题模块
            if(+this.$route.params.page){
                // 获取某个专题模块的数据
                this.getFeatures(this.$route.params.page,this.currentSelect,this.sort)
            }else{
                // 搜索模块
                // 获取搜索关键字
                this.getWord()
                // 获取热搜关键词（大家都在搜模块）
                this.getWordList()
                // 获取尺码列表
                this.getSize()
            }

        },
        methods:{
            // 返回商城
            backToMall(){
                this.$router.replace('/mall')
            },
            // 获取某个专题模块的数据
            async getFeatures(page,order,sort){
                const response = await reqFeatures(page,order,sort)
                this.description = response
                this.search_result = response.list
            },
            // 获取搜索关键字
            async getWord(){
                const response = await reqHotWord()
                this.keyword = response.keyword
            },
            // 获取热搜关键词（大家都在搜模块）
            async getWordList(){
                const response = await reqWordList()
                this.recommend = response.keywords
            },
            // 获取尺码列表
            async getSize(){
                const response = await reqSize()
                this.size = response.keywords
            },
            // 搜索条搜索
            async handleSearch(){
                if(this.search.trim()){
                    this.page = 1
                    const response = await reqCommodity(this.search,this.page,'recommend','desc')
                    this.search_result = response.products
                    // 添加历史记录
                    let arr = []
                    let {searchHistory} = this
                    arr.push(keyword,...searchHistory)
                    arr = unique(arr)
                    this.$store.dispatch('saveData',{data:{key:'searchHistory',value:arr}})
                }
            },
            // 获取商品列表
            async getCommodity(keyword){
                this.page = 1
                this.keyword = keyword
                // 请求商品列表
                const response = await reqCommodity(keyword,this.page,'recommend','desc')
                this.search_result = response.products
                // 添加历史记录
                let arr = []
                let {searchHistory} = this
                arr.push(keyword,...searchHistory)
                arr = unique(arr)
                this.$store.dispatch('saveData',{data:{key:'searchHistory',value:arr}})
            },
            // 清空历史搜索记录
            clearHistory(){
                this.$store.dispatch('saveData',{data:{key:'searchHistory',value:[]}})
            },
            // 改变排序方式
            async changeSort(selectIndex){
                // 改变样式,重置数据
                this.selectIndex = selectIndex
                this.msg = ''
                this.page = 1
                this.scroll.scrollTo(0,0)
                const {keyword} = this
                switch(selectIndex){
                    case 1:
                        // 推荐排列
                        this.currentSelect = 'recommend'
                        if(!+sthis.$route.params.page){
                            let response = await reqCommodity(keyword,1,this.currentSelect,'desc')
                            this.search_result = response.products
                        }else{
                            let response = await reqFeatures(this.$route.params.page,this.currentSelect,'desc')
                            this.search_result = response.list
                        }
                        // 重置数据
                        this.p_count = this.s_count = this.a_count = 0
                        this.pullRefresh('desc')
                        break
                    case 2:
                        // 价格
                        this.currentSelect = 'price'
                        this.p_count++
                        if(this.p_count>1){
                            // 改变排序方式
                            if(this.price_sort === 'asc'){
                                this.price_sort = this.sort = 'desc'
                                if(!+this.$route.params.page){
                                    let response = await reqCommodity(keyword,1,this.currentSelect,'desc')
                                    this.search_result = response.products
                                }else{
                                    let response = await reqFeatures(this.$route.params.page,this.currentSelect,'desc')
                                    this.search_result = response.list
                                }
                                this.pullRefresh('desc')
                            }else{
                                this.price_sort = this.sort = 'asc'
                                if(!+this.$route.params.page){
                                    let response = await reqCommodity(keyword,1,this.currentSelect,'asc')
                                    this.search_result = response.products
                                }else{
                                    let response = await reqFeatures(this.$route.params.page,this.currentSelect,'asc')
                                    this.search_result = response.list
                                }
                                this.pullRefresh('asc')
                            }
                        }else{
                            // 请求数据，不改变排序方式
                            this.sort = 'asc'
                            if(!+this.$route.params.page){
                                let response = await reqCommodity(keyword,1,this.currentSelect,'asc')
                                this.search_result = response.products
                            }else{
                                let response = await reqFeatures(this.$route.params.page,this.currentSelect,'asc')
                                this.search_result = response.list
                            }
                            this.pullRefresh('asc')
                        }
                        break
                    case 3:
                        // 销量
                        this.currentSelect = 'sales'
                        this.s_count++
                        if(this.s_count>1){
                            // 改变排序方式
                            if(this.sales === 'asc'){
                                this.sales = this.sort = 'desc'
                                if(!+this.$route.params.page){
                                    let response = await reqCommodity(keyword,1,this.currentSelect,'desc')
                                    this.search_result = response.products
                                }else{
                                    let response = await reqFeatures(this.$route.params.page,this.currentSelect,'desc')
                                    this.search_result = response.list
                                }
                                this.pullRefresh('desc')
                            }else{
                                this.sales = this.sort = 'asc'
                                if(!+this.$route.params.page){
                                    let response = await reqCommodity(keyword,1,this.currentSelect,'asc')
                                    this.search_result = response.products
                                }else{
                                    let response = await reqFeatures(this.$route.params.page,this.currentSelect,'asc')
                                    this.search_result = response.list
                                }
                                this.pullRefresh('asc')
                            }
                        }else{
                            // 请求数据，不改变排序方式
                            if(!+this.$route.params.page){
                                let response = await reqCommodity(keyword,1,this.currentSelect,'desc')
                                this.search_result = response.products
                            }else{
                                let response = await reqFeatures(this.$route.params.page,this.currentSelect,'desc')
                                this.search_result = response.list
                            }
                            this.pullRefresh('desc')
                        }
                        break
                    case 4:
                        // 上架时间
                        this.currentSelect = 'sale_time'
                        this.a_count++
                        if(this.a_count>1){
                            // 改变排序方式
                            if(this.add_time === 'asc'){
                                this.add_time = this.sort = 'desc'
                                if(!+this.$route.params.page){
                                    let response = await reqCommodity(keyword,1,this.currentSelect,'desc')
                                    this.search_result = response.products
                                }else{
                                    let response = await reqFeatures(this.$route.params.page,this.currentSelect,'desc')
                                    this.search_result = response.list
                                }
                                this.pullRefresh('desc')
                            }else{
                                this.add_time = this.sort = 'asc'
                                if(!+this.$route.params.page){
                                    let response = await reqCommodity(keyword,1,this.currentSelect,'asc')
                                    this.search_result = response.products
                                }else{
                                    let response = await reqFeatures(this.$route.params.page,this.currentSelect,'asc')
                                    this.search_result = response.list
                                }
                                this.pullRefresh('asc')
                            }
                        }else{
                            // 请求数据，不改变排序方式
                            if(!+this.$route.params.page){
                                let response = await reqCommodity(keyword,1,this.currentSelect,'desc')
                                this.search_result = response.products
                            }else{
                                let response = await reqFeatures(this.$route.params.page,this.currentSelect,'desc')
                                this.search_result = response.list
                            }
                            this.pullRefresh('desc')
                        }
                    break
                }
            },
            // 绑定上拉加载，下拉刷新
            pullRefresh(sort){
                if(this.$route.params.page){
                    return
                }
                this.scroll = new BScroll('.com-wrap',{
                    scrollY:true,
                    click:true,
                    pullDownRefresh:{
                        threshold:50,
                        stop:40
                    },
                    pullUpLoad:{
                        threshold:50,
                        stop:40
                    }
                })
                let me = this
                // 下拉刷新
                this.scroll.on('pullingDown',async function (){
                    me.loading_top = true
                    me.msg = ''
                    setTimeout(() => {
                        me.loading_top = false
                    },1000)
                    if(me.page>1){
                        me.scroll.finishPullDown()
                        me.scroll.refresh()
                        return
                    }
                    const response = await reqCommodity(me.keyword,me.page,me.currentSelect,sort)
                    me.search_result = response.products
                    me.scroll.finishPullDown()
                    me.scroll.refresh()
                })
                // 上拉加载
                this.scroll.on('pullingUp',async function () {
                    if(me.msg){
                        return
                    }
                    me.loading_bottom = true
                    setTimeout(() => {
                        me.loading_bottom = false
                    },1000)
                    const response = await reqCommodity(me.keyword,++me.page,me.currentSelect,sort)
                    me.search_result = [...me.search_result,...response.products]
                    if(!response.products.length){
                        me.msg = '没有更多数据了'
                    }
                    me.scroll.finishPullUp()
                    me.scroll.refresh()
                })
            }
        },
        watch:{
            search_result(){
                if(+this.$route.params.page){
                    return null
                }else{
                    // 一旦有结果则执行，但只能执行一次，用于初始化滑动对象
                    if(!this.time){
                        this.time++
                        this.$nextTick(() => {
                            // 初始化滑动对象
                            this.scroll = new BScroll('.com-wrap',{
                                scrollY:true,
                                click:true,
                                pullDownRefresh:{
                                    threshold:50,
                                    stop:40
                                },
                                pullUpLoad:{
                                    threshold:50,
                                    stop:40
                                }
                            })
                            let me = this
                            // 下拉刷新
                            this.scroll.on('pullingDown',async function (){
                                me.loading_top = true
                                me.msg = ''
                                setTimeout(() => {
                                    me.loading_top = false
                                },1000)
                                if(me.page>1){
                                    me.scroll.finishPullDown()
                                    me.scroll.refresh()
                                    return
                                }
                                const response = await reqCommodity(me.keyword,me.page,me.currentSelect,'desc')
                                me.search_result = response.products
                                me.scroll.finishPullDown()
                                me.scroll.refresh()
                            })
                            // 上拉加载
                            this.scroll.on('pullingUp',async function () {
                                if(me.msg){
                                    return
                                }
                                me.loading_bottom = true
                                setTimeout(() => {
                                    me.loading_bottom = false
                                },1000)
                                const response = await reqCommodity(me.keyword,++me.page,me.currentSelect,me.sort)
                                me.search_result = [...me.search_result,...response.products]
                                if(!response.products.length){
                                    me.msg = '没有更多数据了'
                                }
                                me.scroll.finishPullUp()
                                me.scroll.refresh()
                            })
                        })
                    }
                }
            },
            description(){
                this.scroll = new BScroll('.feature-wrap',{
                    scrollY:true,
                    click:true,
                })
            }
        },
        computed:{
            ...mapState(['searchHistory'])
        },
        components:{Commodity}
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../assets/css/mixins.styl"

    .search-view
        position absolute
        left 0
        right 0
        top 0
        bottom 0
        padding-top 1.95rem
        z-index 1000
        background-color #ececec
        >header
            position absolute
            left 0
            right 0
            top 0
            height 1.95rem
            display flex
            align-items center
            justify-content space-between
            padding 0 .4rem
            z-index 1000
            background-color #16b13a
            >.title
                position absolute
                top 50%
                left 50%
                transform translate(-50%,-50%)
                font-size .7rem
                color #ececec
            .back
                margin-right .4rem
                width-height(.8rem,.8rem)
            .search-form
                display flex
                align-items center
                flex auto
                padding 0 .2rem
                border-radius 5px
                height 60%
                background-color #fff
                input
                    box-sizing border-box
                    width 90%
                    border none
                    padding 0 .2rem
        >.feature-wrap
            position absolute
            left 0
            right 0
            top 1.95rem
            bottom 0
            >.feature-content
                background-color #fff
                >.feature-img
                    img
                        width 100%
                .content
                    >div
                        padding .4rem
                        background-color #fafafa
                    .search-history
                        padding-bottom 0
                        padding-top 0
                        margin-bottom .4rem
                        .item
                            font-size .65rem
                            height 1.2rem
                            line-height 1.2rem
                            padding .2rem 0
                            color #333
                            border-bottom-1px(#e9e9e9)
                        .clear
                            flex-center()
                            font-size .65rem
                            text-align center
                            color #888
                            height 1.2rem
                            line-height 1.2rem
                            padding .2rem 0
                    .we-search
                        >header
                            font-size .75rem
                            color #555
                            margin-bottom .2rem
                        .wrap
                            display flex
                            flex-wrap wrap
                            .item
                                padding .2rem
                                margin-right .4rem
                                margin-bottom .4rem
                                font-size .7rem
                                color #555
                                border-1px(#b1b1b1)
                    .search-size
                        >header
                            font-size .75rem
                            color #555
                            margin-bottom .2rem
                        .wrap
                            display flex
                            flex-wrap wrap
                            .item
                                padding .2rem
                                margin-right .4rem
                                margin-bottom .4rem
                                font-size .7rem
                                color #555
                                background-color #e1f3e4
                .commodity
                    background-color #fff
                    >nav
                        height 1.6rem
                        position absolute
                        left 0
                        right 0
                        z-index 1000
                        background-color #fafafa
                        display flex
                        .nav-item
                            display flex
                            align-items center
                            flex 1
                            text-align center
                            .current
                                color #05a62c !important
                            .ls
                                &::before
                                    width 0 !important
                            >.wrap
                                display flex
                                align-items center
                                justify-content center
                                flex auto
                                height 1.6rem
                                border-right-1px(#d8d8d8)
                                .text
                                    font-size .55rem
                                    color #222
                                    margin-right .2rem
                                .bg
                                    display inline-block
                                    width .3rem
                                    height .3rem
                                    background-repeat no-repeat
                                    background-size 100% 100%
                                    background-position center center
                                .asc
                                    background-image url("./images/up.png")
                                .desc
                                    background-image url("./images/down.png")
                    .com-wrap
                        position absolute
                        left 0
                        right 0
                        top 1.6rem
                        bottom 0
                        z-index 999
                        >.wrapper
                            .alert
                                text-align center
                                font-size .6rem
                                color #555
                                height 1.2rem
                                line-height 1.2rem
                                padding .2rem 0
                            >.img-wrap
                                text-align center
                                >img
                                    margin .2rem auto
                                    width .8rem
                                    height .8rem
                >.back
                    font-size .65rem
                    color #f2f2f2
                    height 1.2rem
                    line-height 1.2rem
                    text-align center
                    padding .2rem 0
                    width 96%
                    margin 0 auto
                    background-color #ed6e3d
</style>