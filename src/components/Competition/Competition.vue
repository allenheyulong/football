<template>
    <!--比赛数据容器-->
    <div class="competition-view">
        <div class="day-wrap" v-for="(item,index) in description.list" :key="index">
            <h3>{{item[0]._time.ymd}}</h3>
            <div class="item-container">
                <div class="item" v-for="(game,index) in item" :key="index">
                    <div class="img-wrap">
                        <img :src="game.team_A_logo" alt="">
                        <div class="text">{{game.team_A_name}}</div>
                    </div>
                    <div class="content-wrap">
                        <div class="text">{{game._time.hm}} {{game.match_title}}</div>
                        <div class="score" v-if="game.status === 'Played'">{{game.fs_A}} - {{game.fs_B}}</div>
                        <div class="bg" v-if="game.status === 'Fixture'"></div>
                        <div class="end" v-if="game.status === 'Played'">已结束</div>
                        <div class="end" v-else>{{game.TVList}}</div>
                    </div>
                    <div class="img-wrap">
                        <img :src="game.team_B_logo" alt="">
                        <div class="text">{{game.team_B_name}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        props:{
            description:Object,
        },
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../assets/css/mixins.styl"
    .competition-view
        width 16rem
        .day-wrap
            h3
                line-height 1.6rem
                height 1.6rem
                font-size .55rem
                color #555
                background-color #e9e9e9
                text-align center
                font-weight 600
            .item-container
                background-color #f7f7f7
                .item
                    display flex
                    padding .4rem 0
                    border-bottom-1px(#e7e7e7)
                    >div
                        width 33.33%
                    img
                        width 40%
                        height 60%
                    .img-wrap
                        display flex
                        flex-direction column
                        justify-content center
                        align-items center
                        .text
                            margin-top .1rem
                            font-size .5rem
                            color #343434
                    .content-wrap
                        display flex
                        flex-direction column
                        .text
                            align-self center
                            white-space nowrap
                            font-size .4rem
                            color #888
                        .bg
                            align-self center
                            width 1.8rem
                            height 1.8rem
                            background-image url("./images/bg.png")
                            background-position center center
                            background-repeat no-repeat
                            background-size 100% 100%
                        .score
                            text-align center
                            font-size .8rem
                            color #888
                            margin .2rem 0
                        .end
                            font-size .3rem
                            text-align center
                            color #343434
                            ellipse()
</style>