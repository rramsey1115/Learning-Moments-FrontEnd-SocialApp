import { Route, Routes } from "react-router-dom";
import { Authorized } from "./views/Authorized";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { ApplicationViews } from "./views/ApplicationViews";

export const App = () => {
  return (
    <div className="main-container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="*"
            element={
              <Authorized>
                <ApplicationViews />
              </Authorized>
            }
          />
        </Routes>
      </div>
  );
};
