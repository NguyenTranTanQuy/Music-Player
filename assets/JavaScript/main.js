const app = {
  songs: songs,
  currentIndex: Math.floor(Math.random() * songs.length),
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
  setConfig: function (key, value) {
    this.config[key] = value;
    localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
  },
  loadConfig: function () {
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },

  renderSong: function () {
    var html = "";
    this.songs.forEach((song, index) => {
      html += `
      <div class="song ${
        index === this.currentIndex ? "active" : ""
      }" data-index="${index}">
          <div
            class="thumb"
            style="
              background-image: url(${song.image});
            "
          ></div>
          <div class="body">
            <h3 class="title">${song.name}</h3>
            <p class="author">${song.singer}</p>
          </div>
          <div class="option">
            <i class="fas fa-ellipsis-h"></i>
          </div>
        </div>

      `;
    });
    playlist.innerHTML = html;
  },

  handleEvent: function () {
    // Handle hide CD While Scrolling
    const cdWidth = cd.offsetWidth;
    document.onscroll = function () {
      const scrollTop = document.documentElement.scrollTop || window.scrollY;
      const newCdWidth = cdWidth - scrollTop;

      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };

    // Handle Play Song...
    playBtn.addEventListener("click", () => {
      if (app.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }

      audio.onplay = () => {
        app.isPlaying = true;
        player.classList.add("playing");
        cdThumb.style.animation = "rotateCD 10s infinite linear";
      };

      audio.onpause = () => {
        app.isPlaying = false;
        player.classList.remove("playing");
        cdThumb.style.animationPlayState = "paused";
      };

      audio.ontimeupdate = () => {
        if (audio.currentTime)
          progress.value = (audio.currentTime / audio.duration) * 100;
      };

      progress.onchange = function (e) {
        const seekTime = (audio.duration / 100) * e.target.value;
        audio.currentTime = seekTime;
      };
    });

    // Handle Next or Prev Song...
    nextBtn.onclick = () => {
      if (app.isRandom) {
        app.playRandomSong();
      } else {
        app.nextSong();
      }
      player.classList.add("playing");
      app.renderSong();
      app.scrollToActiveSong();
      audio.play();
    };

    prevBtn.onclick = () => {
      if (app.isRandom) {
        app.playRandomSong();
      } else {
        app.prevSong();
      }
      player.classList.add("playing");
      app.renderSong();
      app.scrollToActiveSong();
      audio.play();
    };

    // Handle Random Song...
    randomBtn.onclick = () => {
      app.isRandom = !app.isRandom;
      app.setConfig("isRandom", app.isRandom);
      randomBtn.classList.toggle("active", app.isRandom);
    };

    // Handle Ended Song...
    audio.onended = () => {
      if (app.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };

    // Handle Repeat Song...
    repeatBtn.onclick = () => {
      app.isRepeat = !app.isRepeat;
      app.setConfig("isRepeat", app.isRepeat);
      repeatBtn.classList.toggle("active", app.isRepeat);
    };

    playlist.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");
      if (songNode || e.target.closest(".option")) {
        if (songNode) {
          app.currentIndex = Number(songNode.dataset.index);
          app.loadCurrentSong();
          app.renderSong();
          if (app.isPlaying) {
            player.classList.add("playing");
            audio.play();
          }
        } else {
        }
      }
    };

    // Handle Active Song...
    // heading.onchange = () => {
    //   $(".song.active").classList.remove("active");
    //   songs[currentIndex].classList.add("active");
    // };
  },

  scrollToActiveSong: () => {
    setTimeout(
      () =>
        $(".song.active").scrollIntoView({
          behavior: "smooth",
          block: "center",
        }),
      300
    );
  },

  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },

  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex == this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },

  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },

  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (this.currentIndex === newIndex);
    this.currentIndex = newIndex;
    console.log(this.currentIndex);
    this.loadCurrentSong();
  },

  start: function () {
    this.loadConfig();
    this.defineProperties();
    this.handleEvent();
    this.loadCurrentSong();
    this.renderSong();

    randomBtn.classList.toggle("active", app.isRandom);
    repeatBtn.classList.toggle("active", app.isRepeat);
  },
};

app.start();
