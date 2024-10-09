import { Button, Card, Label, TextInput, Textarea } from 'flowbite-react'
import { postRequest } from '../utils'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function NewTodo() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  async function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const { data } = await postRequest({
      url: "/todos",
      formData,
      state: setLoading
    })
    if (data) {
      navigate("/")
    }
  }
  return (
    <div className="max-w-md mx-auto mt-10">
      <Card>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="title" value="Todo Title" className='text-sm' />
            </div>
            <TextInput id="title" type="text" name='title' placeholder="Enter todo title" required />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="description" value="Todo Description" className='text-sm' />
            </div>
            <Textarea id="description" name='description' placeholder="Enter todo description" rows={4} />
          </div>
          <Button type="submit" disabled={loading}>Create Todo</Button>
        </form>
      </Card>
    </div>
  )
}

export default NewTodo