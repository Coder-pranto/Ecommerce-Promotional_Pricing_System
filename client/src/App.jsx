import { RouterProvider } from "react-router-dom";
import routers from "./router/router";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { OrderProvider } from "./context/OrderContext";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="font-outfit">
      <OrderProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={routers} />
          <Toaster />
        </QueryClientProvider>
      </OrderProvider>
    </div>
  );
}

export default App;
