<template>
    <div class="data-view">
        <Header type="1" >
            <div class="title" slot="title">数据</div>
            <div slot="right"></div>
        </Header>
        <NavBar :nav_list="nav_list" :default_index="0" type="data" />
        <DataNav v-if="nav_list.length" :nav_list="nav_list" :type="type" />
        <div class="data-content cal-wrapper" v-if="season">
            <div class="data-wrap">
                <!--积分数据列表-->
                <CubList v-if="season" :header="header" :season_data="season_data" :desc="desc" :top="3" />
            </div>
        </div>
        <!--球员榜-->
        <Person v-if="person_type" />
        <!--球队榜-->
        <Cub v-if="cub_type" />
        <!--赛程-->
        <Schedule v-if="schedule" />
        <div class="history" v-if="showHistory">
            <div class="content wheel-scroller">
                <div class="item wheel-item" v-for="(item,index) in history_list" :key="item.season_id">{{item.season_name}}</div>
            </div>
            <div class="footer">
                <div>取消</div>
                <div class="confirm">确定</div>
            </div>
        </div>
        <Footer type="normal" />
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import BScroll from 'better-scroll'
    import {reqDataNav,reqHistory,reqSeason} from '../../api'
    import {calHeight} from '../../assets/js/utils'
    import Header from '../../components/Header/Header'
    import NavBar from '../../components/NavBar/NavBar'
    import DataNav from '../../components/DataNav/DataNav'
    import CubList from '../../components/CubList/CubList'
    import Person from '../../components/Person/Person'
    import Schedule from '../../components/Schedule/Schedule'
    import Cub from '../../components/Cub/Cub'
    import Footer from '../../components/Footer/Footer'

    export default {
        data(){
            return {
                nav_list:[],
                selectedIndex:0, // 浮层选择的索引，默认为0
                season_id:'', // 赛季id
            }
        },
        async created(){
            this.$store.dispatch('saveData',{data:{key:'selectIndex',value:0}})
            // 获取导航信息(所有联赛模块),整理成数组(元素就是一个联赛的描述对象),并保存在vuex中
            const navResponse = await reqDataNav()
            if(navResponse.errCode === 0){
                navResponse.data.list.forEach(item => {
                    item.data.forEach(i => {
                        this.nav_list.push(i)
                    })
                })
                this.$store.dispatch('saveData',{data:{key:'dataList',value:this.nav_list}})
            }
            // 默认显示积分页面
            // 请求历史赛季数据，主要是要拿到默认赛季的id(season_id),拿到id后才能请求积分数据
            const history_list = await reqHistory(+this.nav_list[this.dataIndex].competition_id.slice(1))
            this.$store.dispatch('saveData',{data:{key:'history_list',value:history_list}})
            this.season_id = history_list[0].season_id
            const response = await reqSeason(this.season_id)
            const season = response.content
            this.$store.dispatch('saveData',{data:{key:'season',value:season}})
            this.$store.dispatch('saveData',{data:{key:'sessionId',value:this.season_id}})
        },
        mounted(){

        },
        computed:{
            ...mapState(['showHistory','dataIndex','dataList','season','history_list','person_type','cub_type','schedule']),
            header(){
                if(this.season){
                    return this.season.rounds[0].content.header
                }
            },
            desc(){
                if(this.season){
                    return this.season.description
                }
            },
            season_data(){
                if(this.season && this.season.rounds.length){
                    return this.season.rounds[0].content.data
                }
            },
            // 小导航的类型
            type(){
                if(this.dataList){
                    let str = ''
                    const {sub_tabs} = this.dataList[this.dataIndex]
                    sub_tabs.forEach(item => {
                        str += item.title
                    })
                    if(str === '积分球员榜球队榜赛程'){
                        // 常规联赛
                        return 1
                    }else if(str === '积分射手榜助攻榜赛程'){
                        // 亚青U19
                        return 2
                    }else if(str === '积分射手榜赛程'){
                        // 杯赛
                        return 3
                    }else if(str === '国家队俱乐部球员'){
                        return 4
                    }else if(str === '国家队俱乐部'){
                        return 5
                    }else if(str === '积分'){
                        return 6
                    }
                }
            }
        },
        watch:{
            season(){
                if(this.season){
                    this.$nextTick(() => {
                        calHeight(5)
                        new BScroll('.data-content',{
                            scrollY:true,
                            click:true,
                        })
                    })
                }
                return this.season
            }
        },
        components:{Header,NavBar,Footer,DataNav,CubList,Person,Cub,Schedule}
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../assets/css/mixins.styl"

    .data-view
        padding-top 5rem
        background-color #333d46
        .data-content
            .data-wrap
                padding-bottom 2.2rem
        .history
            position fixed
            left 0
            right 0
            bottom 0
            top 52%
            z-index 1005
            background-color #fff
            .content
                .item
                    display flex
                    justify-content center
                    align-items center
                    font-size .8rem
                    padding .4rem 0
                    color #373737
                .current
                    background-color #d1eed8
            .footer
                display flex
                position absolute
                left 0
                right 0
                bottom 0
                top 85%
                background-color #f5f5f5
                border-top .01rem solid #dadada
                div
                    display flex
                    flex 1
                    align-items center
                    justify-content center
                    text-align center
                    font-size .7rem
                    color #686868
                .confirm
                    box-sizing border-box
                    color #16b13b
                    border-left .01rem solid #dadada
</style>