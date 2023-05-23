
import "./App.css";
import { useState,useEffect } from "react";
function App() {
  // const [toDos, setToDos] = useState([]);
  const [toDos, setToDos] = useState(() => {
    const storedToDos = localStorage.getItem("todos");
    return storedToDos ? JSON.parse(storedToDos) : [];
  });
  
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(toDos));
  }, [toDos]);
  
  const [toDo, setToDo] = useState("");
  
  const deleteToDo = (id) => {
    setToDos(toDos.filter((todo) => todo.id !== id));
  };
  
  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's Wednesday 🌝 ☕ </h2>
      </div>
    
      <div className="input">
        <input
          value={toDo}
          onChange={(e) => setToDo(e.target.value)}
          type="text"
          placeholder="🖊️ Add item..."
        />
        <i
        onClick={() => {
          if (toDo.trim() !== '') {
            const isDuplicate = toDos.some((todo) => todo.text === toDo);
            if (!isDuplicate) {
              setToDos([...toDos, { id: Date.now(), text: toDo, status: false }]);
            } else {
              console.log('Duplicate item!');
            }
          }
        }}
        
          className="fas fa-plus"
        ></i>
      </div>
     
  
{/* </div> */}
      <div className="todos">
        
        {toDos.map((obj) => {
          return (
            <div className="todo">
              <div className="left">
                <input
                  
                  onChange={(e) => {
                    setToDos(
                      toDos.map((todo) => {
                        if (todo.id === obj.id) {
                          return {
                            ...todo,
                            status: e.target.checked,
                          };
                        }
                        return todo;
                      })
                    );
                  }}
                  value={obj.status}
                  type="checkbox"
                  name=""
                  id=""
                />
                <p>{obj.text}</p>
                
              </div>
              <div className="right">
                <i className="fas fa-times" onClick={() => deleteToDo(obj.id)}></i>
              </div>
            </div>
          );
        })}


       { toDos.map((obj)=>{
         if(obj.status){
          return(<h1>{obj.text}</h1>)
         }
         return null
        }) }
      </div>


</div>
 
  );
}

export default App;
