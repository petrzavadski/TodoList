// import React, {useState} from 'react'
import {useEffect, useState} from 'react'
import axios from 'axios';

import Create from './Create';
import './App.css'

function Home(){
    const [todos, setTodos] = useState([]);
const g = () => axios.get('http://localhost:3001/get')
.then(result=>{setTodos(result.data)
console.log(result.data)})
.catch(err=>console.log(err))

const d = id => axios.post('http://localhost:3001/delete', {
    task: id
}).then(()=>g());


const check = (id, isChecked) =>
axios.post('http://localhost:3001/check', {
    task: id,
    isChecked 
})

    useEffect(()=>{
g();
    }, []);
 
    return (
    <div className='home'>
       <h2>ToDo List</h2>
       <Create onAdd={g}/>
     <ul>
{todos.map(todo=>{

  return (
  
  <li className='line' key={todo._id}><input type="checkbox" value={todo.checked} onChange={(event)=>check(todo._id, event.target.checked)}></input><span className="todoText">{todo.task}</span> 
  <button onClick={()=>d(todo._id)}>X</button></li>)

})}


</ul>

    </div>
    )
}

export default Home;