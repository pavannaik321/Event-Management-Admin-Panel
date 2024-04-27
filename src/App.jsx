
import './App.css'
import axios from "axios";

axios.defaults.baseURL = "https://event-managment-system-peach.vercel.app";
// axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {

  const connectbackend = async()=>{
    await axios.get("/").then((res)=>{
      console.log("connection successfull")
      console.log(res.data);
    }).catch((err)=>{
      console.log(err);
    })
  }


  return (
    <>
    <h1>Admin panel</h1>
    <button onClick={()=>connectbackend()} >Check connection</button>
    </>
  )
}

export default App
