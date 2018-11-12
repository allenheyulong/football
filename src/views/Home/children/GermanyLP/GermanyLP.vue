<template>
    <!--德甲模块-->
    <div class="home-second-router">
        <ArticleList :articles="articles" />
    </div>
</template>

<script>
    import {reqHome} from '../../../../api'
    import ArticleList from '../../../../components/ArticleList/ArticleList'

    export default {
        data() {
            return {
                articles:[],
            }
        },
        async created(){
            const response = await reqHome('6')
            this.articles = response.articles
        },
        components:{ArticleList}
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>