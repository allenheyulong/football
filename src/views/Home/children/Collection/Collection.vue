<template>
    <div class="home-second-router">
        <LPBar type="2" :topics="topics" />
        <ArticleList :articles="articles" />
    </div>
</template>

<script>
    import {reqHome} from '../../../../api'
    import ArticleList from '../../../../components/ArticleList/ArticleList'
    import LPBar from '../../../../components/LPBar/LPBar'

    export default {
        data() {
            return {
                topics:{},
                articles:[]
            }
        },
        async created(){
            const response = await reqHome('11')
            const {articles,menus} = response
            this.articles = articles
            this.topics = menus
        },
        components:{LPBar,ArticleList}
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>