import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import TextareaAutosize from "react-textarea-autosize";
import { useFirebase } from "../Context/Firebase";
import { toast } from "react-toastify";

export const EditNote = () => {
  const params = useParams();
  const [title, Settitle] = useState("");
  const [desc, Setdesc] = useState("");
  const navigate = useNavigate();
  const { getNote, deleteNote, updateNote } = useFirebase();

  useEffect(() => {
    getNote(params.id).then((docsnap) => {
      Settitle(docsnap.data().title);
      Setdesc(docsnap.data().description);
    });
  }, []);

  const updateHandle = () => {
    updateNote(params.id, title, desc).then(() => {
      navigate("/");
      toast("Note Updated !!");
    });
  };

  const deleteHandle = () => {
    deleteNote(params.id).then(() => {
      navigate("/");
      toast.warning("Note Deleted !!");
    });
  };

  return (
    <section>
      <div className="createn_header">
        <Link to={"/"} className="btn">
          <FaArrowLeft />
        </Link>
        <button className="s_btn " onClick={updateHandle}>
          save
        </button>
        <button className="btn" onClick={deleteHandle}>
          <FaTrash />
        </button>
      </div>
      <div className="createn_form">
        <form action="">
          <TextareaAutosize
            onChange={(e) => Settitle(e.target.value)}
            value={title}
            maxRows={4}
            placeholder="Title"
          />
          <TextareaAutosize
            onChange={(e) => Setdesc(e.target.value)}
            value={desc}
            placeholder="Type Here..."
          />
        </form>
      </div>
    </section>
  );
};
