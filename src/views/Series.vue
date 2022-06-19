<template>
  <div>
    <NavBar />
    <h1 class="headers">Séries</h1>
      <div>
        <b-row no-gutters class="cardspadding">
          <b-col sm="4" v-for="(serie, index) in serieCatalog[0]" :key="index"
            ><b-card
              class="m-3"
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
      serieCatalog: []
    }
  },
  mounted(){
    this.getSerieCatalog();
  },
  computed: {
  },
  methods:{
    ...mapActions(["serieCat", "chooseSerie"]),

    async selectSerie(title) {
      this.chooseSerie(title)
      this.$router.push({ name: "SeriesDetails" });
    },
    
    async getSerieCatalog(){
      const response = await this.serieCat();

      if(response.data.success == true){
        console.log(response.data);
        this.serieCatalog.push(response.data.series);
      }
    }
  }
};
</script>
