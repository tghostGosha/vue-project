<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="item.product.image" width="120" height="120" :alt="item.product.title">
    </div>
    <h3 class="product__title">
      {{ item.product.title }}
    </h3>

    <span class="product__code">
      Артикул: {{ item.product.id }}
    </span>

    <ChooseAmount v-model.number="amount"></ChooseAmount>

    <b class="product__price">
      {{ totalPricePretty }} ₽
    </b>

    <button class="product__del button-del" type="button" aria-label="Удалить товар из корзины"
    @click.prevent="deleteProduct(item.productId)">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import { mapActions } from 'vuex';
import ChooseAmount from './ChooseAmount.vue';

export default {

  components: { ChooseAmount },

  props: ['item'],
  computed: {
    totalPricePretty() {
      return numberFormat(this.item.amount * this.item.product.price)
    },
    amount: {
      get() {

        return this.item.amount;
      },
      set(value) {
        this.$store.dispatch('updateCartProductAmount', { productId: this.item.productId, amount: value });
      },
    },
  },
  methods: {
    // ...mapMutations({ deleteProduct: 'deleteCartProduct' }),
    ...mapActions(['deleteProductFromCart']),

    deleteProduct() {
      // this.productAdded = false;
      // this.productAddSending = true;

      this.deleteProductFromCart({ productId: this.item.productId });
      // .then(() => {
      //   this.productAdded = true;
      //   this.productAddSending = false;
      // });
    },

  },
};
</script>
