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
            id: state.length,
            todo: action.todo
          }
        ]
      case 'REMOVE-TODO':
        return state.filter((_, index) => index != action.index);
      
      case 'CLEAR-TODOS':
        return [];

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
        <button onClick={() => dispatch({ type: 'CLEAR-TODOS' })}>Clear</button>
        <ul>
          {items.map( (item, index) =>
            <li key={item.id}>{item.todo}
              <button onClick={
                () => {dispatch({ type: 'REMOVE-TODO', index})}}
              > Remove Todo
              </button>
            </li>
          )}
        </ul>
      </header>
    </div>
  );
}

export default App;
