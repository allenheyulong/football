<template>
    <!--足彩板块-->
    <div class="home-second-router">
        <LPBar type="2" :topics="topics" />
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
                topics:{}, //描述对象
                articles:[], //文章列表
            }
        },
        async created(){
            const response = await reqHome('58')
            const {menus,articles} = response
            this.topics = menus
            this.articles = articles
        },
        components:{ArticleList,LPBar}
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>