import { useState, useEffect } from "react";
import axios from "axios";
import { getUsers } from "./helpers/requests";

function App() {
  // const [users, setUsers] = useState([]);
  // useEffect(() => {
  //   fetch("https://jsonplaceholder.typicode.com/users")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setUsers(data);
  //     });
  // }, []);
  // return (
  //   <div className="container">
  //     <div className="users">
  //       {users.map((user) => (
  //         <div className="user" key={user.id}>
  //           <h1>{user.name}</h1>
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );

  const [users, setUsers] = useState([]);
  const [addInputValue, setInputValue] = useState("");

  useEffect(() => {
    getUsers((data) => {
      setUsers(data);
    });
  }, []);

  function changeAddInput(e) {
    setInputValue(e.target.value);
  }

  function addUser() {
    const data = {
      name: addInputValue,
    };

    if (addInputValue.trim() !== "") {
      setUsers(data);
    }

    axios
      .post("https://64340de21c5ed06c958dd2da.mockapi.io/users", data)
      .then(() => {
        getUsers((data) => {});
      });
    setInputValue("");
  }

  function deleteUser(id) {
    axios
      .delete(`https://64340de21c5ed06c958dd2da.mockapi.io/users/${id}`)
      .then(() => {
        setInputValue();
        getUsers((data) => {
          setUsers(data);
        });
      });
  }

  return (
    <div className="container">
      <div className="header">
        <input
          type="text"
          placeholder="add your task"
          value={addInputValue}
          onChange={changeAddInput}
        />
        <button onClick={addUser}>Add</button>
      </div>
      <div className="users">
        {users.map((user) => (
          <div className="user" key={user.id}>
            <h3>{user.name}</h3>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
