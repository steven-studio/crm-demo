import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AUTH_ROUTES, ADMIN_ROUTES } from "./routes";
import MainLayout from "./layout";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <BrowserRouter>
          <Routes>
            {AUTH_ROUTES?.map((route) => (
              <Route
                key={route.id}
                path={route.path}
                element={route.component}
              />
            ))}

            {ADMIN_ROUTES?.map((route) => (
              <Route
                key={route.id}
                path={route.path}
                element={<MainLayout>{route.component}</MainLayout>}
              />
            ))}
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </>
  );
}

export default App;
