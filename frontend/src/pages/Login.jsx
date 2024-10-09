import { Button, Card, TextInput } from 'flowbite-react'
import { useState } from 'react'
import { postRequest } from '../utils'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginUser } from '../redux/user'

function Login() {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const { data } = await postRequest({
      url: "/login",
      formData,
      state: setLoading
    })
    if (data) {
      localStorage.setItem("token", data.access_token)
      dispatch(loginUser(data.user))
      navigate("/")
    }

  }

  return (
    <div className='h-screen flex justify-center items-center'>
      <Card>
        <div>
          <h1 className="text-xl font-bold">Account Login</h1>
          <p className='opacity-80'>Kindly fill the complete details to login into your account</p>

          <form className='flex flex-col mt-5 gap-2' onSubmit={handleSubmit}>
            <div className="">
              <label htmlFor="email" className='text-xs opacity-80'>
                Email Address
              </label>
              <TextInput placeholder='e.g ajedamilola2005@gmail.com' id="email" type="email" required={true} name='email' />
            </div>

            <div>
              <label htmlFor="password" className='text-xs opacity-80'>
                Password
              </label>
              <TextInput id="password" type="password" required={true} name='password' />
            </div>

            <Button type='submit' disabled={loading}>Login</Button>
            <div className="text-center text-sm mt-5">
              <Link to="/register">New Here? Simply Register</Link>
            </div>
          </form>
        </div>
      </Card>
    </div>
  )
}

export default Login