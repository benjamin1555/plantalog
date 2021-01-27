let timer;

export default {
  async signup(context, payload) {
    const response = await fetch('http://api.plantalog.fr/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: payload.email,
        username: payload.username,
        password: payload.password
      })
    });

    const responseData = await response.json();
    handleBadResponse(response, responseData);
    console.log(responseData);
  },
  async login(context, payload) {
    const response = await fetch('http://api.plantalog.fr/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: payload.email,
        password: payload.password
      })
    });

    const responseData = await response.json();

    handleBadResponse(response, responseData);

    const expiresIn = 3600 * 1000;
    const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem('token', responseData.token);
    localStorage.setItem('userId', responseData.userId);
    localStorage.setItem('username', responseData.username);
    localStorage.setItem('tokenExpiration', expirationDate);

    timer = setTimeout(() => {
      context.dispatch('autoLogout');
    }, expiresIn);

    context.commit('setUser', {
      token: responseData.token,
      userId: responseData.userId,
      username: responseData.username
    });
  },
  tryLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    const expiresIn = +tokenExpiration - new Date().getTime();

    if (expiresIn < 0) {
      return;
    }

    timer = setTimeout(() => {
      context.dispatch('autoLogout');
    }, expiresIn);

    if (token && userId) {
      context.commit('setUser', {
        token,
        userId,
        username
      });
    }
  },
  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('tokenExpiration');

    clearTimeout(timer);

    context.commit('setUser', {
      token: null,
      userId: null
    });
  },
  autoLogout(context) {
    context.dispatch('logout');
    context.commit('setAutoLogout');
  }
};

// Private functions
const handleBadResponse = (response, responseData) => {
  if (!response.ok && responseData.statusCode === 401) {
    const error = new Error('Email/Mot de passe invalides.');
    throw error;
  }

  if (!response.ok && responseData.statusCode === 422) {
    const validationMessage = responseData.data.map(el => Object.values(el));
    const error = new Error(`Erreur de validation: ${validationMessage}`);
    throw error;
  }

  if (!response.ok && responseData.statusCode === 500) {
    const error = new Error(responseData.message || 'Failed to signup.');
    throw error;
  }
};