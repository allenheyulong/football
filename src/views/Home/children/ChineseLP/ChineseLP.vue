<template>
    <!--中超板块-->
    <div class="home-second-router">
        <LPBar :topics="topics" type="1" />
        <ArticleList :articles="articles" />
    </div>
</template>

<script>
    import {reqHome} from '../../../../api'
    import LPBar from '../../../../components/LPBar/LPBar'
    import ArticleList from '../../../../components/ArticleList/ArticleList'

    export default {
        data(){
            return {
                topics:{}, // 导航描述对象
                articles:[], // 文章列表
            }
        },
        async created(){
            const response = await reqHome('56')
            const {articles,topics} = response
            this.articles = articles
            this.topics = topics
        },
        components:{LPBar,ArticleList}
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>