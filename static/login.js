const form = document.getElementById('login-form');

form.addEventListener('submit', (e) => {
	e.preventDefault();
	const username = document.getElementById('username').value;
	const password = document.getElementById('password').value;

	axios
		.post('http://localhost:5000/api/auth', { username, password })
		.then((res) => console.log(res));
});
