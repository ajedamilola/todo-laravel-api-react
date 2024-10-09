/* eslint-disable react/prop-types */
import { useEffect } from "react"
import { useState } from "react"
import { deleteRequest, getRequest, patchRequest } from "../utils"
import LoadingPage from "./LoadingPage"
import { Badge, Button, ButtonGroup, Card, Checkbox } from "flowbite-react"
import { Link, useNavigate } from "react-router-dom"

function Todos() {
  const [loading, setLoading] = useState(true)
  const [todos, setTodos] = useState([])
  const [error, setError] = useState(false)
  const [pageData, setPageData] = useState({ links: [], })

  async function getTodos(page = 1) {
    setLoading(true)
    setError(false)
    const { data, err } = await getRequest({
      url: "/todos?page=" + page,
      state: setLoading
    })
    if (err) {
      setError(err)
    } else {
      setTodos(data.data)
      setPageData({ links: data.links })
    }
  }
  useEffect(() => {
    getTodos();
  }, [])

  if (loading || error) return <LoadingPage onReload={getTodos} errors={error} />
  return (
    <div className="p-10">
      <h1 className="text-xl font-bold text-center"><u>CRUD Todo Application React + Laravel(API Only)</u></h1>
      <div className="flex justify-center my-4">
        <Link to={"/new"}><Button>+ New Todo</Button></Link>
      </div>
      <div className="flex flex-col gap-5 mx-20">
        {todos.map(todo => <SingleTodo key={todo.id} todo={todo} setTodos={setTodos} />)}
      </div>
      <div className="flex gap-2 mx-auto w-fit mt-5">
        {pageData.links.map(link => {
          let trim = link.url?.split("?page=")[1];
          let label = link.label == "&laquo; Previous" ? "<" : link.label == "Next &raquo;" ? ">" : link.label
          return <Button key={Math.random()} disabled={!link.url || link.active} onClick={() => {
            getTodos(trim)
          }}>{label}</Button>
        })}
      </div>
    </div>
  )
}

const SingleTodo = ({ todo, setTodos }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [displayTodo, setDisplayTodo] = useState(todo)
  async function onToggle() {
    const { data } = await patchRequest({
      url: `/todos/${todo.id}/toggle`,
      state: setLoading
    })
    if (data) {
      setDisplayTodo(data)
    }
  }

  async function handleDelete() {
    const { err } = await deleteRequest({
      url: "/todos/" + todo.id,
      state: setLoading
    })
    if (!err) {
      setTodos(todos => todos.filter(t => t.id != todo.id))
    }
  }
  return (
    <Card className={`${loading ? "opacity-50" : ""}`}>
      <div className="flex gap-10 items-center justify-between">
        <Checkbox disabled={loading} checked={displayTodo.completed} onChange={onToggle} />
        <div className="flex-1" >
          <h1 className="text-xl font-bold" style={{ textDecoration: displayTodo.completed && "line-through" }}>{displayTodo.title}</h1>
          <p className="text-sm opacity-80" style={{ textDecoration: displayTodo.completed && "line-through" }}>{displayTodo.description}</p>
          <div>
            {displayTodo.completed ? <Badge className="w-fit mt-2" color="green">Completed</Badge> : <></>}
          </div>
        </div>
        <div className="">
          <ButtonGroup>
            <Button size="sm" onClick={() => navigate("" + todo.id)}>Edit</Button>
            <Button size="sm" color="red" onClick={() => {
              const choice = confirm("Are you sure you want to delete?")
              if (choice) {
                handleDelete()
              }
            }}>Delete</Button>
          </ButtonGroup>
        </div>
      </div>
    </Card>
  )
}
export default Todos