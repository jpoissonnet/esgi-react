import { Outlet } from "react-router-dom";

const Auth = () => {
  return (
    <main className="flex flex-col h-screen justify-center">
      <Outlet />
    </main>
  );
};

export default Auth;
