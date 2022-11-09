<template>
  <div>
    <header class="header">
      <div class="header__wrapper container">
        <span class="header__info">Каталог</span>

        <a class="header__logo" href="#">
          <img src="img/svg/logo-tech.svg" alt="Логотип интернет магазина Технозавррр" width="190" height="33">
        </a>

        <a class="header__tel" href="tel:8 800 600 90 09">
          8 800 600 90 09
        </a>

        <CartIndicator></CartIndicator>
      </div>
    </header>

    <router-view></router-view>

    <FooterComponent></FooterComponent>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import CartIndicator from './components/CartIndicator.vue';
import FooterComponent from './components/FooterComponent.vue';

export default {
  components: { CartIndicator, FooterComponent },
  created() {
    const userAccessKey = localStorage.getItem('userAccessKey');
    if (userAccessKey) {
      this.updateUserAccessKey(userAccessKey);
    }
    this.loadCart(); // вызываем из глобального хранилища с помощью MapActions
  },
  methods: {
    ...mapActions(['loadCart']),
    ...mapMutations(['updateUserAccessKey']),
  },
};
</script>
