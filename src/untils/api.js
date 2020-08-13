import axios from './fetch';
// 首页商品列表 { page, size }
export function fetchGoodsList(params){
    return axios({
        url:'/goods/cms/getCateGoods',
        method:'get',
        params
    })
} 

// 获取商品详情 { good_id }
export function fetchGoodDetail(data){
    return axios({
        url:'/goods/cms/getGoodDetail',
        method:'post',
        data
    })
} 


// 注册 {username, password, password2 }
export function fetchRegist(data) {
    return axios({
        url: '/users/shop/regist',
        method: 'POST',
        data
    })
}

// 登录 {username, password }
export function fetchLogin(data) {
    return axios({
        url: '/users/shop/login',
        method: 'POST',
        data
    })
}


// 添加购物车 {good_id}
export function fetchAddToCart(data) {
    return axios({
        url: '/jd/addToCart',
        method: 'POST',
        data
    })
}

// 获取购物车商品列表
export function fetchCartList(params) {
    return axios({
        url: '/jd/getCartList',
        method: 'GET',
        params
    })
}

// 修改购物车中的商品数量 {num, id}
export function fetchUpdateNum(data) {
    return axios({
        url: '/jd/updateCartNum',
        method: 'POST',
        data
    })
}

// 删除购物车中的一个商品 {id }
export function fetchDeleteGood(params) {
    return axios({
        url: '/jd/deleteToCart',
        method: 'GET',
        params
    })
}

//提交购物车{goods}这个入参是商品的_id拼接成字符串
export function fetchCartSubmit(data) {
    return axios({
        url: '/jd/submitToCart',
        method: 'POST',
        data
    })
}

// 获取所有品类
export function fetchAllCates(params) {
    return axios({
        url: '/cates/cms/getCates',
        method: 'GET',
        params
    })
}

// 用cate品类查询所有商品 {cate}
export function fetchGoodsOfCate(params) {
    return axios({
        url: '/goods/cms/goodsOfCate',
        method: 'GET',
        params
    })
}
// 获取banner图片
export function fetchGetBanner(params) {
    return axios({
        url: '/jd/cms/getBanner',
        method: 'GET',
        params
    })
}

export default {
    fetchGoodsList,
    fetchGoodDetail,
    fetchAddToCart,
    fetchRegist,
    fetchLogin,
    fetchCartList,
    fetchUpdateNum,
    fetchDeleteGood,
    fetchCartSubmit,
    fetchAllCates,
    fetchGoodsOfCate,
    fetchGetBanner
}