import React from 'react';
import { useState } from 'react';


function Index() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [count , setCount] = useState(1)


  const handleSubmit = async (event) => {
    event.preventDefault(); // prevent page reload

    try {
      const response = await fetch("http://localhost:5000/index", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      console.log("Login success:", data);

      setMessage("✅ Login successful!");
      setError("");
      // 👉 Here you can redirect (e.g., navigate to dashboard)
    } catch (error) {
      console.log("Error:", error);
      setError("Invalid");
      setMessage("❌ Invalid username or password");
    }
    console.log("Username :", username);
    console.log("password:", password);
  };

    return(
//  <form
//       className="login-card"
//       onSubmit={handleSubmit}   // ✅ React handles the POST
//       aria-label="Login form"
//     >    <div className="title-badge">Login</div>

//     <div className="field">
//       <label htmlFor="username">Username</label>
//       <input
//         type="text"
//         id="username"
//         name="username"
//         placeholder="Enter your username"
//         value={username}
//         onChange={(event)=>setUsername(event.target.value)}
//         required
//         autoComplete="username"
//         aria-required="true"
//       />
//     </div>

//     <div className="field">
//       <label htmlFor="password">Password</label>
//       <input
//         type="password"
//         id="password"
//         name="password"
//         placeholder="Enter your password"
//         value={password}
//         onChange={(event)=>setPassword(event.target.value)}
//         required
//         autoComplete="current-password"
//         aria-required="true"
//       />
//     </div>

//     <div className="submit-wrapper">
//       <button type="submit">Login</button>
//     </div>

//     <div>
//       <h2>{count}</h2>
//       <button onClick={(e)=>{
//         setCount(count+1)
//       }}>Add</button>
//     </div>
//   </form>
      <>
    <div className="flex min-h-screen items-center justify-center bg-[#dbdbdb1f] ">
      <form
        onSubmit={handleSubmit}
        className="w-90 rounded-l bg-white border-[1.5px] border-[#7b7878a0] p-4 shadow-lg/20 "
      >
        {/* Title */}
        <div className="mt-5 mb-7 flex justify-center">
          <div className="  px-6 py-1 text-3xl font-bold tracking-wide ">
            LOGIN
          </div>
        </div>

        {/* Username */}
        <div className="mb-5">
          <label
            htmlFor="username"
            className="block text-md font-normal text-black mb-1"
          >
            username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required 
            className="w-full rounded-1 bg-[#dbdbdb3c] px-3 py-2 mb-2 text-black border-1 border-[#7b7878b8] p-4 shadow-md placeholder-[#534a4aaf] outline-none  hover:bg-[#dbdbdb99] focus:ring-2 focus:ring-[#7b7878b0]  "
            autoComplete="username"
            aria-required="true"
          />
        </div>

        {/* Password */}
        <div className="mb-9">
          <label
            htmlFor="password"
            className="block text-md font-normal text-black mb-1"
          >
            password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-1 bg-[#dbdbdb3c] px-3 py-2 mb-2 text-black border-1 border-[#7b7878b8] p-4 shadow-md placeholder-[#534a4aaf] outline-none hover:bg-[#dbdbdb99] focus:ring-2 focus:ring-[#7b7878b0] "
            autoComplete="password"
            aria-required="true"
          />
        </div>

        {/* Button */}
        <div className="mt-5 mb-7 flex justify-center">
          <button
            type="submit"
            className="px-7 py-2 rounded-xl bg-[#726d6d]  border-1 border-[#7b787882] font-semibold text-white hover:bg-[#252629e3]"  >
            Login
          </button>
        </div>
      </form>
    </div>
    </>
    );
}

export default Index;