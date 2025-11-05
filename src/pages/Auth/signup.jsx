// // src/components/Auth/Register.jsx
// import React, { useState } from 'react';
// import { apiService } from '../../services/api';
// import { useNavigate, Link } from 'react-router-dom';

// const Register = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: '',
//     userName: '',
//     email: '',
//     password: '',
//     phone: '',
//     dob: '',
//     gender: '',
//     role: 'user',
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     // Basic frontend validation
//     if (!formData.email.includes('@')) {
//       setError('Please enter a valid email address.');
//       return;
//     }

//     try {
//       setLoading(true);
//       const result = await apiService.register(formData);

//       if (result.success) {
//         localStorage.setItem('token', result.token);
//         localStorage.setItem('user', JSON.stringify(result.user));
//         navigate('/dashboard');
//       }
//     } catch (err) {
//       console.error('Registration error:', err);

//       // Check if backend returned 409 Conflict
//       if (err.response?.status === 409) {
//         setError(err.response.data.message || 'User already exists. Try logging in.');
//       } else {
//         setError('Registration failed. Please try again later.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div className="text-center">
//           <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
//             Create Your Account
//           </h2>
//           <p className="mt-2 text-sm text-gray-600">
//             Join MyLab and start tracking your health
//           </p>
//         </div>

//         {error && (
//           <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
//             {error}
//           </div>
//         )}

//         <form className="mt-8 space-y-6 bg-white p-8 rounded-2xl shadow-lg" onSubmit={handleSubmit}>
//           <div className="space-y-4">
//             {/* Name */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
//               <input
//                 type="text"
//                 required
//                 value={formData.name}
//                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                 className="appearance-none w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter your full name"
//               />
//             </div>

//             {/* Username */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
//               <input
//                 type="text"
//                 required
//                 value={formData.userName}
//                 onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
//                 className="appearance-none w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Choose a username"
//               />
//             </div>

//             {/* Email */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
//               <input
//                 type="email"
//                 required
//                 value={formData.email}
//                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                 className="appearance-none w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter your email"
//               />
//             </div>

//             {/* Password */}
//             <div>
//               <label className="block text-sm font-medium text-black mb-2">Password</label>
//               <input
//                 type="password"
//                 required
//                 value={formData.password}
//                 onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                 className="appearance-none w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Create a password"
//               />
//             </div>

//             {/* Phone */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
//               <input
//                 type="tel"
//                 required
//                 value={formData.phone}
//                 onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                 className="appearance-none w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter your phone number"
//               />
//             </div>

//             {/* DOB & Gender */}
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
//                 <input
//                   type="date"
//                   required
//                   value={formData.dob}
//                   onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
//                   className="appearance-none w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
//                 <select
//                   required
//                   value={formData.gender}
//                   onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
//                   className="appearance-none w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="">Select</option>
//                   <option value="female">Female</option>
//                   <option value="male">Male</option>
//                   <option value="other">Other</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="group relative w-full flex justify-center py-3 px-4 text-white font-medium rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
//           >
//             {loading ? (
//               <div className="flex items-center">
//                 <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                 Creating account...
//               </div>
//             ) : (
//               'Create Account'
//             )}
//           </button>

//           <div className="text-center">
//             <p className="text-sm text-gray-600">
//               Already have an account?{' '}
//               <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
//                 Sign in
//               </Link>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;

// // // src/components/Auth/Register.jsx
// // import React, { useState } from 'react';
// // import { apiService } from '../../services/api';
// // import { useNavigate, Link } from 'react-router-dom';

// // const Register = () => {
// //   const navigate = useNavigate();
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     userName: '',
// //     email: '',
// //     password: '',
// //     phone: '',
// //     dob: '',
// //     gender: '',
// //     role: 'user'
// //   });
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState('');

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       setLoading(true);
// //       setError('');
      
// //       const result = await apiService.register(formData);
      
// //       if (result.success) {
// //         // Store token and user data
// //         localStorage.setItem('token', result.token);
// //         localStorage.setItem('user', JSON.stringify(result.user));
        
// //         // Redirect to dashboard
// //         navigate('/dashboard');
// //       }
// //     } catch (error) {
// //       console.error('Registration error:', error);
// //       const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
// //       setError(errorMessage);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
// //       <div className="max-w-md w-full space-y-8">
// //         <div className="text-center">
// //           <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
// //             Create Your Account
// //           </h2>
// //           <p className="mt-2 text-sm text-gray-600">
// //             Join MyLab and start tracking your health
// //           </p>
// //         </div>
        
// //         {error && (
// //           <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
// //             {error}
// //           </div>
// //         )}

// //         <form className="mt-8 space-y-6 bg-white p-8 rounded-2xl shadow-lg" onSubmit={handleSubmit}>
// //           <div className="space-y-4">
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-2">
// //                 Full Name
// //               </label>
// //               <input
// //                 type="text"
// //                 required
// //                 value={formData.name}
// //                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
// //                 className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                 placeholder="Enter your full name"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-2">
// //                 Username
// //               </label>
// //               <input
// //                 type="text"
// //                 required
// //                 value={formData.userName}
// //                 onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
// //                 className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                 placeholder="Choose a username"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-2">
// //                 Email
// //               </label>
// //               <input
// //                 type="email"
// //                 required
// //                 value={formData.email}
// //                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
// //                 className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                 placeholder="Enter your email"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-2">
// //                 Password
// //               </label>
// //               <input
// //                 type="password"
// //                 required
// //                 value={formData.password}
// //                 onChange={(e) => setFormData({ ...formData, password: e.target.value })}
// //                 className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                 placeholder="Create a password"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-2">
// //                 Phone
// //               </label>
// //               <input
// //                 type="tel"
// //                 required
// //                 value={formData.phone}
// //                 onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
// //                 className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                 placeholder="Enter your phone number"
// //               />
// //             </div>

// //             <div className="grid grid-cols-2 gap-4">
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">
// //                   Date of Birth
// //                 </label>
// //                 <input
// //                   type="date"
// //                   required
// //                   value={formData.dob}
// //                   onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
// //                   className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">
// //                   Gender
// //                 </label>
// //                 <select
// //                   required
// //                   value={formData.gender}
// //                   onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
// //                   className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                 >
// //                   <option value="">Select</option>
// //                   <option value="female">Female</option>
// //                   <option value="male">Male</option>
// //                   <option value="other">Other</option>
// //                 </select>
// //               </div>
// //             </div>
// //           </div>

// //           <div>
// //             <button
// //               type="submit"
// //               disabled={loading}
// //               className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
// //             >
// //               {loading ? (
// //                 <div className="flex items-center">
// //                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
// //                   Creating account...
// //                 </div>
// //               ) : (
// //                 'Create Account'
// //               )}
// //             </button>
// //           </div>

// //           <div className="text-center">
// //             <p className="text-sm text-gray-600">
// //               Already have an account?{' '}
// //               <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
// //                 Sign in
// //               </Link>
// //             </p>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Register;
// // import React, { useState } from "react";
// // import { Link } from "react-router-dom";
// // import { signup } from "../../AuthServices";
// // // import { Toaster } from "react-hot-toast";

// // const Signup = () => {
// //   const [form, setForm] = useState({ name: "", email: "", password: "", phone: "", userName: "",  dob: "", gender: "", role: "" });

// //   const handleChange = (e) => {
// //     setForm({ ...form, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const res = await signup(form);
// //       alert("Signup successful! Please login.");
// //       console.log(res);
// //     } catch (err) {
// //       console.error(err);
// //       alert("Signup failed!");
// //     }
// //   };

// //   return (
// //     <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
// //       <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
// //       <form onSubmit={handleSubmit} className="space-y-4">
// //         <input
// //           type="text"
// //           name="name"
// //           placeholder="Name"
// //           value={form.name}
// //           onChange={handleChange}
// //           className="w-full h-9 rounded-md border px-3 py-1 text-sm outline-none 
// //             placeholder:text-gray-400 bg-white 
// //             focus:border-gray-500 focus:ring-2 focus:ring-gray-300 
// //             hover:bg-gray-100 transition"
// //         />
// //         <input
// //           type="text"
// //           name="dob"
// //           placeholder="Date of Birth"
// //           value={form.dob}
// //           onChange={handleChange}
// //           className="w-full h-9 rounded-md border px-3 py-1 text-sm outline-none 
// //             placeholder:text-gray-400 bg-white 
// //             focus:border-gray-500 focus:ring-2 focus:ring-gray-300 
// //             hover:bg-gray-100 transition"
// //         />
// //         <input
// //           type="text"
// //           name="gender"
// //           placeholder="Gender"
// //           value={form.gender}
// //           onChange={handleChange}
// //           className="w-full h-9 rounded-md border px-3 py-1 text-sm outline-none 
// //             placeholder:text-gray-400 bg-white 
// //             focus:border-gray-500 focus:ring-2 focus:ring-gray-300 
// //             hover:bg-gray-100 transition"
// //         />
// //         <input
// //           type="text"
// //           name="role"
// //           placeholder="Role i.e user"
// //           value={form.role}
// //           onChange={handleChange}
// //           className="w-full h-9 rounded-md border px-3 py-1 text-sm outline-none 
// //             placeholder:text-gray-400 bg-white 
// //             focus:border-gray-500 focus:ring-2 focus:ring-gray-300 
// //             hover:bg-gray-100 transition"
// //         />
// //         <input
// //           type="email"
// //           name="email"
// //           placeholder="Email"
// //           value={form.email}
// //           onChange={handleChange}
// //           className="w-full h-9 rounded-md border px-3 py-1 text-sm outline-none 
// //             placeholder:text-gray-400 bg-white 
// //             focus:border-gray-500 focus:ring-2 focus:ring-gray-300 
// //             hover:bg-gray-100 transition"
// //         />
// //         <input
// //           type="password"
// //           name="password"
// //           placeholder="Password"
// //           value={form.password}
// //           onChange={handleChange}
// //           className="w-full h-9 rounded-md border px-3 py-1 text-sm outline-none 
// //             placeholder:text-gray-400 bg-white 
// //             focus:border-gray-500 focus:ring-2 focus:ring-gray-300 
// //             hover:bg-gray-100 transition"
// //         />
// //         <input
// //           type="text"
// //           name="phone"
// //           placeholder="Phone"
// //           value={form.phone}
// //           onChange={handleChange}
// //           className="w-full h-9 rounded-md border px-3 py-1 text-sm outline-none 
// //             placeholder:text-gray-400 bg-white 
// //             focus:border-gray-500 focus:ring-2 focus:ring-gray-300 
// //             hover:bg-gray-100 transition"
// //         />
// //         <input
// //           type="text"
// //           name="userName"
// //           placeholder="Username"
// //           value={form.userName}
// //           onChange={handleChange}
// //           className="w-full h-9 rounded-md border px-3 py-1 text-sm outline-none 
// //             placeholder:text-gray-400 bg-white 
// //             focus:border-gray-500 focus:ring-2 focus:ring-gray-300 
// //             hover:bg-gray-100 transition"
// //         />
        
// //         <button
// //           type="submit"
// //           className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 transition"
// //         >
// //           Sign Up
// //         </button>
// //         <br />
// //         <p className='mt-2'>
// //          Already have an account? &nbsp;
// //         <Link to='/login'>
// //         <span className='text-brandyellow font-semibold text-xl '>
// //          Login
// //          </span>
// //           </Link>
// //           </p>
// //       </form>
// //     </div>
// //   );
// // };

// // export default Signup;
// src/components/Auth/Register.jsx
import React, { useState } from 'react';
import { apiService } from '../../services/api';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    userName: '',
    email: '',
    password: '',
    phone: '',
    dob: '',
    gender: '',
    role: 'user'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const result = await apiService.register(formData);

      if (result.success) {
        // Store token and user data
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));

        // Show success toast
        toast.success('Account created successfully! Redirecting...', {
          position: 'top-right',
          autoClose: 3000,
        });

        // Redirect after 3 seconds
        setTimeout(() => navigate('/dashboard'), 3000);
      }
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage =
        error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(errorMessage, { position: 'top-right', autoClose: 4000 });
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Create Your Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join MyLab and start tracking your health
          </p>
        </div>

        <form className="mt-8 space-y-6 bg-white p-8 rounded-2xl shadow-lg" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your full name"
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                required
                value={formData.userName}
                onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                placeholder="Choose a username"
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email"
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Create a password"
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Enter your phone number"
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  required
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <select
                  required
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className={inputClass}
                >
                  <option value="">Select</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating account...
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
