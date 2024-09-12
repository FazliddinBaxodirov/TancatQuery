import { Button } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Input } from 'antd'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Add() {
  const navigate = useNavigate()
  const location = useLocation()
  const userToUpdate = location.state || {}
  const { data: usersData = [] } = useQuery({
    queryKey: ['users'],
    queryFn: () => axios("http://localhost:3000/users")
  })

  const { mutate } = useMutation({
    mutationFn: (body) => {
      if (userToUpdate?.id) {
        return axios.put(`http://localhost:3000/users/${userToUpdate.id}`, body) // Update request
      }
      return axios.post("http://localhost:3000/users", body) // Add request
    }
  })

  function handleSubmit(e) {
    e.preventDefault()
    const object = {
      name: e.target.name.value,
      lastname: e.target.lastname.value,
      age: e.target.age.value
    }
    mutate(object)
    setTimeout(() => {
      navigate(-1)
    }, 800)
  }

  useEffect(() => {
    if (userToUpdate) {
      document.getElementsByName('name')[0].value = userToUpdate.name || ''
      document.getElementsByName('lastname')[0].value = userToUpdate.lastname || ''
      document.getElementsByName('age')[0].value = userToUpdate.age || ''
    }
  }, [userToUpdate])
  return (
    <div className='w-[700px] mx-auto mt-[150px]'>
      <h2 className='text-center font-semibold text-[28px] text-blue-400 mb-[25px]'>Enter information about you</h2>
      <form onSubmit={handleSubmit} className='flex flex-col space-y-5'>
        <label className='space-y-[8px]'>
          <span className='text-blue-500'>Enter your name</span>
          <Input required name='name' size='large' placeholder='Name...' />
        </label>
        <label className='space-y-[8px]'>
        <span className='text-blue-500'>Enter your lastname</span>
          <Input required name='lastname' size='large' placeholder='Lastname...' />
        </label>
        <label className='space-y-[8px]'>
        <span className='text-blue-500'>Enter your age</span>
          <Input required name='age' size='large' placeholder='Age...' />
        </label>
        <Button type='submit' variant='contained' size='large'>Add</Button>
      </form>
    </div>
  )
}
