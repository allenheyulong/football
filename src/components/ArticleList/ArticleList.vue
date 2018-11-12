<template>
    <div class="article-list-view">
        <router-link tag="div" :to="{path:'/articles/' + item.id}" class="article-list-item" v-for="(item,index) in articles" :key="index">
            <div class="content-wrapper">
                <div class="img_container">
                    <div>
                        <img :src="item.thumb">
                    </div>
                </div>
                <div class="content">
                    <h2>{{item.title}}</h2>
                    <p v-if="item.description">{{item.description}}</p>
                    <footer>
                        <span>{{item.author?item.author.name:' '}}</span>
                        <span v-if="item.comments_total">{{item.comments_total}}评论</span>
                        <span v-if="item.answer_total">{{item.answer_total}}个回答</span>
                    </footer>
                </div>
            </div>
            <span class="tag"></span>
        </router-link>
    </div>
</template>

<script>
    export default {
        props:{
            articles:Array, // 文章列表数据
        },
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../assets/css/mixins.styl"
        .article-list-item
            position relative
            border-top-1px(#e9e9e9)
            padding .6rem
            background-color #f8f8f8
            .content-wrapper
                display flex
                .img_container
                    margin-right .6rem
                    >div
                        width-height(4.6rem,3.45rem)
                        >img
                            width-height(100%,100%)
                .content
                    flex auto
                    position relative
                    font-size .55rem
                    color #555
                    h2
                        font-size .62rem
                        letter-spacing .05rem
                        color black
                        font-weight 400
                    >footer
                        position absolute
                        bottom 0
                        left 0
                        right 0
                        display flex
                        justify-content space-between
            .tag
                position absolute
</style>