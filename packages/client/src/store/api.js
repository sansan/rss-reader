import "whatwg-fetch";

const apiURL = '/rest/v1';

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    const error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

const parseJSON = (response) => {
  return response.json()
};

export default {
  get: (url) => {
    return fetch(apiURL + url, {
        method: "GET",
        credentials: "include"
      })
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => {
        return {ok: true, ...data}
      }).catch((error) => {
        return {ok: false, error}
      })
  },
  post: (url, body, { headers = {}, ...options }) => {
    return fetch(apiURL + url, {
        method: "POST",
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify(body),
      ...options
      })
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => {
        return {ok: true, ...data}
      }).catch((error) => {
        return {ok: false, error}
      })
  }
}
