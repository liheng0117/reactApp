import http from '../utils/http'
//  登录接口
export const getLogin=(value)=>{
    return http.post('http://api.baxiaobu.com/index.php/home/v1/login',value)
}
//  首页轮播图
export const getBanner=()=>{
    return http.get('http://vueshop.glbuys.com/api/home/index/slide?token=1ec949a15fb709370f')
}
//  首页导航
export const getNav=()=>{
    return http.get('http://vueshop.glbuys.com/api/home/index/nav?token=1ec949a15fb709370f')
}
// 首页商品
export const getList=()=>{
    return http.get('http://vueshop.glbuys.com/api/home/index/recom?token=1ec949a15fb709370f')
}
// 分类选项
export const getType=()=>{
    return http.get('http://vueshop.glbuys.com/api/home/category/menu?token=1ec949a15fb709370f')
}
// 分类商品
export const typeList=(cid)=>{
    return http.get('http://vueshop.glbuys.com/api/home/category/show?cid='+cid+'&token=1ec949a15fb709370f')
}


