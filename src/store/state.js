
export default {
    description:{}, // 数据描述对象
    N_description:{}, // 下一个描述对象，用于延迟加载数据
    B_description:{}, // 上一个描述对象，用于延迟加载数据
    selectIndex:'', // 应用导航条当前显示的索引，用于控制动画
    recommendShow:true, // 走马灯，默认显示
    isSide:false, // 控制主页是否模糊
    dataIndex:0, // data页面显示的模块索引
    dataList:[], // 数据页面对象
    history_list:[], // 历史赛季数据
    showHistory:false, // 控制数据页面浮层显示
    season:'', // 赛季数据对象
    sessionId:'', // 赛季id(season不小心打错了,懒得改了)
    navIndex:0, // 数据页面小导航显示的索引
    person_type:'', // 球员榜分类数据
    cub_type:'', // 球队榜分类数据
    schedule:'', // 赛程描述对象
}