import fetch from 'cross-fetch';
import { message } from 'antd';

// Fetches an API response
const callApi = (url, request) => {
  console.log(url);
  console.log(request);

  return fetch(url, request).then((response) => {
    if (response.status === 204) {
      return response;
    }

    return response.json().then((json) => {
      if (!response.ok) {
        return Promise.reject(json);
      }

      return json;
    });
  });
};

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = 'Call API';

const triggerMessagePopup = (response) => {
  if (response.error) {
    message.error(response.error.error);
  } else {
    message.success(response.message);
  }
};

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default (store) => (next) => (action) => {
  const callAPI = action[CALL_API];

  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  const {
    types,
    url,
    request,
  } = callAPI;

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

  return callApi(url, request).then(
    (response) => next(actionWith({
      type: successType,
      data: response,
      error: null,
    })),
    (error) => next(actionWith({
      type: failureType,
      error: error || 'Something bad happened',
    })),
  );
};
