<template>
  <div class="game">
    <div v-show="isCountAnima" class="game__countAnime-container">
      <p class="game__countAnime-content">
        1
        <span class="game__countAnime-line"></span>
      </p>
      <p class="game__countAnime-content">
        2
        <span class="game__countAnime-line"></span>
      </p>
      <p class="game__countAnime-content">
        3
        <span class="game__countAnime-line"></span>
      </p>
    </div>
    <div v-show="!isCountAnima">
      <div class="game__head">
        <SmallButton
          :label="btnLabel.description"
          @onClick="openHowToPlayModal"
        />
        <div class="game__question">
          <span class="material-icons"> crisis_alert </span>
          1:<span class="game__question-circle">{{ viewQuestion[0] }}</span>
          2:<span class="game__question-circle">{{ viewQuestion[1] }}</span>
        </div>
        <div class="game__timeDisplay">
          <span class="material-icons"> timer </span>
          <span class="game__timeDisplay-time">{{ showPlayTime }}</span>
        </div>
      </div>
      <div class="game__map">
        <div
          v-for="(item, index) in maps"
          :key="index"
          :class="{
            colorWhite: item.isColorWhite,
            bgColorBlack: item.isBgColorBlack,
            colorBlack: item.isColorBlack,
            bgColorWhite: item.isBgColorWhite,
          }"
          class="game__tile border"
        >
          <div class="game__id">{{ item.id }}</div>
          <div class="game__img" :class="{ isHide: item.isHide }">
            <img src="~/assets/images/img-zero.png" alt="" :class="direction" />
          </div>
        </div>
        <div v-show="isComplete && isEnd" class="game__message">
          Congratulations
        </div>
        <div v-show="!isComplete && isEnd" class="game__message">Mistake</div>
      </div>
      <div class="game__bottom">
        <div class="game__controller">
          <div v-show="!run" class="game__arrow-container">
            <InstructionButton
              class="game__arrow-btn"
              :label="arrow.left"
              @onClick="setTurnLeft"
            />
            <InstructionButton
              class="game__arrow-btn"
              :label="arrow.center"
              @onClick="setGoStraight"
            />
            <InstructionButton
              class="game__arrow-btn"
              :label="arrow.right"
              @onClick="setTurnRight"
            />
          </div>
          <div v-show="run" class="game__arrow-container">
            <DisabledButton
              class="game__arrow-btn--disabled"
              :label="arrow.left"
            />
            <DisabledButton
              class="game__arrow-btn--disabled"
              :label="arrow.center"
            />
            <DisabledButton
              class="game__arrow-btn--disabled"
              :label="arrow.right"
            />
          </div>
          <div class="game__buttons-container">
            <InstructionButton
              class="game__buttons-btn"
              v-show="!run"
              :label="btnLabel.reset"
              @onClick="resetProgram"
            />
            <InstructionButton
              class="game__buttons-btn"
              v-show="!run"
              :label="btnLabel.run"
              @onClick="runProgram"
            />
            <DisabledButton
              class="game__buttons-btn--disabled"
              v-show="run"
              :label="btnLabel.reset"
            />
            <DisabledButton
              class="game__buttons-btn--disabled"
              v-show="run"
              :label="btnLabel.run"
            />
          </div>
          <div class="game__stock-container">
            <span class="material-icons"> inventory </span>
            <ul class="game__stock-area">
              <li v-for="(val, i) in stockProgram" :key="i">
                {{ i + 1 }}:<span class="material-icons">{{ val }}</span>
              </li>
            </ul>
          </div>

          <br>
            <span class="game__stock-area">
              Answer: Answer for the challenge will be shown here. 
            </span>
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

    <ModalSmall
      v-show="isOpenModal.continue"
      @onClick="closeContinueModal"
      :isCloseBtn="isCloseBtn.gameEnd"
    >
      <p v-show="isComplete" class="game__modalGameEndMsg">おめでとう！</p>
      <p v-show="isComplete" class="game__modalGameEndMsg">
        今回のタイムは{{ showPlayTime }}秒です
      </p>
      <p v-show="!isComplete" class="game__modalGameEndMsg">失敗。。。</p>
      <div class="game__modalBtnContainer">
        <BasicButton
          :label="'もう一度遊ぶ'"
          @onClick="reload"
          class="game__modalBtn"
        />
        <LinkTopButton class="game__modalBtn" />
      </div>
    </ModalSmall>
  </div>
</template>

<script>
import InstructionButton from "../components/InstructionButton.vue";
import DisabledButton from "../components/DisabledButton.vue";
import ModalBasic from "../components/ModalBasic.vue";
import HowToPlayText from "../components/HowToPlayText.vue";
import ModalSmall from "../components/ModalSmall.vue";
import LinkTopButton from "../components/LinkTopButton.vue";
import BasicButton from "../components/BasicButton.vue";
export default {
  data() {
    return {
      maps: [],
      tileLowCount: 5,
      tileCount: 25,
      rotate: 0,
      direction: {
        isUp: true,
        isRight: false,
        isDown: false,
        isLeft: false,
      },
      arrow: {
        left: "rotate_left",
        center: "straight",
        right: "rotate_right",
      },
      btnLabel: {
        run: "keyboard_return",
        reset: "delete",
        description: "description",
      },
      enter: "GO",
      programArr: [],
      run: false,
      noGoOnArr: {
        top: [],
        right: [],
        bottom: [],
        left: [],
      },
      viewQuestion: [],
      question: [],
      isComplete: false,
      targetCount: 0,
      isOpenModal: {
        howToPlay: false,
        continue: false,
      },
      playTime: 0,
      clearTime: "",
      isCloseBtn: {
        gameEnd: false,
        howToPlay: true,
      },
      isEnd: false,
      isCountAnima: true,
    };
  },
  computed: {
    stockProgram() {
      return this.programArr;
    },
    showPlayTime() {
      return (this.playTime / 10).toFixed(1);
    },
  },
  methods: {
    createMapsData() {
      let arr = [];
      for (let i = 0; i < this.tileCount; i++) {
        if (i === 22) {
          arr.push({
            id: i,
            isColorWhite: true,
            isBgColorBlack: true,
            isColorBlack: false,
            isBgColorWhite: false,
            isHide: false,
            passCheck: false,
          });
        } else if (i % 2 === 0) {
          arr.push({
            id: i,
            isColorWhite: true,
            isBgColorBlack: true,
            isColorBlack: false,
            isBgColorWhite: false,
            isHide: true,
            passCheck: false,
          });
        } else {
          arr.push({
            id: i,
            isColorWhite: false,
            isBgColorBlack: false,
            isColorBlack: true,
            isBgColorWhite: true,
            isHide: true,
            passCheck: false,
          });
        }
      }
      this.maps = arr;
      // console.log(this.maps);
    },
    createNoGoOnArr() {
      for (let i = 0; i < this.tileLowCount; i++) {
        this.noGoOnArr.top.push(i);
      }
      for (let i = 1; i < this.tileCount + 1; i++) {
        if (i % this.tileLowCount === 0) {
          this.noGoOnArr.right.push(i - 1);
        }
      }
      for (
        let i = this.tileCount - this.tileLowCount;
        i < this.tileCount;
        i++
      ) {
        this.noGoOnArr.bottom.push(i);
      }
      for (let i = 0; i < this.tileCount; i++) {
        if (i % this.tileLowCount === 0) {
          this.noGoOnArr.left.push(i);
        }
      }
    },
    createQuestion() {
      let arr = [];
      for (let i = 0; i < this.tileCount; i++) {
        arr.push(i);
      }
      for (let i = 0; i < 2; i++) {
        let random = arr[Math.floor(Math.random() * arr.length)];
        this.question.push(random);
        this.viewQuestion.push(random);
        // 同じ目的地が重複しない処理
        let delTarget = arr.find((val) => {
          return val === random;
        });
        arr.splice(delTarget, 1);
      }
      console.log(this.question);
    },
    setGoStraight() {
      this.programArr.push("straight");
    },
    setTurnLeft() {
      this.programArr.push("rotate_left");
    },
    setTurnRight() {
      this.programArr.push("rotate_right");
    },
    resetProgram() {
      this.programArr = [];
    },
    goStraight() {
      const current = this.maps.find((data) => data.isHide === false);
      console.log(current);
      if (this.direction.isUp) {
        // 画面の端まで来たらそれ以上は進ませない処理
        let noGoOn = this.noGoOnArr.top.some((val) => {
          return val === current.id;
        });
        console.log(noGoOn);
        if (noGoOn) {
          return;
        }
        const newCurrentLocation =
          current.id - this.tileCount / this.tileLowCount;

        for (let i = 0; i < this.tileCount; i++) {
          this.maps[i].isHide = true;
          if (i === newCurrentLocation) {
            this.maps[i].isHide = false;
            const img = document.getElementsByClassName("game__img");
            img[i].children[0].style.transform = `rotate(${this.rotate}deg)`;
            this.maps[i].passCheck = true;
            // ターゲット通過でタイルの色を変更
            if (this.maps[i].id === this.question[0]) {
              img[i].parentElement.style.background = `red`;
              this.question.shift();
              this.targetCount += 1;
              if (!this.programArr.length && this.targetCount === 2) {
                console.log("excellent");
                this.isComplete = true;
                this.targetCount = 0;
              }
            }
          }
        }
      }
      if (this.direction.isRight) {
        // 画面の端まで来たらそれ以上は進ませない処理
        let noGoOn = this.noGoOnArr.right.some((val) => {
          return val === current.id;
        });
        console.log(noGoOn);
        if (noGoOn) {
          return;
        }
        const newCurrentLocation = current.id + 1;
        for (let i = 0; i < this.tileCount; i++) {
          this.maps[i].isHide = true;
          if (i === newCurrentLocation) {
            this.maps[i].isHide = false;
            const img = document.getElementsByClassName("game__img");
            img[i].children[0].style.transform = `rotate(${this.rotate}deg)`;
            this.maps[i].passCheck = true;
            // ターゲット通過でタイルの色を変更
            if (this.maps[i].id === this.question[0]) {
              img[i].parentElement.style.background = `red`;
              this.question.shift();
              this.targetCount += 1;
              if (!this.programArr.length && this.targetCount === 2) {
                console.log("excellent");
                this.isComplete = true;
                this.targetCount = 0;
              }
            }
          }
        }
      }
      if (this.direction.isDown) {
        // 画面の端まで来たらそれ以上は進ませない処理
        let noGoOn = this.noGoOnArr.bottom.some((val) => {
          return val === current.id;
        });
        console.log(noGoOn);
        if (noGoOn) {
          return;
        }
        const newCurrentLocation =
          current.id + this.tileCount / this.tileLowCount;
        for (let i = 0; i < this.tileCount; i++) {
          this.maps[i].isHide = true;
          if (i === newCurrentLocation) {
            this.maps[i].isHide = false;
            const img = document.getElementsByClassName("game__img");
            img[i].children[0].style.transform = `rotate(${this.rotate}deg)`;
            this.maps[i].passCheck = true;
            // ターゲット通過でタイルの色を変更
            if (this.maps[i].id === this.question[0]) {
              img[i].parentElement.style.background = `red`;
              this.question.shift();
              this.targetCount += 1;
              if (!this.programArr.length && this.targetCount === 2) {
                console.log("excellent");
                this.isComplete = true;
                this.targetCount = 0;
              }
            }
          }
        }
      }
      if (this.direction.isLeft) {
        // 画面の端まで来たらそれ以上は進ませない処理
        let noGoOn = this.noGoOnArr.left.some((val) => {
          return val === current.id;
        });
        console.log(noGoOn);
        if (noGoOn) {
          return;
        }
        const newCurrentLocation = current.id - 1;
        for (let i = 0; i < this.tileCount; i++) {
          this.maps[i].isHide = true;
          if (i === newCurrentLocation) {
            this.maps[i].isHide = false;
            const img = document.getElementsByClassName("game__img");
            img[i].children[0].style.transform = `rotate(${this.rotate}deg)`;
            this.maps[i].passCheck = true;
            // ターゲット通過でタイルの色を変更
            if (this.maps[i].id === this.question[0]) {
              img[i].parentElement.style.background = `red`;
              this.question.shift();
              this.targetCount += 1;
              if (!this.programArr.length && this.targetCount === 2) {
                console.log("excellent");
                this.isComplete = true;
                this.targetCount = 0;
                setTimeout(() => {}, 1000);
              }
            }
          }
        }
      }
      console.log(this.maps);
    },
    directionCalculation(directionCalculation) {
      // 現在何度になっているかを判定しその角度にtrueを入れる
      if (directionCalculation < -360) {
        while (directionCalculation < -360) {
          directionCalculation += 360;
        }
        console.log("directionCalculation");
        console.log(directionCalculation);
        if (
          directionCalculation === 0 ||
          directionCalculation === -360 ||
          directionCalculation === 360
        ) {
          this.direction.isUp = true;
          this.direction.isRight = false;
          this.direction.isDown = false;
          this.direction.isLeft = false;
          console.log(this.direction);
          return;
        }
        if (directionCalculation === -90) {
          this.direction.isUp = false;
          this.direction.isRight = false;
          this.direction.isDown = false;
          this.direction.isLeft = true;
          console.log(this.direction);
          return;
        }
        if (directionCalculation === -180) {
          this.direction.isUp = false;
          this.direction.isRight = false;
          this.direction.isDown = true;
          this.direction.isLeft = false;
          console.log(this.direction);
          return;
        }
        if (directionCalculation === -270) {
          this.direction.isUp = false;
          this.direction.isRight = true;
          this.direction.isDown = false;
          this.direction.isLeft = false;
          console.log(this.direction);
          return;
        }
        if (directionCalculation === 90) {
          this.direction.isUp = false;
          this.direction.isRight = true;
          this.direction.isDown = false;
          this.direction.isLeft = false;
          console.log(this.direction);
          return;
        }
        if (directionCalculation === 180) {
          this.direction.isUp = false;
          this.direction.isRight = false;
          this.direction.isDown = true;
          this.direction.isLeft = false;
          console.log(this.direction);
          return;
        }
        if (directionCalculation === 270) {
          this.direction.isUp = false;
          this.direction.isRight = false;
          this.direction.isDown = false;
          this.direction.isLeft = true;
          console.log(this.direction);
          return;
        }
      } else {
        while (directionCalculation > 360) {
          directionCalculation -= 360;
        }
        console.log("directionCalculation");
        console.log(directionCalculation);
        if (
          directionCalculation === 0 ||
          directionCalculation === -360 ||
          directionCalculation === 360
        ) {
          this.direction.isUp = true;
          this.direction.isRight = false;
          this.direction.isDown = false;
          this.direction.isLeft = false;
          console.log(this.direction);
          return;
        }
        if (directionCalculation === -90) {
          this.direction.isUp = false;
          this.direction.isRight = false;
          this.direction.isDown = false;
          this.direction.isLeft = true;
          console.log(this.direction);
          return;
        }
        if (directionCalculation === -180) {
          this.direction.isUp = false;
          this.direction.isRight = false;
          this.direction.isDown = true;
          this.direction.isLeft = false;
          console.log(this.direction);
          return;
        }
        if (directionCalculation === -270) {
          this.direction.isUp = false;
          this.direction.isRight = true;
          this.direction.isDown = false;
          this.direction.isLeft = false;
          console.log(this.direction);
          return;
        }
        if (directionCalculation === 90) {
          this.direction.isUp = false;
          this.direction.isRight = true;
          this.direction.isDown = false;
          this.direction.isLeft = false;
          console.log(this.direction);
          return;
        }
        if (directionCalculation === 180) {
          this.direction.isUp = false;
          this.direction.isRight = false;
          this.direction.isDown = true;
          this.direction.isLeft = false;
          console.log(this.direction);
          return;
        }
        if (directionCalculation === 270) {
          this.direction.isUp = false;
          this.direction.isRight = false;
          this.direction.isDown = false;
          this.direction.isLeft = true;
          console.log(this.direction);
          return;
        }
      }
    },
    turnLeft() {
      console.log(this.direction);
      const img = document.getElementsByClassName("game__img");
      for (let i = 0; i < this.tileCount; i++) {
        if (img[i].className !== "game__img isHide") {
          this.rotate += -90;
          img[i].children[0].style.transform = `rotate(${this.rotate}deg)`;
          console.log("this.rotate");
          console.log(this.rotate);
          let directionCalculation = this.rotate;
          this.directionCalculation(directionCalculation);
        }
      }
    },
    turnRight() {
      console.log(this.direction);
      const img = document.getElementsByClassName("game__img");
      for (let i = 0; i < this.tileCount; i++) {
        if (img[i].className !== "game__img isHide") {
          this.rotate += 90;
          img[i].children[0].style.transform = `rotate(${this.rotate}deg)`;
          console.log("this.rotate");
          console.log(this.rotate);
          let directionCalculation = this.rotate;
          this.directionCalculation(directionCalculation);
        }
      }
    },
    runProgram() {
      this.run = true;
      if (this.programArr.length) {
        let val = this.programArr.shift();
        console.log(this.programArr);
        if (val === "straight") {
          this.goStraight();
        }
        if (val === "rotate_left") {
          this.turnLeft();
        }
        if (val === "rotate_right") {
          this.turnRight();
        }
      }
      if (!this.programArr.length) {
        clearInterval(this.clearTime);
        // this.run = false;
        this.isEnd = true;
        setTimeout(() => {
          this.openContinueModal();
        }, 2000);
        return;
      }
      setTimeout(() => {
        this.runProgram();
      }, 1000);
    },
    openHowToPlayModal() {
      this.isOpenModal.howToPlay = true;
    },
    closeHowToPlayModal() {
      this.isOpenModal.howToPlay = false;
    },
    openContinueModal() {
      this.isOpenModal.continue = true;
    },
    closeContinueModal() {
      this.isOpenModal.continue = false;
    },
    reload() {
      location.reload();
    },
    countUpTimer() {
      this.clearTime = setInterval(() => {
        this.playTime++;
      }, 100);
    },
  },
  mounted() {
    scrollTo({ top: 10000, behavior: "smooth" });
    setTimeout(() => {
      this.isCountAnima = false;
      this.countUpTimer();
    }, 3000);
  },
  created() {
    this.createMapsData();
    this.createNoGoOnArr();
    this.createQuestion();
  },
  components: {
    InstructionButton,
    DisabledButton,
    ModalBasic,
    HowToPlayText,
    ModalSmall,
    LinkTopButton,
    BasicButton,
  },
};
</script>

<style lang="scss" scoped>
@import "~assets/scss/variable";
.game {
  position: relative;
  &__countAnime {
    &-container {
      width: 100vw;
      height: 100vh;
      position: relative;
    }
    &-content {
      background: radial-gradient(black, transparent);
      background: black;
      border: double 16px #fff;
      border-radius: 50%;
      font-size: 16rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 5;
      width: 50vh;
      height: 50vh;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      &:nth-child(1) {
        animation-name: fadeout;
        animation-duration: 1s;
        animation-delay: 2s;
        span {
          animation-name: rotation1;
          animation-duration: 1s;
          animation-delay: 2s;
        }
      }
      &:nth-child(2) {
        animation-name: fadeout;
        animation-duration: 1s;
        animation-delay: 1s;
        span {
          animation-name: rotation1;
          animation-duration: 1s;
          animation-delay: 1s;
        }
      }
      &:nth-child(3) {
        animation-name: fadeout;
        animation-duration: 1s;
        span {
          animation-name: rotation1;
          animation-duration: 1s;
        }
      }
    }
    @keyframes fadeout {
      0% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
    @keyframes rotation1 {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    &-line {
      position: absolute;
      width: 2px;
      height: 25vh;
      background: red;
      top: 0;
      transform-origin: bottom;
    }
  }
  &__standby {
    position: absolute;
  }
  &__head {
    display: flex;
    justify-content: space-between;
    margin: 2%;
  }
  &__timeDisplay {
    display: flex;
    align-items: center;
    &-time {
      font-size: 1.8rem;
      width: 58px;
    }
  }
  &__map {
    font-family: "Bigelow Rules", cursive;
    font-family: "Fredericka the Great", cursive;
    font-family: "Kaisei Opti", serif;
    position: relative;
    display: grid;
    grid-template-columns: repeat(5, calc(100vw / 5));
    grid-template-rows: repeat(5, calc(100vw / 5));
    align-content: center;
    justify-content: center;
    margin-bottom: 8px;
    @media (min-width: $breakPoint) {
      grid-template-columns: repeat(5, calc(50vw / 5));
      grid-template-rows: repeat(5, calc(50vw / 5));
    }
  }
  &__tile {
    position: relative;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    &.colorWhite {
      color: #fff;
    }
    &.colorBlack {
      color: #000;
    }
    &.bgColorBlack {
      background: #0a0a0a;
    }
    &.bgColorWhite {
      background: #fff;
    }
    &.border {
      border: #0a0a0a solid 1px;
    }
  }
  &__id {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 4rem;
    opacity: 0.1;
  }
  &__img {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: 0.5s;
      &.isLeft {
        transform: rotate(-90deg);
      }
      &.isRight {
        transform: rotate(90deg);
      }
      &.isDown {
        transform: rotate(180deg);
      }
    }

    &.isHide {
      display: none;
    }
  }
  &__bottom {
    margin: 0 2%;
    @media (min-width: $breakPoint) {
      width: 50vw;
      margin: 0 auto;
    }
  }
  &__question {
    /* font-family: "Bigelow Rules", cursive; */
    font-family: "Fredericka the Great", cursive;
    font-size: 1.6rem;
    letter-spacing: 1px;
    display: flex;
    align-items: center;
    &-circle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 26px;
      height: 26px;
      background: red;
      border-radius: 50%;
      margin: 0 8px 0 2px;
    }
  }
  &__container {
    margin: 0 2%;
    @media (min-width: $breakPoint) {
      margin: 0;
    }
  }
  &__arrow {
    &-container {
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-bottom: 8px;
    }
    &-btn,
    &-btn--disabled {
      margin-right: 16px;
      border-radius: 8px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  &__buttons {
    &-container {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      @media (min-width: $breakPoint) {
        margin: 0 auto 32px;
      }
    }
    &-btn {
      width: 49%;
      border-radius: 8px;
      &--disabled {
        width: 49%;
        border-radius: 8px;
      }
    }
  }
  &__stock {
    &-container {
      display: flex;
    }
    &-area {
      font-size: 1.8rem;
      width: 100%;
      display: flex;
      flex-wrap: nowrap;
      overflow: scroll;
      & > li {
        margin-left: 8px;
        display: flex;
        align-items: center;
      }
    }
  }
  &__message {
    font-size: 3rem;
    font-family: "Fredericka the Great", cursive;
    letter-spacing: 4px;
    color: orange;
    letter-spacing: 0.4rem;
    position: absolute;
    top: 50%;
    left: 50%;
    white-space: nowrap;
    transform: translate(-50%, -50%);
    transition: 1s;
    @media (min-width: 356px) {
      font-size: 4rem;
    }
  }
  &__modalGameEndMsg {
    font-family: "Kaisei Opti", serif;
    font-size: 3.2rem;
    letter-spacing: 1px;
    margin-bottom: 16px;
    text-align: center;
  }
  &__modalBtnContainer {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  &__modalBtn {
    font-size: 1.6rem;
  }
}
</style>
