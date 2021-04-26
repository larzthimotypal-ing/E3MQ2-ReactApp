import './App.css';
import {useState, useEffect} from 'react';

//importing components
import Header from './components/Header'
import Form from './components/Form'
import TodoList from './components/TodoList'

function App() {
  
  const apiUrl = 'http://localhost:52971/api/todo';

  //States
  const [inputText, setInputText] = useState("")
  const [todos, setTodos] = useState([])
  const [status, setStatus] = useState("all");
  const [filteredList, setFilteredList] = useState([])
  const [isEditing, setIsEditing] = useState(null)
  const [isGetting, setIsGetting] = useState(true)
  const [isRefreshed, setIsRefreshed] = useState(false)

  //Effects

  useEffect(() => {
    
    if(isRefreshed === false)
    {
      fetch(apiUrl).then(res => {
        return res.json();
      }).then(r => {
        setTodos(r)
      })


    }
    
  },[isGetting])

  useEffect(() => {
    filterHandler()
  },[todos,status])

  useEffect(() =>{
    removeIsEditing()
  },[todos,status,inputText])

  //Functions
  const filterHandler = () => {
    switch(status){
      case "completed":
        setFilteredList(todos.filter(todo => todo.completed === true))
        break;
      case "uncompleted":
        setFilteredList(todos.filter(todo => todo.completed === false))
        break;
      default:
        setFilteredList(todos);
        break;
    }
  }

  const removeIsEditing = () =>{
    setIsEditing(null);
  }

  const fetchRefresh = () => {
    setIsRefreshed(false)
    setIsGetting(true)
    setIsRefreshed(true)
    setIsGetting(false)
    
  }

  return (
    <div className="App">
      <Header />
      
      <Form inputText={inputText} setInputText={setInputText} 
      todos={todos} setTodos={setTodos}
      setStatus={setStatus}
      apiUrl={apiUrl}
      fetchRefresh={fetchRefresh}
      />
      <TodoList setTodos={setTodos} todos={todos}
       filteredList={filteredList}
       isEditing={isEditing} setIsEditing={setIsEditing}
       apiUrl = {apiUrl} 
       fetchRefresh={fetchRefresh}
       />
    </div>
  );
}

export default App;
