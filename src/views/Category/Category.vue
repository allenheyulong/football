<template>
    <!--商城商品分类模块-->
    <div class="category-view">
        <Header type="2">
            <span class="title" slot="title">全部分类</span>
            <span slot="right"></span>
        </Header>
        <SearchBar v-if="hotwords" :hotwords="hotwords" />
        <div class="content">
            <div class="slide">
                <div class="item" :class="{current:selectIndex === index}" v-for="(item,index) in category" :key="index" @click="handleClick(index)">{{item.title}}</div>
            </div>
            <div class="main">
                <div class="wrap" v-if="category">
                    <div class="item" v-for="(item,index) in category[selectIndex].customs" :key="index">
                        <div class="img-wrap">
                            <img :src="item.img_url" alt="">
                        </div>
                        <div class="text">{{item.title}}</div>
                    </div>
                </div>
            </div>
        </div>
        <Footer type="mall"/>
    </div>
</template>

<script>
    import {reqHotWord,reqCategory} from '../../api'
    import Header from '../../components/Header/Header'
    import SearchBar from '../../components/SearchBar/SearchBar'
    import Footer from '../../components/Footer/Footer'

    export default {
        data() {
            return {
                hotwords:'',
                category:'',
                selectIndex:0, //显示项目，默认显示第一个
            }
        },
        async created(){
            this.getHotWord()
            this.category = await reqCategory()
        },
        methods:{
            async getHotWord(){
                const response = await reqHotWord()
                this.hotwords = response.keyword
            },
            handleClick(index){
                this.selectIndex = index
            }
        },
        components:{Header,Footer,SearchBar}
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../assets/css/mixins.styl"
    .category-view
        padding-top 1.95rem
        .content
            display flex
            .slide
                width 25%
                padding-top .4rem
                .item
                    flex-center()
                    font-size .55rem
                    color #545454
                    line-height 2rem
                .current
                    box-sizing border-box
                    border-left .1rem solid #16b13b
                    background-color #f7f7f7
                    color #16b13b
                    font-weight bold
            .main
                flex 75%
                .wrap
                    display flex
                    flex-wrap wrap
                    align-items center
                    .item
                        width 33.333%
                        display flex
                        flex-direction column
                        align-items center
                        justify-content center
                        padding .6rem 0
                        .img-wrap
                            flex-center()
                            width 60%
                            padding .2rem 0
                            border-1px(#e8e8e8)
                            border-radius 50%
                            >img
                                width-height(1.8rem,2rem)

                        .text
                            font-size .55rem
                            color #323232
</style>