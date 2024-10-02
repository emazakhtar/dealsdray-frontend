export function updateEmployeeById(updatedEmployee, id) {
  return new Promise(async (resolve) => {
    // TODO: we will not hardcode server url here
    const response = await fetch("/employee/update-employee/" + id, {
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify(updatedEmployee),
      headers: { "content-type": "application/json" },
    });

    const data = await response.json();
    resolve({ data });
  });
}

export function addEmployee(employee) {
  return new Promise(async (resolve, reject) => {
    // TODO: we will not hardcode server url here
    try {
      console.log("Api me hai", employee);
      const response = await fetch("/employee/create-employee", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(employee),
        headers: { "content-type": "application/json" },
      });
      if (response.status === 201) {
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

export function fetchAllEmployee() {
  return new Promise(async (resolve) => {
    // TODO: we will not hardcode server url here
    const response = await fetch("/employee/get-employees", {
      method: "GET",
      credentials: "include",
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function deleteEmployeeById(id) {
  return new Promise(async (resolve, reject) => {
    // TODO: we will not hardcode server url here
    const response = await fetch("/employee/delete-employee/" + id, {
      method: "DELETE",
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      resolve({ data });
    } else {
      const error = await response.json();
      reject(error);
    }
  });
}

export function fetchEmployeeById(id) {
  return new Promise(async (resolve) => {
    // TODO: we will not hardcode server url here
    const response = await fetch("/employee/get-employee/" + id, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    resolve({ data });
  });
}
