import React, {useState} from 'react';

const TodoForm = ({addTodo}) => {
    const [value, setValue] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        if (value) {
            addTodo(value);
            setValue("");
        }
    };

    return (
        <form className='TodoForm' onSubmit={handleSubmit}>
            <input type='text' value={value} name='formInput' placeholder='Введите задачу' className='todo-input' onChange={(event) => {setValue(event.target.value)}} />
            <button type='submit' className='todo-btn'>Добавить задачу</button>
        </form>
    );
};

export default  TodoForm;
