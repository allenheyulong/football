<template>
    <!--重要比赛提示-->
    <div class="game-view">
        <div class="item" v-for="(item,index) in important" :key="index">
            <div class="header">
                <div class="type">{{item.match_title}}</div>
                <div class="status">{{item.status === 'Fixture' ? '未开始' : item.status === 'Played' ? '已结束' : '进行中'}}</div>
            </div>
            <div class="content">
                <div class="left">
                    <div class="team">
                        <div class="img-wrap">
                            <img :src="item.team_A_logo" alt="">
                            <div class="name">{{item.team_A_name}}</div>
                        </div>
                        <div v-if="item.status !== 'Fixture'">{{item.fs_A}}</div>
                    </div>
                    <div class="team">
                        <div class="img-wrap">
                            <img :src="item.team_B_logo" alt="">
                            <div class="name">{{item.team_B_name}}</div>
                        </div>
                        <div v-if="item.status !== 'Fixture'">{{item.fs_B}}</div>
                    </div>
                </div>
                <div class="right" v-if="item.status === 'Fixture'">
                    <div class="date">{{item._date}}</div>
                    <div class="time">{{item._time.hm}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            important:Array
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../assets/css/mixins.styl"

    .game-view
        display flex
        background-color #f7f7f7
        .item
            flex 1
            padding .4rem
            &:first-child
                border-right-1px(#eaeaea)
                box-sizing border-box
            .header
                display flex
                justify-content space-between
                border-bottom-1px(#eaeaea)
                padding-bottom .4rem
                .type
                    font-size .55rem
                    color #565656
                .status
                    font-size .5rem
                    color #7e7e7e
            .content
                display flex
                .left
                    flex auto
                    .team
                        display flex
                        align-items center
                        justify-content space-between
                        font-size .55rem
                        color #353535
                        padding .2rem 0
                        .img-wrap
                            display flex
                            align-items center
                            img
                                width 1rem
                                height 1rem
                                margin-right .2rem
                .right
                    flex auto
                    display flex
                    flex-direction column
                    align-items flex-end
                    justify-content center
                    font-size .55rem
                    color #262626
</style>