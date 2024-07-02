import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800">
      <div className="flex min-h-[80vh] flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="text-center sm:mx-auto sm:w-full sm:max-w-md">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Sign in</h1>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white dark:bg-gray-700 px-4 pb-4 pt-8 sm:rounded-lg sm:px-10 sm:pb-6 sm:shadow">
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-white"
                >
                  Email address / Username
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    type="text"
                    data-testid="username"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-300 dark:focus:border-indigo-400 dark:focus:ring-indigo-400 sm:text-sm"
                    value={username}
                    onChange={handleUsernameChange}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-white"
                >
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={passwordVisible ? 'text' : 'password'}
                    data-testid="password"
                    autoComplete="current-password"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-300 dark:focus:border-indigo-400 dark:focus:ring-indigo-400 sm:text-sm"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  {password && (
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                    >
                      <i className={`fas ${passwordVisible ? 'fa-eye-slash' : 'fa-eye'} text-gray-700`}></i>
                    </button>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:text-white dark:border-gray-600 dark:focus:ring-indigo-400 disabled:cursor-wait disabled:opacity-50"
                  />
                  <label
                    htmlFor="remember_me"
                    className="ml-2 block text-sm text-gray-900 dark:text-white"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a className="font-medium text-indigo-400 hover:text-indigo-500" href="">
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div>
                <button
                  data-testid="login"
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-700 dark:border-transparent dark:hover:bg-indigo-600 dark:focus:ring-indigo-400 dark:focus:ring-offset-2 disabled:cursor-wait disabled:opacity-50"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <i className="fas fa-lock h-5 w-5 text-indigo-500 group-hover:text-indigo-400"></i>
                  </span>
                  Sign In
                </button>
              </div>
            </form>
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white dark:bg-gray-700 px-2 text-gray-500 dark:text-white">
                    Or continue with
                  </span>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  className="inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white dark:bg-gray-700 px-4 py-2 text-sm font-medium text-gray-500 dark:text-white shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 disabled:cursor-wait disabled:opacity-50"
                >
                  <span className="sr-only">Sign in with Google</span>
                  <i className="fab fa-google h-6 w-6"></i>
                </button>
                <button
                  className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white dark:bg-gray-700 px-4 py-2 text-sm font-medium text-gray-500 dark:text-white shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 disabled:cursor-wait disabled:opacity-50"
                >
                  <span className="sr-only">Sign in with GitHub</span>
                  <i className="fab fa-github h-6 w-6"></i>
                </button>
              </div>
            </div>
            <div className="m-auto mt-6 w-fit md:mt-8">
              <span className="m-auto dark:text-gray-400">
                Don't have an account?
                <a className="font-semibold text-indigo-600 dark:text-indigo-100" href="/register">
                  Create Account
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
