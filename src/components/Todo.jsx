import { useState } from 'react'
import '../styles/Todo.css'
import { AiOutlineEdit } from 'react-icons/ai';
import { RiDeleteBin7Fill } from 'react-icons/ri';





const Todo = () => {
const [text, setText] = useState('')
const [task, setTask] = useState([])

const handleSubmit = (e)=>{
  e.preventDefault()
  if (text.trim() !== "") {
    setTask([...task, text]);
    setText("");
  } 
  else{alert("Please enter a task")}

  }
const handleChange=(e)=>{
  setText(e.target.value)

}

const handleEdit = (index, updatedText) => {
  const newTask = [...task];
  newTask[index] = updatedText;
  setTask(newTask);
};




const handleDelete = (index) => {
  const newTask = task.filter((_, i) => i !== index);
  setTask(newTask);
};

const handleDeleteAll = () => {
  setTask([]);
};


  return (
    <div className='container contenedor-todo'>
      <div className="container col-md-8 ">
        <form className="fomr-control container" onSubmit={handleSubmit}>
          <input className='input-texto container' type="text" name="input" value={text}  onChange={handleChange} placeholder="Add a todo"/>
          
          <ul className="list-group-item container d-flex flex-column  align-content-end ">
            {
            task.map((tarea, index)=>{
              return(
              <div className='contenedor-lista-tarea d-flex ' key={index} >
              
                <li className="list-group container pe-0">{tarea}</li>
                
                <AiOutlineEdit className='boton-editar'
                  onClick={() => {
                    const updatedText = prompt('Edit the task:', tarea);
                    if (updatedText !== null) {
                      handleEdit(index, updatedText);
                    }
                  }}
                />
                <RiDeleteBin7Fill className="boton-eliminar"  onClick={() => handleDelete(index)}/>
              </div>
                )
            })
          }
          </ul>
          <button className='btn btn-info boton-submit container mt-2'>Submit</button>
        </form>
          <button
            className='btn btn-primary elimitar-todos container  mt-2'
            onClick={handleDeleteAll}
          >
            Delete All
          </button>
      </div>

    </div>
  )
}

export default Todo