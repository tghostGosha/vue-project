<template>
  <div>
    <!-- <slot></slot> -->
    <ul class="catalog__list">

      <ProductItems class="catalog__item" :products="products" @Myclick="test"/>

    </ul>
  </div>
</template>

<script>
import ProductItems from './ProductItems.vue';
import { defineComponent } from 'vue';
export default defineComponent({
  props: ['products'],
  components: { ProductItems },
 
});

</script>
