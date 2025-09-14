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
      
      localStorage.setItem("id", res.data.user.id);// or res.data.user.id depending on backend
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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <button type="submit">Sign In</button>
      </form>

      <div>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => console.log("Google login failed")}
        />
      </div>
    </div>
  );
}

export default Signin;
