import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import Todos from './Components/todos';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Todos />
    </ChakraProvider>
  );
}

export default App;
