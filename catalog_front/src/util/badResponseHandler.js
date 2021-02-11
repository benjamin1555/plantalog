export default (response, responseData) => {
  if (!response.ok && responseData.statusCode === 401) {
    const error = new Error('Email/Mot de passe invalides.');
    throw error;
  }

  if (!response.ok && responseData.statusCode === 404) {
    const error = new Error(responseData.message);
    throw error;
  }

  if (!response.ok && responseData.statusCode === 422) {
    const validationMessage = responseData.data.map(el => `${Object.values(el)}`);
    const error = new Error(`Erreur de validation: ${validationMessage}`);
    throw error;
  }

  if (!response.ok && responseData.statusCode === 500) {
    const error = new Error(responseData.message || 'Une erreur interne vient de se produire. (Code 500)');
    throw error;
  }
};