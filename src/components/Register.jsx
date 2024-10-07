import "../App.css";
import { Field, Form, Formik } from "formik";

const Register = () => {
  return (
    <>
      <h1>Register</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
          confirm_password: "",
        }}
        onSubmit={async (values) => {
          console.log(values);
        }}
        validateOnBlur
        validateOnChange
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
        {({ errors }) => (
          <Form
            className={"flex flex-col items-center justify-center my-3 gap-3"}
          >
            <Field
              name="email"
              placeholder="email"
              type="text"
              className={"input input-bordered input-primary w-full max-w-xs"}
            />
            <div>{errors.email}</div>
            <Field
              name="password"
              placeholder="password"
              type="password"
              className={"input input-bordered input-primary w-full max-w-xs"}
            />
            <div>{errors.password}</div>
            <Field
              name="confirm_password"
              placeholder="confirm password"
              type="password"
              className={"input input-bordered input-primary w-full max-w-xs"}
            />
            <div>{errors.confirm_password}</div>
            <button type="submit">Submit</button>
            <p>
              Looking to register? <a href="/register">Register</a>
            </p>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Register;
