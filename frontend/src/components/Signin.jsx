import { useState, useContext } from "react";
import { signin, googleSignin } from "../services/authService";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../services/AuthContext";  // ✅ import context

function Signin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);  // ✅ get login from context

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signin(form);

      console.log("📩 Response from backend:", res.data);

      // ✅ Use context instead of only localStorage
      login({ user: res.data.user, token: res.data.token });

      localStorage.setItem("id", res.data.user.id);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      // redirect
      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    if (!credentialResponse.credential) {
      alert("Google credential missing");
      return;
    }

    const decoded = jwtDecode(credentialResponse.credential);
    try {
      const res = await googleSignin({
        email: decoded.email,
        googleId: decoded.sub,
        name: decoded.name,
      });

      res.data.role = "user";

      // ✅ Use context here too
      login({
        user: { name: decoded.name, email: decoded.email, role: res.data.role },
        token: res.data.token,
      });

      localStorage.setItem("id", res.data.user.id);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      alert("Google signin failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>

        {/* Email/Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Login */}
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => console.log("Google login failed")}
          />
        </div>
      </div>
    </div>
  );
}

export default Signin;