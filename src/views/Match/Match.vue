<template>
    <!--比赛板块-->
    <div class="match-view">
        <!--头部-->
        <Header type="1">
            <span slot="title" class="title">比赛</span>
            <span slot="right"></span>
        </Header>
        <!--导航-->
        <NavBar :default_index="default_index" :nav_list="nav_list" type="match" v-if="nav_list.length" />
        <!--内容区-->
        <div class="match-content cal-wrapper">
            <div class="competition-wrap">
                <ul class="cal-width">
                    <Competition v-for="(item,index) in nav_list" :key="index" :description="description" @handleEnd="handleEnd" />
                </ul>
            </div>
        </div>
        <!--底部-->
        <Footer type="normal" />
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import {mapState} from 'vuex'
    import {reqMatchNav,reqMatch} from '../../api'
    import {calHeight,calWidth,transLocal,currentTime} from '../../assets/js/utils'
    import Header from '../../components/Header/Header'
    import NavBar from '../../components/NavBar/NavBar'
    import Competition from '../../components/Competition/Competition'
    import Footer from '../../components/Footer/Footer'

    export default {
        data() {
            return {
                nav_list:[], //导航数据
                default_index:'', // 默认显示的索引
            }
        },
        async created(){
            // 获取导航条数据
            const navResponse = await reqMatchNav()
            if(navResponse.errCode === 0){
                const {list,default_index} = navResponse.data
                this.default_index = default_index
                this.nav_list = list
            }

        },
        mounted(){
            // 计算高度，自定义滑动
            this.$nextTick(() => {
                // 内容区垂直滑动
                calHeight(3.55)
                new BScroll('.match-content',{
                    scrollY:true,
                    click:true
                })
                // calWidth('.cal-width',this.nav_list.length)
                const scroll = new BScroll('.competition-wrap',{
                    scrollX:true,
                    momentum:false,
                    snap:{
                        loop:false,
                        autoPlay:false,
                        threshold:0.3,
                        showDot:false,
                        easing: {
                            style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                            fn: function(t) {
                                return t * (2 - t)
                            }
                        }
                    }
                })
                scroll.on('scrollEnd',(e) => {
                    const {default_index} = this
                    let selectIndex = default_index - e.x / 375
                    this.$store.dispatch('saveData',{data:{key:'selectIndex',value:selectIndex}})

                })
            })
        },
        methods:{
            fillDesc(response,key){
                if(response.list.length){
                    response.list.forEach(item => {
                        item._time = transLocal(new Date(item.start_play).getTime()/1000)
                    })
                    // 整理数据,将后台返回的数据按照日期分类
                    let list = []
                    let ymd = ''
                    let count = 1
                    let arr = []
                    response.list.forEach(item => {
                        if(count === 1){
                            ymd = item._time.ymd
                            arr.push(item)
                            count = 0
                            return
                        }
                        if(ymd === item._time.ymd){
                            arr.push(item)
                        }else{
                            list.push(arr)
                            arr = []
                            count = 1
                        }
                    })
                    response.list = list
                    // vuex管理数据，主页用于显示
                    this.$store.dispatch('saveData',{data:{key,value:response}})
                }
            },
            async reqDesc(count){
                let {selectIndex,default_index} = this
                if(!selectIndex){
                    selectIndex = default_index
                }
                const {type,league_id} = this.nav_list[selectIndex+count]
                const start = currentTime(new Date().getTime()/1000)
                const response = await reqMatch(type,league_id,start)
                if(count > 0){
                    this.fillDesc(response,'N_description')
                }else if(count < 0){
                    this.fillDesc(response,'B_description')
                }else{
                    this.fillDesc(response,'description')
                }
            },
            handleEnd(){
                console.log('end')
            }
        },
        computed:{
            ...mapState(['description','B_description','N_description','selectIndex']),
        },
        watch:{
            async description(value){
                if(this.description){
                    this.reqDesc(1)
                }
                return value
            }
        },
        components:{NavBar,Header,Footer,Competition}
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../assets/css/mixins.styl"
    .match-view
        padding-top 3.55rem
        .match-content
            background-color #f2f2f2
            >.competition-wrap
                padding-bottom 2.2rem
                >ul
                    display inline-block
                    white-space nowrap
                    >div
                        display inline-block

</style>