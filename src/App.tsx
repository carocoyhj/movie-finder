import { AppRoutes } from "@/routes";
import { Toaster } from "sonner";

const App = () => {
  return (
    <>
      <AppRoutes />
      <Toaster
        position="top-right"
        richColors
        theme="dark"
        toastOptions={{
          style: {
            background: "#0f172a",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "#f8fafc",
          },
        }}
      />
    </>
  );
};

export default App;
