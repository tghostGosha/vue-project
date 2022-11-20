<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        152 товара
      </span>
    </div>

    <div class="content__catalog">
      <ProductFilter v-model:price-from="filterPriceFrom" v-model:price-to="filterPriceTo"
        v-model:category-id="filterCategoryId" v-model:colorProdId="filterColorId">
      </ProductFilter>
      <section class="catalog">

        <loader v-if="productsLoading" object="#1ed25d" color1="#ffffff" color2="#2bb141" size="15" speed="2"
          bg="#343a40" objectbg="#999793" opacity="80" disableScrolling="false" name="circular"></loader>

        <div v-if="productsLoadingFailed">Произошла ошибка при загрузке товаров
          <button @click.prevent="loadProducts">Перезапустить</button>
        </div>
        <ProductList :products="products"></ProductList>

        <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage"></BasePagination>

      </section>
    </div>
  </main>
</template>

<script>
// import products from '@/data/products';
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import axios from 'axios';
import API_BASE_URL from '@/config';
import { defineComponent } from 'vue';

export default defineComponent({

  components: { ProductList, BasePagination, ProductFilter },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColorId: 0, //= Фильтрация цвета*
      page: 1,
      productsPerPage: 5,
      productsData: null,
      productsLoading: false,
      productsLoadingFailed: false,
    };
  },
  computed: {
    products() {
      return this.productsData
        ? this.productsData.items.map((product) => ({
          ...product,
          image: product.image.file.url,
        }))
        : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  methods: {
    loadProducts() {
      this.productsLoading = true;
      this.productsLoadingFailed = false;
      clearTimeout(this.loadProductsTimer); // Очищаем таймаут при вызове
      this.loadProductsTimer = setTimeout(() => { // Оборачиваем в тайм аут, чтобы вызов с сервера был только один
        axios.get(`${API_BASE_URL}/api/products`, {
          params: {
            page: this.page,
            limit: this.productsPerPage,
            categoryId: this.filterCategoryId,
            colorId: this.filterColorId,
            minPrice: this.filterPriceFrom,
            maxPrice: this.filterPriceTo,
          },
        })
          .then((response) => { this.productsData = response.data; })
          .catch(() => { this.productsLoadingFailed = true; })
          .then(() => { this.productsLoading = false; });
      }, 1000);
    },
  },
  watch: { // следим за фильтрацией и выбраннйо страницей, исходя из этого отрисовывем список
    page() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
    filterColorId() {
      this.loadProducts();
    },
  },
  created() {
    this.loadProducts();
  },
});
</script>
