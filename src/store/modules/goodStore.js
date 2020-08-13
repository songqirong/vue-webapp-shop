// import {fetchGoodsOfCate} from '@/untils/api'
export default{
    namespaced:true,
    //要被共享的数据都放在state
    state:{
        find:{},
        searchList:['衣服风干机','烤箱','自动喂食器','遮瑕粉底液','洗面奶','照片扫描仪','独轮平衡车','燃气壁挂炉','面膜','折叠床','热水壶','多功能沙发床']
    },
    // 当被关联的state变量发生变化时，getters会重新计算
    getters:{
        text:function(state){
            let num = Math.floor(Math.random()*12)
            // console.log(num)
            return state.searchList[num]
        }
    },
    // 当state被修改完成，页面视图自动更新
    mutations:{
        changefind(state,payload){
            // console.log(payload)
            state.find[payload.idx] = payload.res.data
            // console.log(state.find)
        }, 
    },
    actions:{
        // getgoods(store,payload){
        //     fetchGoodsOfCate(payload.data).then(res=>{
        //         store.commit("changefind",{res:res,idx:payload.idx})
        //     })
        // }
    }
}