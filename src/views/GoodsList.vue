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
          <a href="javascript:void(0)" class="price" @click="sortGoods">Price
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
              <dd><a href="javascript:void(0)" :class="{'cur':priceChecked=='all'}" @click="setPriceFilter(-1)">All</a>
              </dd>
              <dd v-for="(item,index) in priceFilter">
                <a href="javascript:void(0)" :class="{'cur':priceChecked==index}" @click="setPriceFilter(index)">{{item.startPrice}}
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
                    <a href="#"><img v-lazy="'/static/img/'+item.productImage"></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.salePrice}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
              <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30" class="load-more">
                <img src="/static/loading-svg/loading-spin.svg" v-show="loading">
              </div>
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
        showFilter: false,
        showMask: false,
        priceFilter: [
          {startPrice: 0, endPrice: 100},
          {startPrice: 100, endPrice: 500},
          {startPrice: 500, endPrice: 1000},
          {startPrice: 1000, endPrice: 2000},
          {startPrice: 2000, endPrice: 5000}
        ],
        priceChecked: 'all',
        sortFlag: true,
        page: 1,
        pageSize: 8,
        busy:true,
        loading:false
      }
    },
    mounted: function () {
      this.getGoodsList();
    },
    methods: {
      setPriceFilter(index) {
        if (index == -1) {
          this.priceChecked = 'all'
        } else {
          this.priceChecked = index
        }
        this.showFilter = false;
        this.page=1;
        this.getGoodsList();
      },
      showFilterFn() {
        this.showFilter = true;
      },
      addCart(productId){
        axios.post('/goods/addCart',{
          productId:productId
        }).then((result)=> {
          var res=result.data;
          if(res.status=='0'){
            alert('success')
          }else{
            alert('fail')
          }
        })
      },
      getGoodsList(flag) {
        var param = {
          page: this.page,
          pageSize: this.pageSize,
          sort: this.sortFlag ? 1 : -1,
          priceLevel:this.priceChecked
        };
        this.loading=true;
        axios.get('/goods', {params: param}).then((result) => {
          var res = result.data;
          this.loading=true;
          if (res.status=='0') {
            if(flag){
              this.goodsList = this.goodsList.concat(res.result.list);
              if(res.result.count==0){
                this.busy=true;
              }else{
                this.busy=false;
              }
            }else{
              this.goodsList = res.result.list;
              this.busy=false;
            }
          } else {
            this.goodsList =[];
          }
        });
      },
      sortGoods() {
        this.sortFlag = !this.sortFlag;
        this.page = 1;
        this.getGoodsList();
      },
      loadMore(){
        this.busy=true;
        setTimeout(()=>{
          this.page++;
          this.getGoodsList(true);
        },500)
      }
    },
    components: {
      NavHeader,
      NavBread,
      NavFooter
    }
  }
</script>
<style>
  .load-more{
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
</style>
