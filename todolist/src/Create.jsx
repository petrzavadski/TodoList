import './App.css'
// import React, { useState } from 'react'
import { useState } from 'react';

import axios from 'axios';

function Create(props){
    
        const [task, setTask] = useState()
    const handleAdd = () =>{
axios.post('http://localhost:3001/add', {task})
.then(result=>props.onAdd(result))
.catch(err => console.log(err))

    }
    return (
        <div className="create_form">
<input type="text" placeholder='Enter task' onChange={e=> setTask(e.target.value)}/>
<button type="button" onClick={handleAdd}>Add</button>
        </div>
    )
}

export default Create;