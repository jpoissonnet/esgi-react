import "../App.css";
import { Field, Form, Formik } from "formik";
const Login = () => {
  return (
    <>
      <h1>Login</h1>
      <Formik
        initialValues={{
          login: "",
          password: "",
        }}
        onSubmit={async (values) => {
          console.log(values);
        }}
      >
        <Form
          className={"flex flex-col items-center justify-center my-3 gap-3"}
        >
          <Field
            name="login"
            type="text"
            className={"input input-bordered input-primary w-full max-w-xs"}
          />
          <Field
            name="password"
            type="password"
            className={"input input-bordered input-primary w-full max-w-xs"}
          />
          <button type="submit">Submit</button>
          <p>
            Looking to register? <a href="/register">Register</a>
          </p>
        </Form>
      </Formik>
    </>
  );
};

export default Login;
