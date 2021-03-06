/*
utils/timestamp.js
时间戳转时间字符串
@author haoyulong <haoyulong@haotang365.com.cn>

注意：时间戳为10位需*1000，时间戳为13位的话不需乘1000
*/
export default (timestamp) => {
    var date = new Date(timestamp); 
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    let strDate = Y + M + D + h + m + s;
    return strDate;
}
