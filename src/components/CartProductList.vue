<template >
  <div class="cart__block">
    <ul class="cart__orders">
      <li class="cart__order" v-for="item in items" :key="item.product.id" :item="item">
        <h3>{{ item.product.title }}</h3>
        <b>{{ pricePretty}} ₽</b>
        <span>Артикул: {{ item.product.id }}</span>
      </li>
    </ul>

    <slot></slot>
  </div>
</template>
<script>
// import { mapGetters } from 'vuex';
// import wordChangeEnding from '@/helpers/wordChangeEnding';
import numberFormat from '@/helpers/numberFormat';
import { defineComponent } from 'vue';

export default defineComponent({

  // data() {
  //   return {};
  // },

  computed: {
   pricePretty() {
      return numberFormat(this.item.product.price)
    },
  },
  props: {
    items: {
      type: Object,
    },
  },
  // computed: {
  //   ...mapGetters({ products: 'cartDetailProducts', totalPrice: 'cartTotalPrice' }),
  // },
  methods: {

  },
});
</script>
