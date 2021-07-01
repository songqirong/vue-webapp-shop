<template>
    <section class="find">
        
        <div class="content">
            <!--  头部搜索框  -->
            <div class="header">
                <div class="header-icon1" @click="back"><van-icon name="arrow-left" size="0.173333rem"/><span>返回</span> </div>
                <van-search
                    v-model="value"
                    :placeholder="text"
                    shape="round"
                    disabled
                    @click="onClick"
                    background="#fff"
                    >
                </van-search>
                <div class="header-icon1"> ··· </div>
            </div>
            <!-- 分割线 -->
            <van-divider
                    :style="{ borderColor: '#999',margin:0}"
                >
            </van-divider>
            <ul class="content-left">
                <li v-for='(item,index) in finds'
                 :key='item._id' 
                 v-text='item.cate_zh' 
                 :class="{'on':index==idx}"
                 @touchstart='touch(index,item)'
                 ></li>
            </ul>
            <div class="content-right">
                <h2>热门分类</h2>
                <van-grid :border="false" :column-num="3">
                    <van-grid-item v-for="item in goods" :key="item.id" @click='linktoDetail(item)'>
                        <img :src="item.img" />
                        <h3 v-text="item.name"></h3>
                    </van-grid-item>
                </van-grid>
            </div>
        </div>
        <tabbar></tabbar>
    </section>
</template>
<script>
import { 
    Search,
    Divider,
    Grid, 
    GridItem,
    Icon,
    Toast
    } from 'vant'; 
import {tabbar} from '../index'
import {mapState,mapGetters,mapMutations} from 'vuex'
// console.log(tabbar)
export default {
    name:'find',
    data:function(){
        return {
            value:'',
            finds:[],
            goods:[],
            idx:0,
        }
    },
    computed:{
        ...mapState("good",["find"]),
        ...mapGetters('good',['text'])
    },
    mounted(){
        this.init();
    },
    components:{
        // [Button.name]:Button,
        tabbar,
        [Search.name]: Search,
        [Divider.name]: Divider,
        [Grid.name]: Grid,
        [GridItem.name]: GridItem,
        [Icon.name]:Icon
    },
    methods:{
        ...mapMutations("good",["changefind"]),
        async init(){
            let res = await this.$http.fetchAllCates({})
            // console.log(res.data)
            if(res.err==0){
                this.finds = res.data;
                this.$http.fetchGoodsOfCate({cate:res.data[0].cate_en}).then(result=>{
                    if(result.err==0){
                        this.goods=result.data
                        this.changefind({idx:0,res:result})
                    }else{
                        Toast.fail(result.msg)
                    }
                })
            }else{
                Toast.fail(res.msg)
            }

        },
        linktoDetail(item){
            // console.log(item)
            this.$router.push('/detail/'+item._id);
        },

        onClick(){
        //    跳转至搜索页面
        // console.log("search")
        this.$router.push("/search");
       },
        back(){
            this.$router.back()
        },
        touch(idx,item){
            // console.log(idx,item)
            this.idx=idx;
            if(this.find[idx]&&this.find[idx].length){
                this.goods=this.find[idx]
            }else{
                // console.log(item)
                this.$http.fetchGoodsOfCate({cate:item.cate_en}).then(result=>{
                    if(result.err==0){
                        this.goods=result.data;
                        this.changefind({idx,res:result})
                    }else{
                        Toast.fail(result.msg)
                    }
                })
            }
                
        }
    }
}
</script>
<style lang="scss" scoped>

.find{
    height:100%;
    width:100%;
    .header{
        width: 100%;
        overflow: hidden;
        .van-search{
            width: 8rem;
            height: 1.5rem;
        }
        .header-icon1{
            color: #999;
            font-size: 0.4rem;
            line-height: 1.5rem;
            height: 1.5rem;
        }
        &>div{
            float: left;
        }
    }
    .van-grid-item__content{
        h3{
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            width: 1.9rem;
            text-align: center;
            font-size: 0.3rem !important;
            color: #000;
        }
    }
    .content{
        height: 100%;
        position: relative;
        .content-left{
            margin-top:1.51rem;
            position: absolute;
            left: 0;
            top: 0;
            overflow: auto;
            text-align: center;
            width: 3rem;
            bottom: 1.333333rem;
            .on{
                background-color: #fff;
                color: red;
            }
            li{
                list-style: none;
                font-size: 0.4rem;
                padding: 0.133333rem 0;
                line-height: 1.066667rem;
                background-color: #f8f8f8;
                box-sizing: border-box;
                border: 1px solid #f3f3f3;
            }
        }
        .content-right{
            margin-top:1.51rem;
            position: absolute;
            right: 0;
            top: 0;
            overflow: auto;
            bottom: 1.333333rem;
            overflow: auto;
            width: 7rem;
            h2{
                font-size: 0.48rem;
                text-align: left;
                padding: 0.133333rem 0;
            }
            .van-grid{
                .van-grid-item{
                    .van-grid-item__content{
                        img{
                            width: 1.866667rem;
                            height: 1.866667rem;
                        }
                        h3{
                            font-size: 0.373333rem;
                        }
                    }
                }
            }
        }
    }
}
     
</style>