<template>
    <!--国际模块-->
    <div class="home-second-router">
        <LPBar type="1" :topics="topics" />
        <ArticleList :articles="articles" />
    </div>
</template>

<script>
    import {reqHome} from '../../../../api'
    import LPBar from '../../../../components/LPBar/LPBar'
    import ArticleList from '../../../../components/ArticleList/ArticleList'

    export default {
        data() {
            return {
                articles:[],
                topics:{}
            }
        },
        async created(){
            const response = await reqHome('120')
            const {articles,topics} = response
            this.topics = topics
            this.articles = articles
        },
        components:{LPBar,ArticleList}
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>