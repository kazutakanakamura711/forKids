<template>
  <button @click="onClick">
    <span class="material-icons"> {{ label }} </span>
  </button>
</template>

<script>
export default {
  props: {
    label: null,
  },
  methods: {
    onClick() {
      this.$emit("onClick");
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  width: 100%;
}
button {
  font-family: "Fredericka the Great", cursive;
  letter-spacing: 4px;
  border-radius: 8px;
  color: #fff;
  background: red;
  padding: 2px 16px;
  opacity: 0.9;
  width: 100%;
  min-height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    font-size: 2rem;
  }
}
</style>
