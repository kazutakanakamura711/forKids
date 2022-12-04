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
  padding: 8px 16px;
  a {
    color: #342c21;
  }
}
</style>
