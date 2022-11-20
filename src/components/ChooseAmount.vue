<template>

  <div class="form__counter">
    <button type="button" aria-label="Убрать один товар" @click="amountMinus">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>
    <label for="count"></label>

    <input type="text" v-model.number="productAmount">

    <button type="button" aria-label="Добавить один товар" @click="amountPlus">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>

</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      productAmount: this.$attrs.modelValue,
    };
  },
  watch: {
    productAmount(modelValue) {
      this.$emit('update', modelValue);
      console.log(modelValue);
    },

  },
  methods: {

    amountPlus() {
      this.productAmount += 1;
    },
    amountMinus() {
      if (this.productAmount > 0) {
        this.productAmount -= 1;
      } else (console.log(this.productAmount));
    },

  },
  computed: {
    amount: {
      get() {
        return this.item.amount;
      },
      set(modelValue) {
        this.$store.dispatch('updateCartProduct', { productId: this.item.productId, amount: modelValue });
      },
    },
  },

});
</script>
