import React,{useState,useEffect} from 'react'
import { auth } from '../lib/config'
import { signInWithEmailAndPassword,onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

function Signin() {
    const navigate = useNavigate()
    const [email,setEmail] = useState<string>('')
    const [password,setPassword] = useState<string>('')
    const [loading,setLoading] = useState<boolean>(false)

    function handleSub(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true) //ทำให้โหลดอยู่
        signInWithEmailAndPassword(auth,email,password)
        .then(() => {                       
            navigate('/')
          })
        .catch((err)=>{console.log(err)})
        .finally(()=>{setLoading(false)})
        
    }


    useEffect(()=>{
      onAuthStateChanged(auth, (user) => {
          if (user) {
            const uid = user.uid;
            console.log("uid", uid)
          } else {
            console.log("user is logged out")
          }
        });
       
  }, [])

    
  return (
    <div>
        <form onSubmit={(e)=>{handleSub(e)}}>
            <input type="email" placeholder='email' onChange={(e)=>{setEmail(e.target.value)}}/>
            <input type="password" placeholder='password' onChange={(e)=>{setPassword(e.target.value)}}/>
            <button type="submit">LOGIn</button>
        </form>
    </div>
  )
}

export default Signin