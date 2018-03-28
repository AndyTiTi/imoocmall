<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <span>Goods</span>
    </nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)" class="price">Price
            <svg class="icon icon-arrow-short">
              <use xlink:href="#icon-arrow-short"></use>
            </svg>
          </a>
          <a href="javascript:void(0)" class="filterby" @click="showFilterFn">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter" id="filter" :class="{'filterby-show':showFilter}">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd><a href="javascript:void(0)" :class="{'cur':priceChecked=='all'}" @click="priceChoose(-1)">All</a></dd>
              <dd v-for="(item,index) in priceFilter">
                <a href="javascript:void(0)" :class="{'cur':priceChecked==index}" @click="priceChoose(index)">{{item.startPrice}}
                  - {{item.endPrice}}</a>
              </dd>
            </dl>
          </div>
          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="item in goodsList">
                  <div class="pic">
                    <a href="#"><img :src="'/static/img/'+item.productImage" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.salePrice}}</div>
                    <div class="price">{{item.productName}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :class="{'md-overlay':showFilter}" @click="showFilter=false"></div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
  import './../assets/css/base.css'
  import './../assets/css/product.css'
  import NavHeader from '@/components/Header.vue'
  import NavBread from '@/components/Bread.vue'
  import NavFooter from '@/components/Footer.vue'
  import axios from 'axios'

  export default {
    data() {
      return {
        goodsList: [],
        showFilter:false,
        showMask:false,
        priceFilter: [
          {startPrice: 0, endPrice: 100},
          {startPrice: 100, endPrice: 500},
          {startPrice: 500, endPrice: 1000},
          {startPrice: 1000, endPrice: 2000},
          {startPrice: 2000, endPrice: 5000}
        ],
        priceChecked: 'all'
      }
    },
    mounted: function () {
      this.getGoodsList();
    },
    methods: {
      priceChoose(index){
        if(index==-1){
          this.priceChecked='all'
        }else{
          this.priceChecked=index
        }
        this.showFilter=false;
      },
      showFilterFn(){
        this.showFilter=true;
      },
      getGoodsList() {
        axios.get('/goods').then((result) => {
          var res = result.data.result;
          if (res) {
            this.goodsList = res;
          } else {
            throw new Error('database error!')
          }
        });
      }
    },
    components: {
      NavHeader,
      NavBread,
      NavFooter
    }
  }
</script>
