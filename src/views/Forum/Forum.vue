<template>
    <div class="forum-view">
        <Header type="1">
            <span class="title" slot="title">圈子</span>
            <span slot="right"></span>
        </Header>
        <nav>
            <div :class="{current:selectIndex === 0}" @click="handleClick(0)">
                <span>进圈</span>
            </div>
            <div :class="{current:selectIndex === 1}" @click="handleClick(1)">
                <span>精选</span>
            </div>
        </nav>
        <div class="content cal-wrapper">
            <div class="forum-wrap">
                <div class="forum" v-if="selectIndex === 0">
                    <!--下拉刷新动图-->
                    <div class="img-wrap">
                        <img v-if="loading_top" src="./images/timg.gif" alt="">
                    </div>
                    <SearchBar hotwords="搜索" />
                    <div class="wrap">
                        <div class="item" v-for="(item,index) in description" :key="item.id">
                            <header>
                                <img v-if="item.type_icon" :src="item.type_icon" alt="">
                                <div v-else class="bg"></div>
                                <div class="text">{{item.type_name}}</div>
                                <div class="count">{{item.list.length}}个</div>
                            </header>
                            <div class="item-wrap" :class="{item_header:index === 0}">
                                <div class="item-item" v-for="e in item.list" :key="e.id">
                                    <img :src="e.thumb" alt="">
                                    <div class="title">{{e.title}}</div>
                                    <div class="total" v-if="index === 0">{{e.topic_total_str}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--精选-->
                <div class="essence" v-else>
                    <div class="img-wrap">
                        <img v-if="loading_top" src="./images/timg.gif" alt="">
                    </div>
                    <div class="item-wrap" v-for="(item,index) in topic_hot" :key="item.id">
                        <header>
                            <img :src="item.author.avatar" alt="">
                            <div class="name-wrap">
                                <div class="username">{{item.author.username}}</div>
                                <div class="time" >{{item.created_at.slice(11,16)}}</div>
                            </div>
                        </header>
                        <div class="title">{{item.title}}</div>
                        <div class="para">{{item.content}}</div>
                        <div class="comment" v-if="item.god_reply">{{item.god_reply.content}}</div>
                        <footer>
                            <div>{{item.group.title}}</div>
                            <div>{{item.total_replies}}回帖</div>
                        </footer>
                    </div>
                    <div class="img-wrap">
                        <img v-if="loading_bottom" src="./images/timg.gif" alt="">
                    </div>
                </div>
            </div>
        </div>
        <Footer type="normal" />
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import {calHeight} from '../../assets/js/utils'
    import {reqForum,reqEssence,reqTopics,nextEssence} from '../../api'
    import SearchBar from '../../components/SearchBar/SearchBar'
    import NavBar from '../../components/NavBar/NavBar'
    import Header from '../../components/Header/Header'
    import Footer from '../../components/Footer/Footer'

    export default {
        data() {
            return {
                description:[],  // 圈子描述对象
                selectIndex:0, // 导航选择项
                loading_top:false, // 下拉刷新动图是否显示
                loading_bottom:false, // 上拉加载动图是否显示
                essence:{}, // 精选描述对象
                page:0, // 精华模块页面
                topic_hot:[], // 精华帖子列表
            }
        },
        async created(){
            // 获取圈子数据（默认显示圈子模块）
            this.getForum()
        },
        mounted(){
            calHeight(3.15)
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
            this.scroll.on('pullingDown',async function () {
                me.loading_top = true
                if(me.selectIndex === 0){
                    me.getForum()
                }else{
                    me.getEssence()
                }
                setTimeout(() => {
                    me.loading_top = false
                },1000)
                me.scroll.finishPullDown()
            })
            this.scroll.on('pullingUp',async function () {
                if(me.selectIndex === 1){
                    me.loading_bottom = true
                    const response = await nextEssence(me.page++)
                    me.topic_hot.push(...response.data.topic_hot)
                    setTimeout(() => {
                        me.loading_bottom = false
                    },1000)
                }
                me.scroll.finishPullUp()
                me.scroll.refresh()
            })
        },
        methods:{
            handleClick(index){
                this.selectIndex = index
                this.scroll.refresh()
            },
            async getForum(){
                const response = await reqForum()
                if(response.code === '200'){
                    this.description = response.data
                }
            },
            async getEssence(){
                const response = await reqEssence()
                if(response.code === '200'){
                    response.data.topic_hot.forEach(async function (item,index) {
                        const topics = await reqTopics(item.id)
                        const content = topics.content.slice(0,38) + '...'
                        response.data.topic_hot[index].content = content
                    })
                    this.essence = response.data
                    this.topic_hot = response.data.topic_hot
                }
            }
        },
        watch:{
            // 一旦拿到圈子描述对象就立马请求精华模块的数据
            description(){
                this.getEssence()
                return this.description
            },
        },
        components:{Header,Footer,NavBar,SearchBar}
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../assets/css/mixins.styl"

    @keyframes wmove
        0%
            width 0
        50%
            width 50%
        70%
            width 80%
        100%
            width 100%

    .forum-view
        padding-top 1.95rem
        background-color #ececec
        >nav
            display flex
            background-color #fafafa
            >div
                line-height 1.2rem
                flex-center()
                flex 1
                font-size .6rem
                color #555
                span
                    letter-spacing .01rem
                    padding 0 .2rem
            .current
                span
                    color #16b13b
                    position relative
                    &::after
                        content ''
                        display block
                        position absolute
                        bottom 0
                        left 0
                        width 100%
                        height .1rem
                        background-color #16b13b
                        animation wmove .3s

        .content
            .img-wrap
                text-align center
                >img
                    margin .2rem auto
                    width .8rem
                    height .8rem
            .forum-wrap
                padding-bottom 2.2rem
                .forum
                    .wrap
                        .item
                            margin-bottom .4rem
                            background-color #f5f5f5
                            >header
                                display flex
                                align-items center
                                position relative
                                line-height 1.6rem
                                border-bottom-1px(#e7e7e7)
                                >img
                                    height 1rem
                                    width 1rem
                                    margin 0 .4rem
                                >.bg
                                    position absolute
                                    left 0
                                    top 25%
                                    bottom 25%
                                    width .2rem
                                    background-color #16b13b
                                .text
                                    font-size .55rem
                                    color #333
                                    margin 0 .4rem
                                .count
                                    font-size .55rem
                                    color #939393
                            .item-wrap
                                display flex
                                flex-wrap wrap
                                .item-item
                                    width 20%
                                    display flex
                                    flex-direction column
                                    align-items center
                                    img
                                        width 50%
                                        margin .4rem 0
                                    .title
                                        text-align center
                                        font-size .55rem
                                        color #333
                                        width 100%
                                        ellipse()
                                    .total
                                        font-size .5rem
                                        color #7c7c7c
                                        padding-bottom .2rem
                            .item_header
                                >.item-item
                                    width 25%

                .essence
                    .item-wrap
                        background-color #f7f7f7
                        margin-bottom .4rem
                        padding 0 .4rem
                        >header
                            display flex
                            align-items center
                            height 2.2rem
                            >img
                                height 1.4rem
                                width 1.4rem
                                margin-right .4rem
                                border-radius 50%
                            .name-wrap
                                .username
                                    font-size .55rem
                                    color #02ab2a
                                .time
                                    font-size .5rem
                                    color #939393
                        .title
                            font-size .6rem
                            color #303030
                        .para
                            margin .2rem 0
                            font-size .55rem
                            color #828282
                        .comment
                            font-size .55rem
                            padding .4rem
                            color #4f4f4f
                            background-color #f0f0f0
                        >footer
                            display flex
                            justify-content space-between
                            font-size .55rem
                            padding .4rem 0
                            color #828282
</style>