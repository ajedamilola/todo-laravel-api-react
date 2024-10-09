import { Provider } from 'react-redux'
import store from './redux/store'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import { Toaster } from 'sonner'
import Auth from './pages/Auth'
import Todos from './pages/Todos'
import Todo from './pages/Todo'
import NewTodo from './pages/NewTodo'

function App() {
  return (
    <div>
      <Toaster position='top-center' theme='system' richColors expand />
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/*' element={<Auth />}>
              <Route path='' element={<Todos />} />
              <Route path='new' element={<NewTodo />} />
              <Route path=':id' element={<Todo />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  )
}

export default App