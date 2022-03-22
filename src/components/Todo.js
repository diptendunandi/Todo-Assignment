import React, {useState, useEffect} from 'react'
import "../styles/Todo.css"
import Trash from '../utils/Trash'
import {useNavigate} from "react-router-dom"
import { useSelector} from 'react-redux'
import { collection, query, where, onSnapshot, addDoc } from "firebase/firestore";
import db from '../firebase';

const Todo = () => {
    const navigate = useNavigate()
    const {user} = useSelector(state => state.user)
    const [todoItems, setTodoItems] = useState([])
    const [input, setInput] = useState("")
    
    function addTodo (e) {
        e.preventDefault()
        try {
            if(input !== " " && input.length > 0) {
                addDoc(collection(db, "todos"), {
                    item: input,
                    user_id: user.id
                  }).then(data => {
                      alert("Successfully added!")
                  }).catch(err => console.error(err))
            }
        } catch (error) {
            console.error(error)
            alert("An error occured")
        }
        setInput("")
    }


    useEffect(()=> {
        if(user.id) {
        const q = query(collection(db, "todos"), where("user_id", "==", user.id));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const todos = [];
        querySnapshot.forEach((doc) => {
            todos.push({data: doc.data().item, id: doc.id});
        });
        setTodoItems(todos)
        });
        return ()=> unsubscribe()
    } else {
        return navigate("/")
    }
    }, [user.id, navigate])

  return (
    <div className='todo'>
        <form className='todo__header'>
            <input type="text" 
            className='todo__input' 
            value={input} 
            onChange={(e)=> setInput(e.target.value)}
            required
            />
            <button className='todo__btn' onClick={addTodo}> Create Todo</button>
        </form>
        <main className='todo__main'>
            {todoItems[0] ? todoItems.map(todo => (
                <div className='todoItem' key={todo.id}>
                    <p>{todo.data}</p>
                    <Trash id={todo.id}/>
                </div>
            )) : <p>No todos available yet.</p>}
        </main>
    </div>
  )
}

export default Todo