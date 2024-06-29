import { useCallback, useState,useEffect,useRef } from 'react'
import './App.css'

function App() {
  const [length, setlength] = useState(8)
  const [numberA,setnumberA] = useState(false)
  const [charA,setcharA] = useState(false)
  const [password,setPassword] = useState("")
  const  passwordRef = useRef(null)
  
  
  const passwordGenerator = useCallback(()=>{
    let pass =""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberA) str+="0123456789"
    if(charA) str+= "!@#$%^&*()-_=+[]{}\|;:?/"

    for(let i =1;i<=length;i++){
      let char = Math.floor(Math.random()*str.length+1)

      pass = pass+str.charAt(char)
    }

    setPassword(pass)

  },[length,numberA,charA,setPassword])

  const copytoClip = useCallback(()=>{
    passwordRef.current?.select()

    window.navigator.clipboard.writeText(password)

  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length,numberA,charA,setPassword])

  


  return (
    <>
      <div className='w-screen max-w-none mx-auto shadow-md rounded-lg px-4 my-8 bg-gray-900 text-white' >
        <h1 className='text-white text-center my-3'>PASSWORD GENERATOR</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
          type = "text"
          value = {password}
          className='outline-none w-full py-1 px-3 mb-6 text-black'
          placeholder='Password'
          readOnly
          ref={passwordRef}
          />
          <button 
          onClick={copytoClip}
          className=' text-center outline-none bg-blue-800 text-white px-3 py-0.5 mb-6 shrink-0 '>
            copy
          </button>
          <div className='flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-1'>
              <input
              type ="range"
              min ={6}
              max = {100}
              value = {length}
              className='cursor-pointer'
              onChange={(e)=>{setlength(e.target.value)}}
              />
              <label className='text-white'>length:{length}</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
              type = "checkbox"
              defaultChecked={numberA}
              id = "numberInput"
              onChange={()=>{
                setnumberA((prev)=> !prev)
              }}
              />
              <label htmlFor='numberInput'>Numbers</label>
            </div>
            <input
            type = "checkbox"
            defaultChecked = {charA}
            id = "characterInput"
            onChange={()=>{
              setcharA((prev)=>!prev);
            }}
            />
            <label
            htmlFor='characterInput'>
              Characters
            </label>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
