import { Box, Button, Checkbox, Flex, Heading, Icon, Link, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import NextLink from "next/link";
import { useState } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { api } from "../../services/api";
import { getUsers, useUsers } from "../../services/hooks/useUsers";
import { queryClient } from "../../services/queryClient";



export default function UserList({/*{users} */}) {
   const [page, setPage] = useState(1)
    const {data , isLoading, isFetching, error} = useUsers(page
    //     , {
    //     // initialData: users
    // }
    ) 


console.log(data);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  async function handlePrefechUser(userId: string) {
      await queryClient.prefetchQuery(['user', userId], async () => {
          const response = await api.get(`user/${userId}`)
          return response.data
      }, {
          staleTime: 1000 * 60 * 10
      })
  }

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
                Usuários
                {!isLoading && isFetching && <Spinner size= 'sm' color="gray.500" ml="4" />}
            </Heading>
            <NextLink href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="green"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar novo
              </Button>
            </NextLink>
          </Flex>

         {isLoading ? (
             <Flex justify="center">
                 <Spinner />
             </Flex>
         ) : error ? (
            <Flex justify="center">
                <Text>Falha ao obter dados do usuário.</Text>
            </Flex>
         ) : (
             <>
            <Table colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th px={["4", "4", "6"]} color="gray.300" width="8">
                  <Checkbox colorScheme="green" />
                </Th>
                <Th>Usuário</Th>
                {isWideVersion && <Th>Data de cadastro</Th>}
                <Th width="8"></Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.users?.map(user => {
                  return (
                    <Tr key={user.id}>
                    <Td px={["4", "4", "6"]}>
                      <Checkbox colorScheme="green" />
                    </Td>
                    <Td>
                      <Box>
                     <Link color="purple.400" onMouseEnter={()=> handlePrefechUser(user.id)}>
                        <Text fontWeight="bold">{user.name}</Text>
                        <Text fontSize="sm" color="gray.300">{user.email}</Text>
                    </Link>
                      </Box>
                    </Td>
                    {isWideVersion && <Td>{user.createdAt}</Td>}
                    <Td>
                      <Button
                        as="a"
                        size="sm"
                        fontSize="sm"
                        colorScheme="facebook"
                        leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                      >
                        {isWideVersion ? "Editar" : ""}
                      </Button>
                    </Td>
                  </Tr>
                  )
              })}
            </Tbody>
          </Table>
          <Pagination 
            totalCountOfRegisters={/*data.totalCount*/ 100} 
            currentPage={page}
            onPageChange={setPage} />
                  </>
         )}
        </Box>
      </Flex>
    </Box>
  )
}

// export const getServerSideProps: GetServerSideProps = async() => {
//     const {users, totalCount} = await getUsers(1);

//     return {
//         props:{
//             users,
//         }
//     }
// }

