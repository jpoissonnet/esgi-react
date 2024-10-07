import "../App.css";
import { Field, Form, Formik } from "formik";

const saveUser = async (values) => {
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

const Register = () => {
  return (
    <>
      <h1>Register</h1>
      <Formik
        initialValues={{
          name: "",
          surname: "",
          username: "",
          email: "",
          password: "",
          confirm_password: "",
        }}
        onSubmit={async (values) => {
          saveUser(values);
        }}
        validateOnBlur
        validate={(values) => {
          const errors = {};

          if (!values.email) {
            errors.email = "Required";
          }
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = "Invalid email address";
          }
          if (!values.password) {
            errors.password = "Required";
          }
          if (!values.confirm_password) {
            errors.confirm_password = "Required";
          }
          if (values.password !== values.confirm_password) {
            errors.confirm_password = "Passwords do not match";
          }
          return errors;
        }}
      >
        {({ errors, touched }) => (
          <Form
            className={"flex flex-col items-center justify-center my-3 gap-3"}
          >
            {/* nom, prénom, email, username, password */}
            <Field
              name="name"
              placeholder="name"
              type="text"
              className={"input input-bordered input-primary w-full max-w-xs"}
            />
            {errors.name && touched.name && <span>{errors.name}</span>}
            <Field
              name="surname"
              placeholder="surname"
              type="text"
              className={"input input-bordered input-primary w-full max-w-xs"}
            />
            {errors.surname && touched.surname && <span>{errors.surname}</span>}
            <Field
              name="username"
              placeholder="username"
              type="text"
              className={"input input-bordered input-primary w-full max-w-xs"}
            />
            <Field
              name="email"
              placeholder="email"
              type="text"
              className={"input input-bordered input-primary w-full max-w-xs"}
            />
            {errors.email && touched.email && <span>{errors.email}</span>}
            <Field
              name="password"
              placeholder="password"
              type="password"
              className={"input input-bordered input-primary w-full max-w-xs"}
            />
            {errors.password && touched.password && (
              <span>{errors.password}</span>
            )}
            <Field
              name="confirm_password"
              placeholder="confirm password"
              type="password"
              className={"input input-bordered input-primary w-full max-w-xs"}
            />
            {errors.confirm_password && touched.confirm_password && (
              <span>{errors.confirm_password}</span>
            )}
            <button type="submit" className={"btn btn-primary w-full max-w-xs"}>
              Submit
            </button>
            <p>
              Already have an account? <a href="/login">Login</a>
            </p>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Register;
