<template>
  <button disabled>
    <span class="material-icons"> {{ label }} </span>
  </button>
</template>

<script>
export default {
  props: {
    label: null,
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
  font-size: 3rem;
  color: #fff;
  background: gray;
  padding: 2px 16px;
  opacity: 0.9;
  // width: 92%;
  // margin: 0 4%;
  width: 100%;
  min-height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    font-size: 2rem;
  }
}
</style>
