import Router from './router/Router';
import { Reset } from 'styled-reset';
import { QueryClient, QueryClientProvider } from 'react-query';
function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <Reset />
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </>
  );
}

export default App;
