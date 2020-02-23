export default {
	state: {
		token: localStorage.getItem('access_token') || null,
		users: [],
	},

	getters: {
		loggedIn(state){
			return state.token !== null;
		},

		destroyToken(state){
			return state.token = null
		},
		users(state){
			return state.users
		}
	},

	actions:{

		// retrieveToken(contex,credentials){
		// 	return new Promise((resolve, reject) => {
		// 		axios.post('/api/login',{
		// 			username: credentials.username,
		// 			password: credentials.password,
		// 		}).then((response) =>{
		// 			localStorage.setItem('access_token', response.data.access_token);
		// 			contex.commit('token', response.data.access_token);
		// 			resolve(response)
		// 		}).catch((error) => {
		// 			reject(error)
		// 		})
		// 	});
		// },

		destroyToken(contex){
			axios.defaults.headers.common['Authorization'] = 'Bearer '+contex.state.token;
			if(contex.getters.loggedIn){
				return new Promise((resolve, reject) => {
					axios.post('/api/logout').then((response) =>{
						localStorage.removeItem('access_token');
						contex.commit('destroyToken');
						resolve(response)
					}).catch((error) => {
						localStorage.removeItem('access_token');
						contex.commit('destroyToken');
						reject(error)
					})
				});
			}
		},

		loadUsers(contex){
			axios.get('/api/users').then((response) =>{
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
		users(state, data){
			return state.users = data
		}
	},
}