<template>
  <aside class="filter">
    <h2  class="filter__title">Фильтры</h2>

    <form v-bind="$attrs" class="filter__form form" action="#" method="get" @submit.prevent="submit">
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="min-price" v-model.number="currentPriceFrom">
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="max-price" v-model.number="currentPriceTo">
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select class="form__select" name="category" v-model.number="currentCategoryId">
            <option value="0">Все категории</option>
            <option :value="category.id" v-for="category in categories" :key="category.id">{{category.title}}</option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
        <ul class="colors">
          <li class="colors__item" v-for="color in productsColor" :key="color.id">
            <label class="colors__label">
              <input class="colors__radio sr-only" type="radio" :name="color.title" :value="color.id"
                v-model.number="currentColorId">
              <span class="colors__value" :style="{background: color.code}">
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Объемб в ГБ</legend>
        <ul class="check-list">
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="8" checked="">
              <span class="check-list__desc">
                8
                <span>(313)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="16">
              <span class="check-list__desc">
                16
                <span>(461)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="32">
              <span class="check-list__desc">
                32
                <span>(313)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="64">
              <span class="check-list__desc">
                64
                <span>(313)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="128">
              <span class="check-list__desc">
                128
                <span>(313)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="264">
              <span class="check-list__desc">
                264
                <span>(313)</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <button class="filter__submit button button--primery" type="submit">
        Применить
      </button>
      <button class="filter__reset button button--second" type="button" @click.prevent="reset">
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
// import categories from '@/data/categories';
// import products from '@/data/products';
import axios from 'axios';
import API_BASE_URL from '@/config';
import { defineComponent } from 'vue';
export default defineComponent({
  data() {
    return {
      currentPriceFrom: this.priceFrom,
      currentPriceTo: this.priceTo,
      currentCategoryId: this.categoryId,
      currentColorId: this.colorProdId,
      categoriesData: null,
      colorsData: null,
    };
  },
  // props2: ['priceFrom', 'priceTo', 'categoryId', 'colorProdId'],
  props: {
    categoryId: {
      type: Number,
      default: 0,
    },

    priceFrom: {
      type: Number,
      default: 0,
    },

    priceTo: {
      type: Number,
      default: 0,
    },

    colorProdId: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    productsColor() {

      console.log(this.colorsData);
      return this.colorsData ? this.colorsData.items : [];
    },

    categories() {
      return this.categoriesData ? this.categoriesData.items : [];
    },
  },

  watch: {
    priceFrom(modelValue) {
      this.currentPriceFrom = modelValue;
    },
    priceTo(modelValue) {
      this.currentPriceTo = modelValue;
    },
    categoryId(modelValue) {
      this.currentCategoryId = modelValue;
    },
    colorProdId(modelValue) {
      this.currentColorId = modelValue;
    },
  },
  methods: {

    submit() {
      this.$emit('update:priceFrom', this.currentPriceFrom);
      this.$emit('update:priceTo', this.currentPriceTo);
      this.$emit('update:categoryId', this.currentCategoryId);
      this.$emit('update:colorProdId', this.currentColorId);
      console.log([this.currentColorId, this.currentCategoryId, this.currentPriceFrom, this.currentPriceTo]);
    },
    reset() {
      this.$emit('update:priceFrom', 0);
      this.$emit('update:priceTo', 0);
      this.$emit('update:categoryId', 0);
      this.$emit('update:colorProdId', 0);
    },
    loadCategories() {
      axios.get(`${API_BASE_URL}/api/productCategories`)
        .then((response) => { this.categoriesData = response.data; });
    },
    loadColors() {
      axios.get(`${API_BASE_URL}/api/colors`)
        .then((response) => { this.colorsData = response.data; });
    },
  },
  created() {
    this.loadCategories();
    this.loadColors();
  },
});

</script>
