<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'cart' }">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{ products.length }} {{ (this.products.length) }}
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">

            <BaseFormText v-model="formData.name" title="ФИО" :error="formError.name"
              placeholder="Введите ваше полное имя"></BaseFormText>

            <BaseFormText v-model="formData.address" title="Адрес доставки" :error="formError.address"
              placeholder="Введите ваш адрес"></BaseFormText>

            <BaseFormText v-model="formData.phone" title="Телефон" type="tel" :error="formError.phone"
              placeholder="Введите ваш телефон"></BaseFormText>

            <BaseFormText v-model="formData.email" title="email" type="email" :error="formError.email"
              placeholder="Введи ваш Email"></BaseFormText>

            <BaseFormTextArea title="Комментарий к заказу" v-model="formData.comment" placeholder="Ваши пожелания"
              :error="formError.comment"></BaseFormTextArea>
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="0" checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card" checked="">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>
        <CartProductListVue :items="products">
          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>{{ products.length }}</b>
              {{ (products.length)}} на сумму <b>{{
                  totalPricePretty
              }} ₽
              </b></p>
          </div>
          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </CartProductListVue>
        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>
<script>
import numberFormat from '@/helpers/numberFormat';
import BaseFormText from '@/components/BaseFormText.vue';
import BaseFormTextArea from '@/components/BaseFormTextArea.vue';
import API_BASE_URL from '@/config';
import axios from 'axios';
import { mapGetters } from 'vuex';
// import wordChangeEnding from '@/helpers/wordChangeEnding';
import CartProductListVue from '@/components/CartProductList.vue';
import { defineComponent } from 'vue';
export default defineComponent({
  components: { BaseFormText, BaseFormTextArea, CartProductListVue },

  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: '',
    };
  },

  computed: {
    ...mapGetters({ products: 'cartDetailProducts', totalPrice: 'cartTotalPrice' }),
    totalPricePretty() {
      return numberFormat(this.totalPrice)
    },
  },
  methods: {
    order() {
      this.formError = {};
      this.formErrorMessage = '';
      return axios
        .post(`${API_BASE_URL}/api/orders`, {
          ...this.formData,

        }, {
          params: {
            userAccessKey: this.$store.state.userAccessKey,
          },
        })
        .then((response) => {
          this.$store.commit('resetCart');
          this.$store.commit('updateOrderInfo', response.data);
          this.$router.push({ name: 'orderInfo', params: { id: response.data.id } });
        })
        .catch((error) => {
          this.formError = error.response.data.error.request || {};
          this.formErrorMessage = error.response.data.error.message;
        });
    },

  },

});
</script>
