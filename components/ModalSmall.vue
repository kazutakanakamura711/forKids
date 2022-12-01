<template>
  <div class="modal">
    <div class="modal__overlay"></div>
    <div class="modal__content">
      <span v-show="isCloseBtn" class="material-icons modal__closeBtn" @click="onClick">close</span>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isCloseBtn: Boolean,
  },
  methods: {
    onClick() {
      this.$emit('onClick');
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/scss/variable";
.modal {
  &__overlay {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    position: fixed;
    top: 0;
    left: 0;
  }
  &__content {
    width: 84vw;
    max-width: 512px;
    padding: 24px;
    background: #fff;
    border-radius: 8px;
    position: absolute;
    top: 50vh;
    left: 50%;
    transform: translate(-50%, -50%);
    word-break: break-word;
    z-index: 1;
    @media (min-width: $breakPoint) {
      top: 50%;
    }
  }
  &__closeBtn {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    background: red;
    border-radius: 50%;
    position: absolute;
    top: -16px;
    right: -16px;
  }
}
</style>
