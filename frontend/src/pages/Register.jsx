import { Button, Card, TextInput } from 'flowbite-react'
import { useState } from 'react'
import { postRequest } from '../utils'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginUser } from '../redux/user'

function Register() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const { data } = await postRequest({
      url: "/register",
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
          <h1 className="text-xl font-bold">Account Registration</h1>
          <p className='opacity-80'>Kindly fill the complete details to continue your registration</p>

          <form className='flex flex-col mt-5 gap-2' onSubmit={handleSubmit}>

            <div className="">
              <label htmlFor="name" className='text-xs opacity-80'>
                Name
              </label>
              <TextInput placeholder='e.g Jogn Doe' id="name" type="name" required={true} name='name' />
            </div>

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

            <div>
              <label htmlFor="password_confirmation" className='text-xs opacity-80'>
                Confirm Password
              </label>
              <TextInput id="password_confirmation" type="password" required={true} name='password_confirmation' autoComplete='off' />
            </div>

            <Button type='submit' disabled={loading}>Create Account</Button>
            <div className="text-center text-sm mt-5">
              <Link to="/login">Returning user? Login</Link>
            </div>
          </form>
        </div>
      </Card>
    </div>
  )
}

export default Register