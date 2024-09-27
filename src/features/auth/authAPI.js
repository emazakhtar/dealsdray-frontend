export function loginUser(userData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(userData),
        credentials: "include",
        headers: { "content-type": "application/json" },
      });

      if (response.status === 200) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function signOut() {
  return new Promise(async (resolve, reject) => {
    // on server we will remove user session info
    try {
      const response = await fetch("/auth/logout", {
        method: "GET",
        credentials: "include",
        headers: { "content-type": "application/json" },
      });

      if (response.status === 200) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}
export function checkUser() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/check", {
        method: "GET",
        credentials: "include",
        headers: { "content-type": "application/json" },
      });

      if (response.status === 200) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function loadUsersInfo() {
  return new Promise(async (resolve) => {
    // TODO: we will not hardcode server url here
    const response = await fetch("/user", {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    resolve({ data });
  });
}
