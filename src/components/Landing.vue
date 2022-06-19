<template>
  <div id="app">
    <div>
      <b-carousel
        id="carousel-1"
        v-model="slide"
        :interval="4000"
        controls
        indicators
        background="#ababab"
        img-width="1024"
        img-height="480"
        style="text-shadow: 1px 1px 2px #333"
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
      >
        <b-carousel-slide
          caption="First slide"
          text="Nulla vitae elit libero, a pharetra augue mollis interdum."
          img-src="https://picsum.photos/1024/480/?image=52"
        ></b-carousel-slide>

        <b-carousel-slide
          caption="First slide"
          text="Nulla vitae elit libero, a pharetra augue mollis interdum."
          img-src="https://picsum.photos/1024/480/?image=52"
        ></b-carousel-slide
        ><b-carousel-slide
          caption="First slide"
          text="Nulla vitae elit libero, a pharetra augue mollis interdum."
          img-src="https://picsum.photos/1024/480/?image=52"
        ></b-carousel-slide>

        <b-carousel-slide
          caption="First slide"
          text="Nulla vitae elit libero, a pharetra augue mollis interdum."
          img-src="https://picsum.photos/1024/480/?image=52"
        ></b-carousel-slide>
      </b-carousel>
    </div>
    <br />
    <h2 class="headers">Quizzes</h2>
    <div class="container">
        <b-row no-gutters class="cardspadding">
          <b-col cols="4" v-for="(quizz, index) in quizzCatalog[0]" :key="index"
            style="margin-bottom: 3vh;"><b-card
              :title="quizz.title"
              :img-src="quizz.image"
              img-top
              tag="film"
              style="width: 25vw;color: #1d2021"
            >
              <b-link
                class="card-link stretched-link"
                @click="selectQuizz(quizz.title);
                "
              ></b-link></b-card
          ></b-col>
        </b-row>
      </div>
    <h2 class="headers">Filmes</h2>
      <div class="container">
        <b-row no-gutters class="cardspadding">
          <b-col cols="4" v-for="(movie, index) in movieCatalog[0]" :key="index"
            style="margin-bottom: 3vh;">
            <b-card
              :title="movie.title"
              :img-src="movie.image"
              img-top
              tag="film"
              style="width: 25vw;color: #1d2021"
            >
              <b-link
                class="card-link stretched-link"
                @click="selectMovie(movie.title);
                "
              ></b-link></b-card
          ></b-col>
        </b-row>
      </div>
    <h2 class="headers">Séries</h2>
      <div class="container">
        <b-row no-gutters class="cardspadding">
          <b-col cols="4" v-for="(serie, index) in serieCatalog[0]" :key="index"
            >
            <b-card
              :title="serie.title"
              :img-src="serie.image"
              img-top
              tag="serie"
              style="width: 25vw;color: #1d2021"
            >
              <b-link
                class="card-link stretched-link"
                @click="selectSerie(serie.title);
                "
              ></b-link></b-card
          ></b-col>
        </b-row>
      </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "landing",
  data(){
      return{
        movieCatalog: [],
        quizzCatalog: [],
        serieCatalog: [],
      }        
  },
  mounted(){
    this.getMovieCatalog();
    this.getQuizzCatalog();
    this.getSerieCatalog();
  },
  computed: {
    ...mapGetters(["getLoggedUser"]),
  },
  methods: {
    ...mapActions(["movieCat", "chooseMovie","quizzCat", "chooseQuizz","serieCat", "chooseSerie"]),

    async selectMovie(title) {
      this.chooseMovie(title)
      this.$router.push({ name: "MoviesDetails" });
    },
    
    async selectQuizz(title) {
      this.chooseQuizz(title)
      this.$router.push({ name: "QuizzesDetails" });
    },

    async selectSerie(title) {
      this.chooseSerie(title)
      this.$router.push({ name: "SeriesDetails" });
    },

    async getMovieCatalog(){
      const response = await this.movieCat();

      if(response.data.success == true){
        this.movieCatalog.push(response.data.movies);
        this.movieCatalog.slice(0, 2);
      }
    },
    
    async getQuizzCatalog(){
      const response = await this.quizzCat();

      if(response.data.success == true){
        this.quizzCatalog.push(response.data.quizzes);
        console.log(this.quizzCatalog);
        this.quizzCatalog.slice(0, 2);
      }
    },
    
    async getSerieCatalog(){
      const response = await this.serieCat();

      if(response.data.success == true){
        this.serieCatalog.push(response.data.series);
        this.quizzCatalog.slice(0, 2);
      }
    }
  }
};
</script>

<style>
.home {
  font-family: Rubik ligher;
}

.carousel-inner img {
  width: 100%;
  height: 100%;
}
</style>
