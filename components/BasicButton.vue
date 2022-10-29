<template>
  <button @click="onClick">{{ label }}</button>
</template>

<script>
export default {
  props: {
    label: String,
  },
  methods: {
    onClick() {
      this.$emit('onClick');
    },
  },
}
</script>

<style lang="scss" scoped>
button {
  font-family: "Kaisei Opti", serif;
  width: fit-content;
  color: #fff;
  background: red;
  padding: 6px;
  border-radius: 4px;
  letter-spacing: 1px;
}
</style>
