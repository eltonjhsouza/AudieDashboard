<template>
  <q-card class="player-fullwidth" style="width: 100% !important;">
    <q-linear-progress
      v-if="isAudio"
      :value="selectedMediaFile.currentTime / selectedMediaFile.duration"
      color="deep-orange"
    />
    <q-linear-progress v-else :value="videoProgress" color="deep-orange" />

    <q-card-section v-if="isAudio" class="row items-center no-wrap">
      <div>
        <q-card flat square class="q-mr-md q-pa-sm bg-blue-grey-2">
          <q-icon size="30px" color="blue-grey-4" name="mdi-music" />
        </q-card>
      </div>
      <div>
        <div class="text-weight-bold">{{ selectedMediaFile.filename }}</div>
        <div class="text-grey" v-if="selectedMediaFile.artist !== '-'">
          {{ selectedMediaFile.artist }}
        </div>
        <div class="text-grey" v-else>
          {{ selectedMediaFile.archive }}
        </div>
      </div>

      <q-space />

      <audio
        id="audioTag"
        preload="none"
        ref="audioFile"
        :src="selectedMediaFile.file"
      ></audio>

      <q-btn
        v-if="isPlaying"
        flat
        round
        icon="pause"
        @click="pause(selectedMediaFile.fileId)"
      />
      <q-btn
        v-else
        flat
        round
        icon="play_arrow"
        @click="play(selectedMediaFile.fileId)"
      />
      <q-btn
        flat
        round
        icon="stop"
        :disabled="selectedMediaFile.currentTime <= 0"
        @click="stop(selectedMediaFile.fileId)"
      />
      <q-btn flat round icon="close" v-close-popup />
    </q-card-section>

    <q-card-section v-else class="row items-center no-wrap">
      <div>
        <video
          id="videoTag"
          class="q-mr-md video-container"
          preload="none"
          ref="videoFile"
          :src="selectedMediaFile.file"
          style="width:200px;"
        ></video>
      </div>
      <div>
        <div class="text-weight-bold">{{ selectedMediaFile.filename }}</div>
        <div class="text-grey" v-if="selectedMediaFile.artist !== '-'">
          {{ selectedMediaFile.artist }}
        </div>
        <div class="text-grey" v-else>
          {{ selectedMediaFile.archive }}
        </div>
      </div>

      <q-space />

      <q-btn
        id="btnPlayPause"
        flat
        round
        :icon="playVideoIcon"
        title="play"
        accesskey="P"
        @click="playPauseVideo(selectedMediaFile.fileId)"
      />
      <q-btn
        id="btnStop"
        title="stop"
        accesskey="X"
        flat
        round
        icon="stop"
        @click="stopVideo()"
      />
      <q-btn
        id="btnFullScreen"
        title="toggle full screen"
        accesskey="T"
        flat
        round
        icon="fullscreen"
        @click="toggleFullScreen()"
      />
      <q-btn flat round icon="close" v-close-popup />
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "PlayerTool",
  props: ["selectedMediaFile", "isAudio"],
  data() {
    return {
      isPlaying: false,
      playVideoIcon: "play_arrow",
      videoProgress: 0
    }
  },
  methods: {
    play(file) {
      let audio = document.getElementById("audioTag")

      if (audio.paused) {
        console.log("play")
        audio.play()
        this.isPlaying = true
        audio.addEventListener("canplaythrough", () => {
          audio.addEventListener(
            "timeupdate",
            () => {
              this.selectedMediaFile.currentTime = audio.currentTime
            },
            false
          )
        })

        audio.addEventListener("error", (error) => {
          console.log(error)
          // self.loadingFiles = false
          const exception = error.message || error
          console.log(exception)
        })

        audio.addEventListener("ended", () => {
          console.log("ended")
          // console.log(self.repeat_audio)
          // if (self.repeat_audio) {

          // }
          this.selectedMediaFile.currentTime = 0
          audio.currentTime = 0
          audio.play()
        })
      } else {
        console.log("pause")
        audio.pause()
      }
    },
    stop(file) {
      let audio = document.getElementById("audioTag")
      console.log("stop")
      audio.pause()
      this.isPlaying = false
      this.selectedMediaFile.currentTime = 0
      audio.currentTime = 0
    },
    pause(file) {
      let audio = document.getElementById("audioTag")
      console.log("pause")
      audio.pause()
      this.isPlaying = false
    },
    playPauseVideo() {
      let player = document.getElementById("videoTag")
      let btnPlayPause = document.getElementById("btnPlayPause")

      // Add a listener for the timeupdate event so we can update the progress bar
      player.addEventListener(
        "timeupdate",
        () => {
          this.updateProgressBar()
        },
        false
      )

      // Add a listener for the play and pause events so the buttons state can be updated
      player.addEventListener(
        "play",
        () => {
          // Change the button to be a pause button
          this.changeButtonType(btnPlayPause, "pause")
        },
        false
      )

      player.addEventListener(
        "pause",
        () => {
          // Change the button to be a play button
          this.changeButtonType(btnPlayPause, "play")
        },
        false
      )

      player.addEventListener(
        "ended",
        () => {
          this.pause()
        },
        false
      )

      if (player.paused || player.ended) {
        // Change the button to a pause button
        this.changeButtonType(btnPlayPause, "pause")
        player.play()
      } else {
        // Change the button to a play button
        this.changeButtonType(btnPlayPause, "play")
        player.pause()
      }
    },
    changeButtonType(btn, value) {
      if (value === "play") {
        this.playVideoIcon = "play_arrow"
      }

      if (value === "pause") {
        this.playVideoIcon = "pause"
      }
    },
    stopVideo() {
      let player = document.getElementById("videoTag")
      player.pause()
      if (player.currentTime) player.currentTime = 0
    },
    toggleFullScreen() {
      let player = document.getElementById("videoTag")
      //var player = document.getElementById("player");
      if (player.requestFullscreen)
        if (document.fullScreenElement) {
          document.cancelFullScreen()
        } else {
          player.requestFullscreen()
        }
      else if (player.msRequestFullscreen)
        if (document.msFullscreenElement) {
          document.msExitFullscreen()
        } else {
          player.msRequestFullscreen()
        }
      else if (player.mozRequestFullScreen)
        if (document.mozFullScreenElement) {
          document.mozCancelFullScreen()
        } else {
          player.mozRequestFullScreen()
        }
      else if (player.webkitRequestFullscreen)
        if (document.webkitFullscreenElement) {
          document.webkitCancelFullScreen()
        } else {
          player.webkitRequestFullscreen()
        }
      else {
        alert("Fullscreen API is not supported")
      }
    },
    updateProgressBar() {
      let player = document.getElementById("videoTag")
      // // Work out how much of the media has played via the duration and currentTime parameters
      var percentage = ((100 / player.duration) * player.currentTime) / 100
      // Update the progress bar's value
      this.videoProgress = percentage
    }
  }
}
</script>
