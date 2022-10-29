<template>
  <button @click="onClick">
    <span class="material-icons">{{ label }}</span>
  </button>
</template>

<script>
export default {
  props: {
    label: String,
  },
  methods: {
    onClick() {
      this.$emit("onClick");
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  font-family: "Kaisei Opti", serif;
  width: fit-content;
  color: #fff;
  background: red;
  padding: 6px;
  border-radius: 4px;
}
</style>
