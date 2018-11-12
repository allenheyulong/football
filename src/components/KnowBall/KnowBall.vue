<template>
    <!--懂球号模块-->
    <div class="know-ball-nav">
        <div class="top-wrap">
            <span>{{account_list.title}}</span>
            <span>{{account_list.jump_title}}</span>
        </div>
        <div class="bottom-wrap">
            <div class="item" v-for="(item,index) in account_list.list" :key="index">
                <div class="bg" :style="{'backgroundImage':'url(' + item.icon + ')'}"></div>
                <div class="text">{{item.name}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            account_list:Object,
        },
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .know-ball-nav
        margin .1rem 0
        padding .4rem
        background-color #f7f7f7
        .top-wrap
            display flex
            padding-right .6rem
            justify-content space-between
            font-size .55rem
            color #555
        .bottom-wrap
            display flex
            .item
                display flex
                flex 1
                flex-direction column
                align-items center
            .bg
                border-radius 50%
                background-repeat no-repeat
                background-size 100% 100%
                background-position center center
                margin .2rem 0
                height 1.6rem
                width 1.6rem
            .text
                font-size .45rem
                color #555
                text-align center
                letter-spacing .05rem
</style>