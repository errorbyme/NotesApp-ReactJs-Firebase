import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import TextareaAutosize from "react-textarea-autosize";
import { useFirebase } from "../Context/Firebase";
import { toast } from "react-toastify";

export const CreateNote = () => {
  const [title, Settitle] = useState("");
  const [desc, Setdesc] = useState("");
  const { addNote } = useFirebase();
  const navigate = useNavigate();

  const saveHandle = () => {
    addNote(title, desc);
    navigate("/");
    toast("Note Created !!");
  };
  return (
    <section>
      <div className="createn_header">
        <Link to={"/"} className="btn">
          <FaArrowLeft />
        </Link>
        <button className="s_btn" onClick={saveHandle}>
          save
        </button>
      </div>
      <div className="createn_form">
        <TextareaAutosize
          maxRows={4}
          onChange={(e) => Settitle(e.target.value)}
          placeholder="Title"
          autoFocus
        />
        <TextareaAutosize
          placeholder="Type Here..."
          onChange={(e) => Setdesc(e.target.value)}
        />
      </div>
    </section>
  );
};
