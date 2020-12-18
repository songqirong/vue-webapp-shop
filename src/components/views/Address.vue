<template>
    <div class="address">
        <!-- 顶部标题 -->
        <navbar title="收货地址"/>
        <!-- 地址栏 -->
        <div class="address-list">
            <van-address-list
            v-model="chosenAddressId"
            :list="list"
            :disabled-list="disabledList"
            disabled-text="以下地址超出配送范围"
            default-tag-text="默认地址"
            @add="onAdd"
            @edit="onEdit"
        />
        </div>
    </div>
</template>
<script>
import { 
    AddressList,
} from 'vant';
import { navbar } from '../index';
export default {
    name:'Address',
    data() {
        return {
            chosenAddressId: '1',
            list: [
                {
                    id: '1',
                    name: '张三',
                    tel: '13000000000',
                    address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
                    isDefault: true,
                },
                {
                    id: '2',
                    name: '李四',
                    tel: '1310000000',
                    address: '浙江省杭州市拱墅区莫干山路 50 号',
                },
            ],
            disabledList: [
                {
                    id: '3',
                    name: '王五',
                    tel: '1320000000',
                    address: '浙江省杭州市滨江区江南大道 15 号',
                },
            ],
        };
    },
    mounted(){
        this.init();
    },
    components:{
        [AddressList.name]: AddressList,
        navbar,
    },
    methods: {
        onAdd() {
            this.$router.push('/address-editor')
        },
        onEdit(item) {
            this.$router.push({
                name: 'AddressEditor',
                params: item
            })
        },
        init(){
            this.$http.fetchGetAddressList({}).then(res => {
                const list = [];
                res.data.map(item => {
                    list.push({
                        id: item._id,
                        name: item.name,
                        isDefault: item.isDefault,
                        address: item.province === item.city ?  `${item.country}${item.province}${item.county}${item.addressDetail}` : `${item.country}${item.province}${item.city}${item.county}${item.addressDetail}`,
                        tel: item.tel,
                        province: item.province,
                        country: item.country,
                        city: item.city,
                        county: item.county,
                        addressDetail: item.addressDetail,
                        postalCode: item.postalCode,
                        areaCode: item.areaCode
                    })
                })
                this.list = list;
            })
        }
    },
}
</script>
<style lang="scss">
.address{
    background-color: #F7F7F7;
    height: 100%;
    .address-list{
        margin-top: 50px;
    }
}

</style>