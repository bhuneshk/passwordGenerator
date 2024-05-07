import { useCallback, useEffect, useState,useRef } from 'react'

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const passwordRef=useRef();
  const passwordGenerator = useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed){
      str+="0123456789";
    }
    if(charAllowed){
      str+="!@#$%^&*(){}[]?";
    }
    for(let i=1;i<=length;i++){
      let char=Math.floor(Math.random()*str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  },[length,numberAllowed,charAllowed,setPassword])

  useEffect(()=>{
    passwordGenerator();
  },[length,numberAllowed,charAllowed,passwordGenerator]);

  const copyText = ()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(passwordRef.current.value);
  }
  return (
    <>
      <div className='w-full max-w-lg mx-auto rounded-lg shadow-md px-4 my-8' style={{color:"white",backgroundColor:'gray'}}>
            <h1 className=' text-center text-xl py-3'>Password Generator</h1>
            <div className='flex shadow rounded-lg overflow-hidden mb-4'>
              <input type="text" value={password} placeholder='Password' className='outline-none w-full py-1 px-3 text-orange-500' readOnly ref={passwordRef}/>
              <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyText}>Copy</button>
            </div>
            <div className='flex text-sm gap-x-2 text-orange-500 text-lg'>
             <input type="range" min={6} max={100} value={length} className='cursor-pointer' onChange={(e)=>setLength(e.target.value)} />
             <label >Length : {length}</label>
             <input type="checkbox" id="numberInput" defaultChecked={numberAllowed} onChange={()=>setNumberAllowed((prev)=> !prev)}/>
             <label htmlFor="numberInput">Numbers</label>
             <input type="checkbox" id="charInput" defaultChecked={charAllowed} onChange={()=>setCharAllowed((prev)=> !prev)}/>
             <label htmlFor="charInput">Characters</label>
            </div>
      </div>
    </>
  )
}

export default App
