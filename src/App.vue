<template>

  <div id="app">
    <header v-if="show">
      <div class="container">
        <div class="logo head_inner">

        </div>
        <div class="user_controls head_inner">
          <div class="controls ">
            <router-link  to="/add" v-if="this.$route.path == '/'" class="add_module">Cоздать модуль <span>+</span></router-link>
            <a href="javascript:void(0)" v-else class="review"></a>
          </div>
          <div class="user ">
            <div class="user_info">
              <p class="user_name">{{ this.user.full_name }}</p>
              <span class="user_exp">{{ this.user.trust_factor }}XP</span>

            </div>
            <a href="javascript:void(0)" @click="logout">Выход</a>
            <div class="user_photo">

            </div>
          </div>
        </div>

      </div>
    </header>
    <div class="main_wp">
      <router-view></router-view>
    </div>

  </div>

</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      user: {},
      show: false
    }
  },
  methods:{
    logout(){
      localStorage.clear()
      this.$router.push("/login")
    }
  },

  created() {
    this.globalEmitter.$on("auth", () => {
      this.user = this.getUser()
    })

    if (!localStorage.getItem("bearerToken") && this.$route.path != "/login") {
      this.$router.push("/login")
    }

    if (localStorage.getItem("bearerToken")) {
      this.user = this.getUser()
      this.show = true
    }

  },

  updated() {
    if (localStorage.getItem("bearerToken")) {
      this.show = true
    } else {
      this.show = false
    }
  }


}
</script>

<style scoped>
@import "assets/css/style.css";
</style>
