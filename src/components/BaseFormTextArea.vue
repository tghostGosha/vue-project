<template >
  <BaseFormField :title="title" :error="error">
    <label class="form__label">
      <textarea class="form__input form__input--area" v-model="dataValue"
        :placeholder="placeholder"></textarea>
    </label>
  </BaseFormField>
</template>
<script>
import BaseFormField from '@/components/BaseFormField.vue';

export default {
  props: ['title', 'error', 'placeholder', 'value'],
  components: [BaseFormField],
  computed: {
    dataValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },

};
</script>
