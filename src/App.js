import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import RouterPage from "./router";

const queryClient = new QueryClient();

const App = () => (
  <React.Fragment>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <RouterPage />
    </QueryClientProvider>
  </React.Fragment>
);

export default App;
