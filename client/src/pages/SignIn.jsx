import { useState } from "react";
import styles from "../index";
import { Link ,useNavigate } from "react-router-dom";

function SignIn() {
  const [formData, setFormData] = useState({});
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (data.succes === false) {
        setError(true);
        return;
      }
      setError(false);
      navigate('/')
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <>
      <div
        className={`pb-10 max-w-lg mx-auto mt-16  rounded-lg overflow-hidden  shadow-2xl`}
      >
        <div className={` green px-6 py-2   rounded-t-lg`}>
          <h1 className={`${styles.heading2} text-[28px]`}>Sign In</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 pt-10 px-5"
        >
          <input
            type="text"
            id="email"
            className="text-black bg-slate-100 p-3 rounded-md"
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            type="text"
            id="password"
            className="text-black bg-slate-100 p-3 rounded-md"
            placeholder="Password"
            onChange={handleChange}
          />
          <button
            className={`${styles.button}  disabled:bg-slate-500 text-black disabled:text-white`}
            disabled={isLoading}
          >
            {isLoading ? "Loading ..." : "Register"}
          </button>
          <div className="flex justify-between">
            <div className="flex justify-between">
            <p className="text-[10px] border-r border-black">
              No account?{" "}
              <span className="text-blue-600 pr-2">
                {" "}
                <Link to={`/signup`}>Sign Up</Link>
              </span>
            </p>
            <p className="text-[10px] pl-2 text-blue-600">
              forgot password 
            </p>
            </div>
            
            <p className="text-[10px] text-red-600">
              {isError && "something went wrong"}
            </p>
          </div>
        </form>
        <div>
          <h3 className="text-center text-slate-700 pt-3 pb-3 text-[10px]">
            OR
          </h3>
          <div className="flex justify-center items-center gap-3 pb-6">
            <span className="bg-green-300 w-20 h-[.1px]"></span>
            <span className="text-[12px] text-slate-500">
              Continue with social login
            </span>
            <span className="bg-green-300 w-20 h-[.1px]"> </span>
          </div>

          <div className={`px-5`}>
            <div className="flex gap-3 justify-center border border-[1px] py-3 rounded-md  items-center border-[1px] border-black mb-4">
              <span className="icon-[devicon--google]"></span>
              <button>Continue with Google</button>
            </div>
            <div className="flex gap-3 justify-center pl-4 border border-[1px] py-3 rounded-md  items-center border-[1px] border-black">
              <span className="icon-[logos--facebook]"></span>
              <button>Continue with Facebook</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
