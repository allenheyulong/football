/*请求函数模块*/
import ajax from "./ajax";

// 请求常用参数
const mark = 'gif'
const platform = 'iphone'
const version = '606'
const new_video = '1'
const app = 'dqd'
const action = 'fresh'
const offset = '1'

/*请求首页导航数据*/
export const reqHomeNav = () => ajax('/api/v2/config/index_menu',{mark,platform,version})

/*请求比赛页面导航数据*/
export const reqMatchNav = () => ajax('/api/v2/config/match_menu',{mark,platform,version})

/*数据页面导航*/
export const reqDataNav = () => ajax('/api/v2/config/data_menu',{mark,platform,version})

/*请求侧面导航数据*/
export const reqSide = () => ajax('/api/app/global/2/iphone.json',{mark,platform,version})

/*首页主要内容数据（包含轮播）*/
export const reqHome = (id) => {
    if(+id === 101){
        return ajax('/feed/tab/tab_index',{new_video,version})
    }else if(+id === 111){
        return ajax('/ask/app/ask/hotList',{version})
    }else if(+id === 99){
        return ajax('/api/app/tabs/iphone/classifications.json',{version})
    }
    return ajax('/api/app/tabs/iphone/' + id + '.json',{mark,version})
}

/*请求首页上拉刷新、下拉加载数据*/
export const reqHomePull = (id) => {
    if(id === 101){
        // 处理懂球号特殊接口，该接口没有对应的刷新接口 -.-
        return ajax('/feed/tab/tab_index',{new_video,version})
    }
    return ajax('/api/app/tabs/iphone/' + id +'.json',{action,mark,version,from:'tab_' + id})
}

/*首页上拉加载*/
export const reqHomeUp = (id,after,page) => {
    return ajax('/api/app/tabs/iphone/' + id + '.json',{after,page,mark,version,from:'tab_' + id})
}

/*首页重要比赛*/
export const reqImportant = () => ajax('/api/data/new_index',{platform,version})


/*比赛页面数据*/
export const reqMatch = (type,league_id,start,init=1) => {
    if(type === 'league'){
        // 各大联赛接口
        return ajax('/api/data/tab/league/new/' + league_id,{start,init})
    }else if(type === 'favor'){
        return ajax('/api/data/tab/fav_new')
    }
    return ajax('/api/data/tab/new/' + type,{start,init})
}

/*请求圈子论坛数据*/
export const reqForum = () => ajax('/api/leagues/show')

/*圈子精华数据*/
export const reqEssence = () => ajax('/group/group/getFeatured')

export const nextEssence = (page) => ajax('/group/group/getFeatured',{page})

/*请求精华模块帖子的详细信息*/
export const reqTopics = (id) => ajax('/api/topics/' + id)

/*请求数据页面历年赛季数据*/
export const reqHistory = (competition_id) => ajax('/sport/soccer/biz/data/seasons',{competition_id,app,version,platform:'ios'})

/*请求赛季数据*/
export const reqSeason = (season_id) => ajax('/sport/soccer/biz/data/standing',{season_id,app,version,platform:'ios'})

/*请求球员榜数据(具体分类)*/
export const reqFootballer = (season_id) => ajax('/sport/soccer/biz/data/ranking/person',{season_id,app,version,platform:'ios',type:'person'})

/*请求球员榜具体数据*/
export const reqPersonData = (season_id,type) => ajax('/sport/soccer/biz/data/person_ranking',{app,version,platform:'ios',season_id,type})

/*请求球队榜数据（具体分类）*/
export const reqCubType = (season_id) => ajax('/sport/soccer/biz/data/ranking/team',{season_id,app,version,platform:'ios',type:'team'})

/*请求球队榜具体数据*/
export const reqCub = (season_id,type) => ajax('/sport/soccer/biz/data/team_ranking',{app,version,platform:'ios',type,season_id})

/*请求赛程数据*/
export const reqSchedule = (season_id) => ajax('/sport/soccer/biz/data/schedule',{season_id,app,version,platform:'ios'})

/*请求上下轮次数据*/
export const reqTurn = (season_id,round_id,gameweek) => ajax('/sport/soccer/biz/data/schedule',{season_id,round_id,gameweek,app,platform:'ios',version})

/*商城首页主要数据*/
export const reqMall = () => ajax('/mall/api/index_new',{version})

/*请求商城热搜关键字*/
export const reqHotWord = () => ajax('/api/search/default/hot_keywords',{type:'product'})

/*请求商城大家都在搜的关键词*/
export const reqWordList = () => ajax('/api/search/hot_keywords',{type:'product'})

/*请求商城热门推荐*/
export const reqMallRecommend = () => ajax('/mall/api/recommends')

/*请求商城搜索尺码*/
export const reqSize = () => ajax('/mall/api/search_keyword')

/*请求商品数据*/
export const reqCommodity = (keywords,page,order,sort) => ajax('/api/search',{keywords,type:'product',page,order,sort})

/*请求某专题模块数据*/
export const reqFeatures = (page,order,sort) => ajax('/mall/api/page/' + page,{order,sort})

/*请求热门推荐下一批数据*/
export const reqNextRecommend = (next) => ajax('/mall/api/recommends',{next})

/*商城商品分类*/
export const reqCategory = () => ajax('/mall/api/all_categorys',{version})

/*请求文章页面html*/
export const reqArtHTML = (id) => ajax('/api/article/' + id + '.html')

/*请求游戏模块导航*/
export const reqGameNav = () => ajax('/game/app/start')

/*请求游戏模块数据*/
export const reqGame = (id) => ajax('/game/channel/list',{id})

/*游戏模块上拉加载*/
export const reqGameUp = (id,start) => ajax('/game/channel/list',{id,start,offset})