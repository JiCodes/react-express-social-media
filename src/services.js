export function fetchSession() {
  return fetch("/api/v1/session", {
    method: "GET",
  })
    .catch(() => Promise.reject({ error: "networkError" }))
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response
        .json()
        .catch((error) => Promise.reject({ error }))
        .then((err) => Promise.reject(err));
    });
}

export function fetchLogin(username) {
  return fetch("/api/v1/session", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ username }),
  })
    .catch(() => Promise.reject({ error: "networkError" }))
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response
        .json()
        .catch((error) => Promise.reject({ error }))
        .then((err) => Promise.reject(err));
    });
}

export function fetchLogout() {
  return fetch("/api/v1/session", {
    method: "DELETE",
  })
    .catch(() => Promise.reject({ error: "networkError" }))
    .then((response) => {
      if (response.ok) {
        return;
      }
      return response
        .json()
        .catch((error) => Promise.reject({ error }))
        .then((err) => Promise.reject(err));
    });
}

export function fetchPosts() {
  return fetch("/api/v1/posts")
    .catch(() => Promise.reject({ error: "networkError" }))
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response
        .json()
        .catch((error) => Promise.reject({ error }))
        .then((err) => Promise.reject(err));
    });
}

export function fetchAddPost(post) {
  return fetch("/api/v1/posts", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ post }),
  })
    .catch(() => Promise.reject({ error: "networkError" }))
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response
        .json()
        .catch((error) => Promise.reject({ error }))
        .then((err) => Promise.reject(err));
    });
}
