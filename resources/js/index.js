export default {
	state: {
		token: localStorage.getItem('access_token') || null,
		user: localStorage.getItem('user') || null,
		users: null,
	},

	getters: {
		loggedIn(state){
			return state.token !== null;
		},

		destroyToken(state){
			return state.token = null
		},
		user(state){
			return state.user
		},
		users(state){
			return state.users
		}

	},

	actions:{

		user(contex){
			axios.defaults.headers.common['Authorization'] = 'Bearer '+contex.state.token;
			if(contex.getters.loggedIn){
				return new Promise((resolve, reject) => {
					axios.get(baseURL + '/api/user').then((response) =>{
						localStorage.setItem('user', response.data.user);
						contex.commit('user', response.data.user);
					}).catch((error) => {
						console.log(error)
					})
				});
			}
		},

		destroyToken(contex){
			axios.defaults.headers.common['Authorization'] = 'Bearer '+contex.state.token;
			if(contex.getters.loggedIn){
				return new Promise((resolve, reject) => {
					axios.post(baseURL + '/api/logout').then((response) =>{
						localStorage.removeItem('access_token');
						contex.commit('destroyToken');
					}).catch((error) => {
						localStorage.removeItem('access_token');
						contex.commit('destroyToken');
						console.log(error)
					})
				});
			}
		},

		loadUsers(contex){
			axios.get(baseURL + '/api/users').then((response) =>{
				contex.commit('users', response.data.users)
			}).catch((error) => {
				console.log(error)
			})
		}
	},

	mutations:{
		token(state, data){
			return state.token = data;
		},
		destroyToken(state, data){
			return state.token = null
		},

		user(state, data){
			return state.user = data
		},
		users(state, data){
			return state.users = data
		}
	},
}
