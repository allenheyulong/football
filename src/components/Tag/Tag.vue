<template>
    <div class="tag-view">
        <div class="wrap">
            <div class="item" v-for="(item,index) in tag" :key="index">
                <img :src="item.icon" alt="">
                <div class="title">{{item.title}}</div>
                <div class="comment">{{item.comment}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            tag:Array,
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../assets/css/mixins.styl"

    .tag-view
        background-color #f7f7f7
        margin-bottom .4rem
        .wrap
            display flex
            .item
                flex 1
                border-right-1px(#e9e9e9)
                text-align center
                padding .4rem 0
                &:last-child
                    border none
                >img
                    width 1rem
                    height 1rem
                >div
                    text-align center
                .title
                    font-size .7rem
                    color #333
                .comment
                    font-size .55rem
                    color #888
</style>