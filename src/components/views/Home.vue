<template>
    <section class="home">
        
        <!-- 通知栏 -->
        <van-notice-bar
            left-icon="volume-o"
            text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
            mode="closeable"
        >
        </van-notice-bar>
        <van-pull-refresh
        v-model="refreshing"
        success-text="刷新成功"
        @refresh="onRefresh"
        >
            <!-- 搜索栏 -->
            <van-sticky>
                <div class="header">
                    <div class="icon"><van-icon name="apps-o" size="0.4rem" @click="linkto"/></div>
                    <van-search
                        v-model="value"
                        label="搜索"
                        :placeholder="text"
                        shape="round"
                        disabled
                        @click="onClick"
                        background="#35A8E9"
                        >
                            
                    </van-search>
                    <div @click="onLogin" class="login" v-show="show">登录</div>
                </div>
            </van-sticky>
            
            <!-- 轮播图 -->
            <div class="banner">
                <van-swipe :autoplay="5000">
                    <van-swipe-item v-for="(item, index) in images" :key="index">
                        <img v-lazy="img.imgBaseUrl+item.img" />
                    </van-swipe-item>
                </van-swipe>
            </div>
            <!-- 分割线 -->
            <van-divider
                :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
            >
                为你推荐
            </van-divider>
            <!-- 商品列表 -->
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                    :offset='100'
                >
                    <ul class="goods" v-for="i in length" :key="i">
                        <goods :goodItem="goodslist[2*i-2]"></goods>
                        <goods :goodItem="goodslist[2*i-1]"></goods>
                    </ul>
                </van-list>           
            </van-pull-refresh>
            <tabbar></tabbar>
       
    </section>
</template>
<script>
import { 
    NoticeBar ,
    Swipe, 
    SwipeItem,
    // Lazyload,
    Search,
    Divider,
    PullRefresh,
    List,
    Toast,
    Icon,
    Sticky
} from 'vant';
import img from '@/untils/img';
import {tabbar,goods} from '../index';
import {mapGetters} from 'vuex'
// console.log(tabbar)
export default {
    name:'home',
    components:{
        tabbar,
        goods,
        [NoticeBar.name]:NoticeBar,
        [Swipe.name]:Swipe,
        [SwipeItem.name]:SwipeItem,
        [Search.name]:Search,
        [Divider.name]:Divider,
        [PullRefresh.name]:PullRefresh,
        [List.name]:List,
        [Toast.name]:Toast,
        [Icon.name]:Icon,
        [Sticky.name]:Sticky
    },
    mounted(){
        let token=localStorage.getItem('token')
        if(token){
            this.show=false
        }else{
            this.show=true
        }
        this.getGoodList();
        this.$http.fetchGetBanner({}).then(res=>{
            // console.log(res)
            if(res.err==0){
                this.images=res.data
            }
        })
    },
   data:function(){
       return{
            img,
            value:'',
            images: [],
            loading:false,
            finished: false,
            refreshing: false,
            goodslist: [],
            page: 1,
            show:true,
       }
   },
   computed:{
        ...mapGetters('good',['text']),
        length(){
            return Math.floor(this.goodslist.length/2)
        }
    },
   methods:{
        // onScroll(scrollTop){
        //     scrollTop=0;
        // },
       getGoodList(){
           let params = {
               page:this.page,
               size:6
           }
           this.$http.fetchGoodsList(params).then(result=>{
            //    console.log('商品列表',res)
            let res = result.data
               if(res.length===0){
                   Toast("已经没有商品了")
               }
               if(res.length>0){
                   if(this.refreshing){
                    //    console.log(this.loading)
                       this.goodslist = res;
                       this.refreshing=false
                   }else{
                    //    console.log(this.refreshing)
                       this.goodslist=[...this.goodslist,...res]
                       this.loading=false
                   }   
               }
           })
       },
       onLogin(){
        //    跳转至登录页面
           this.$router.push('/login')
       },
       onClick(){
        //    跳转至搜索页面
        // console.log("search")
        this.$router.push("/search")
       },
       onRefresh(){
           this.page = 1;
           this.getGoodList();
       },
       linkto(){
        //    跳转到分类页面
           this.$router.push('/find')
       },
       onLoad() {
            this.page++;
            this.getGoodList();
        },
   }
}
</script>
<style lang="scss" scoped>
    .header{
        background:#35A8E9;
        display: flex;
        .van-search{
            width: 8rem;
            line-height: 1.44rem;
        }
        .login{
            font-size: 0.4rem;
            color: #fff;
            line-height: 1.44rem;
        }
        .icon{
            height: 1.44rem;
            color: #fff;
            margin-left: 0.5rem;
        }
    }
    .van-search__action>div{
        color: #fff;

    }
    .banner{
        padding:.5rem;
        height: 5.5rem;
        background: url('https://m.360buyimg.com/mobilecms/s250x200_jfs/t1/115430/39/13036/46582/5f181a79E1689f1d8/f31facdbed313dac.jpg!q70.jpg.dpg') no-repeat center;
        background-size: 10rem 6.5rem;
        .van-swipe{
            border-radius: 0.266667rem;
            width: 9rem;
            height: 5rem;
            .van-swipe-item{
                img{
                    height: 5rem;
                    width:100%
                }
            }
        }
    }
   .goods{
       text-align: center;
       display: flex;
   }
</style>