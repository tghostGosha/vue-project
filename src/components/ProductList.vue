<template>
  <div>
    <!-- <slot></slot> -->
    <ul class="catalog__list">

      <ProductItem :product="item" v-for="(item, index) in products" v-bind:key="index"></ProductItem>

    </ul>
  </div>
</template>

<script>
import ProductItem from './ProductItem.vue';

export default {
  props: ['products'],
  components: { ProductItem },
};

</script>
