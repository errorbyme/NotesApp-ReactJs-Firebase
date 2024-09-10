import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFirebase } from "../Context/Firebase";
import loading from "../LoaderGif/loading.gif";
import { toast } from "react-toastify";

export const Signin = () => {
  const [email, Setemail] = useState("");
  const [pswd, Setpswd] = useState("");
  const [isLoad, SetisLoad] = useState(false);
  const navigate = useNavigate();

  const { signIn, isLoggedIn } = useFirebase();

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn]);

  const signHandle = (e) => {
    SetisLoad(true);
    e.preventDefault();
    signIn(email, pswd)
      .then((res) => {
        console.log(res);
        navigate("/");
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
        <h2>Signin</h2>
      </div>
      <form action="">
        <input
          type="text"
          onChange={(e) => Setemail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="text"
          onChange={(e) => Setpswd(e.target.value)}
          placeholder="Password"
        />
        <button className="s_btn" onClick={signHandle}>
          Signin
          {isLoad && <img src={loading} width={"20px"} alt="" />}
        </button>
        <p>
          <Link to={"/signup"}>Don't have an account ?</Link>
        </p>
      </form>
    </div>
  );
};
