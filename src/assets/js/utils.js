/*工具函数模块*/

/*用于计算容器高度以实现垂直滑动*/
/*实现原理：屏幕高度 - 头部固定高度 前提：该容器必须有与底部等高的下内边距,容器类名为cal-wrapper*/
// 参数：topHeight 头部固定高度，单位rem
export function calHeight(topHeight) {
    const height = document.documentElement.clientHeight
    const result = height - (document.documentElement.clientWidth / 16) * topHeight
    const wrapper = document.getElementsByClassName('cal-wrapper')
    if(wrapper.length){
        for(let i = 0;i<wrapper.length;i++){
            wrapper[i].style.height = result + 'px'
        }
    }
}

export function calWidth(selector,count) {
    const wrap = document.querySelector(selector)
    if(wrap){
        wrap.style.width = document.documentElement.clientWidth * count + 'px'
    }
}


/*根据一个完整的url抽取出query字符串里面的round_id字段*/
export function requireRound(url) {
    const reg = /round_id=(.*?)&/
    return url.match(reg)[1]
}

export function requireStart(url) {
    const reg = /start=(.*?)&/
    return url.match(reg)[1]
}

/*将伪数组转化为真数组*/
export function transToArr(arr) {
    return Array.from(arr)
}

/*获取当前时间,并且以格式 YYYY-MM-DDHH:mm:ss返回,用于请求比赛数据*/
export function currentTime() {
    let date = new Date().getTime()
    const day = new Date(date)
    const year = day.getFullYear()
    let month = (day.getMonth() + 1) / 10 < 1 ? '0' + day.getMonth() + 1 : day.getMonth() + 1
    let _day = day.getDate() / 10 < 1 ? '0' + day.getDate() : day.getDate()
    let hours = day.getHours() / 10 < 1 ? '0' + day.getHours() : day.getHours()
    let minutes = day.getMinutes() / 10 < 1 ? '0' + day.getMinutes() : day.getMinutes()
    let seconds = day.getSeconds() / 10 < 1 ? '0' + day.getSeconds() : day.getSeconds()
    date =  year + '-' + month + '-' + _day + '' + hours + ':' + minutes + ':' + seconds
    return date
}

/*将UTC转化为本地时间, utc为时间戳，单位s,返回对象{ymd:年月日,md:月日,hm:时分}*/
export function transLocal(utc) {
    const ut = utc * 1000 + 8 * 60 * 60 * 1000
    const date = new Date(ut)
    const year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    if(month /10 < 1){
        month = '0' + month
    }
    if(day / 10 < 1){
        day = '0' + day
    }
    const ymd = year + '-' + month + '-' + day
    const md = month + '-' + day
    let hours = date.getHours()
    let minutes = date.getMinutes()
    if(hours / 10 < 1){
        hours = '0' + hours
    }
    if(minutes / 10 < 1){
        minutes = '0' + minutes
    }
    const hm = hours + ':' + minutes
    return {ymd,md,hm}
}
