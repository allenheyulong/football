<template>
    <!--球队榜-->
    <div class="cub-view">
        <div class="container">
            <div class="sub-list cal-wrapper">
                <div>
                    <div class="item" :class="{current:sub_list_index === index}" v-for="(item,index) in cub_type" :key="index" @click="subClick(index)">{{item.name}}</div>
                </div>
            </div>
            <div class="person-list cal-wrapper">
                <div>
                    <header>
                        <div v-for="(item,index) in header" :key="index">{{item}}</div>
                    </header>
                    <div class="wrapper">
                        <div class="item" v-for="(item,index) in cub_list" :key="index">
                            <div class="name-wrap">
                                <div class="rank">{{item.rank}}</div>
                                <div class="img-wrap">
                                    <img :src="item.team_logo" alt="">
                                    <div class="cub">{{item.team_name}}</div>
                                </div>
                            </div>
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
    import {reqCub} from '../../api'

    export default {
        data() {
            return {
                sub_list_index:0, // 左侧导航显示的索引
                header:[], // 内容区头部
                cub_list:[], // 球员或球队信息
            }
        },
        async created(){
            this.$store.dispatch('saveData',{data:{key:'season',value:''}})
            // 请求数据
            this.reqFC()
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
            // 请求球队榜具体数据
            async reqFC(){
                const response = await reqCub(this.sessionId,this.cub_type[this.sub_list_index].type)
                this.header = response.content.header
                this.cub_list = response.content.data
            },
            subClick(index){
                this.sub_list_index = index
                this.reqFC()
            }
        },
        computed:{
            ...mapState(['cub_type','sessionId'])
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../assets/css/mixins.styl"
    .cub-view
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
                            font-size .5rem
                            color #fff
                            &:first-child
                                width 80%
                            &:last-child
                                width 20%
                    .wrapper
                        .item
                            flex-center()
                            padding .2rem 0
                            font-size .55rem
                            color #fff
                            .name-wrap
                                display flex
                                width 80%
                                align-items center
                                padding-left .4rem
                                .rank
                                    width 10%
                                .img-wrap
                                    flex-center()
                                    margin-left .4rem
                                    >img
                                        width 1rem
                                        height 1rem
                                        margin-right .2rem
                                        border-radius 50%
                                    .cub
                                        flex-center()
                            .data
                                flex-center()
                                width 20%
</style>