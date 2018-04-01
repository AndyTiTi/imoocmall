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
          <a href="javascript:void(0)" class="price" @click="sortGoods" :class="{'sort-up':!sortFlag}">Price
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-arrow-short" :class="{'sort-up': !sortFlag}" fill="black">
              <use xlink:href="#icon-arrow-short"></use>
            </svg>
            <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
              <!-- Created with Method Draw - http://github.com/duopixel/Method-Draw/ -->
              <defs>
                <filter height="200%" width="200%" y="-50%" x="-50%" id="svg_1_blur">
                  <feGaussianBlur stdDeviation="0" in="SourceGraphic"/>
                </filter>
                <radialGradient gradientTransform="rotate(36.620689655172406,0.5,0.5) translate(0,0.3275862068965517) scale(1,0.3448275862068966)" r="2.017591" cy="0.5" cx="0.5" spreadMethod="pad" id="svg_6">
                  <stop offset="0" stop-color="#000000"/>
                  <stop offset="1" stop-color="#ffffff"/>
                </radialGradient>
              </defs>
              <g>
                <title>background</title>
                <rect fill="#fff" id="canvas_background" height="402" width="582" y="-1" x="-1"/>
                <g display="none" overflow="visible" y="0" x="0" height="100%" width="100%" id="canvasGrid">
                  <rect fill="url(#gridpattern)" stroke-width="0" y="0" x="0" height="100%" width="100%"/>
                </g>
              </g>
              <g>
                <title>Layer 1</title>
                <path filter="url(#svg_1_blur)" opacity="0.42" stroke="#fff" transform="rotate(89.8485336303711 290.060546875,200.02349853515628) " id="svg_1" d="m272.741147,246.697411l60.406953,-28.827998l-116.793895,0l-116.79364,0l0,-17.845896l0,-17.845915l115.453781,0c63.49949,0 115.453691,-0.904515 115.453691,-2.01004c0,-1.1055 -25.278948,-14.078105 -56.175374,-28.827992l-56.175553,-26.817983l51.923376,0l51.923185,0l79.298463,37.78712l79.298425,37.787102l-79.450543,37.714803l-79.450517,37.714803l-54.662685,0l-54.662813,0l60.407119,-28.82801l0.000026,0.000006z" stroke-width="1.5" fill="url(#svg_6)"/>
              </g>
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
                    <a href="#"><img v-lazy="'/static/'+item.productImage"></a>
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
    <modal :mdShow="mdShow" @close="closeModal">
      <p slot="message">
        请先登录，否则无法加入到购物车
      </p>
      <div slot="btnGroup">
        <a class="btn btn--m" href="javascript:;" @click="mdShow=false">关闭</a>
      </div>
    </modal>
    <modal :mdShow="mdShowCart" @close="closeModal">
      <p slot="message">
        <svg class="icon-status-ok">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
        </svg>
        <span>加入购物车成功！</span>
      </p>
      <div slot="btnGroup">
        <a class="btn btn--m" href="javascript:;" @click="mdShowCart=false">继续购物</a>
        <router-link class="btn btn--m" href="javascript:;" to="/cart">查看购物车</router-link>
      </div>
    </modal>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
  import './../assets/css/base.css'
  import './../assets/css/product.css'
  import NavHeader from '@/components/Header.vue'
  import NavBread from '@/components/Bread.vue'
  import Modal from '@/components/Modal.vue'
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
        loading:false,
        mdShow:false,
        mdShowCart:false
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
            this.mdShowCart = true;
            this.$store.commit('updateCartCount',1)
          }else{
            this.mdShow = true;
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
        axios.get('/goods/list', {params: param}).then((result) => {
          var res = result.data;
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
          this.loading = false;
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
      },
      closeModal(){
        this.mdShow = false;
        this.mdShowCart = false;
      }
    },
    components: {
      NavHeader,
      NavBread,
      NavFooter,
      Modal
    }
  }
</script>
<style>
  .load-more{
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .sort-up{
    transform: rotate(180deg);
    transition: all .3s ease-out;
  }
</style>
