<template>
    <!--热门板块-->
    <div>
        <div class="home-content">
            <div>
                <div class="content" v-for="(day,index) in dayList" :key="index">
                    <h3>{{day.day}}</h3>
                    <ArticleList :articles="day.articles" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ArticleList from '../ArticleList/ArticleList'

    export default {
        props:{
            dayList:Array,
        },
        components:{ArticleList}
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .content
        h3
            height 1.3rem
            line-height 1.3rem
            font-size .7rem
            color #16b13b
            text-align center
            font-weight 500
            background-color #e9e9e9
</style>