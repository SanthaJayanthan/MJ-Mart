import React from 'react'
import { useAppContext } from '../context/AppContext';

const Login = () => {

    const {setShowUserLogin, setUser} = useAppContext()

    const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");


    const onSubmitHandler = async (event)=>{
        event.preventDefault();
        setUser({
            email: "test@greatstack.dev",
            name: "GreatStack"
        })
        setShowUserLogin(false)

    }

  return (
    <div onClick={()=> setShowUserLogin(false)} className='fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center justify-center text-sm text-grey-600 bg-black/50'>
         <form onSubmit={onSubmitHandler} onClick={(e)=>e.stopPropagation()} className="bg-white text-gray-500 w-full max-w-[340px] mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10">
           <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
    {state === "login" ? (
        <>
            <span className="text-indigo-500">User</span> Login
        </>
    ) : (
        "Sign Up"
    )}
         </h2>

            {state === "register" && (
                <input
                    onChange={(e)=>setName(e.target.value)}
                    value={name}
                    className="w-full border mt-1 bg-indigo-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3"
                    type="text"
                    placeholder="Username"
                    required
                />
            )}

            <input
                onChange={(e)=>setEmail(e.target.value)}
                value={email}
                className="w-full border mt-1 bg-indigo-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3"
                type="email"
                placeholder="Email"
                required
            />

            <input
                onChange={(e)=>setPassword(e.target.value)}
                value={password}
                className="w-full border mt-1 bg-indigo-500/5 mb-7 border-gray-500/10 outline-none rounded py-2.5 px-3"
                type="password"
                placeholder="Password"
                required
            />

            <button className="w-full mb-3 bg-indigo-500 hover:bg-indigo-700 transition-all active:scale-95 py-2.5 rounded text-white font-medium">
                {state === "login" ? "Login" : "Create Account"}
            </button>

            {state === "login" ? (
                <p className="text-center mt-4">
                    Don't have an account?{" "}
                    <span onClick={()=> setState("register")} className="text-blue-500 underline cursor-pointer">
                        Sign Up
                    </span>
                </p>
            ) : (
                <p className="text-center mt-4">
                    Already have an account?{" "}
                    <span onClick={()=> setState("login")} className="text-blue-500 underline cursor-pointer">
                        Log In
                    </span>
                </p>
            )}
        </form>
    </div>
  )
}

export default Login
