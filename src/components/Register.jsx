import "../App.css";
import { Field, Form, Formik } from "formik";
import { saveUser } from "../modules/auth/user.module.js";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1>Register</h1>
      <Formik
        initialValues={{
          firstname: "",
          lastname: "",
          username: "",
          email: "",
          password: "",
          confirm_password: "",
        }}
        onSubmit={async (values) => {
          const response = await saveUser(values);
          const responseJson = await response.json();
          if (responseJson.error) {
            alert(responseJson.error);
          }
          // navigate("/login");
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
              name="firstname"
              placeholder="firstname"
              type="text"
              className={"input input-bordered input-primary w-full max-w-xs"}
            />
            {errors.firstname && touched.firstname && (
              <span>{errors.firstname}</span>
            )}
            <Field
              name="lastname"
              placeholder="lastname"
              type="text"
              className={"input input-bordered input-primary w-full max-w-xs"}
            />
            {errors.lastname && touched.lastname && (
              <span>{errors.lastname}</span>
            )}
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
              Already have an account?{" "}
              <a href="/login" className="text-primary">
                Login
              </a>
            </p>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Register;
