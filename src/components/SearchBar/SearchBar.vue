<template>
    <!--搜索条-->
    <form action="#" class="search-form">
        <router-link class="container" tag="div" :to="{path:'/search/0'}">
            <span class="iconfont icon-sousuo"></span>
            <input type="text" :placeholder="hotwords" />
        </router-link>
    </form>
</template>

<script>
    export default {
        props:{
            hotwords:String, // 热搜关键字
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .search-form
        padding .2rem 0
        background-color #ebebeb
        .container
            width 90%
            margin 0 auto
            border-radius 0.015rem
            background-color #fafafa
            padding-left .2rem
            font-size .75rem
            line-height 1rem
            .iconfont
                display inline-block
            input
                box-sizing border-box
                width 90%
                border none
                padding 0 .2rem
</style>