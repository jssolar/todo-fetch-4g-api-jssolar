import { useEffect, useState } from 'react'
import '../styles/Todo.css'
import { AiOutlineEdit } from 'react-icons/ai';
import { RiDeleteBin7Fill } from 'react-icons/ri';

const Todo = () => {
  // const url = 'http://localhost:3500'
  const url = 'https://playground.4geeks.com/apis/fake/todos/user/jsolar'

  const [text, setText] = useState('')
  const [task, setTask] = useState([])
  const [user, setUser] = useState('') // Cambiado de null a ''

  //-----< traaer las tareas de usuario >------------------------------------->

  const getTask = () => {
    fetch(`${url}`)
      .then((response) => response.json())
      .then((data) => {
        setTask([...data])
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  useEffect(() => {
      getTask()
  }, [])





//-----< agregar todo >-------------------------------------->

  const handleSubmitTask = (e) => {
    e.preventDefault()
    if (text.trim() !== "") {
      fetch(`${url}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(    [
          { label: text, done: false }
        ])
      }).then((response) => {
        // const newTodo = [...task, text]
        const newTodo = [...task, { label: text, done: false }];
        setText('')
        setTask([...newTodo]);
        console.log(response)
      })
      .catch((error) => {
        console.error('Error al agregar una tarea:', error);
      });
    } else {
      alert('Por favor, ingresa una tarea');
    }
  };


  //-----< crear usuario, si no existe, haciendo click en boton >------------------------>
  const handleSubmitUser = (e) => {
    e.preventDefault()
    if (user.trim() !== "") { // Cambiado de text a user
      fetch(`${url}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([])
      }).then((response) => {
        console.log('response', response.statusText)
        alert('USUARIO CREADO')
        setUser('')
      })
      .catch((error) => {
        console.error('Error al agregar un usuario:', error);
      });
    } else {
      alert('Por favor, ingresa un nuevo usuario');
    }
  };

  const handleChange = (e) => {
    setText(e.target.value)
  }

  const handleChangeUser = (e) => {
    setUser(e.target.value) // Cambiado de setUser a setUser
  }


  //-----< editar tarea >-------------------------------->
  const handleEdit = (index, updatedText) => {
    const newTask = [...task];
    newTask[index] = updatedText;
    setTask(newTask);
  };


  //-----< eliminar tarea >-------------------------------->
  const handleDelete = (index) => {
    const newTask = task.filter((_, i) => i !== index);
    setTask(newTask);
  };

//-----eliminar usuario y tareas >------------------------------>  
  const handleDeleteAll = () => {
    fetch(`${url}`, {
      method: 'DELETE',
    }).then((response)=>{
      console.log(response)
    }).then((data)=>{
      console.log(data)
    }).catch((error)=>{
      console.log(error)
    })
    ;
    setTask([]);
  };

  return (
    <>
      <div className='container contenedor-todo'>
        <h3 className='container text-center pb-3'>Todolist-fetch-jsolar</h3>
        <div className="container col-md-8">
          <form className="form-control container form-task" onSubmit={handleSubmitTask}>
            <input className='input-texto container' type="text" name="input" value={text} onChange={handleChange} placeholder="Agregar una tarea" />
            <ul className="list-group-item container d-flex flex-column align-content-end">
              {
                task.map((tarea, index) => {
                  return (
                    <div className='contenedor-lista-tarea d-flex' key={index}>
                      <li className="list-group container pe-0">{tarea.label}</li>
                      <AiOutlineEdit className='boton-editar'
                        onClick={() => {
                          const updatedText = prompt('Editar la tarea:', tarea.label);
                          if (updatedText !== null) {
                            handleEdit(index, updatedText);
                          }
                        }}
                      />
                      <RiDeleteBin7Fill className="boton-eliminar" onClick={() => handleDelete(index)} />
                    </div>
                  )
                })
              }
            </ul>
            <button className='btn btn-info boton-submit container mt-2'type="submit">Submit</button>
          </form>
        </div>
        <div className="col-md-8 container mt-5 mb-3 ">
          
          <form className="form-control form-user " onSubmit={handleSubmitUser}>
            <input className='input-texto container' type="text" name="user" value={user} onChange={handleChangeUser} placeholder="Agregar un usuario" />
            <button className='btn btn-info boton-submit container mt-2' type="submit">Crear Usuario</button>
          </form>
        <button
          className='btn btn-dark eliminar-todos container mt-2'
          onClick={handleDeleteAll}
          >
          Eliminar Todo
        </button>
          </div>
      </div>
    </>
  )
}

export default Todo
