<template>
    <section class="shoplist">
        <navbar title="购物车"/>
        <!-- 分割线 -->
        <van-divider
                :style="{ borderColor: '#999',margin:0}"
            >
        </van-divider>
        <h3 v-show="show">亲，登录后才能查看购物车哦<van-button type="primary" to="/login" text="登录" round size="small"></van-button></h3>
        <div class="desc" v-show="desc">呀！购物车是空的哟</div>
        <!-- 商品 -->
        <div v-for='(item,index) in cartArr' :key='item.id' class="card-row">
            <van-swipe-cell>
                <van-row  type="flex" justify="center" align='center'>
                    <van-col span="4">
                        <van-checkbox v-model="item.checked" @change="itemChange"></van-checkbox>
                    </van-col>
                    <van-col span='20'>                    
                        <van-card
                            :num="item.num"                         
                            :desc="item.good.desc"
                            :title="item.good.name"
                            class="goods-card"
                            :thumb="img.imgBaseUrl+item.good.img"
                            >
                            <template #price>
                                <div class="good_price">{{item.good.price|rmb}}</div>
                            </template>
                            <template #footer>
                                <van-button size="mini" @click="changeNum('sub',index,item)">-</van-button>
                                <van-button size="mini" @click="changeNum('add',index,item)">+</van-button>
                            </template>
                        </van-card>                   
                    </van-col>
                </van-row>
                <template #right>
                    <van-button square text="删除" type="danger" class="delete-button"  @click="remove(index,item)"/>
                </template> 
            </van-swipe-cell>
        </div>
        <van-submit-bar :price="total" button-text="提交订单" @submit="onSubmit">
            <van-checkbox v-model="checked" @click="fullClick()">全选</van-checkbox>
            <template #tip>
                你的收货地址不支持同城送, <span @click="onClickEditAddress">修改地址</span>
            </template>
        </van-submit-bar>
        <!-- <tabbar></tabbar> -->
    </section>
</template>
<script>
import {    
    Divider,
    Card,
    Button,
    SubmitBar,
    Checkbox, 
    Row,
    Col,
    SwipeCell,
    Toast
} from 'vant'; 
import { navbar } from '../index';
import img from '@/untils/img'
// import {tabbar} from '../index'
// console.log(tabbar)

export default {
    // 局部路由守卫
    // 在局部路由守卫中，是没有this的，因为组件还没有被实例化
    // beforeRouteEnter(to, from, next) {
    //     let token = localStorage.getItem('token')
    //     console.log('this', this)
    //     if(token) {
    //         next()
    //     } else {
    //         next('/login')
    //     }
    // },
    name:'shopList',
    data:function(){
        return{
            value:'',
            checked:false,
            cartArr:[],
            show:true,
            desc:true,
            img
        }
    },
    computed:{
        total(){
            let money = 0;
            this.cartArr.map((item)=>{
                if(item.checked){
                    money+=item.num*item.good.price
                }
            })
            return money*100;
        }
    },
    watch:{
        // checked(){

        // }
    },
    components:{
        navbar,
        [Divider.name]: Divider,
        [Card.name]:Card,
        [Button.name]:Button,
        [SubmitBar.name]:SubmitBar,
        [Checkbox.name]:Checkbox,
        [SwipeCell.name]:SwipeCell,
        [Toast.name]:Toast,
        [Row.name]:Row,
        [Col.name]:Col,
        // tabbar
    },
    mounted(){
        let token = localStorage.getItem('token')
        if(token){
            this.show=false;
            this.init();
        }else{
            this.desc=false
        }
    },
    methods:{
        init(){
            this.$http.fetchCartList({}).then(res=>{
                if(!res){
                    return ;
                }
                if(res.err==0){
                    if(res.data.length>0){
                        this.desc=false;
                        // console.log(res.data)
                        res.data.map((item)=>{
                            item.checked=false;    
                        })
                    }else{
                        this.desc=true
                    }
                    this.cartArr=res.data
                    this.checked=false
                }else{
                    Toast.fail("购物车出错了")
                }
            })
        },
        itemChange(){
            let arr = this.cartArr.filter((item)=>{
                return item.checked == false
            })
            this.checked=(arr.length==0)
            
        },
        fullClick(){
            this.cartArr.map((item)=>{
                item.checked = this.checked
            })
        },
        upDataNum(idx,num){
            // console.log(this.cartArr[idx])
            this.cartArr[idx]["num"]=num
        },
        onSearch(){
            
            console.log('Search')
        },
        onClick(){
            this.$router.push('/search')
        },
        back(){
            this.$router.back()
        },
        onSubmit(){
            // console.log(this.cartArr)
            let str='';
            this.cartArr.map((item)=>{
                if(item.checked){
                    str+=';'+item._id
                }
            })
            let data={goods:str}
            // console.log(str)
            Toast.loading("下单中，请稍等...")
            this.$http.fetchCartSubmit(data).then(res=>{
                if(res.err==0){
                    Toast.success(res.msg);
                    this.init()
                }else{
                    Toast.fail("亲，请先选择商品哦")
                }
            })
        },
        onClickEditAddress(){
            console.log('修改地址');
        },
        changeNum(type,idx,item){
            let data={
                num:item.num,
                id:item._id
            }
            if(type=="add"){
                data.num++
            }else{
                if(data.num==1){
                    return
                }
                data.num--
            }
            this.$http.fetchUpdateNum(data).then(res=>{
                // console.log(res)
                if(res.err==0){
                    this.upDataNum(idx,data.num)
                }else{
                    Toast.fail('服务器出错了')
                }
            })
        },
        remove(idx,item){
            this.$http.fetchDeleteGood({id:item._id}).then(res=>{
                if(res.err==0){
                    Toast.success("删除商品成功")
                    this.cartArr.splice(idx,1);
                }else{
                    Toast.fail('服务器出错了')
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    .shoplist {
        padding-top: 1.333333rem;
        padding-bottom: 2.5rem;
    }
    .delete-button {
        height: 100%;
    }
    .card-row {
        border-bottom: 1px solid #ccc;
        padding: 0.133333rem 0;
    }
    h3{
        text-align: center;
        font-size: 0.4rem;
        line-height: 1.2rem;
        background-color: pink;
        color: red;
        button{
            margin-left: 0.4rem;
            padding: 0 0.4rem;
        }
    }
    .desc{
        text-align: center;
        font-size: 0.533333rem;
        color: #ccc;
        line-height: 5rem;
    }        
    
    .van-card{
        margin: 0;
        background-color: white;
        .van-card__footer{
            .van-button{
                .van-button__content{
                    .van-button__text{
                        padding: 0.133333rem 0.4rem;
                    }
                }
            }
            
        }
        .good_price{
            color: red;
        }
    }
</style>