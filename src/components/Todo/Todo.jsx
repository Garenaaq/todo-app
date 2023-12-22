import React from 'react'
import { IconButton } from '@mui/material';
import { Delete, Edit} from '@mui/icons-material';
import {Draggable} from 'react-beautiful-dnd';

const Todo = ({t, index, toggleComplete, deleteTodo, editTodo}) => {
  return (
    <Draggable key={t.id} draggableId={t.id} index={index}>
      {
        (provided) => (
          <div className='Todo' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
              <p onClick={() => {toggleComplete(t.id)}} className={`${t.completed ? 'completed': ""}`}>{t.task}</p>
              <div>
                  <IconButton onClick={() => editTodo(t.id, t.task)} ><Edit/></IconButton>
                  <IconButton onClick={() => deleteTodo(t.id)}><Delete/></IconButton>
              </div>
          </div>
        )
      }
    </Draggable>
  );
}

export default Todo;