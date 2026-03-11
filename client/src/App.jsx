import AppRoutes from "./Routes/AppRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ToastContainer } from "react-toastify";
import AuthProvider from "./store/AuthProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <ToastContainer position="top-right" theme="dark" />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
