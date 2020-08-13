<template>
    <div class="reg">
        <div class="header">
            <div class="header-icon" @click="back"><van-icon name="arrow-left" size="15"/><span>返回</span> </div>
            
            <div class="header-right" v-text='msg'></div>
        </div>
       <van-form validate-first @failed="onFailed" @submit="onSubmit">
            <!-- 通过 validator 进行函数校验 -->
            <van-field
                v-model="username"
                name="username"
                placeholder="请输入用户名"
                :rules="[{ validator, message: '请输入正确内容' }]"
            />
            <!-- 通过 validator 进行函数校验 -->
            <van-field
                v-model="password"
                name="password"
                placeholder="请输入密码"
                :rules="[{ pattern, message: '密码规格出错' }]"
            />
            <van-field
                v-model="password2"
                name="password2"
                placeholder="请再次输入密码"
                :rules="[{ validator:Validator2, message: '两次输入密码不一致' }]"
            />
            <div style="margin: 16px;" class="btns">
                <van-button round block type="info" native-type="submit">
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
    name:'reg',
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
            password2:'',
            msg:'京东登录注册',
            pattern: /\d{6}/,
        };
    },
    methods: {
        onSubmit(values) {
            Toast.loading('注册中')
            this.$http.fetchRegist(values).then(res=>{
                // console.log(res)
                // Toast.clear();
                if(res.err==0){
                    Toast.success("注册成功")
                    this.$router.push('/login')
                }else{
                    Toast.fail(res.msg)
                } 
            })
        },
        back(){
            this.$router.back()
        },
        validator(val) {
            return /1\d{10}/.test(val);
        },
        Validator2(val) {
            return this.password == val
            // return new Promise((resolve) => {
            //     Toast.loading('验证中...');
            //     setTimeout(() => {
            //         Toast.clear();
            //         resolve(this.password==val);
            //     }, 1000);
            // });
        },
        onFailed(errorInfo) {
            // console.log('failed', errorInfo.errors);
            if(errorInfo.errors[0].name=='username'){
                Toast("用户名格式出错，请重新填写")
            }else if(errorInfo.errors[0].name=='password'){
                Toast("密码格式出错，请重新填写")
            }else{
                Toast("两次密码不一致，请重新填写")
            }
        },
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
        margin-top: 1rem;
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