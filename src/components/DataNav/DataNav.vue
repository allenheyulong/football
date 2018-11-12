<template>
    <!--数据导航，赛季，积分，球员榜，球队榜，赛程-->
    <div class="data-nav-view">
        <div class="year-wrap" @click="changeShow">
            <span class="title">{{nav_list[dataIndex].season.title}}</span>
            <span class="bg"></span>
        </div>
        <div class="content-wrap">
            <div class="item" :class="{current:selectIndex === index}" v-for="(item,index) in nav_list[dataIndex].sub_tabs" @click="handleClick(index)">{{item.title}}</div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import {reqFootballer,reqHistory,reqSeason,reqCubType,reqSchedule} from '../../api'
    import {calHeight,transLocal} from '../../assets/js/utils'

    export default {
        data() {
            return {
                selectIndex:0, // 控制导航显示
                season_id:'', // 赛季id
            }
        },
        props:{
            nav_list:Array,
            type:Number,
        },
        computed:{
            ...mapState(['dataIndex','dataList','sessionId']),
        },
        methods:{
            // 控制积分，球员榜导航的显示
            async handleClick(index){
                this.selectIndex = index
                this.$store.dispatch('saveData',{data:{key:'navIndex',value:index}})
                if(this.type === 1){
                    // 常规类型导航
                    switch (index){
                        case 0:
                            // 积分榜
                            this.reqScore()
                            break
                        case 1:
                            // 球员榜
                            this.reqMan()
                            break
                        case 2:
                            // 球队榜
                            this.reqFC()
                            break
                        case 3:
                            // 赛程
                            const response = await reqSchedule(this.sessionId)
                            response.content.matches.forEach((item) => {
                                const utc = new Date(item.start_play).getTime() / 1000
                                const _time = transLocal(utc)
                                item._time = _time
                            })
                            this.$store.dispatch('saveData',{data:{key:'schedule',value:response.content}})
                            this.$store.dispatch('saveData',{data:{key:'season',value:''}})
                            this.$store.dispatch('saveData',{data:{key:'person_type',value:''}})
                            this.$store.dispatch('saveData',{data:{key:'cub_type',value:''}})
                    }
                }
            },
            // 请求积分榜
            async reqScore(){
                const history_list = await reqHistory(+this.dataList[this.dataIndex].competition_id.slice(1))
                this.$store.dispatch('saveData',{data:{key:'history_list',value:history_list}})
                this.season_id = history_list[0].season_id
                const response = await reqSeason(this.season_id)
                const season = response.content
                this.$store.dispatch('saveData',{data:{key:'season',value:season}})
                this.$store.dispatch('saveData',{data:{key:'sessionId',value:this.season_id}})
                this.$store.dispatch('saveData',{data:{key:'person_type',value:''}})
                this.$store.dispatch('saveData',{data:{key:'cub_type',value:''}})
                this.$store.dispatch('saveData',{data:{key:'schedule',value:''}})
                calHeight(5)
            },
            // 请求球员榜
            async reqMan(){
                const response = await reqFootballer(this.sessionId)
                this.$store.dispatch('saveData',{data:{key:'person_type',value:response.content.data}})
                this.$store.dispatch('saveData',{data:{key:'season',value:''}})
                this.$store.dispatch('saveData',{data:{key:'cub_type',value:''}})
                this.$store.dispatch('saveData',{data:{key:'schedule',value:''}})
            },
            // 请求球队榜
            async reqFC(){
                const response = await reqCubType(this.sessionId)
                this.$store.dispatch('saveData',{data:{key:'season',value:''}})
                this.$store.dispatch('saveData',{data:{key:'person_type',value:''}})
                this.$store.dispatch('saveData',{data:{key:'schedule',value:''}})
                this.$store.dispatch('saveData',{data:{key:'cub_type',value:response.content.data}})
            },
            // 控制浮层的显示
            changeShow(){

            }
        },
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../assets/css/mixins.styl"
    .data-nav-view
        position absolute
        top 3.55rem
        left 0
        right 0
        z-index 1008
        background-color #333d46
        display flex
        justify-content space-between
        padding .2rem .4rem
        .year-wrap
            display flex
            align-items center
            span
                font-size .5rem
                color #939cad
            .bg
                margin 0 .1rem
                width-height(.5rem,.5rem)
                background url("./images/xiala.png") no-repeat center center
                background-size 100% 100%
        .content-wrap
            display flex
            border .025rem solid #1b1f25
            flex auto
            .item
                height 1rem
                border-right .05rem solid #1e2329
                border-radius .1rem
                flex-center()
                flex 1
                font-size .55rem
                color #939cad
                &::last-child
                    border-right none
            .current
                color #f2f2f2
                background-color #1e2329
</style>