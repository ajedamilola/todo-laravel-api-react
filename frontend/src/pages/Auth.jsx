import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import LoadingPage from './LoadingPage'
import { getRequest } from '../utils'
import { useDispatch } from 'react-redux'
import { loginUser } from '../redux/user'
import { useCallback } from 'react'

function Auth() {
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const loadData = useCallback(async () => {
    setErrors(false)
    const { data, err } = await getRequest({
      state: setLoading,
      url: "/user",
    })
    setErrors(err)
    if (!err) {
      dispatch(loginUser(data.user))
    } else {
      navigate("/login")
    }
  }, [dispatch, navigate, setLoading])

  useEffect(() => {
    loadData()
  }, [loadData])
  return loading ? <LoadingPage errors={errors} onReload={loadData} /> : (
    <div>
      <Outlet />
    </div>
  )
}

export default Auth