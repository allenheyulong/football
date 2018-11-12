<template>
    <!--球员榜-->
    <div class="person-view">
        <div class="container">
            <div class="sub-list cal-wrapper">
                <div>
                    <div class="item" :class="{current:sub_list_index === index}" v-for="(item,index) in person_type" :key="index" @click="subClick(index)">{{item.name}}</div>
                </div>
            </div>
            <div class="person-list cal-wrapper">
                <div>
                    <header>
                        <div v-for="(item,index) in header" :key="index">{{item}}</div>
                    </header>
                    <div class="wrapper">
                        <div class="item" v-for="(item,index) in person_list" :key="index">
                            <div class="name-wrap">
                                <div class="rank">{{item.rank}}</div>
                                <div class="img-wrap">
                                    <img :src="item.person_logo" alt="">
                                    <span>{{item.person_name}}</span>
                                </div>
                            </div>
                            <div class="cub">{{item.team_name}}</div>
                            <div class="data">{{item.count}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import {mapState} from 'vuex'
    import {calHeight} from '../../assets/js/utils'
    import {reqPersonData} from '../../api'

    export default {
        data() {
            return {
                sub_list_index:0, // 左侧导航显示的索引
                header:[], // 内容区头部
                person_list:[], // 球员或球队信息
            }
        },
        async created(){
            this.$store.dispatch('saveData',{data:{key:'season',value:''}})
            // 请求数据
            this.reqMan()
        },
        mounted(){
            this.$nextTick(() => {
                calHeight(5)
                new BScroll('.sub-list',{
                    scrollY:true,
                    click:true
                })
                new BScroll('.person-list',{
                    scrollY:true,
                    click:true
                })
            })
        },
        methods:{
            // 请求球员榜数据
            async reqMan(){
                const response = await reqPersonData(this.sessionId,this.person_type[this.sub_list_index].type)
                this.header = response.content.header
                this.person_list = response.content.data
            },
            subClick(index){
                this.sub_list_index = index
                this.reqMan(this.sessionId,this.person_type[this.sub_list_index].type)
            }
        },
        computed:{
            ...mapState(['person_type','sessionId'])
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../assets/css/mixins.styl"
    .person-view
        .container
            display flex
            .sub-list
                width 20%
                >div
                    padding-bottom 2.2rem
                .item
                    padding .4rem 0
                    background-color #252e35
                    color #909dab
                    font-size .6rem
                    flex-center()
                .current
                    background-color #16b13b
                    color #fff
            .person-list
                flex auto
                >div
                    padding-bottom 2.2rem
                    >header
                        display flex
                        width 100%
                        padding .2rem 0
                        background-color #404c58
                        >div
                            flex-center()
                            flex auto
                            font-size .5rem
                            color #fff
                            &:first-child
                                width 50%
                            &:nth-child(2)
                                width 30%
                            &:last-child
                                width 20%
                    .wrapper
                        .item
                            display flex
                            align-items center
                            padding .2rem 0
                            font-size .55rem
                            color #fff
                            .name-wrap
                                width 50%
                                display flex
                                align-items center
                                padding-left .4rem
                                .rank
                                    width 10%
                                .img-wrap
                                    display flex
                                    align-items center
                                    margin-left .4rem
                                    ellipse()
                                    >img
                                        width 1rem
                                        height 1rem
                                        margin-right .2rem
                                        border-radius 50%
                                    >span
                                        display inline-block
                                        ellipse()
                            .cub
                                flex-center()
                                width 30%
                            .data
                                width 20%
                                flex-center()
</style>