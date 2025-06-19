import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../config/firebase";
import Navbar from "../components/navbar";
import toast from "react-hot-toast";
import Footer from "../components/footer";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const Register = () => {
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [showPassword, setShowPassword] = useState(false);
   const [phone, setPhone] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();

   const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
      setLoading(true);

      try {
         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
         toast.success("User Registered Successfully");
         const user = auth.currentUser;
         console.log(user);

         await updateProfile(userCredential.user, {
            displayName: `${firstName} ${lastName}`,
         });
         // Optionally, you can store the phone number in your database if needed
         navigate("/home"); // Redirect to home page after successful registration
      } catch (err) {
         setError(err.message);
      } finally {
         setLoading(false);
      }
   };

   return (
      <>
         <Navbar />
         <div className="min-h-screen  flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
               <div>
                  <h2 className="mt-6 text-center text-large-semi font-extrabold text-gray-900 ">BECOME A VOGUE VAULT MEMBER</h2>
                  <p className="text-center mt-6 text-sm">Create your Vogue Vault Store Member profile, and get access to an enhanced shopping experience.</p>
               </div>
               <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-4">
                     <div>
                        <label htmlFor="first-name" className="sr-only">
                           First Name
                        </label>
                        <input
                           id="first-name"
                           name="first-name"
                           type="text"
                           required
                           className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                           placeholder="First Name"
                           value={firstName}
                           onChange={(e) => setFirstName(e.target.value)}
                        />
                     </div>
                     <div>
                        <label htmlFor="last-name" className="sr-only">
                           Last Name
                        </label>
                        <input
                           id="last-name"
                           name="last-name"
                           type="text"
                           required
                           className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                           placeholder="Last Name"
                           value={lastName}
                           onChange={(e) => setLastName(e.target.value)}
                        />
                     </div>
                     <div>
                        <label htmlFor="phone" className="sr-only">
                           Phone Number
                        </label>
                        <input
                           id="phone"
                           name="phone"
                           type="tel"
                           required
                           className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                           placeholder="Phone Number"
                           value={phone}
                           onChange={(e) => setPhone(e.target.value)}
                        />
                     </div>
                     <div>
                        <label htmlFor="email-address" className="sr-only">
                           Email address
                        </label>
                        <input
                           id="email-address"
                           name="email"
                           type="email"
                           autoComplete="email"
                           required
                           className="appearance-none rounded-md  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                           placeholder="Email address"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                        />
                     </div>

                     <div className="relative">
                        <input
                           id="password"
                           name="password"
                           type={showPassword ? "text" : "password"}
                           autoComplete="new-password"
                           required
                           className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:border-gray-500 focus:z-10 sm:text-sm pr-10"
                           placeholder="Password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => setShowPassword(!showPassword)}>
                           {showPassword ? <EyeSlashIcon className="h-5 w-5 text-gray-500" /> : <EyeIcon className="h-5 w-5 text-gray-500" />}
                        </button>
                     </div>
                  </div>

                  {error && <div className="text-red-500 text-sm text-center">{error}</div>}

                  <div>
                     <button
                        type="submit"
                        disabled={loading}
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                     >
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                           <UserPlus className="h-5 w-5 text-white" />
                        </span>
                        {loading ? "Joining..." : "Join"}
                     </button>
                  </div>

                  <div className="text-sm text-center">
                     <Link to="/login" className="font-medium text-gray-600 text-sm">
                        Already have an account? <span className="text-blue-400 ">Sign in here</span>
                     </Link>
                  </div>
               </form>
            </div>
         </div>
         <Footer />
      </>
   );
};

export default Register;
