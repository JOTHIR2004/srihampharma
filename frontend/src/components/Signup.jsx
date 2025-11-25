// import { useState } from "react";
// import { signup } from "../services/authService";
// import { useNavigate } from "react-router-dom";  // ✅ added

// function Signup() {
//   const [form, setForm] = useState({ username: "", email: "", password: "" });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await signup(form);
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("role", res.data.user.role);  // ✅ store role
//       // ✅ Redirect based on role
//       if (res.data.user.role === "admin") {
//         navigate("/admin");
//       } else {
//         navigate("/");
//       }
//     } catch (err) {
//       alert(err.response?.data?.message || "Error");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input name="username" placeholder="Username" onChange={handleChange} />
//       <input name="email" type="email" placeholder="Email" onChange={handleChange} />
//       <input name="password" type="password" placeholder="Password" onChange={handleChange} />
//       <button type="submit">Sign Up</button>
//     </form>
//   );
// }

// export default Signup;


import { useState } from "react";
import { signup } from "../services/authService";
import { useNavigate } from "react-router-dom";  // ✅ added

function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signup(form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);  // ✅ store role

      // ✅ Redirect based on role
      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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
            className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-600 hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;