import React, { useReducer } from 'react';
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
            name: action.todo
          }
        ]
      case 'REMOVE-TODO':
        return [

        ]
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
        <h1>hello</h1>
        <form onSubmit={handleSubmit}>
          <input ref={inputRef}/>
        </form>
          <ul>
            {items.map( (item, index) => {
              <li key={item.id}>{item.todo}<button onClick={() => {
                dispatch({ type: 'REMOVE-TODO', index})
              }}></button></li>
            })}
          </ul>
      </header>
    </div>
  );
}

export default App;
