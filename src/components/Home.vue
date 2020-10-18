<template>
  <transition name="slidefrom">
    <div class="container home_container" v-if="show">
      <div class="wrapper main ">
        <div class="module-list-main">
          <div class="module-search">
            <div class="mod-l-main-search">
              <input type="text" placeholder="Поиск" v-model="search">
              <img class="search-icon" src="../assets/img/search-icon.png" alt="">
            </div>
          </div>
          <div class="created-modules">
            <div class="main-module" v-for="module of moduless" v-bind:key="module.id">
              <h6 class="module-name"><b>{{ module.name }}</b></h6>
              <div class="module-description">
                <div class="subject-mod-desc">
                  <p style="margin-right: 15px;">{{ module.subject }}</p>
                  <p>{{ module.grade }}</p>
                </div>
                <p>{{ module.difficulity }}</p>
                <div class="ad-del-mod">
                  <button @click="dele(module.id)"><img src="../assets/img/delete-icon.png" alt=""></button>
                  <p class="approve-mod" v-bind:class="module.statusCode">{{ module.status }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      show: false,
      modules: {},
      user: {},
      search: ""
    }
  },
  computed: {
    moduless() {
      if (this.search.trim() == "") {
        return this.modules
      } else {
        let arr = []
        this.modules.forEach(el => {
          if (String(el.name).toLowerCase().includes(this.search.toLowerCase()) || String(el.subject).toLowerCase().includes(this.search.toLowerCase()) || String(el.grade).toLowerCase().includes(this.search.toLowerCase())) {
            arr.push(el)
          }

        })
        return arr
      }
    }
  },
  methods: {
    dele(id) {
      fetch(`http://${this.apiServer}/api/module?id=${id}`, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("bearerToken"),
        },
        method: "DELETE",
      }).then(res => {
        res.json().then(res => {
          this.modules = res.data;
          this.modules.forEach(el => {
            switch (el.status) {
              case "pending":
                el.statusCode = "yellow"
                break
              case "fulfilled":
                el.statusCode = "green"
                break
              case "rejected":
                el.statusCode = "red"
                break
            }
          })
        })
      })
    }
  },
  created() {
    this.user = this.getUser();
    fetch(`http://${this.apiServer}/api/modules?user_id=${this.user.id}`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("bearerToken")
      }
    })
        .then(res => res.json()
            .then(res => {
              this.modules = res.data
              this.modules.forEach(el => {
                switch (el.status) {
                  case "pending":
                    el.statusCode = "yellow"
                    break
                  case "fulfilled":
                    el.statusCode = "green"
                    break
                  case "rejected":
                    el.statusCode = "red"
                    break
                }
              })
            }))
        .catch(res => res.json()
            .then(res => console.log(res)))
  },
  mounted() {
    this.show = true;
  },
}
</script>

<style scoped>
@import "../assets/css/style.css";
@import "../assets/css/home.css";

</style>