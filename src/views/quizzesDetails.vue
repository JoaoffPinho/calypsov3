<template>
  <div>
    <NavBar />
    <body>
      <div class="tituloquiz">
        <h1 v-if="questions">
          {{ questions.title }}
        </h1>
      </div>
      <br />
    <b-container class="quiz">
      <div class="d-flex justify-content-center">
        <div v-if="showScore">
          <b-card
            title="Resultado"
            style="max-width: 20rem"
            class="text-center"
          >
            Acertou {{ score }} de {{ questions.quizz.length }} perguntas
            <p></p>
            <b-button href="#" v-on:click="goHome()">Ver resultados</b-button>
          </b-card>
        </div>
        <div class="card-q" v-else>
          <span v-if="!startQuiz">
            <b-card
              img
              :img-src="questions.image"
              img-top
              style="max-width: 20rem"
              class="mb-2 text-center"
            >
              <b-card-text class="text-center">
                Será que é capaz de responder às perguntas sobre ‘James Bond’?
                <p>
                  <u
                    >AVISO: Ao clicar na resposta, a próxima pergunta
                    surgirá.</u
                  >
                </p>
              </b-card-text>
              <div class="text-center">
                <b-button class="quizbutton" @click="startQuizFunc()"
                  >JOGAR</b-button
                ><b-button
                  style="margin-left: 30px"
                  class="buttonvoltar"
                  :to="{ name: 'Quizzes' }"
                  >VOLTAR</b-button
                >
              </div>
            </b-card>
          </span>
          <span v-else>
            <b-card title="007 Quizz" style="max-width: 20rem" class="mb-2">
              <b-card-text>
                Pergunta nº{{ currentQuestion + 1 }} of {{ questions.quizz.length }}
              </b-card-text>
              <br />
              <b-progress
                variant="danger"
                :max="30"
                :value="countDown"
                height="4px"
              ></b-progress>

              <b-card-text>
                <span style="font-size: 22px; float: right; color: #ed6a5a"
                  ><strong>{{ countDown }} </strong>
                </span> </b-card-text
              ><br />
              <b-card-text>
                {{ questions.quizz[currentQuestion].question}}
              </b-card-text>
              <div class="answer-section">
                <b-button
                  :key="index"
                  v-for="(option, index) in questions.quizz[currentQuestion]
                    .answers"
                  @click="handleAnswerClick(option.isTrue)"
                  class="ans-option-btn"
                  >{{ option.answer }}</b-button
                >
              </div>
            </b-card>
          </span>
        </div>
      </div>
    </b-container>
      <br />
      <!-- commentarios -->
      <b-container>
        <b-card style="max-width: 20rem" class="mb-5 comentarios"
          ><link
            href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
            rel="stylesheet"
          />
          <div class="container">
            <div class="be-comment-block">
              <h1 class="comments-title">Comentarios</h1>
              <form class="form-block">
                <div class="row">
                  <div>
                    <div class="form-group">
                      <textarea
                        class="form-input"
                        placeholder="O seu comentário"
                      ></textarea>
                    </div>
                  </div>
                  <b-button
                    class="btn"
                    style="background: #023047; color: #fff"
                    id="show-btn"
                    @click="$bvModal.show('modalaviso')"
                    >Comentar</b-button
                  >

                  <b-modal id="modalaviso" hide-footer>
                    <template #modal-title>
                      AVISO
                      <u style="color: #ed6a5a"></u>
                    </template>
                    <div class="d-block text-center">
                      <b-alert show variant="danger" class="text-center"
                        >Só pode comentar se tiver iniciado sessão</b-alert
                      >
                    </div>
                    <b-button
                      class="mt-3 btn-danger"
                      block
                      @click="$bvModal.hide('modalaviso')"
                      >Fechar</b-button
                    >
                  </b-modal>
                </div>
                <br />
              </form>
              <!-- <div class="be-comment">
                <div class="be-img-comment">
                  <a href="#">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar1.png"
                      alt=""
                      class="be-ava-comment"
                    />
                  </a>
                </div>
                <div class="be-comment-content">
                  <span class="be-comment-name">Name </span>
                  <span class="be-comment-time">
                    <i class="fa fa-clock-o"></i>
                    12 janeiro, 2022 pelas 9:30h
                  </span>

                  <p class="be-comment-text">comentarios
                  </p>
                  <b-form-rating
                    v-model="comment.rating"
                    variant="warning"
                    class="mb-2 rating"
                  ></b-form-rating>
                </div>
              </div> -->
            </div>
          </div>
        </b-card>
      </b-container>
      <b-row style="padding-top: 50px">
        <b-col>
        <Footer />
        </b-col>
      </b-row>
    </body>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "quizzesDetails",
  components: {
    NavBar,
    Footer,
  },
  data() {
    return {
      choosenQuizz: null,
      currentQuestion: 0,
      showScore: false,
      score: 0,
      countDown: 30,
      timer: null,
      startQuiz: false,
      questions: null,
    };
  },
  mounted(){
    this.getQuizzInfo(this.getChoosenQuizz);
  },
  computed: {
    ...mapGetters(["getChoosenQuizz", "getLoggedUser"])
  },
  watch : {
    showScore(){
      this.finishQuizz(this.getLoggedUser)
    }
  },
  methods: {
    ...mapActions(["quizzInfo", "finishQuizz"]),

    async finishQuizz(user){
      console.log(user.name);
      const response = await this.finishQuizz({
				name: user.name,
				title: questions.title
			})
    },

    async getQuizzInfo(title){
      const response = await this.quizzInfo(title);

      if(response.data.success == true){
        this.questions = response.data.quizz
      }
    },

    startQuizFunc() {
      this.startQuiz = true;
      this.countDownTimer();
    },
    handleAnswerClick(isTrue) {
      clearTimeout(this.timer);
      let nextQuestion = this.currentQuestion + 1;
      if (isTrue) {
        this.score = this.score + 1;
      }
      if (nextQuestion < this.questions.quizz.length) {
        this.currentQuestion = nextQuestion;
        this.countDown = 30;
        this.countDownTimer();
      } else {
        this.showScore = true;
      }
    },
    countDownTimer() {
      if (this.countDown > 0) {
        this.timer = setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      } else {
        this.handleAnswerClick(false);
      }
    }
    ,
    countDownTimer() {
      if (this.countDown > 0) {
        this.timer = setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      } else {
        this.handleAnswerClick(false);
      }
    },
    goHome(){
      this.$router.push({ name: "Quizzes" });
    }

  },
};
</script>

<style scoped>
.tituloquiz {
  background: linear-gradient(to left, #ffb703 10%, #ed6a5a 30%);
  clip-path: polygon(0 0, calc(100% - 50px) 0, 70% 200%, 0% 100%);
  width: 100%;
  height: 130px;
  font-family: Rubik;
  padding-top: 10px;
  padding-left: 75px;
  font-size: 28px;
  color: white;
}
.subtitulo {
  font-size: 15px;
  font-family: Rubik light;
  padding-right: 100px;
}

.card {
  min-width: 100%;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 5px 5px 10px gray;
}

.card.comentarios {
  box-shadow: 5px 5px 10px #ffb72b;
}
.card-q {
  min-width: 80%;
}

.card-img,
.card-img-top {
  border-top-left-radius: calc(0.25rem - 1px);
  border-top-right-radius: calc(0.25rem - 1px);
  height: 400px;
}

.quiz {
  color: #023047;
  font-family: Rubik light;
}

.tituloquiz {
  background: linear-gradient(to left, #ffb703 10%, #ed6a5a 30%);
  clip-path: polygon(0 0, calc(100% - 50px) 0, 70% 200%, 0% 100%);
  width: 100%;
  height: 130px;
  font-family: Rubik;
  padding-top: 10px;
  padding-left: 75px;
  font-size: 28px;
  color: white;
}
.subtitulo {
  font-size: 15px;
  font-family: Rubik light;
  padding-right: 100px;
}

.comentarios {
  border-radius: 1px;
}
.comentariotitulo {
  height: 50px;
  width: 20%;
  color: #fff;
  padding-left: 30px;
  padding-top: 12px;
  background: linear-gradient(to left, #ffb703 10%, #ed6a5a 30%);
  clip-path: polygon(0 0, calc(100% - 50px) 0, 100% 100%, 0% 100%);
}

.quizbutton {
  background: #023047;
  color: #fff;
  border-radius: 100px;
  border-style: solid;
  border-color: #023047;
  font-family: Rubik;
  width: 200px;
  height: 50px;
  position: relative;
}

.buttonvoltar {
  background: #ed6a5a;
  color: #fff;
  border-radius: 100px;
  border-style: solid;
  border-color: #ed6a5a;
  font-family: Rubik;
  width: 200px;
  height: 50px;
  padding-top: 12px;
}

.be-comment-block {
  margin-bottom: 50px !important;
  border: 1px solid #edeff2;
  border-radius: 2px;
  padding: 50px 70px;
  border: 1px solid #ffffff;
}


.comments-title {
  font-size: 16px;
  color: #262626;
  margin-bottom: 15px;
  font-family: "Rubik";
}

.be-img-comment {
  width: 60px;
  height: 60px;
  float: left;
  margin-bottom: 15px;
}

.be-ava-comment {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.be-comment-content {
  margin-left: 80px;
}

.be-comment-content span {
  display: inline-block;
  width: 49%;
  margin-bottom: 15px;
}

.be-comment-name {
  font-size: 13px;
  font-family: "Rubik";
}

.be-comment-content a {
  color: #023047;
}

.be-comment-content span {
  display: inline-block;
  width: 49%;
  margin-bottom: 15px;
}

.be-comment-time {
  text-align: right;
}

.be-comment-time {
  font-size: 11px;
  color: #023047;
}

.be-comment-text {
  font-size: 13px;
  font-family: "Rubik light";
  line-height: 18px;
  color: #023047;
  display: block;
  background: #f6f6f7;
  border: 1px solid #edeff2;
  padding: 15px 20px 20px 20px;
}

.form-group .form-input {
  font-size: 13px;
  line-height: 50px;
  font-weight: 400;
  color: #b4b7c1;
  width: 100%;
  height: 50px;
  padding-left: 20px;
  padding-right: 20px;
  border: 1px solid #edeff2;
  border-radius: 3px;
}

.form-group.fl_icon .form-input {
  padding-left: 70px;
}

.form-group textarea.form-input {
  height: 100px;
  width: 880px;
}

.star-active {
  color: #ed6a5a;
}

.star-inactive {
  color: #ed6a5a;
  opacity: 50%;
}


.card {
  min-width: 100%;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 5px 5px 10px gray;
}

.card.comentarios {
  box-shadow: 5px 5px 10px gray;
}
.card-q {
  min-width: 80%;
}
.ans-option-btn {
  min-width: 50%;
  font-size: 16px;
  align-items: center;
  cursor: pointer;
  margin-bottom: 5px;
  background: #fff;
  color: #023047;
}
.answer-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.timer-text {
  background: #ed6a5a;
  padding: 15px;
  margin-top: 20px;
  margin-right: 20px;
  border: 5px solid rgb(237, 106, 90);
  border-radius: 15px;
  text-align: center;
}
.card-img,
.card-img-top {
  border-top-left-radius: calc(0.25rem - 1px);
  border-top-right-radius: calc(0.25rem - 1px);
  height: 400px;
}

.quiz {
  color: #023047;
  font-family: Rubik light;
}

.tituloquiz {
  background: linear-gradient(to left, #ffb703 10%, #ed6a5a 30%);
  clip-path: polygon(0 0, calc(100% - 50px) 0, 70% 200%, 0% 100%);
  width: 100%;
  height: 130px;
  font-family: Rubik;
  padding-top: 10px;
  padding-left: 75px;
  font-size: 28px;
  color: white;
}
.subtitulo {
  font-size: 15px;
  font-family: Rubik light;
  padding-right: 100px;
}

.comentarios {
  border-radius: 1px;
}
.comentariotitulo {
  height: 50px;
  width: 20%;
  color: #fff;
  padding-left: 30px;
  padding-top: 12px;
  background: linear-gradient(to left, #ffb703 10%, #ed6a5a 30%);
  clip-path: polygon(0 0, calc(100% - 50px) 0, 100% 100%, 0% 100%);
}

.quizbutton {
  background: #023047;
  color: #fff;
  border-radius: 100px;
  border-style: solid;
  border-color: #023047;
  font-family: Rubik;
  width: 200px;
  height: 50px;
  position: relative;
}

.buttonvoltar {
  background: #ed6a5a;
  color: #fff;
  border-radius: 100px;
  border-style: solid;
  border-color: #ed6a5a;
  font-family: Rubik;
  width: 200px;
  height: 50px;
  padding-top: 12px;
}

.be-comment-block {
  margin-bottom: 50px !important;
  border: 1px solid #edeff2;
  border-radius: 2px;
  padding: 50px 70px;
  border: 1px solid #ffffff;
}

.rating {
  width: 10%;
  border-radius: none;
  border: 0px;
  position: relative;
}

.comments-title {
  font-size: 16px;
  color: #262626;
  margin-bottom: 15px;
  font-family: "Rubik";
}

.be-img-comment {
  width: 60px;
  height: 60px;
  float: left;
  margin-bottom: 15px;
}

.be-ava-comment {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.be-comment-content {
  margin-left: 80px;
}

.be-comment-content span {
  display: inline-block;
  width: 49%;
  margin-bottom: 15px;
}

.be-comment-name {
  font-size: 13px;
  font-family: "Rubik";
}

.be-comment-content a {
  color: #023047;
}

.be-comment-content span {
  display: inline-block;
  width: 49%;
  margin-bottom: 15px;
}

.be-comment-time {
  text-align: right;
}

.be-comment-time {
  font-size: 11px;
  color: #023047;
}

.be-comment-text {
  font-size: 13px;
  font-family: "Rubik light";
  line-height: 18px;
  color: #023047;
  display: block;
  background: #f6f6f7;
  border: 1px solid #edeff2;
  padding: 15px 20px 20px 20px;
}

.form-group .form-input {
  font-size: 13px;
  line-height: 50px;
  font-weight: 400;
  color: #b4b7c1;
  width: 100%;
  height: 50px;
  padding-left: 20px;
  padding-right: 20px;
  border: 1px solid #edeff2;
  border-radius: 3px;
}

.form-group.fl_icon .form-input {
  padding-left: 70px;
}

.form-group textarea.form-input {
  height: 100px;
  width: 880px;
}

.star-active {
  color: #ed6a5a;
}

.star-inactive {
  color: #ed6a5a;
  opacity: 50%;
}
</style>
