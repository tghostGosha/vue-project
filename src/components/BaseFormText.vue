<template >
  <BaseFormField :title="ФИО" :error="error">
    <label class="form__label">
      <input class="form__input" v-model="dataValue" type="text" :title="title" :placeholder="placeholder">
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
