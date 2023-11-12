/* week 15: using an API, create a single page that allows for all four 
CRUD (Create, Read, Update, Delete) operations to be performed on a resource from the API. */ 

/* -- ALL IMPORTS HERE --  */
import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react'; 

function App() {
  /* link for the MOCK API I created specifically for this project */
  const MOCK_API_URL = 'https://654c433d77200d6ba858aa95.mockapi.io/user'

  /* create a place (state) to save the users from my API  */
  const [users, setUsers] = useState([{}]) 


  // created a new state to hold three new variables to create a new userObject
  const [newUserName, setNewUserName] = useState('')
  const [newUserJobTitle, setNewUserJobTitle] = useState('')
  const [newUserDepartment, setNewUserDepartment] = useState('')

  // created a new state to hold three new variables that would updated a userObject 
  const [updatedName, setUpdatedName] = useState('')
  const [updatedJobTitle, setUpdatedJobTitle] = useState('')
  const [updatedDepartment, setUpdatedDepartment] = useState('')


  /* create four functions: getUsers(){}, deleteUsers(){}, updateUsers(){} and postNewUser(){} */

                    // -- part one: setting up getUsers to read the data from the API --  
function getUsers(){
  fetch(MOCK_API_URL) // use fetch with my MOCK API URL to get the API 
    .then(data => data.json()) // coverting the data to JSON 
    // .then(data => console.log(data)) // displaying the API data on the console when inspected
    .then(data => setUsers(data)) // the  coverted data will become setUsers
}
/* getUsers() // calling the getUsers function to see the data from the API under inspect -- console 
however, multiples renders occur and we just want to re render when my Users get updated */

useEffect(() => { // the useEffect will prevent the multiple re renders and only renders once Users are updated. 
  getUsers()
  console.log(users)
}, [])

                        // -- part two: setting up deleteUsers to delete users from the API -- 
function deleteUsers(id){
  fetch(`${MOCK_API_URL}/${id}`, { // specific id from the API that to be deleted 
    method: 'DELETE' // delete the information then we should update that infomation 
  }).then(() => getUsers()) // update the Users with the new information after deletion  
}
                      // -- part 3: setting up the postUsers to create a new User
function postNewUser(e){
  e.preventDefault()

  console.log(newUserName, newUserJobTitle, newUserDepartment)

  fetch(MOCK_API_URL, {
    method: 'POST', 
    headers: { "Content-Type": "application/json" }, 
    body: JSON.stringify({
      name: newUserName,
      jobTitle: newUserJobTitle, 
      department: newUserDepartment,
    }) 
  }).then(() => getUsers())
}
                        // part four: setting up the updateUsers 
function updateUsers(e, userObject){ // the name, jobTitle, department, id from the API 
  e.preventDefault()

  let updatedUserObject = {
    ...userObject, 
    name: updatedName,  
    jobTitle: updatedJobTitle , 
    department: updatedDepartment,  
  }

  fetch(`${MOCK_API_URL}/${userObject.id}`, { // updating a single object by its id 
    method: 'PUT', 
    body: JSON.stringify(updatedUserObject), 
    headers: {
      "Content-Type": "application/json"
    }
  }).then(() => getUsers())
}

          // part five: connecting all the functions together 
  return (
    <div className="App">
        <h1>Wyckoff Heights Medical Center</h1>
      {/* connecting my POST */}
      <form> 
        <h3>Find a Doctor</h3>
        <label>Name</label>
        <input onChange={(e) => setNewUserName(e.target.value)}></input>
        <label>Job Title</label>
        <input onChange={(e) => setNewUserJobTitle(e.target.value)}></input>
        <label>Department</label>
        <input onChange={(e) => setNewUserDepartment(e.target.value)}></input>
        <button onClick={(e) => postNewUser(e)}>Submit</button>
      </form>
        {/* connecting my GET, DELETE, and UPDATE*/} 
        {users.map((user, index) =>(
          <div className='userContainer' key={index}>
            <div className='userObject'>
              Name: {user.name} <br></br>
              Job Title: {user.jobTitle} <br></br>
              Department: {user.department} <br></br>
              <button onClick={() => deleteUsers(user.id)}>Delete</button>
            </div> 
            <form>
              <label>Update Name</label>
              <input onChange={(e) => setUpdatedName(e.target.value)}></input><br></br>

              <label>Update Job Title</label>
              <input onChange={(e) => setUpdatedJobTitle(e.target.value)}></input><br></br>

              <label>Update Department</label>
              <input onChange={(e) => setUpdatedDepartment(e.target.value)}></input><br></br>
              <button onClick={(e) => updateUsers(e, user)}>Update</button>
            </form>
          </div>
        ))}
    </div>
  );
}
export default App
