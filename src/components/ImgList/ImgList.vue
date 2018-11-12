<template>
    <div class="img-view">
        <div class="column-wrap" v-if="type === 3">
            <img :src="item.img_url" alt="" v-for="(item,index) in img_list" :key="index">
        </div>
        <div class="hex-wrap" v-if="type === 1">
            <header>
                <div class="title">{{title}}</div>
                <div class="bg"></div>
            </header>
            <div class="img-wrap">
                <img :src="item.img_url" alt="" v-for="(item,index) in img_list" :key="index">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            type:Number,
            img_list:Array,
            title:String,
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .img-view
        padding .4rem
        margin-bottom .2rem
        .column-wrap
            img
                width 100%
        .hex-wrap
            background-color #fff
            img
                width 50%
        .hex-wrap
            background-color #fff
            >header
                display flex
                height 1.2rem
                padding .2rem 0
                justify-content center
                align-items center
                .title
                    font-size .8rem
                    color #333
                .bg
                    margin-left .2rem
                    width .5rem
                    height .5rem
                    background-image url("./images/right.png")
                    background-repeat no-repeat
                    background-position center center
                    background-size 100% 100%
</style>