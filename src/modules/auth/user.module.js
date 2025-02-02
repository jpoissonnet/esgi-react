export const authenticateUser = async (values) => {
  const response = await fetch(
    "https://app-a858ff1a-2e9e-4771-8fdf-fbdfb53e6b78.cleverapps.io/login",
    {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
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
  const userCreated = await fetch(
    "https://app-a858ff1a-2e9e-4771-8fdf-fbdfb53e6b78.cleverapps.io/register",
    {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  console.log(userCreated);
  return userCreated;
};
