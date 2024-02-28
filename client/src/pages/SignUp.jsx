import { useState } from "react";
import styles from "../index";
import { Link ,useNavigate} from "react-router-dom";
import OAuth from "../components/OAuth";

function SignUp() {
  const [formData, setFormData] = useState({});
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
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
      navigate('/signin')
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
          <h1 className={`${styles.heading2} text-[28px]`}>Sign Up</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 pt-10 px-5"
        >
          <input
            type="text"
            id="username"
            className="text-black bg-slate-100 p-3 rounded-md"
            placeholder="UserName"
            onChange={handleChange}
          />
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
            <p className="text-[10px]">
              Have a account?{" "}
              <span className="text-blue-600">
                {" "}
                <Link to={`/signin`}>Sign in</Link>
              </span>
            </p>
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
            <span className="text-[10px] sm:text-[12px] text-slate-500">
              Continue with social login
            </span>
            <span className="bg-green-300 w-20 h-[.1px]"> </span>
          </div>

          <OAuth/>
        </div>
      </div>
    </>
  );
}

export default SignUp;
