<template>
    <div class="login">
        <div class="header">
            <div class="header-icon" @click="back"><van-icon name="arrow-left" size="15"/><span>返回</span> </div>
            
            <div class="header-right" v-text='msg'></div>
        </div>
        <van-form @submit="onSubmit">
            <van-field
                v-model="username"
                name="username"
                label="用户名"
                placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
                v-model="password"
                type="password"
                name="password"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
            <div style="margin: 16px;" class="btns">
                <van-button round block type="info" native-type="submit">
                登录
                </van-button>
                <van-button round block type="primary" @click='linkReg'>
                注册
                </van-button>
            </div>
        </van-form>
    </div>
</template>
<script>
import { 
    Form,
    Button,
    Field,
    Icon,
    Toast
} from 'vant';
export default {
    name:'login',
    components:{
        [Form.name]:Form,
        [Button.name]:Button,
        [Field.name]:Field,
        [Icon.name]:Icon,
        [Toast.name]:Toast
    },
    data() {
        return {
            username: '',
            password: '',
            msg:'京东登录注册'
        };
    },
    methods: {
        onSubmit(values) {
            // console.log('submit', values);
            Toast.loading('登录中')
            this.$http.fetchLogin(values).then(res=>{
                // console.log(res)  
                if(res.err==0){
                    // Toast.clear();
                    Toast.success("登录成功");
                    this.$router.back();
                    localStorage.setItem('token',res.token);
                }else{
                    Toast.fail("用户名或密码错误");
                }
            })
        },
        back(){
            this.$router.back()
        },
        linkReg(){
            this.$router.push('/reg')
        }
    },
}
</script>
<style lang="scss" scoped>
    .header{
        overflow: hidden;
        .header-right{
            padding-top: 0.24rem;
            margin-left: 0.266667rem;
            font-size: 0.5rem;
            text-align: center;
            width: 8rem;
            color: #999;
        }
        .header-icon{
            padding-top: 0.3rem;
            color: #999;
            font-size: 0.5rem;
        }
        &>div{
            float: left;
        }
    }
    .van-form{
        margin-top: 2rem;
        .van-cell{
            margin:1rem 0;
        }
        .btns{
            button{
                margin: 0.266667rem 0;
            }
        }
    }
</style>