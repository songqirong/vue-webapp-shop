<template>
    <div class="address-editor">
        <!-- 顶部标题 -->
        <navbar title="编辑地址"/>
        <!-- 地址栏 -->
        <div class="address-select">
            <van-address-edit
                :area-list="areaList"
                show-postal
                show-delete
                show-set-default
                show-search-result
                :address-info="addressInfo"
                :search-result="searchResult"
                :area-columns-placeholder="['请选择', '请选择', '请选择']"
                @save="onSave"
                @delete="onDelete"
                @change-detail="onChangeDetail"
            />
        </div>
    </div>
</template>
<script>
import { 
    AddressEdit,
    Toast 
} from 'vant';
import areaList from './areaList';
import { navbar } from '../index';
export default {
    name:'AddressEditor',
    data() {
        return {
            areaList,
            searchResult: [],
            addressInfo: {}
        };
    },
    components:{
        [AddressEdit.name]: AddressEdit,
        navbar,
    },
    mounted(){
        this.init();
    },
    methods: {
        onSave(values) {
            console.log(values)
            this.$http.fetchAddAddressList(values).then(res => {
                Toast(res.msg);
                this.$router.back();
            })
        },
        onDelete(values) {
            this.$http.fetchDeleteAddressList({id: values.id}).then(res => {
                Toast(res.msg);
                this.$router.back();
            })
        },
        onChangeDetail() {
            // console.log(val)
            // if (val) {
            //     this.searchResult = [
            //     {
            //         name: '黄龙万科中心',
            //         address: '杭州市西湖区',
            //     },
            //     ];
            // } else {
            //     this.searchResult = [];
            // }
        },
        init(){
            const { params } = this.$route;
            if(Object.prototype.hasOwnProperty.call(params, 'id')){
                this.addressInfo ={
                    id: params.id,
                    isDefault: params.isDefault,
                    name: params.name,
                    tel: params.tel,
                    county: params.county,
                    addressDetail: params.addressDetail,
                    areaCode: params.areaCode ? params.areaCode.toString() : this.getKey(params.county),
                    postalCode: params.postalCode || undefined
                };
            }
        },
        getIndex(exp, idx){
            const { params } = this.$route;
            if(idx){
                return params.address.indexOf(exp, idx) + 1
            }else{
                return params.address.indexOf(exp) + 1
            }
        },
        getKey(value){
            const list = areaList.county_list;
            for(var key in list){
                if(list[key] == value){
                    // console.log(key)
                    return key.toString();
                }
            }
            return null;
        },
    },
}
</script>
<style lang="scss">
.address-editor{
    background-color: #F7F7F7;
    height: 100%;
    .address-select{
        margin-top: 50px;
    }
}

</style>