<template>
  <button @click="onClick">{{ ttl }}</button>
</template>

<script>
export default {
  props: {
    ttl: String,
  },
  methods: {
    onClick() {
      this.$emit('onClick');
    }
  }
};
</script>

<style lang="scss" scoped>
button {
  color: #342C21;
  border: solid 1px #342C21;
  border-radius: 8px;
  padding: 2px 16px;
}
</style>
