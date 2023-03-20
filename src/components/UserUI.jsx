import {
  Button,
  FormControl,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';


export default function UserUI({ users }) {

    const handleAdd = async e => {
        const username = document.getElementById('username').value;
        const name = document.getElementById('name').value;
        const surname = document.getElementById('surname').value;

        const response = await fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
        name,
        surname,
      }),
    });
// clear form fields

    document.getElementById('username').value = '';
    document.getElementById('name').value = '';
    document.getElementById('surname').value = '';

  };

    const handleDelete = async id => {
        const response = await fetch(`http://localhost:5000/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
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
            {users.map(user => (
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
        justifyContent="space-between" >
                <Input m={1} type="text" placeholder="Username" />
            </FormControl>
        <FormControl m={1} id="name">
        <Input type="text" placeholder="Imię" />
      </FormControl>
            <FormControl m={1} id="surname">
          <Input type="text" placeholder="Nazwisko" />
      </FormControl>
      <Button
        m={1}
        size="sm"

        colorScheme="blue"
        onClick={() => handleAdd()}
      >
        Dodaj
      </Button>


        </div>
    );
}
