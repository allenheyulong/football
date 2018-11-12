<template>
    <!--应用导航条-->
    <nav class="nav-bar">
        <ul>
            <li v-for="(item,index) in nav_list" :key="item.id" :class="{current:currentIndex === index}" @click="handleClick(index)">{{item.label ? item.label : item.title}}</li>
        </ul>
    </nav>
</template>

<script>
    import {mapState} from 'vuex'
    import BScroll from 'better-scroll'
    import {reqHome,reqMatch,reqHistory,reqSeason,reqGame} from '../../api'
    import {currentTime,transLocal} from '../../assets/js/utils'

    export default {
        data(){
            return {

            }
        },
        computed:{
            // 根据默认需要显示的索引和选择的索引计算最终需要显示的索引
            currentIndex(){
                if(this.selectIndex === 0){
                    return 0
                }
                return this.selectIndex?this.selectIndex:this.default_index
            },
            ...mapState(['dataList','dataIndex','selectIndex'])
        },
        props:{
            nav_list:Array, // 导航数据
            default_index:Number, // 默认显示的索引
            type:String, // 导航类型，有特殊需求再传，用于区分不同模块的导航
        },
        async created(){
            // 根据默认显示的索引，请求对应的api
            // 因为后台接口是真的乱，而且还存在跨域的问题，所以此处不能简单的直接发送，还得分类!!是真的烦~~
            const {nav_list,default_index} = this
            if(this.type === 'home'){
                // 请求数据描述对象
                const response = await reqHome(nav_list[default_index].id)
                // vuex管理数据，主页用于显示
                this.$store.dispatch('saveData',{data:{key:'description',value:response}})
            }
            if(this.type === 'match'){
                const start = currentTime()
                const {type,league_id} = nav_list[default_index]
                // 请求数据描述对象
                const response = await reqMatch(type,league_id,start)
                this.fillDesc(response,'description')
            }
        },
        mounted(){
            // 导航条水平拉动
            this.$nextTick(() => {
                new BScroll('.nav-bar',{
                    scrollX:true,
                    click:true
                })
            })
        },
        methods:{
            async handleClick(index){
                // 控制动画
                this.$store.dispatch('saveData',{data:{key:'selectIndex',value:index}})
                // Home组件导航
                if(this.type === 'home'){
                    // 发送请求，保存vuex
                    const response = await reqHome(this.nav_list[this.selectIndex].id)
                    this.$store.dispatch('saveData',{data:{key:'description',value:response}})
                    // 控制走马灯，只有当id为1时开启
                    if(index === 1){
                        return this.$store.dispatch('saveData',{data:{key:'recommendShow',value:true}})
                    }
                    this.$store.dispatch('saveData',{data:{key:'recommendShow',value:false}})
                }
                // Match组件导航
                if(this.type === 'match'){
                    const {type,league_id} = this.nav_list[index]
                    const start = transLocal(new Date().getTime()/1000)
                    const response = await reqMatch(type,league_id,start)
                    this.fillDesc(response,'description')
                }
                // Data组件导航
                if(this.type === 'data'){
                    this.$store.dispatch('saveData',{data:{key:'dataIndex',value:index}})
                    const history_list = await reqHistory(+this.dataList[this.dataIndex].competition_id.slice(1))
                    this.$store.dispatch('saveData',{data:{key:'history_list',value:history_list}})
                    const season_id = history_list[0].season_id
                    this.$store.dispatch('saveData',{data:{key:'sessionId',value:season_id}})
                    const response = await reqSeason(season_id)
                    const season = response.content
                    this.$store.dispatch('saveData',{data:{key:'season',value:season}})
                }
                // Play组件导航
                if(this.type === 'play'){
                    const response = await reqGame(this.nav_list[this.selectIndex].channel_id)
                    if(response.code === 0){
                        this.$store.dispatch('saveData',{data:{key:'description',value:response.data}})
                    }
                }
            },
            // 整理比赛数据描述对象,参数为描述对象
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
            }
        },
        watch:{

        }
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

    .nav-bar
        position absolute
        left 0
        top 1.95rem
        z-index 1004
        height 1.6rem
        width 100%
        background-color #f7f7f7
        >ul
            display inline-block
            height 100%
            white-space nowrap
            padding 0 .2rem
            li
                display inline-block
                padding .2rem
                text-align center
                font-size .65rem
                color #555
            .current
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
</style>