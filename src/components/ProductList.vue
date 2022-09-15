<template>
  <div>
    <!-- <slot></slot> -->
    <ul class="catalog__list">

      <ProductItem :product="item" v-for="(item) in products" v-bind:key="item.id"></ProductItem>

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
