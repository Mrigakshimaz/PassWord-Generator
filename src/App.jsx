import { useState, useCallback, useEffect } from 'react';
import './index.css';
import { set } from 'mongoose';

function App() {
  const [length, setLength] = useState(8); // Default length set to 8
  const [numberall, setNumberall] = useState(false);
  const [charall, setCharall] = useState(false);
  const [pass, setPass] = useState('');

  const GeneratedPassword = useCallback(()=>{
    let pass  = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberall) {
      str+="0123456789"
    }
    if (charall) {
      str+="!@#$%^&*()_+"
    }
    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random()*str.length))
    }

    setPass(pass);
  }, [length, numberall, charall])

  useEffect(()=>{
    GeneratedPassword();
  }, [length,numberall, charall])

  

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <h1 className="text-4xl font-bold text-white mb-8">Password Generator</h1>

      {/* Password Display and Copy Button */}
      <div className="flex items-center bg-white rounded-lg shadow-lg overflow-hidden mb-6">
        <input
          type="text"
          value={pass}
          placeholder="Password"
          readOnly
          className="px-4 py-2 w-64 outline-none"
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition-colors"
          onClick={() => navigator.clipboard.writeText(pass)}
        >
          Copy
        </button>
      </div>

      {/* Length Slider */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <div className="mb-4">
          <label htmlFor="length" className="block text-gray-700 font-medium mb-2">
            Length: {length}
          </label>
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full cursor-pointer"
            id="length"
          />
        </div>

        {/* Checkboxes for Options */}
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={numberall}
              onChange={()=>{
                setNumberall((prev)=>!prev);
              }

              }
              className="mr-2"
              id="numbers"
            />
            <label htmlFor="numbers" className="text-gray-700">
              Include Numbers
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={charall}
              onChange={() => setCharall((prev) => !prev)}
              className="mr-2"
              id="symbols"
            />
            <label htmlFor="symbols" className="text-gray-700">
              Include Special Characters
            </label>
          </div>
        </div>

        {/* Generate Button */}
        <button
          className="w-full bg-blue-600 text-white px-4 py-2 mt-4 rounded-lg hover:bg-blue-700 transition-colors"
          onClick={() => {
            GeneratedPassword()
          }}>Generate Password
        </button>
      </div>
    </div>
  );
}

export default App;