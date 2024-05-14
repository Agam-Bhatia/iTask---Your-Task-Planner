import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

function App() {

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  
  const saveToLS = ()=>{
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  
  const handleAdd = ()=>{
    setTodos([...todos, {id: uuidv4(), todo, iscompleted: false}]);
    setTodo("");
    console.log(todos);
    saveToLS();
  }
  
  const handleChange = (e)=>{
    setTodo(e.target.value);
  }
  
  const toggleFinished = (e)=>{
    setShowFinished(!showFinished);
  }
  
  const handleCheckbox = (e)=>{
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    // let newTodos = todos;  note: if I write it like this then newTodos will refer to the same todos and no new todo will be formed. For this to not happen I have to write it like this:
    let newTodos = [...todos];
    newTodos[index].iscompleted = !newTodos[index].iscompleted;
    setTodos(newTodos);
    saveToLS();
  }
  
  
  const handleEdit = (e, id)=>{
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    setTodo(todos[index].todo);
    let newTodos = todos.filter(item=>{
      return item.id!==id;
    })
    setTodos(newTodos);
    saveToLS();
  }
  
  // handleDelete is made by using 2 different methods (look at delete button). Both of them works!
  
  const handleDelete = (e)=>{
    let id = e.target.name;
    
    // The index method
    // let index = todos.findIndex(item=>{
      //   return item.id === id;
      // })
      // let newTodos = [...todos];
      // newTodos.splice([index]);
      
      // The filter method
      let newTodos = todos.filter(item=>{
        return item.id!==id;
      })
      setTodos(newTodos);
      saveToLS();
  }
  // const handleDelete = (e, id)=>{
    
  //   // The index method
  //   // let index = todos.findIndex(item=>{
  //   //   return item.id === id;
  //   // })
  //   // let newTodos = [...todos];
  //   // newTodos.splice([index]);
  
  //   // The filter method
  //   let newTodos = todos.filter(item=>{
  //     return item.id!==id;
  //   })
  //   setTodos(newTodos);
  // }
          
  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, [])
  return (
    <>
      <Navbar/>
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl bg-violet-100 p-5 min-h-[80vh] md:w-[35%]">
        <h1 className='font-bold text-center text-2xl'>iTask - Manage your todos at one place</h1>
        <h2 className='text-lg font-bold mt-5'>Add a Todo</h2>
        <div className='addTodo my-2 flex gap-2'>
          <input type="text" value={todo} onChange={handleChange} className='w-full rounded-md'/>
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 text-white px-2 py-1 rounded-md hover:bg-violet-950 text-sm font-bold disabled:bg-violet-400'>Save</button>
        </div>
        <div className='stretch w-[95%] bg-black opacity-15 h-[1px] rounded-full my-5 mx-auto'></div>
        <input type="checkbox" onChange={toggleFinished} checked={showFinished} name="" id="" /> Show Finished
        <h2 className='text-lg font-bold mt-5'>Your Todos</h2>

        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No Todos to display</div>}
          {todos.map(e=>{
            return (showFinished || !e.iscompleted) && <div key={e.id} className="todo flex justify-between my-2 gap-4">
                <div className='flex gap-3 items-center'>
                  <input type="checkbox" checked={e.iscompleted} name={e.id} onChange={handleCheckbox} id="" />
                  <div className={e.iscompleted?"line-through":""}>{e.todo}</div>
                </div>
                <div className="buttons flex h-full">
                  <button name="" onClick={(item)=>{handleEdit(item, e.id)}} className='bg-violet-800 text-white px-2 py-1 mx-1 rounded-md hover:bg-violet-950 text-sm font-bold'><FaRegEdit /></button>              
                  <button name={e.id} onClick={handleDelete} className='bg-violet-800 text-white px-2 py-1 mx-1 rounded-md hover:bg-violet-950 text-sm font-bold'><RiDeleteBin6Line /></button> 

                  {/* The other way of accessing id in delete button using event is:  */}
                  {/* <button onClick={(item)=>{handleDelete(item, e.id)}} className='bg-violet-800 text-white px-2 py-1 mx-1 rounded-md hover:bg-violet-950 text-sm font-bold'>Delete</button> */}

                </div>
              </div>
            
          })}
        </div>
      </div>
    </>
  )
}

export default App
