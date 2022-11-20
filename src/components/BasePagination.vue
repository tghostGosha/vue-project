<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a class="pagination__link pagination__link--arrow " href="#" aria-label="Предыдущая страница"
        @click.prevent="paginatePrev(page)" :class="{'pagination__link--disabled': page == 1}">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>

    <li class="pagination__item" v-for="pageNumber in pages" :key="pageNumber">
      <a href="#" class="pagination__link" :class="{ 'pagination__link--current': pageNumber === page }"
        @click.prevent="paginate(pageNumber)">
        {{ pageNumber }}
      </a>
    </li>

    <li class="pagination__item">
      <a class="pagination__link pagination__link--arrow" href="#" aria-label="Следующая страница"
        @click.prevent="paginateNext(page, pages)" :class="{ 'pagination__link--disabled': page === pages }">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script>
import { defineComponent } from 'vue';


export default defineComponent({

  props: ['modelValue', 'count', 'perPage'],
  computed: {
    page() {
      return this.modelValue
    },
    pages() {
      return Math.ceil(this.count / this.perPage);
    },
  },
  methods: {
    paginate(page) {
      this.$emit('update:modelValue', page);
    },
    paginatePrev(page) {
      if (page > 1) {
        this.$emit('update:modelValue', page - 1);
      } else {
        (
          console.log(page)
        );
      }
    },
    paginateNext(page, pages) {
      if (page < pages) {
        this.$emit('update:modelValue', page + 1);
      } else {
        (
          console.log(page)
        );
      }
    },
  },
});
</script>
