<template >
  <BaseFormFieldVue :title="title" :error="error">

    <textarea class="form__input form__input--area" v-model="dataValue" :placeholder="placeholder"></textarea>

  </BaseFormFieldVue>
</template>
<script>
import formFieldMixin from '@/mixins/formFieldMixin';
import { defineComponent } from 'vue';

export default defineComponent({

  mixins: [formFieldMixin],
});
</script>
