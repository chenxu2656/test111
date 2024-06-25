<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { use_app_state_store } from '@/stores/systemStatus.ts'
import { storeToRefs } from 'pinia'

let appStates = use_app_state_store()
const { audios } = storeToRefs(appStates)

const audio = ref()
const iconPlay = ref()
let paused = ref(true)
const currentTime = ref(0)
const duration = ref(0)
const currentAudioIndex = ref(0)
const currentAudio = computed(() => audios.value[currentAudioIndex.value])

watch(
  () => currentAudioIndex.value,
  () => {
    //will reload audio source etc.
    audio.value.load()
    setTimeout(() => {
      duration.value = audio.value.duration
    }, 200)
    if (!paused.value) {
      console.log(' audio.value.play()')
      audio.value.play()
    }
  }
)
onMounted(() => {
  //load will  trigger input's timeupdate
  // 立刻获取duration会得到nan
  audio.value.load()
  setTimeout(() => {
    duration.value = audio.value.duration
  }, 400)

  document.addEventListener('touchstart', prePlayAudio)
  document.addEventListener('click', prePlayAudio)

  // 模拟dom点击也无法避免 user didn't interact with the document first
  /*    let event = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
        });
        document.dispatchEvent(event)*/
  //user didn't interact with the document first
  // document.addEventListener('scroll', prePlayAudio)
})

function prePlayAudio() {
  togglePlay()
  document.removeEventListener('click', prePlayAudio)
  document.removeEventListener('touchstart', prePlayAudio)
  document.removeEventListener('scroll', prePlayAudio)
}

function formatTime(number) {
  const minutes = Math.floor(number.value / 60)
  const seconds = number.value % 60
  const formattedDuration = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`
  return formattedDuration
}

function formatTime2(number) {
  if (!number) {
    return '00:00'
  }
  let minute = parseInt(number / 60)
  let second = parseInt(number % 60)

  minute = minute >= 10 ? minute : '0' + minute
  second = second >= 10 ? second : '0' + second
  return minute + ':' + second
}

function preAudio() {
  if (currentAudioIndex.value === 0) {
    currentAudioIndex.value = audios.value.length - 1
  } else {
    currentAudioIndex.value--
  }
}

function togglePlay() {
  audio.value.paused ? audio.value.play() : audio.value.pause()
  paused.value = audio.value.paused
}

function nextAudio() {
  if (currentAudioIndex.value === audios.value.length - 1) {
    currentAudioIndex.value = 0
  } else {
    currentAudioIndex.value++
  }
}

function setTime(e) {
  currentTime.value = e.target.currentTime
}

function demoEvent(e) {
  console.log('handleUpdate', e)
  // currentTime.value=$event.target.value
}
</script>

<template>
  <ainow-music-player class="vn-music-player">
    <img
      src="../../assets/img/musicPlayer.png"
      :class="{ 'animation-rotate': !paused }"
      alt="头像"
    />
    <div class="content">
      <h5>bgm-{{ currentAudio.name }}</h5>
      <div class="progress">
        {{ formatTime2(currentTime) }}

        <!--                <van-progress
                                    :percentage="currentTime/duration"
                                    :pivot-text="formatTime2(currentTime)"
                                    pivot-color="#7232dd"
                                    color="linear-gradient(to right, #be99ff, #7232dd)"
                                />-->
        <input
          type="range"
          v-model="currentTime"
          min="0"
          :max="duration"
          @input="audio.currentTime = $event.target.value"
        />
        {{ formatTime2(duration) }}
      </div>
    </div>
    <div class="btns">
      <van-icon name="arrow-left" size="24" @click="preAudio" />

      <van-icon
        ref="iconPlay"
        name="play-circle"
        size="30"
        v-if="paused"
        @click="togglePlay"
      />
      <van-icon name="pause-circle" size="30" v-else @click="togglePlay" />
      <van-icon name="arrow" size="24" @click="nextAudio" />
    </div>
    <!--        <audio ref="audio"  src="@/assets/audio/aThousandMiles.mp3" preload="auto" loop></audio>-->
    <!--        <audio ref="audio"  src="https://gitee.com/valnow/fixedPublicRepo/raw/master/donate/audio/ShedALight.mp3" preload="auto" loop></audio>-->

    <audio
      ref="audio"
      controls="controls"
      preload="auto"
      loop
      v-show="false"
      @timeupdate="setTime"
      @ended="nextAudio"
    >
      <!--            <source src="@/assets/audio/aThousandMiles.mp3" type="audio/mpeg">-->
      <source :src="currentAudio.url" type="audio/ogg" />
    </audio>
  </ainow-music-player>
</template>

<style scoped lang="less">
@import '../../assets/main.less';

.animation-rotate {
  animation: rotate 6s linear infinite;
  @keyframes-rotate-deg: 360deg;
}

ainow-music-player {
  width: 100%;
  height: 50px;
  border: rgba(0, 0, 0, 0.1) solid 1px;
  padding: 0 5%;
  background-color: white;
  overflow: hidden;

  display: flex;
  place-items: center;
  column-gap: 10px;
  color: @light-font-color;
  font-size: 16px;

  img {
    height: 90%;
    border-radius: 25px;
    border: 1px solid @light-border-color;
  }

  .content {
    display: flex;
    flex: 1;
    flex-direction: column;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-lines: 1;

    .progress {
      display: flex;
      place-items: center;
      width: 100%;
      color: gray;

      input {
        width: 100%;
        max-width: 600px;
        background-color: red;
        color: red;
        height: 6px;
      }
    }
  }

  .btns {
    display: flex;
    place-items: center;
    height: 100%;
    color: gray;
  }
}
</style>
