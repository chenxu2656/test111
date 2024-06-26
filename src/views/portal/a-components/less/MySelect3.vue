<script>
export default {
  name: 'MySelect3',
  props: {
    // selectedValue:String,
    modelValue: String,
    sequence: {
      type: String
    }
  },
  methods: {
    changeValue(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<template>
  <div>
    <label>{{ sequence }}</label>
    <select :value="modelValue" @change="changeValue">
      <option value="101">上海</option>
      <option value="102">广东</option>
      <option value="103">深圳</option>
      <option value="104">四川</option>
      <option value="105">北京</option>
      <option value="106">湖南</option>
    </select>
  </div>
</template>

<style scoped></style>
