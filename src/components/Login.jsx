import "../App.css";
import { Field, Form, Formik, useField } from "formik";
import { authenticateUser } from "../modules/auth/user.module.js";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const users = {
  paul: {
    email: "pouet@pouet.fr",
    password: "pouet",
  },
  jules: {
    email: "poissonnet.jules@gmail.com",
    password: "pouet",
  },
};

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(null);
  const formRef = useRef();
  useEffect(() => {
    if (location.state?.from === "logout") {
      setError("You have been logged out");
      setTimeout(() => {
        setError(null);
        navigate(location.pathname, { state: null });
      }, 2000);
    }
  }, [location.state]);
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
  const fillLoginAs = (user) => {
    formRef.current?.setValues(users[user]);
  };
  return (
    <>
      <h1>Login</h1>
      <div className="mx-auto my-3 flex items-center gap-3">
        <button
          className="btn btn-ghost max-w-fit"
          onClick={() => fillLoginAs("paul")}
        >
          Login as Paul
        </button>
        <button
          className="btn btn-ghost max-w-fit"
          onClick={() => fillLoginAs("jules")}
        >
          Login as Jules
        </button>
      </div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        innerRef={formRef}
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
            <button
              type="submit"
              className={`btn btn-primary w-full max-w-xs ${Boolean(error) && "btn-disabled"}`}
              disabled={Boolean(error)}
            >
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
