import { useState, useCallback, useEffect, useRef } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')

  const passwordRef = useRef(null)
  
  const generatePassword = useCallback(() => {
    
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()_+~`|"

    let pass = ''
    for (let i = 0; i<length; i++) {
      // pass += str.charAt(Math.floor(Math.random() * str.length))
      const char = Math.floor(Math.random() * str.length )
      pass += str.charAt(char)
    }
    setPassword(pass)
  },[length, numberAllowed, charAllowed])

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
  }

  useEffect(()=>{
    generatePassword()
  }, [length, numberAllowed, charAllowed]) 


  return (
    <div className='w-full max-w-md mx-auto shadow-lg
    rounded-xl px-6 py-5 my-10 bg-gradient-to-br from-gray-900 to-gray-800 text-orange-400 border border-orange-500/30'>
      <h1 className='text-4xl font-extrabold mb-4
      text-center text-orange-500 drop-shadow-lg'>Password Generator</h1>
      <div className='flex shadow-md rounded-lg overflow-hidden
       mb-6 border border-orange-400/20'>
        <input type='text' value={password} 
        className='outline-none w-full py-2 px-4 bg-gray-700 text-white placeholder-gray-400'
          placeholder='Password'
          readOnly
          ref={passwordRef}
        />
        <button onClick={copyPasswordToClipboard} className='bg-orange-500 hover:bg-orange-600 transition-colors text-white px-4 py-2 font-medium
        '>copy</button>
       </div>
       <div className='flex flex-col text-sm gap-4'>
         <div className='flex items-center gap-3'>
          <input type='range'min={6} max={50} value={length} 
          className='cursor-pointer accent-orange-500 w-full' 
          onChange={(e) => setLength(Number(e.target.value))}
           name='' id=''/>
           <label htmlFor='length' className="font-semibold">Length: {length}</label>
         </div>
         <div className='flex items-center gap-2'>
          <input type='checkbox' checked={numberAllowed}
            onChange={() => {
              setNumberAllowed((prev) => !prev)
            }}
            className="accent-orange-500"
          />
          <label htmlFor='number' className="font-medium">Numbers</label>
         </div>
         <div className='flex items-center gap-2'>
          <input type='checkbox' checked={charAllowed}
            onChange={() => {
              setCharAllowed((prev) => !prev)
            }}
            className="accent-orange-500"
          />
          <label htmlFor='character' className="font-medium">Character</label>
         </div>
       </div>
    </div>
  )
}

export default App
