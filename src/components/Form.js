
const Form = (props) => {
    
    const inputTextHandler = (e) => {
        props.setInputText(e.target.value)
    }

    const createNewTodo = todo => {
        const options = {
          method: 'POST',
          body: JSON.stringify(todo),
          headers: new Headers({
            'Content-Type': 'application/json'
          })
        }
        return fetch(props.apiUrl, options)
        .then(res => res.json())
        .catch(err => console.error(err))
    }
    
    const submitTodoHandler = (e) => {
        e.preventDefault()
        const newTodo = {name: props.inputText, completed: false,id: Math.random() * 1000}
        props.setTodos([
            ...props.todos, newTodo
        ])
        createNewTodo(newTodo)
        props.setInputText("")
    }

    const statusHandler = (e) => {
        props.setStatus(e.target.value)
    }
    
    return (
        <form className="add-form">
            <input value={props.inputText} onChange={inputTextHandler} 
            type="text" className="todo-input" maxLength="16"/>
            <button onClick={submitTodoHandler} className="todo-button" type="submit">
                <i className="fas fa-plus-square"></i>
            </button>
            <div className="select">
                <select onChange={statusHandler} name="todos" className="filter-todo">
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="uncompleted">Uncompleted</option>
                </select>
            </div>
        </form>
    )
}

export default Form
