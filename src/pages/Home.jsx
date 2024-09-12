import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const queryClient = useQueryClient()
  const { data: usersData = [] } = useQuery({
    queryKey: ['users'],
    queryFn: () => axios("http://localhost:3000/users")
  })
  console.log(usersData);
  const navigate = useNavigate()

  function handleAddBtn() {
    setTimeout(() => {
      navigate('/add')
    }, 1000);
  }

  const {mutate:delUser} = useMutation({
    mutationFn:(id) => axios.delete(`http://localhost:3000/users/${id}`),
    onSuccess:() => {
      queryClient.invalidateQueries(['users'])
    }
  })


  return (
    <div className='w-[700px] mx-auto mt-[150px]'>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Lastname</TableCell>
              <TableCell >Age</TableCell>
              <TableCell >Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersData?.data?.map((item, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell className='capitalize' component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell className='capitalize' >{item.lastname}</TableCell>
                <TableCell >{item.age}</TableCell>
                <TableCell className='space-x-1 w-[200px]'>
                  <Button onClick={() => delUser(item.id)} size='small' color='error' variant='outlined'>Delete</Button>
                  <Button onClick={() => navigate('/add', { state: item })}  size='small' color='success' variant='outlined'>Update</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className='w-full text-right mt-[20px]'>
        <Button onClick={handleAddBtn} color='primary' variant='contained' className=''>Add users</Button>
      </div>
    </div>
  )
}
