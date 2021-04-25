import Todo from './Todo'

const TodoList = (props) => {

    return (
        <div className="todo-container">
            <ul className="todo-list">
                {props.filteredList.map(todo => (
                    <Todo 
                        setTodos={props.setTodos}
                        todos={props.todos}
                        todo={todo}
                        key={todo.id} 
                        text={todo.name}
                        isEditing = {props.isEditing}
                        setIsEditing = {props.setIsEditing}
                        apiUrl = {props.apiUrl}/>
                ))}
            </ul>
        </div>
    )
}

export default TodoList
