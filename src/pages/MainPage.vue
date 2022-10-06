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
      <ProductFilter :price-from.sync="filterPriceFrom" :price-to.sync="filterPriceTo"
        :category-id.sync="filterCategoryId" :colorProd.sync="filterColor">
      </ProductFilter>
      <section class="catalog">

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

export default {

  components: { ProductList, BasePagination, ProductFilter },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColor: '', //= Фильтрация цвета*
      page: 1,
      productsPerPage: 5,
      productsData: null,
    };
  },
  computed: {
    // filteredProducts() {
    //   let filteredProducts = products;

    //   console.log(filteredProducts);
    //   if (this.filterColor) {
    //     filteredProducts = filteredProducts.filter((product) => product.colors.includes(this.filterColor));
    //   }
    //   if (this.filterPriceFrom > 0) {
    //     filteredProducts = filteredProducts.filter((product) => product.price > this.filterPriceFrom);
    //   }

    //   if (this.filterPriceTo > 0) {
    //     filteredProducts = filteredProducts.filter((product) => product.price < this.filterPriceTo);
    //   }

    //   if (this.filterCategoryId) {
    //     filteredProducts = filteredProducts.filter((product) => product.categoryID === this.filterCategoryId);
    //   }

    //   return filteredProducts;
    // },
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
      clearTimeout(this.loadProductsTimer); // Очищаем таймаут при вызове
      this.loadProductsTimer = setTimeout(() => { // Оборачиваем в тайм аут, чтобы вызов с сервера был только один
        axios.get(`${API_BASE_URL}/api/products`, {
          params: {
            page: this.page,
            limit: this.productsPerPage,
            categoryId: this.filterCategoryId,
            colorId: this.filterColor,
            minPrice: this.filterPriceFrom,
            maxPrice: this.filterPriceTo,
          },
        })
          .then((response) => { this.productsData = response.data; });
      }, 0);
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
    categoryId() {
      this.loadProducts();
    },
    colorId() {
      this.loadProducts();
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>
