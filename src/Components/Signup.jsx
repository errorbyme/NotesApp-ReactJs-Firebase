import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFirebase } from "../Context/Firebase";
import loading from "../LoaderGif/loading.gif";
import { toast } from "react-toastify";
export const Signup = () => {
  const [uname, Setuname] = useState("");
  const [email, Setemail] = useState("");
  const [pswd, Setpswd] = useState("");
  const navigate = useNavigate();
  const { signUp, isLoggedIn } = useFirebase();
  const [isLoad, SetisLoad] = useState(false);

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn]);

  const signHandle = (e) => {
    SetisLoad(true);
    e.preventDefault();
    signUp(uname, email, pswd)
      .then((result) => {
        console.log(result);
        navigate("/signin");
        SetisLoad(false);
      })
      .catch((err) => {
        console.log(err);
        toast.warning(`${err}`);
        SetisLoad(false);
      });
  };
  return (
    <div className="sign_page">
      <div className="sign_header">
        <h2>Signup</h2>
      </div>
      <form action="">
        <input
          type="text"
          onChange={(e) => Setuname(e.target.value)}
          placeholder="Name"
          autoFocus
        />
        <input
          type="email"
          onChange={(e) => Setemail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          onChange={(e) => Setpswd(e.target.value)}
          placeholder="Password"
        />
        <button className="s_btn" onClick={signHandle}>
          Signup
          {isLoad && <img src={loading} width={"20px"} alt="" />}
        </button>
      </form>
    </div>
  );
};
