<template>
    <div>
        <!-- 顶部NavBar -->
        <van-nav-bar 
            :title="title" 
            left-text="返回" 
            left-arrow 
            fixed
            @click-left='back'
        >
            <template #right>
                <van-icon name="search" size="18" @click="onClick"/>
            </template>
        </van-nav-bar>
    </div>
</template>
<script>
import {    
    NavBar,
    Col, 
    Row,
    Icon,
} from 'vant'; 
export default {
    name:'navbar',
    props:{
        title:{
            required: true,
            type: String,
        }
    },
    components:{
        [Col.name]:Col,
        [Row.name]:Row,
        [Icon.name]:Icon,
        [NavBar.name]: NavBar,
    },
    mounted(){
        document.title=this.title
    },
    methods:{
        back(){
            this.$router.back()
        },
        onSearch(){ 
            console.log('Search')
        },
        onClick(){
            this.$router.push('/search')
        },
    }
}
</script>
<style lang="scss">
    
</style>