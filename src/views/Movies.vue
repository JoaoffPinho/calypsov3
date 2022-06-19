<template>
  <div>
    <NavBar />
    <h1 class="headers">Filmes</h1>
      <div class="container">
        <b-row no-gutters class="cardspadding">
          <b-col cols="4" v-for="(movie, index) in movieCatalog[0]" :key="index"
            style="margin-bottom: 3vh;"><b-card
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
    <Footer />
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";
export default {
  components: {
    NavBar,
    Footer,
  },
  data(){
    return{
      movieCatalog: []
    }
  },
  mounted(){
    this.getMovieCatalog();
  },
  computed: {
  },
  methods:{
    ...mapActions(["movieCat", "chooseMovie"]),

    async selectMovie(title) {
      this.chooseMovie(title)
      this.$router.push({ name: "MoviesDetails" });
    },
    
    async getMovieCatalog(){
      const response = await this.movieCat();

      if(response.data.success == true){
        this.movieCatalog.push(response.data.movies);
      }
	  //console.log(response.data.posts);
    }
  }
};
</script>


<style>
.navbarcatalogos {
  width: 100%;
  height: 100%;
  color: #023047;
  font-family: Rubik;
  padding-left: 35px;
}

.btn-outline {
  color: #ed6a5a;
  background: white;
  border: 1px solid #ed6a5a;
}

.cardspadding {
  padding-top: 40px;
  padding-left: 28px;
}

.card {
  border: 2px solid #ffb703;
}
h3 {
  padding-left: 45px;
  color: #023047;
}
</style>