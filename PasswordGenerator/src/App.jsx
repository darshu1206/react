import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);

  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 20);
    window.navigator.clipboard.writeText(password);
  }, [password])
  
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <div className="w-full max-w-lg mx-auto shadow-lg rounded-xl px-6 py-8 my-12 bg-gray-900 text-orange-400">
        <h1 className="text-white text-2xl font-bold text-center mb-6 tracking-wide">Password Generator</h1>
        <div className="flex shadow-inner rounded-lg overflow-hidden mb-6 bg-gray-800">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-2 px-4 bg-gray-700 text-white text-lg"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-700 hover:bg-blue-800 transition-colors text-white px-4 py-2 font-semibold"
          >
            Copy
          </button>
        </div>
        <div className="flex items-center gap-x-6 mb-4">
          <div className="flex items-center gap-x-2">
            <input
              type="range"
              min={6}
              max={100}
              className="cursor-pointer accent-orange-400"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
            />
            <label className="text-white font-medium">
              Length: <span className="text-orange-400">{length}</span>
            </label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              checked={numberAllowed}
              id="numberInput"
              className="accent-orange-400 w-4 h-4"
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor="numberInput" className="text-white">Numbers</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              checked={charAllowed}
              id="charInput"
              className="accent-orange-400 w-4 h-4"
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label htmlFor="charInput" className="text-white">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
