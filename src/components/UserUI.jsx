import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  SimpleGrid,
  Input,
  Box,
  Text,
  Center,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
export default function UserUI() {
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    const response = await fetch("http://localhost:5000/users");
    const data = await response.json();
    setUsers(Object.values(data));
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAdd = async (e) => {
    const username = document.getElementById("username").value;
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;

    const response = await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        name: name,
        surname: surname,
      }),
    });
    const data = await response.json();
    console.log(data);
    fetchUsers();
  };

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    fetchUsers();
  };

  return (
    <div>
      <h1>Użytkownicy</h1>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Username</Th>
              <Th>Imię</Th>
              <Th>Nazwisko</Th>
              <Th>Usuń</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user.userID}>
                <Td>{user.username}</Td>
                <Td>{user.name}</Td>
                <Td>{user.surname}</Td>

                <Td>
                  <Button
                    size="xs"
                    variant="outline"
                    colorScheme="red"
                    onClick={() => handleDelete(user.userID)}
                  >
                    X
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <FormControl
        id="username"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Input type="text" placeholder="Username" />
      </FormControl>
      <FormControl id="name">
        <Input type="text" placeholder="Imię" />
      </FormControl>
      <FormControl id="surname">
        <Input type="text" placeholder="Nazwisko" />
      </FormControl>
      <Button
        size="xs"
        variant="outline"
        colorScheme="blue"
        onClick={() => handleAdd()}
      >
        Add
      </Button>
    </div>
  );
}
