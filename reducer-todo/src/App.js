import React, { useReducer, useRef } from 'react';
import './App.css';

function App() {

  const inputRef = useRef();
  const [ items, dispatch] = useReducer((state, action) => {
    switch (action.type){
      case 'ADD-TODO':
        return [
          ...state,
          {
            id: new Date(),
            todo: action.todo,
            completed: false
          }
        ]
      case 'REMOVE-TODO':
        return state.filter((_, index) => index !== action.index);
      
      case 'CLEAR-TODOS':
        return [];
      
      case 'TOGGLE-TODO':
        return state.items.map((item ,index) => index === action.index ? {...item, completed: !item.completed} : item)
 
      default:
      return state;
    }
  }, []);


  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({
      type: 'ADD-TODO',
      todo: inputRef.current.value
    })
    inputRef.current.value = '';
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo List</h1>
        <form onSubmit={handleSubmit}>
          <input ref={inputRef}/>
        </form>
        <button className='clear-btn' onClick={
          () => dispatch({ type: 'CLEAR-TODOS' })}
        >Clear
        </button>
        <ul className='list'>
          {items.map( (item, index) =>
            <li 
              key={item.id} 
              style = {{ textDecoration : item.completed ? 'line-through' : null }}
            >
              {item.todo}
              <button onClick={
                () => {dispatch({ type: 'REMOVE-TODO', index})}}
              > 
                Remove Todo
              </button>
              <button onClick={
                () => dispatch({ type: 'TOGGLE-TODO', index })} 
              >
                Toggle Complete
              </button>
            </li>
          )}
        </ul>
      </header>
    </div>
  );
}

export default App;
