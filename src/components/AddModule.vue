<template>
  <transition name="slidefrom">
    <div class="container home_container" v-if="show">
      <div class="wrapper">
        <div class="module-list-main">
          <div class="module-menu-editor">
            <div class="module-menu-name">
              <div class="module-menu-name-h">
                <h2>Название модуля</h2>
              </div>
              <input v-model="module_name" type="text" placeholder="Индукционный ток">
            </div>
            <div class="module-menu-class">
              <div class="module-menu-class-h">
                <h2>Класс</h2>
              </div>
              <div class="select">
                <div class="select__header">
                  <select name="" id="" v-model="module_grade">
                    <option value="9">9</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="module-menu-time">
              <div class="module-menu-time-h">
                <h2>Время</h2>
              </div>
              <input type="text" placeholder="180 минут" v-model="module_time" value="0 минут">
            </div>
            <div class="module-menu-type">
              <div class="module-menu-type-h">
                <h2>Тип</h2>
              </div>
              <div class="select">
                <div class="select__header">
                  <select name="" >
                    <option value="test">Тест</option>
                  </select>
                </div>

              </div>
            </div>
          </div>
          <div class="module-list-editor-comment">
            <div class="mod-l-ed-com-h">
              <h2>Описание</h2>
            </div>
            <textarea v-model="module_description" class="mod-l-ed-com-desc" placeholder="Добавьте описание к уроку"></textarea>
          </div>
          <div class="created-modules">
           <div class="mdls" ref="mdls">

           </div>
            <div class="add-new-blocks">
              <div class="add-new-blocks-h">
                <p style="font-size: 35px;font-family: 'Trebuchet MS';font-style: normal; font-weight: normal;">Добавить новый блок</p>
              </div>
              <div class="new-blocks-categories">
                <div class="ad-block first-block" @click="addBlock('theory')">
<!--                  <img src="../assets/img/block1-img.png" alt="">-->
                  <p>Теоретический блок</p>
                </div>
                <div class="ad-block second-block" @click="addBlock('choose')">
<!--                  <img src="../assets/img/block2-img.png" alt="">-->
                  <p>Один из нескольких</p>
                </div>
                <div class="ad-block third-block" @click="addBlock('text')">
<!--                  <img src="../assets/img/block3-img.png" alt="">-->
                  <p>Текстовый ответ</p>
                </div>
                <div class="ad-block fourth-block" @click="addBlock('short_text')">
<!--                  <img src="../assets/img/block4-img.png" alt="">-->
                  <p>Развернутый ответ</p>
                </div>
                <a href="javascript:void(0)" @click="create_module">Создать</a>
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
  name: "AddModule",
  data() {
    return {
      show: false,
      card_id:0,
      module_name:"",
      module_grade:"",
      module_time:"",
      module_description:"",
    }
  },
  methods:{
    create_module(){
      fetch(`http://${this.apiServer}/api/module`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Authorization": "Bearer " + localStorage.getItem("bearerToken"),
        },
        body:JSON.stringify({
          name:this.module_name,
          subject: "Математика",
          grade:this.module_grade,
          difficulty:Number(this.module_time),
          description:this.module_description,
          fgos:"123",
        })
      }).then(res => res.json().then(res=>this.inserted_module=res).then(()=>{
        let theories = document.querySelectorAll(".module-theory")
        Array.from(theories).forEach(el=>{
          let fields =Array.from(el.querySelectorAll(".module_field"))
          let data = new FormData;
          data.append("name",fields.find(el=>el.getAttribute("name").includes("theory_name")).value)
          data.append("text",fields.find(el=>el.getAttribute("name").includes("theory_description")).value)
          data.append("cover_type","image")
          data.append("cover_file",fields.find(el=>el.getAttribute("type")=="file").files[0])
          data.append("task_type","theory")
          data.append("module_id",this.inserted_module.data.id)
          fetch(`http://${this.apiServer}/api/task`,{
            method:"POST",
            headers:{
              "Authorization": "Bearer " + localStorage.getItem("bearerToken"),
            },
            body:data,

          })
        })
      }))


    },
    addBlock(type){
      this.theory = new DOMParser().parseFromString("" +
          "      <form class=\"module-theory\">\n" +
          "              <input class='theory-name module_field' placeholder='Название' name=`theory_name"+this.card_id+"`>\n" +
          "              <textarea class='module-theory-text module_field' name=`theory_description"+this.card_id+"`  placeholder='Текст секции'> </textarea>\n" +
          "               <input type='file' class='module_field' name='theory_card_attachment'>\n"+
          "              <div class=\"test-delete-menu\">\n" +
          "                <button class=\"theory-delete\"><img src=\"../assets/img/delete-icon.png\" alt=\"\"></button>\n" +
          "                <button class=\"theory-edit\"><img src=\"../assets/img/edit.png\" alt=\"\"></button>\n" +
          "              </div>\n" +
          "            </form>","text/html").body.querySelector(".module-theory")

      this.choose = new DOMParser().parseFromString("<div class=\"module-test\">\n" +
          "              <div class=\"module-test-name\">\n" +
          "                <input class=\"model-test-question\" type=\"text\" value=\"Сколько будет 2+2?\" name=`theory"+this.card_id+"`>\n" +
          "                <div class=\"select\">\n" +
          "                  <div class=\"select__header\">\n" +
          "                    <span class=\"select__current\">Тест</span>\n" +
          "                    <div class=\"select__icon\"><img style=\"width: 10px\" src=\"../assets/img/strelka.png\" alt=\"\"></div>\n" +
          "                  </div>\n" +
          "\n" +
          "                  <div class=\"select__body\">\n" +
          "                    <div class=\"select__item\">Тест</div>\n" +
          "                    <div class=\"select__item\">Теория</div>\n" +
          "                    <div class=\"select__item\">Контрольная</div>\n" +
          "                    <div class=\"select__item\">Урок</div>\n" +
          "                  </div>\n" +
          "                </div>\n" +
          "              </div>\n" +
          "\n" +
          "              <div class=\"model-test-all-answers\">\n" +
          "                <div class=\"model-test-your-answer\">\n" +
          "                  <label class=\"model-test-label\"><input class=\"model-test-inp\" name=\"a\" type=\"radio\">\n" +
          "                    <span class=\"model-test-span\">Два</span>\n" +
          "                  </label>\n" +
          "                </div>\n" +
          "                <div class=\"model-test-your-answer\">\n" +
          "                  <label class=\"model-test-label\"><input class=\"model-test-inp\" name=\"a\" type=\"radio\">\n" +
          "                    <span class=\"model-test-span\">Три</span>\n" +
          "                  </label>\n" +
          "                </div>\n" +
          "                <div class=\"model-test-your-answer\">\n" +
          "                  <label class=\"model-test-label\"><input class=\"model-test-inp\" name=\"a\" type=\"radio\">\n" +
          "                    <span class=\"model-test-span\">Четыре</span>\n" +
          "                  </label>\n" +
          "                </div>\n" +
          "                <input class=\"module-test-ad-var\" type=\"button\" value=\"Добавить вариант\">\n" +
          "              </div>\n" +
          "              <div class=\"test-delete-menu\">\n" +
          "                <button class=\"test-delete\"><img src=\"../assets/img/delete-icon.png\" alt=\"\"></button>\n" +
          "              </div>\n" +
          "            </div>","text/html").body.querySelector(".module-test")

      this.text = new DOMParser().parseFromString("<div class=\"module-essay\">\n" +
          "              <div class=\"module-essay-name\">\n" +
          "                <h2>Напишите сочинение на тему персик.</h2>\n" +
          "              </div>\n" +
          "              <textarea class=\"module-essay-text\"\n" +
          "                        placeholder=\"То, что вы здесь пишете, будет отображаться у студентов\"></textarea>\n" +
          "              <div class=\"essay-delete-menu\">\n" +
          "                <button class=\"essay-delete\"><img src=\"../assets/img/delete-icon.png\" alt=\"\"></button>\n" +
          "              </div>\n" +
          "            </div>","text/html").body.querySelector(".module-essay")
      this.short_answer = new DOMParser().parseFromString(" <div class=\"module-answer-for-spec\">\n" +
          "              <div class=\"module-answer-for-spec-name\">\n" +
          "                <h2>Сколько ты спал на хакатоне???</h2>\n" +
          "              </div>\n" +
          "              <input class=\"for-spec-answer-text\" placeholder=\"Тут правильный ответ\">\n" +
          "            </div>","text/html").body.querySelector(".module-answer-for-spec")

      switch (type){
        case "theory":
          this.$refs["mdls"].appendChild(this.theory)
          break

        case "choose":
          this.$refs["mdls"].appendChild(this.choose)
          break

        case "text":
          this.$refs["mdls"].appendChild(this.text)
          break

        case "short_text":
          this.$refs["mdls"].appendChild(this.short_answer)
          break
      }
    }
  },
  mounted() {
    this.show = true;
  },


}
</script>

<style scoped>
@import "../assets/css/style.css";
@import "../assets/css/add.css";

</style>