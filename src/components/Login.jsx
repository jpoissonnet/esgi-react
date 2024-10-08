import "../App.css";
import { Field, Form, Formik } from "formik";
import { authenticateUser } from "../modules/auth/user.module.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (values) => {
    try {
      await authenticateUser(values);
    } catch (error) {
      console.error(error);
      setError(error?.message || error);
      setTimeout(() => setError(null), 2000);
      return;
    }
    navigate("/");
  };

  return (
    <>
      <h1>Login</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form
            className={"flex flex-col items-center justify-center my-3 gap-3"}
          >
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
              <span className="relative top-0 right-0">{errors.password}</span>
            )}
            {error && <span className="text-secondary">{error}</span>}
            <button type="submit" className={"btn btn-primary w-full max-w-xs"}>
              Submit
            </button>
            <p>
              Looking for account creation?{" "}
              <a href="/register" className="text-primary">
                Register
              </a>
            </p>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Login;
