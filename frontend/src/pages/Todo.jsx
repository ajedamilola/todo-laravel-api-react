/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, Label, TextInput, Textarea } from 'flowbite-react'
import { getRequest, patchRequest } from '../utils'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import LoadingPage from './LoadingPage'
import { useCallback } from 'react'

function Todo() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [submiting, setSubmitting] = useState(false)
  const [todo, setTodo] = useState({})
  const { id } = useParams();
  const [err, setErr] = useState(null)

  const getData = useCallback(async () => {
    const { data, err } = await getRequest({
      url: "/todos/" + id,
      state: setLoading
    })
    if (!err) {
      setTodo(data)
    }
    setErr(err)
  }, [])

  useEffect(() => {
    getData()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const { data } = await patchRequest({
      url: "/todos/" + todo.id,
      formData,
      state: setSubmitting
    })
    if (data) {
      navigate("/")
    }
  }

  if (loading) return <LoadingPage onReload={getData} errors={err} />

  return (
    <div className="max-w-md mx-auto mt-10">
      <Card>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="title" value="Todo Title" className='text-sm' />
            </div>
            <TextInput id="title" defaultValue={todo.title} type="text" name='title' placeholder="Enter todo title" required />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="description" value="Todo Description" className='text-sm' />
            </div>
            <Textarea id="description" name='description' defaultValue={todo.description} placeholder="Enter todo description" rows={4} />
          </div>
          <Button type="submit" disabled={submiting}>Edit Todo</Button>
        </form>
      </Card>
    </div>
  )
}

export default Todo