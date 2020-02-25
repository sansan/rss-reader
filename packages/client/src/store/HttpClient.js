import "whatwg-fetch";

async function checkStatus(response) {
  const { status } = response;
  if (status >= 200 && status < 300) {
    return response;
  }

  switch (status) {
    case 403:
      break;
    case 404:
      break;
    default:
  }
  return false;
}

const extractBody = response => {
  if (!response) {
    return { ok: false };
  }
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return response.json();
  }
  return response.text();
};

export default {
  async get(url) {
    const response = await checkStatus(
      await fetch(url, {
        method: "GET",
        credentials: "include"
      })
    );
    return extractBody(response);
  },

  async post(url, body, { headers = {}, ...options }) {
    const response = await checkStatus(
      await fetch(url, {
        method: "POST",
        headers: {
          ...headers,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
        credentials: "include",
        ...options
      })
    );

    return extractBody(response);
  }
};
