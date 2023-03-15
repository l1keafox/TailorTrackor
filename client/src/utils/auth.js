import decode from "jwt-decode";

class AuthService {
	getUser() {
		let token = this.getToken();
		if (!token) {
			console.log('No token');
			return false;
		}
		return decode(token);
	}

	loggedIn() {
		const token = this.getToken();
		return token ? true : false;
	}

	getToken() {
		return localStorage.getItem("id_token");
	}

	login(idToken) {
		localStorage.setItem("id_token", idToken);
	}

	logout() {
		localStorage.removeItem("id_token");
		window.location.replace("/");
	}
}

export default new AuthService();
