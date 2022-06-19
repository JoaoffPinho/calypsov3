<template>
  <div>
    <NavBar />
    <h1 class="headers">Quizzes</h1>
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
    <Footer />
  </div>
</template>
<script>
import { mapActions } from "vuex";
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";
export default {
  components: {
    NavBar,
    Footer,
  },
  data(){
    return{
    quizzCatalog: []
  }},
  mounted(){
    this.getQuizzCatalog();
  },
  computed: {
  },
  methods:{
    ...mapActions(["quizzCat", "chooseQuizz"]),

    async selectQuizz(title) {
      this.chooseQuizz(title)
      this.$router.push({ name: "QuizzesDetails" });
    },
    
    async getQuizzCatalog(){
      const response = await this.quizzCat();

      if(response.data.success == true){
        this.quizzCatalog.push(response.data.quizzes);
      }
	  //console.log(response.data.posts);
    }
  }
};
</script>
