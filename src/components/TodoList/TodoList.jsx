import TodoForm from '../TodoForm/TodoForm.jsx';
import Todo from '../Todo/Todo.jsx';
import { useState, useEffect } from 'react';
import {v4 as uuidv4} from 'uuid';
import {Droppable, DragDropContext} from "react-beautiful-dnd";
uuidv4();

const TodoFormEdit = ({editTodo, t}) => {
    const [valueEdit, setValueEdit] = useState(t.task);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (valueEdit) editTodo(t.id, valueEdit);
    };

    return (
        <form className='TodoFormEdit' onSubmit={handleSubmit}>
            <input type='text' value={valueEdit} name='formInputEdit' placeholder='Обновите задачу' className='todo-input' onChange={(event) => {setValueEdit(event.target.value)}}/>
            <button type='submit' className='todo-btn'>Изменить</button>
        </form>
    );
};

const TodoList = () => {
    const [todoList, setTodoList] = useState([]);
    
    const addTodo = (todo) => {
        setTodoList([...todoList, {id: uuidv4(), task: todo, completed: false, edit: false}].reverse());
    };

    const toggleComplete = (id) => {
        setTodoList(todoList.map(todo => todo.id === id ? {...todo, completed: !todo.completed}: todo));
    };

    const deleteTodo = (id) => {
        setTodoList(todoList.filter(todo => todo.id !== id));
    };

    const editTodo = (id, value) => {
        setTodoList(todoList.map(todo => todo.id === id ? {...todo, edit: !todo.edit, task: value}: todo));
    };

    useEffect(() => {
        const listTask = JSON.parse(localStorage.getItem("todoList"));
        setTodoList(listTask);
    }, []);

    useEffect(() => {
        localStorage.setItem("todoList", JSON.stringify(todoList));
    }, [todoList]);

    const onDragEnd = (result) => {
        const {source, destination} = result;

        if (!destination) return;

        if (source.droppableId === destination.droppableId && source.index === destination.index) return;

        const recordeTodoList = [...todoList];

        const sourseIndex = source.index;
        const destinationIndex = destination.index;

        const [removeTodo] = recordeTodoList.splice(sourseIndex, 1);
        recordeTodoList.splice(destinationIndex, 0, removeTodo);

        return setTodoList(recordeTodoList);
    };

    return(
        <DragDropContext onDragEnd={onDragEnd}>
            <div className='TodoWrapper'>
                <h1>Сделай это!</h1>
                <TodoForm addTodo={addTodo}/>
                <Droppable droppableId='todo-list-id'>
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            {todoList.map((todo, index) => {
                                if (todo.edit) {
                                    return <TodoFormEdit key={index} editTodo={editTodo} t={todo}/>
                                }
                                else {
                                    return <Todo t={todo} key={index} index={index} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo}/>
                                }
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </DragDropContext>
    );
}

export default TodoList;
