import fetch from 'cross-fetch';

// Fetches an API response
const callApi = (url, method) => {
  return fetch(url, {
    method: method,
  })
    .then((response) =>
      response.json().then((json) => {
        if (!response.ok) {
          return Promise.reject(json);
        }

        return json;
      }));
};

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = 'Call API';

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default (store) => (next) => (action) => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  const { types, url, method, data } = callAPI;

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (!types.every((type) => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  const actionWith = (actionData) => {
    const finalAction = { ...action, ...actionData };
    delete finalAction[CALL_API];
    return finalAction;
  };

  const [requestType, successType, failureType] = types;
  next(actionWith({ type: requestType }));

  return callApi(url, method, data).then(
    (response) => next(actionWith({
      type: successType,
      data: response,
    })),
    (error) => next(actionWith({
      type: failureType,
      error: error || 'Something bad happened',
    })),
  );
};
