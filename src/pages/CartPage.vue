<template>

  <main class="content container">
    <loader v-if="productLoading" object="#1ed25d" color1="#ffffff" color2="#2bb141" size="15" speed="2" bg="#343a40"
      objectbg="#999793" opacity="80" disableScrolling="false" name="circular"></loader>

    <div v-else-if="productLoadingFailed">Произошла ошибка при загрузке товара
      <button @click.prevent="loadProducts">Перезапустить</button>
    </div>

    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        3 товара
      </span>
    </div>

    <section class="cart">

      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <CartItem v-for="item in products" :key="item.productId" :item="item">
              <div class="product__pic">
                <img :src="item.product.image" width="120" height="120" :alt="item.product.title">
              </div>
              <h3 class="product__title">
                {{item.product.title}}
              </h3>

              <span class="product__code">
                Артикул: {{item.product.id}}
              </span>

              <div class="product__counter form__counter">
                <button type="button" aria-label="Убрать один товар">
                  <svg width="10" height="10" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>
                <label for="count"></label>
                <input type="text" :value="item.amount" name="count">

                <button type="button" aria-label="Добавить один товар">
                  <svg width="10" height="10" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
              </div>

              <b class="product__price">
                {{(item.amount*item.product.price) | numberFormat}} ₽
              </b>

              <button class="product__del button-del" type="button" aria-label="Удалить товар из корзины">
                <svg width="20" height="20" fill="currentColor">
                  <use xlink:href="#icon-close"></use>
                </svg>
              </button>
            </CartItem>

          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{totalPrice | numberFormat}} ₽</span>
          </p>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import { mapGetters } from 'vuex';
import CartItem from '@/components/CartItem.vue';
import goToPage from '@/helpers/goToPage';
import axios from 'axios';
import API_BASE_URL from '@/config';

export default {
  data() {
    return {
      productData: null,
      productLoading: false,
      productLoadingFailed: false,

    };
  },
  filters: { numberFormat },
  components: { CartItem },
  computed: {
    ...mapGetters({ products: 'cartDetailProducts', totalPrice: 'cartTotalPrice' }), //= =Проксируем//
  },
  methods: {
    goToPage,
    loadProducts() {
      this.productLoading = true;
      this.productLoadingFailed = false;
      clearTimeout(this.loadProductsTimer); // Очищаем таймаут при вызове
      this.loadProductsTimer = setTimeout(() => { // Оборачиваем в тайм аут, чтобы вызов с сервера был только один
        axios.get(`${API_BASE_URL}/api/baskets`)
          .then((response) => { this.productData = response.data; })
          .catch(() => { this.productLoadingFailed = true; })
          .then(() => { this.productLoading = false; });
      }, 1000);
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>
