<template>
    <div class="detail">
        <van-nav-bar 
            title="商品详情" 
            left-text="返回" 
            left-arrow 
            fixed
            @click-left='back'
        >
            <template #right>
                <van-icon name="search" size="18" />
            </template>
        </van-nav-bar>
        <img :src="img.imgBaseUrl+good.img" alt="">
        <h3 v-text="good.name"></h3>
        <h4 v-text="good.desc"></h4>
        <h5>{{good.price|rmb}}</h5>
        <div class="bottom">
            <van-goods-action>
                <van-goods-action-icon icon="chat-o" text="客服" @click="onClickIcon" />
                <van-goods-action-icon icon="cart-o" text="购物车" @click="onClickIcon" />
                <van-goods-action-icon icon="shop-o" text="店铺" @click="onClickIcon" />
                <van-goods-action-button
                    type="warning"
                    text="加入购物车"
                    @click="onClickButton"
                />
                <van-goods-action-button
                    type="danger"
                    text="我的购物车"
                    @click="linktoCart"
                />
            </van-goods-action>
        </div>
    </div>
    
</template>
<script>
import { 
    GoodsAction, 
    GoodsActionIcon,
    GoodsActionButton,
    Toast,
    NavBar,
    Icon
}from 'vant';
import img from '@/untils/img'
export default {
    name:'detail',
    data(){
        return {
            good:{},
            img
        }
    },
    components:{
        [GoodsAction.name]:GoodsAction,
        [GoodsActionIcon.name]:GoodsActionIcon,
        [GoodsActionButton.name]:GoodsActionButton,
        [Toast.name]:Toast,
        [NavBar.name]:NavBar,
        [Icon.name]:Icon
    },
    mounted(){
        // console.log(this.$router)
        this.init();
    },
    methods:{
        init(){
            let params={
                _id:this.$route.params.id
            }
            this.$http.fetchGoodDetail(params).then(result=>{
                // console.log(result)
                let res = result.data[0]
                // console.log(res)
                this.good=res
            })
        },
        back(){
            this.$router.back()
        },
        onClickIcon() {
            Toast('点击图标');
        },
        onClickButton() {
            let token = localStorage.getItem('token');
            if(!token){
                this.$router.push('/login')
            }else{
                let data={
                    good_id:this.good._id
                }
                Toast.loading("加入购物车中...")
                this.$http.fetchAddToCart(data).then(res=>{
                    // console.log(res)
                    if(res.err==0){
                        Toast.success(res.msg);
                    }else{
                        Toast.fail(res.msg)
                    }
                })
            }
            // Toast('点击按钮');
        },
        linktoCart(){
            this.$router.push('/shoplist')
        }
    }
}
</script>
<style lang="scss" scoped>
    .detail{
            text-align: center;
        h2{
            font-size: 0.666667rem;

        }
        img{
            margin-top:1.333333rem;
            width: 10rem;
            height: 10rem;
            border: 0;
        }
        h3,h4{
            font-size: 0.6rem;
        }
        h5{
            color: red;
        }
    }
</style>
