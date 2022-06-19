<template>
  <div>
    <NavBar />
    <body>
      <div class="tituloquiz">
        <h1 v-if="choosenMovie">
          {{ choosenMovie.title }}
        </h1>
        <p class="subtitulo" v-if="choosenMovie">
          {{ choosenMovie.release }}
        </p>
      </div>
      <br />
      <b-container>
        <b-row>
          <b-col>
            <!-- <b-embed
              type="iframe"
              aspect="16by9"
              src="https://www.youtube.com/embed/BIhNsAtPbPI"
              allowfullscreen
            ></b-embed> -->
            <div>
              <br />
              <b-img v-if="choosenMovie" :src="choosenMovie.image" style="width:100%;height: auto;padding-bottom: 20px;"></b-img>
              <b-form-checkbox
                style="color: #023047; float: right"
                id="checkbox"
                v-model="status"
                name="checkbox"
                value="Marcar como não visto"
                unchecked-value="Marcar como visto"
              >
                <strong>{{ status }}</strong>
              </b-form-checkbox>
            </div>
            <h1>Sinopse</h1>
            <p v-if="choosenMovie">
              {{ choosenMovie.description }}
            </p>
            <br />
            <h1>Diretor</h1>
            <p v-if="choosenMovie">{{ choosenMovie.realizador }}</p>
            <br />
            <h1>Escritor</h1>
            <p v-if="choosenMovie">{{ choosenMovie.writers }}</p>
            <br />
            <h1>Atores</h1>
            <p v-if="choosenMovie">{{ choosenMovie.actors }}</p>
          </b-col>
        </b-row> </b-container
      ><br />
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
  name: "moviesDetails",
  components: {
    NavBar,
    Footer,
  },
  data() {
    return {
      choosenMovie: null,
      status: "Marcar como visto",
      rating: 2 //exemple
    };
  },
  mounted(){
    this.getMovieInfo(this.getChoosenMovie);
  },
  computed: {
    ...mapGetters(["getChoosenMovie"])
  },
  methods: {
    ...mapActions(["movieInfo"]),

    async getMovieInfo(title){
      const response = await this.movieInfo(title);

      if(response.data.success == true){
        this.choosenMovie = response.data.movie
      }
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
