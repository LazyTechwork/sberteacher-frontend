<template>
  <transition name="slidefrom">
    <div class="limiter main" v-if="show">
      <div class="container-login100">
        <div class="wrap-login100 p-t-50 p-b-90">
          <form class="login100-form" @submit.prevent="login">
					<span class="aut-logo login100-form-title p-b-51">
						<img src="../assets/img/SberUchitel_logo.svg" alt="">
					</span>


            <div class="inp-aut-data wrap-input100" data-validate="Username is required">
              <input class="input100" id="dynamic-label-input" type="text" name="username" required v-model="email">
              <label class="aut-label" for="dynamic-label-input">Логин</label>
            </div>


            <div class="inp-aut-data wrap-input100" data-validate="Password is required">
              <input class="input100" type="password" name="pass" required v-model="password">
              <label class="aut-label" for="dynamic-label-input">Пароль</label>
              <span class="focus-input100"></span>
            </div>

            <div class="aut-btn">
              <button class="login100-form-btn">
                Войти
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      password: "",
      email: "",
      show: false,
    }
  },
  mounted() {
    this.show = true;
  },
  methods: {
    login() {
      if (!this.password.trim().length == 0 && !this.email.trim().length == 0) {
        fetch(`http://${this.apiServer}/api/authorize`, {
          method: "POST",
          body: JSON.stringify({
            email: this.email,
            password: this.password,
            agent: "SberTeacher Client v1.0 by Savva Shulgin"
          }),
          headers: {
            "Content-Type": "application/json"
          }
        }).then(res => res.json().then(res => {
                  localStorage.setItem("bearerToken", res.data.token);
                  localStorage.setItem("userModel", JSON.stringify(res.data.user))
                  this.globalEmitter.$emit("auth")
                  this.$router.push("/")
                })).catch(res => res.json().then(res => console.log(res)))
      }
    }

  }
}
</script>

<style scoped>
@import "../assets/css/style.css";
@import "../assets/css/register.css";

</style>