<template>
    <!--赛程-->
    <div class="schedule-view">
        <header>
            <div class="header-item" @click="prevTurn">
                <div class="left bg" v-if="index !== 1"></div>
                <div class="text" v-if="index !== 1">上一轮</div>
            </div>
            <div class="header-item">
                <div class="text">{{current}}</div>
                <div class="bottom bg"></div>
            </div>
            <div class="header-item" @click="nextTurn">
                <div class="text" v-if="index !== length">下一轮</div>
                <div class="right bg" v-if="index !== length"></div>
            </div>
        </header>
        <div class="content">
            <div class="item" v-for="(item,index) in schedule.matches" :key="index">
                <div class="time-wrap">{{item._time.md}} {{item._time.hm}}</div>
                <div class="games">
                    <div class="team-a">
                        <span>{{item.team_A_name}}</span>
                        <img :src="item.team_A_logo" alt="">
                    </div>
                    <div class="vs" v-if="item.status === 'Fixture'">VS</div>
                    <div class="score" v-if="item.status === 'Played'">{{item.score_A}}:{{item.score_B}}</div>
                    <div class="team-b">
                        <img :src="item.team_B_logo" alt="">
                        <span>{{item.team_B_name}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import {reqTurn} from '../../api'
    import {requireRound,transLocal} from '../../assets/js/utils'

    export default {
        data() {
            return {
                current:'',
                index:'', // 当前轮次
                round_id:'', // 轮次id
            }
        },
        created(){
            this.schedule.rounds.forEach((item,index) => {
                if(item.current){
                    this.current = item.name
                    this.index = index + 1
                }
            })
            this.round_id = requireRound(this.schedule.rounds[0].url)
        },
        methods:{
            prevTurn(){
                if(this.index !== 1){
                    this.index--
                    this.handleTurn()
                }
            },
            nextTurn(){
                if(this.index !== this.schedule.rounds.length){
                    this.index++
                    this.handleTurn()
                }
            },
            async handleTurn(){
                const response = await reqTurn(this.sessionId,this.round_id,this.index)
                response.content.matches.forEach((item) => {
                    const utc = new Date(item.start_play).getTime() / 1000
                    const _time = transLocal(utc)
                    item._time = _time
                })
                this.$store.dispatch('saveData',{data:{key:'schedule',value:response.content}})
                this.schedule.rounds.forEach((item,index) => {
                    if(item.current){
                        this.current = item.name
                        this.index = index + 1
                    }
                })
            }
        },
        computed:{
            ...mapState(['schedule','sessionId']),
            length(){
                return this.schedule.rounds.length
            }
        },
        watch:{

        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../assets/css/mixins.styl"
    .schedule-view
        >header
            display flex
            height 1.6rem
            background-color #404c58
            .header-item
                flex-center()
                flex 1
                font-size .55rem
                color #fff
                .bg
                    width .4rem
                    height .4rem
                    background-repeat no-repeat
                    background-size 100% 100%
                    background-position center center
                .left
                    background-image url("./images/left.png")
                    margin-right .2rem
                .bottom
                    background-image url("./images/bottom.png")
                    margin-left .2rem
                .right
                    background-image url("./images/right.png")
                    margin-left .2rem
        .content
            position absolute
            top 6.6rem
            left 0
            right 0
            bottom 2.2rem
            background-color #333d46
            .item
                display flex
                height 1.98rem
                border-bottom-1px(#2a343d)
                .time-wrap
                    display flex
                    align-items center
                    padding-left .4rem
                    width 30%
                    font-size .4rem
                    color #9aa3b3
                .games
                    display flex
                    flex auto
                    line-height 1.98rem
                    font-size .5rem
                    letter-spacing .01rem
                    color #fff
                    .team-a,.team-b
                        width 45%
                    .team-a
                        text-align right
                    .team
                        text-align left
                    .vs,.score
                        width 10%
                        text-align center
                    img
                        vertical-align middle
                        width 1rem
                        height 1rem
                        margin 0 .2rem

</style>