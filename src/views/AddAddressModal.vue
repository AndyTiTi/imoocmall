<template>
  <div>
    <div class="md-modal modal-msg md-modal-transition" :class="{'md-show':mdShow}">
      <div class="md-modal-inner">
        <div class="md-top">
          <button class="md-close" @click="closeModal">Close</button>
        </div>
        <div class="md-content">
          <span class="item-label tsl">所在地区 <i>*</i></span>
          <city-select v-model="cityInfo"></city-select>
          <input type="hidden" v-model="cityName" ref="StreetName">
          <div class="item item-postcode">
            <span class="item-label tsl">详细地址 <i>*</i></span>
            <div class="ks-combobox-input-wrap">
              <textarea class="" autocomplete="off"></textarea>
            </div>
          </div>
          <div class="item item-postcode">
            <span class="item-label tsl">邮政编码 </span>
            <input maxlength="16" v-model="postCode" type="text">
          </div>
          <div class="item item-name" id="J_ItemName">
            <span class="item-label tsl">收货人姓名 <i>*</i></span>
            <input v-model="userName" type="text">
          </div>
          <div class="item item-mobile" id="J_ItemMobile">
            <span class="item-label tsl">手机号码 </span>
            <input v-model="tel" type="text">
          </div>
          <div class="item item-phone">
            <span class="item-label tsl">电话号码 </span>
            <input maxlength="10" type="text">
          </div>
          <div class="" id="itemSetDefault">
            <input type="checkbox" id="setDefault" @click="isDefault = !isDefault"><label for="setDefault">设置为默认收货地址</label>
          </div>
          <div class="btn-wrap">
            <a href="javascript:;" class="btn btn--m" @click="addAddressSubmit">确认</a>
            <a href="javascript:;" class="btn btn--m" @click="closeModal">取消</a>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-if="mdShow" @click="closeModal"></div>
  </div>
</template>
<script>
  import CitySelect from './CitySelect'
  import axios from 'axios'
  export default {
    data(){
      return {
        cityInfo: '',
        userName:'',
        isDefault:false,
        postCode:'',
        tel:''
      }
    },
    props: ['mdShow'],
    methods: {
      closeModal() {
        this.$emit('close');
      },
      addAddressSubmit(){
        var randomId = new Date().getTime().toString();
        var addressId = randomId.substring(7);
        axios.post('/users/addAddress', {
          addressId: addressId,
          streetName:this.$refs.StreetName.value,
          userName:this.userName,
          isDefault:this.isDefault,
          postCode:this.postCode,
          tel:this.tel
        }).then((response) => {
          let res = response.data;
          if (res.status == '0') {
            this.closeModal();
            this.$emit('ievent');
          }
        })
      }
    },
    components: {
      CitySelect
    },
    computed: {
      cityName() {
        const names = [];
        this.cityInfo.province && names.push(this.cityInfo.province.name + ' ');
        this.cityInfo.city && names.push(this.cityInfo.city.name + ' ');
        this.cityInfo.block && names.push(this.cityInfo.block.name + ' ');
        return names.join('');
      }
    }
  }
</script>
<style lang="stylus">
  h6
    padding 10px
    border 1px dotted
  .item input,.item textarea
    margin-top 1px
    width 100%
  .md-modal-inner
    width 700px
  h6 i
    color #f00
    border 1px dotted #ccc
</style>
