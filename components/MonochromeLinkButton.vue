<template>
  <button>
    <nuxt-link :to="to">
      <span>{{ ttl }}</span>
    </nuxt-link>
  </button>
</template>

<script>
export default {
  props: {
    to: String,
    ttl: String,
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
  border: solid 1px #342c21;
  border-radius: 8px;
  a {
    color: #342c21;
  }
  span {
    padding: 2px 16px;
  }
}
</style>
