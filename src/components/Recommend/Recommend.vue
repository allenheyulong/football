<template>
    <div class="recommend-view">
        <header>{{recommends.title}}</header>
        <Commodity :commodity_list="recommends.list"></Commodity>
    </div>
</template>

<script>
    import Commodity from '../Commodity/Commodity'

    export default {
        props:{
            recommends:Object, // 推荐描述对象
        },
        components:{Commodity}
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../assets/css/mixins.styl"

    .recommend-view
        background-color #fff
        >header
            padding-top .4rem
            height 1.2rem
            font-size .8rem
            color #333
            text-align center
</style>