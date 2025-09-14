import { useContext } from "react";
import { AuthContext } from "../services/AuthContext"; // named export ✅
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="flex gap-2 items-center">
      {!user ? (
        <>
          <button onClick={() => navigate("/signup")} className='bg-blue-500 font-regbitcnt rounded-2xl h-10 w-20 text-black-100 font-bold flex items-center justify-center border-2 border-black hover:bg-yellow-400 hover:border-blue-500'>
            Sign up
          </button>
          <button onClick={() => navigate("/signin")} className='rounded-2xl font-regbitcnt border-2 font-bold border-blue-500 h-10 w-20 flex items-center justify-center hover:bg-yellow-400 hover:border-black'>
            Sign in
          </button>
        </>
      ) : (
        <div className="flex gap-4 items-center">
          <User
            onClick={() => navigate("/user")}
            className="w-8 h-8 cursor-pointer bg-blue-500 text-xs rounded-xl hover:bg-yellow-400 border-2 border-black "
          />
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}className='rounded-2xl font-regbitcnt border-2 font-bold border-blue-500 h-10 w-20 flex items-center justify-center hover:bg-yellow-400 hover:border-black'>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
