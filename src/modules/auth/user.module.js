export const authenticateUser = async (values) =>
  new Promise((resolve, reject) => {
    const users = localStorage.getItem("users");
    if (users) {
      const parsedUsers = JSON.parse(users);
      const user = parsedUsers.find(
        (u) => u.email === values.email && u.password === values.password,
      );
      if (user) {
        resolve("youhou");
      }
    }
    reject("User or password incorrect");
  });

export const saveUser = async (values) => {
  const users = localStorage.getItem("users");
  if (users) {
    const parsedUsers = JSON.parse(users);
    const doesUserExist = parsedUsers.find(
      (u) => u.email === values.email || u.username === values.username,
    );
    if (doesUserExist) {
      alert("User already exists");
      return;
    }
    parsedUsers.push(values);
    localStorage.setItem("users", JSON.stringify(parsedUsers));
    return;
  }
  localStorage.setItem("users", JSON.stringify([values]));
};
