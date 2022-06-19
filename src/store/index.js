import Vue from "vue";
import Vuex from "vuex";

const axios = require('axios');
Vue.use(Vuex);

export default new Vuex.Store({
  data() {
    return {
      file: null,
      mainImage: {
        center: true,
        blank: true,
        width: 200,
        height: 200,
      },
      mainBadges: {
        width: 200,
        height: 200,
      },
      items: [{
          Posição: 1,
          Utilizador: "UserTest",
          Pontuação: 1000,
        },
        {
          Posição: 2,
          Utilizador: "UserTest1",
          Pontuação: 800
        },
        {
          Posição: 3,
          Utilizador: "UserTest2",
          Pontuação: 200
        },
        {
          Posição: 4,
          Utilizador: "UserTest3",
          Pontuação: 20
        },
      ],
    }
  },
  state: {
    users: [],
    quizzCat:[],
    movieCat: [],
    serieCat: [],
    choosenMovie: null,
    choosenSerie: null,
    choosenQuizz: null,
    loggedUser: null,
  },
  getters: {
    getLoggedUser: (state) => state.loggedUser,
    getChoosenMovie: (state) => state.choosenMovie.title,
    getChoosenSerie: (state) => state.choosenSerie.title,
    getChoosenQuizz: (state) => state.choosenQuizz.title,
    getUsers: (state) => state.users,
    getQuizzes: (state) => state.quizzes,
    getMovies: (state) => state.movies,
    getSeries: (state) => state.series,

  },
  mutations: {
    SET_LOGGED_USER(state, payload) {
      state.loggedUser = state.users.find((user) => user.username === payload);
      localStorage.loggedUser = JSON.stringify(state.loggedUser);
    },
    SET_NEW_USER(state, payload) {
      state.users.push(payload);
      localStorage.users = JSON.stringify(state.users);
    },
    SET_LOGOUT(state) {
      state.loggedUser = null;
      localStorage.removeItem("loggedUser");
      localStorage.removeItem("token");
    },
  },
  actions:{
    async isUser({ context, commit, state }, user) {
			const response = await axios.post('https://calyspointer.herokuapp.com/users/login', {
				name: user.name,
				password: user.password
			});
			if (response.data.success == true) {
				localStorage.setItem('token', response.data.accessToken);
				localStorage.setItem('loggedUser', JSON.stringify(response.data.userInfo));
        state.loggedUser = response.data.userInfo
			}
			return response.data;
		},
    async signUp({ context, commit, state }, user){
      const response = await axios.post('https://calyspointer.herokuapp.com/users/signup', {
        name: user.name,
        email: user.email,
        password: user.password,
      });
      
      console.log(response);
      return response.data
    },
    async movieCat({context, commit, state}){
      const response = await axios.get('https://calyspointer.herokuapp.com/movies?page=0')

      this.state.movieCat.push(response.data.movies);
      return response
    },
    async serieCat({context, commit, state}){
      const response = await axios.get('https://calyspointer.herokuapp.com/series?page=0')

      this.state.serieCat.push(response.data.series);
      return response
    },
    async quizzCat({context, commit, state}){
      const response = await axios.get('https://calyspointer.herokuapp.com/quizzes?page=0')

      this.state.quizzCat.push(response.data.quizzes);
      return response
    },
    async movieInfo({context, commit, state}, title){
      const response = await axios.get('https://calyspointer.herokuapp.com/movies/'+ title)
      return response
    },
    async serieInfo({context, commit, state}, title){
      const response = await axios.get('https://calyspointer.herokuapp.com/series/'+ title)
      return response
    },
    async quizzInfo({context, commit, state}, title){
      const response = await axios.get('https://calyspointer.herokuapp.com/quizzes/'+ title)
      return response
    },
    async chooseMovie({ context, commit, state }, title){
      state.choosenMovie = state.movieCat[0].find((movie) => movie.title === title)
      localStorage.setItem('chosenMovie', JSON.stringify(state.choosenMovie))
    },
    async chooseSerie({ context, commit, state }, title){
      state.choosenSerie = state.serieCat[0].find((serie) => serie.title === title)
      localStorage.setItem('chosenSerie', JSON.stringify(state.choosenSerie))
    },
    async chooseQuizz({ context, commit, state }, title){
      state.choosenQuizz = state.quizzCat[0].find((quizz) => quizz.title === title)
      localStorage.setItem('chosenQuizz', JSON.stringify(state.choosenQuizz))
    },
    async finishQuizz({ context, commit, state }, user){
      const response = await axios.patch('https://calyspointer.herokuapp.com/users/'+ user.name +'/quizzes/' + user.title)
      
      return response.data
    },
    async getBadges({ context, commit, state }){
      const response = await axios.get('https://calyspointer.herokuapp.com/badges/users/admin?page=0')
      
      return response.data
    }
  },
  modules: {},
});