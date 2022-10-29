<template>
  <div class="howToPlay">
    <h2>遊び方</h2>
    <ul>
      <li>飛行機を操縦し目的地を順番に通過して、最終目的地にぴったり着陸しましょう。</li>
      <li>
        例
        <div class="howToPlay__example">
          <span class="material-icons"> crisis_alert </span>
          1:<span class="howToPlay__example-circle">7</span>
          2:<span class="howToPlay__example-circle">11</span>
        </div>
      </li>
      <li>最初に7番のマスを通過し、次に11番のマスに止まってください。</li>
      <li>ボタンの説明</li>
      <li class="howToPlay__flexContainer">
        <span class="howToPlay__desc-btn material-icons"> rotate_left </span>
        <p>飛行機が左に向きます。</p>
      </li>
      <li class="howToPlay__flexContainer">
        <span class="howToPlay__desc-btn material-icons"> straight </span>
        <p>飛行機が直進します。</p>
      </li>
      <li class="howToPlay__flexContainer">
        <span class="howToPlay__desc-btn material-icons"> rotate_right </span>
        <p>飛行機が右に向きます。</p>
      </li>
      <li class="howToPlay__flexContainer">
        <span class="howToPlay__desc-btn material-icons"> delete </span>
        <p>入力したプログラムをリセットします。</p>
      </li>
      <li class="howToPlay__flexContainer">
        <span class="howToPlay__desc-btn material-icons"> keyboard_return </span>
        <p>入力したプログラムを実行します。</p>
      </li>
      <li>入力したプログラムの確認</li>
      <li>
        <span class="howToPlay__inventory material-icons"> inventory </span>アイコンの下に、入力したボタンが順番に表示されます。入力数が多い場合はスライドして確認してください。
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.howToPlay {
  /* font-family: 'Bigelow Rules', cursive;
  font-family: 'Fredericka the Great', cursive; */
  font-family: 'Kaisei Opti', serif;
  overflow-y: scroll;
  height: 100%;
  h2 {
    font-size: 3rem;
    text-align: center;
    margin-bottom: 16px;
  }
  ul {
    font-size: 1.6rem;
    line-height: 26px;
    li {
      margin-bottom: 16px;
    }
  }
  &__example {
    /* font-family: "Bigelow Rules", cursive; */
    font-family: "Fredericka the Great", cursive;
    font-size: 1.6rem;
    letter-spacing: 1px;
    margin-bottom: 8px;
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
  &__desc{
    &-btn {
      color: #fff;
      background: red;
      border-radius: 4px;
      margin-right: 8px;
      padding: 0 8px;
    }
  }
  &__flexContainer {
    display: flex;
    align-items: center;
  }
  &__inventory {
    vertical-align: top;
  }
}
</style>
