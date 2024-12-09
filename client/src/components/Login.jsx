import {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
export default function Login() {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [passwordError,setPasswordError] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };
  console.log(credentials)

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted credentials:", credentials);
    axios.post('http://localhost:8080/login',credentials,
      {
        headers : {
          'Content-type': "application/json"
        }
      }
    )
    .then((res)=>{
      console.log(res.data)
      const {message,redirectPath} = res.data;
      navigate(redirectPath)
      console.log(message)
      if (message){
        setPasswordError(message);
      }
    })
    .catch((err)=>{
      console.log(err);
      alert("error while sending credentials to the backend");
    })
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="softcloud logo"
          src=""
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm sm:my-4 text-center bg-red-600' >
        <span className='text-white block mt-2'>{passwordError}</span>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
              Your company email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={credentials.email}
                onChange={handleInputChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                value={credentials.password}
                onChange={handleInputChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-gray-900 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Not a member?{' '}
          <a href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
            register instead
          </a>
        </p>
      </div>
    </div>
  );
}
