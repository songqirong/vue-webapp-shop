<template>
        <li class="item" @click="linktoDetail">
            <img :src="img.imgBaseUrl+goodItem.img" alt="">
            <div v-text="goodItem.name"></div>
            <div>{{goodItem.price|rmb}}</div>  
        </li>
</template>
<script>
import img from '@/untils/img'
export default {
    props:{
        goodItem:{
            type:Object,
            required:true
        }
    },
    methods:{
        linktoDetail(){
            this.$router.push('/detail/'+this.goodItem._id)
        }
    },
    data(){
        return{
            img
        }
    }
}
</script>
<style lang="scss" scoped>
    .item{
        flex:1;
        list-style: none;
        img{
            width: 5rem;
            height: 5rem;
        }
        &>div{
            font-size: 0.4rem;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            width: 5rem;
        }
        &>div:last-of-type{
            color: red;
        }
    }
</style>