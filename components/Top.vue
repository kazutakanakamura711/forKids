<template>
  <div class="top">
    <div class="top__bg">
      <div class="top__main">
        <h1 class="top__ttl">
          <span>{{ ttl.txt }}</span>
          <span>{{ ttl.sub }}</span>
          <img class="top__ttl-img" :src="ttl.img" alt="" />
        </h1>
        <div class="top__btnContainer">
          <MonochromeLinkButton
            class="top__btn"
            :to="goToGameBtn.to"
            :ttl="goToGameBtn.ttl"
          />
          <MonochromeButtonToOpenModal
            class="top__btn"
            :ttl="howToPlayBtn"
            @onClick="openHowToPlayModal"
          />
        </div>
      </div>
    </div>
    <!-- modal -->
    <ModalBasic
      v-show="isOpenModal.howToPlay"
      @onClick="closeHowToPlayModal"
      :isCloseBtn="isCloseBtn.howToPlay"
    >
      <HowToPlayText />
    </ModalBasic>
  </div>
</template>

<script>
import MonochromeButtonToOpenModal from "./MonochromeButtonToOpenModal.vue";
import MonochromeLinkButton from "./MonochromeLinkButton.vue";
export default {
  components: { MonochromeButtonToOpenModal, MonochromeLinkButton },
  data() {
    return {
      ttl: {
        txt: "Programming",
        sub: "ForKids",
        img: require("~/assets/images/img-ttl.png"),
      },
      goToGameBtn: {
        ttl: "はじめる",
        to: "/game",
      },
      howToPlayBtn: "遊び方",
      isOpenModal: {
        howToPlay: false,
      },
      isCloseBtn: {
        howToPlay: true,
      },
    };
  },
  methods: {
    openHowToPlayModal() {
      this.isOpenModal.howToPlay = true;
    },
    closeHowToPlayModal() {
      this.isOpenModal.howToPlay = false;
    },
  },
};
</script>

<style lang="scss">
@import "~assets/scss/variable";
@import url("https://fonts.googleapis.com/css2?family=Kaisei+Opti&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Fredericka+the+Great&family=Kaisei+Opti&display=swap");

.top {
  width: 100vw;
  height: 100vh;
  /*背景画像の設定*/
  // background-image: url("~/assets/images/img-top.jpg");
  background-color: $baseGbColor;
  background-size: cover;
  background-repeat: no-repeat;
  &__bg {
    height: 100%;
    background-color: rgba(255, 255, 255, 0.5);
    justify-content: center;
    align-items: center;
  }
  &__main {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &__ttl {
    & span {
      display: block;
      color: orange;
      font-size: 3.8rem;
      letter-spacing: 4px;
      text-align: center;
      font-family: "Fredericka the Great", cursive;
      // font-family: 'Kaisei Opti', serif;
      margin-bottom: 64px;
    }
    & img {
      width: 100%;
      display: block;
      margin: 0 auto 64px;
    }
  }
  &__btn {
    font-size: 3rem;
    display: block;
    margin: 0 auto 16px;
    font-family: "Bigelow Rules", cursive;
    font-family: "Fredericka the Great", cursive;
    font-family: "Kaisei Opti", serif;
    transition: 0.3s;
    &:hover {
      opacity: 0.3;
    }
    &:last-child {
      margin: 0 auto;
    }
  }
}
</style>
