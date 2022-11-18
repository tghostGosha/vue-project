<template>

  <li class="catalog__item">

    <router-link class="catalog__pic" :to="{ name: 'product', params: { id: product.id } }">
      <img v-bind:src="product.image" v-bind:alt="product.title">
    </router-link>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
      {{ pricePretty }} ₽
    </span>

    <ul class="colors colors--black">
      <li class="colors__item" v-for="color in product.colors" :key="color.id">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" :name="color.title" :value="color.id">
          <!--checked=""-->
          <span class="colors__value" :style="{ background: color.code }">
          </span>
        </label>
      </li>
    </ul>
  </li>

</template>

<script>
import goToPage from '@/helpers/goToPage';
import numberFormat from '@/helpers/numberFormat';

export default {
  

  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },


  },
  computed: {
    pricePretty() {
      return numberFormat(this.product.price)
    },
  },
  methods: {
    goToPage,
  },
};

</script>
