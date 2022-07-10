import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const Todos = () => {
  const [showInput, setShowInput] = useState(false);
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState({});

  async function getAllTodos() {
    try {
      let data = await fetch(`http://localhost:3000/todos`);
      let res = await data.json();
      setTodos(res);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAllTodos();
  }, []);

  function handleSubmit() {
    let temp = {
      task: task,
    };
    console.log(temp);
    fetch(`http://localhost:3000/todo`, {
      method: 'POST',
      body: JSON.stringify(temp),
      headers: {
        'Content-Type': 'Application/json',
      },
    })
      .then(alert('Task Added'))
      .then(getAllTodos);
  }

  function handleDelete(id) {
    fetch(`http://localhost:3000/todo/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'Application/json',
      },
    }).then(getAllTodos);
  }

  return (
    <>
      <center>
        <Button
          onClick={() => {
            setShowInput(!showInput);
          }}
        >
          {showInput ? 'Add Task' : 'Show Task'}
        </Button>
        {!showInput ? (
          <Box w="60%">
            <FormControl isRequired>
              <FormLabel>Task</FormLabel>
              <Input
                onChange={e => setTask(e.target.value)}
                placeholder="Task"
              />
              <Button colorScheme="blue" onClick={handleSubmit}>
                Submit
              </Button>
            </FormControl>
          </Box>
        ) : (
          <div>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Task</Th>
                    <Th>Time</Th>
                    <Th>Delete</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {todos.map(todo => (
                    <Tr key={todo.id}>
                      <Td>{todo.task}</Td>
                      <Td>{todo.time}</Td>
                      <Td>
                        <Button onClick={() => handleDelete(todo.id)}>x</Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </div>
        )}
      </center>
    </>
  );
};
export default Todos;
