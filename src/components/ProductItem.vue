<template>

  <li class="catalog__item">

    <a class="catalog__pic" href="#" @click.prevent="goToPage('product', {id: product.id})">
      <img v-bind:src="product.image" v-bind:alt="product.title">
    </a>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title}}
      </a>
    </h3>

    <span class="catalog__price">
      {{product.price | numberFormat}} ₽
    </span>

    <ul class="colors colors--black">
      <li class="colors__item" v-for="color in product.colors" :key="color.id">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" :value="color">
          <span class="colors__value" :style="{background: color}">
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
  data() {
    return {
      color: '#73B6EA',
    };
  },
  filters: {
    numberFormat,
  },
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
    productColors: {
      type: Array,
      default() {
        return [];
      },
    },

  },
  methods: {
    goToPage,
  },
};

</script>
