<template >
  <BaseFormFieldVue :title="title" :error="error">

    <textarea class="form__input form__input--area" v-model="dataValue" :type="type"
      :placeholder="placeholder"></textarea>

  </BaseFormFieldVue>
</template>
<script>
import formFieldMixin from '@/mixins/formFieldMixin';

export default {

  mixins: [formFieldMixin],
};
</script>
