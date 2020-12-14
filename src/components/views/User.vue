<template>
    <section class="user">
        <!-- 用户信息 -->
        <div class="user-info"  :id="SHARE_CARD_ID">
            <van-row type='flex' justify="center" align='center'>
                <van-col span="5" offset="1" @click="openModal">
                    <van-image
                        round
                        width="1.3rem"
                        height="1.3rem"
                        src="https://img.yzcdn.cn/vant/cat.jpeg"
                    />
                </van-col>
                <van-col span="18">
                    <div>
                        <div>用户名</div>
                        <div>liguangjun</div>
                        <div>
                            <span>京享值:5000</span>
                            <span>小白信用:96</span>
                            <span>></span>
                        </div>
                    </div>
                </van-col>
            </van-row>
        </div>
        <!-- 用户消息 -->
        <div class="user-order">
            <van-grid :column-num="4">
                <van-grid-item icon="home-o" text="待付款" dot />
                <van-grid-item icon="search" text="待收货" badge="99+" />
                <van-grid-item icon="search" text="退换/售后" badge="99+" />
                <van-grid-item icon="search" text="全部订单" badge="99+" />
            </van-grid>
        </div>
        <van-cell-group title="地址">
            <van-cell value="单元格" is-link>
                <template #title>
                    <span class="custom-title">收货地址管理</span>
                </template>
            </van-cell>
        </van-cell-group>

        <van-cell-group title="安全">
            <van-cell value="密码实名认证等管理" is-link>
                <template #title>
                    <span class="custom-title">账户与安全</span>
                </template>
            </van-cell>
            <van-cell value="未设置" is-link>
                <template #title>
                    <span class="custom-title">京东支付密码</span>
                </template>
            </van-cell>
        </van-cell-group>

        <van-cell-group title="服务">
            <van-cell value="即时解答用户疑难" is-link>
                <template #title>
                    <span class="custom-title">联系客服</span>
                </template>
            </van-cell>
            <van-cell is-link>
                <template #title>
                    <span class="custom-title">切换站点</span>
                </template>
            </van-cell>
        </van-cell-group>

        <!-- 功能按钮 -->
        <van-grid direction="horizontal" :column-num="3">
            <van-grid-item icon="service-o" text="意见反馈" />
            <van-grid-item icon="balance-o" text="京东客户端" />
            <van-grid-item icon="user-circle-o" text="退出登录" @click="logout"/>
        </van-grid>
        <!-- 弹出层 -->
        <van-dialog v-model="show" title="用户信息" show-cancel-button class="user-modal">
            <!-- 加载中 -->
            <van-loading type="spinner" v-show="visible"/>
            <img :src="base64" v-show="!visible" class="img1"/>
            <img :src="code" alt="" v-show="!visible" class="code"/> 
        </van-dialog>
        <tabbar></tabbar>
    </section>
</template>
<script>
import {
    Col,
    Row,
    Image,
    Grid,
    GridItem,
    Cell,
    CellGroup,
    Toast,
    Dialog,
} from 'vant'; 
import { generateImg, generateQRCode } from '@/untils/index';
import {tabbar} from '../index'
// console.log(tabbar)
export default {
    name:'user',
    data() {
        return {
            show: false,
            SHARE_CARD_ID: 'SHARE_CARD_ID',
            SHARE_CARD_CANVAS: 'SHARE_CARD_CANVAS',
            shareLink:'https://www.baidu.com/',
            base64: '',
            code: '',
            visible: true
        };
    },
    components:{
        // [Button.name]:Button,
        tabbar,
        [Col.name]:Col,
        [Row.name]:Row,
        [Image.name]:Image,
        [Grid.name]:Grid,
        [GridItem.name]:GridItem,
        [Cell.name]:Cell,
        [CellGroup.name]:CellGroup,
        [Dialog.Component.name]: Dialog.Component,
    },
    methods:{
        logout(){
            Toast.loading("退出登录中")
            setTimeout(()=>{
                localStorage.removeItem("token")
                Toast.success("注销成功")
                this.$router.push('/home')
            },1000)
        },
        openModal(){
            this.show = true;
            generateImg(this.SHARE_CARD_ID, this.SHARE_CARD_CANVAS).then(res => {
                 this.base64 = res;
                generateQRCode(this.shareLink).then(res => {
                    this.code = res;
                    this.visible = false;
                })
            });

        }
    }
}
</script>
<style lang="scss" scoped>
    .user {
        background: rgba(247, 247, 247, 1);
        .user-info {
            font-size: 0.346667rem;
            color: white;
            background-color: rgba(231, 170, 94, 1);
            padding: 0.426667rem;
        }
        .user-order {
            width: 100%;
            height: 2rem;
        }
        .van-cell-group__title {
            line-height: 0.8rem;
        }
        .user-modal{
            width: 8rem;
            height: 8rem;
            .img1{
                height: 4rem;
                width: 8rem;
            }
            .code{
                position: absolute;
                right: .5rem;
                top: 2rem;
                z-index: 5;
                height: 2rem;
                width: 2rem;
            }
        }
    }
    
</style>