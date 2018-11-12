<template>
    <div class="cub-list-view">
        <header class="item-wrap">
            <div class="title" v-for="(item,index) in header" :key="index">{{item}}</div>
        </header>
        <div class="content">
            <div class="item-wrap" :class="{'top':top > index}" v-for="(item,index) in season_data">
                <div class="cub-name">
                    <div class="race">{{index+1}}</div>
                    <div class="name">
                        <img :src="item.team_logo" alt="">
                        <span>{{item.team_name}}</span>
                    </div>
                </div>
                <div class="times">{{item.matches_total}}</div>
                <div class="win">{{item.matches_won}}</div>
                <div class="equal">{{item.matches_draw}}</div>
                <div class="lose">{{item.matches_lost}}</div>
                <div class="goal">{{item.goals_pro}}/{{item.goals_against}}</div>
                <div class="score">{{item.points}}</div>
            </div>
        </div>
        <div class="description" v-html="desc"></div>
    </div>
</template>

<script>

    export default {
        props:{
            header:Array, // 头部列表
            season_data:Array, // 俱乐部赛季数据
            desc:String, // 规则描述
            top:Number,
            end:Number,
        },
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../assets/css/mixins.styl"
    .cub-list-view
        >header
            display flex
            padding .2rem
            background-color #404c58
            border-bottom-1px(#2a343d)
            .title
                font-size .55rem
                color #f8f7f6
                width 10%
                text-align center
                &:first-child
                    width 40%
        .content
            .item-wrap
                display flex
                padding .4rem
                align-items center
                border-bottom-1px(#2a343d)
                >div
                    font-size .55rem
                    color #fff
                    width 10%
                    text-align center
                .cub-name
                    display flex
                    width 40%
                    .race
                        width 10%
                        display flex
                        align-items center
                        font-size .55rem
                        color #fff
                        margin-right .2rem
                    .name
                        display flex
                        align-items center
                        >img
                            width 1rem
                            height 1rem
                            margin-right .2rem
                        >span
                            font-size .55rem
                            color #fff
            .top
                background-color #16b13b
        .description
            white-space pre-wrap
            padding .4rem
            font-size .55rem
            color #939cac
</style>