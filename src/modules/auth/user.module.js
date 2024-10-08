export const authenticateUser = async (values) => {
  const response = await fetch("http://localhost:3000/login", {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const body = await response.json();
  if (body.error) {
    throw new Error(body.error);
  }

  if (body.token) {
    localStorage.setItem("token", body.token);
  }

  return body;
};

export const saveUser = async (values) => {
  const userCreated = await fetch("http://localhost:3000/register", {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(userCreated);
  return userCreated;
};
