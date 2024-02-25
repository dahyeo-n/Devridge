import GlobalStyle from 'components/commons/Reset';
import Router from './router/Router';

import { QueryClient, QueryClientProvider } from 'react-query';
function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </>
  );
}

export default App;
