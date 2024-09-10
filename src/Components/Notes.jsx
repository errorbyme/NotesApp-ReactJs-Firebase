import React, { useEffect, useState } from "react";
import { NoteItem } from "./NoteItem";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaTimes, FaPlus, FaSignOutAlt } from "react-icons/fa";
import { useFirebase } from "../Context/Firebase";
import "react-toastify/dist/ReactToastify.css";

export const Notes = () => {
  const [isTure, SetisTure] = useState(true);
  const [search, Setsearch] = useState("");
  const { getNotes, isLoggedIn, signOutuser, user } = useFirebase();
  const navigate = useNavigate();
  const [notes, Setnotes] = useState([]);
  const [filteredNotes, SetfilteredNotes] = useState([]);

  useEffect(() => {
    if (!user) return;
    getNotes()
      .then((querySnapshot) => {
        Setnotes(querySnapshot.docs);
        SetfilteredNotes(querySnapshot.docs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [getNotes]);

  useEffect(() => {
    if (!isLoggedIn) navigate("/signin");
    console.log(user);
  }, [isLoggedIn]);

  useEffect(() => {
    if (search) {
      const filterd = notes.filter((doc) =>
        doc.data().title.toLowerCase().includes(search.toLowerCase())
      );
      SetfilteredNotes(filterd);
    } else {
      SetfilteredNotes(notes);
    }
  }, [search, notes]);

  return (
    <section>
      <div className="page_header">
        <h3>
          <strong>H</strong>ey <em>{user && user.displayName}</em>,
        </h3>
      </div>
      <header className="notes_header">
        {isTure ? (
          <div className="add_box">
            <Link to={"/cnote"} className="btn">
              <FaPlus />
            </Link>
            <h2>Notes</h2>
            <button onClick={signOutuser} className="btn">
              <FaSignOutAlt />
            </button>
          </div>
        ) : (
          <input
            type="text"
            autoFocus
            placeholder="Search notes...."
            onChange={(e) => Setsearch(e.target.value)}
          />
        )}
        <button className="btn" onClick={() => SetisTure(!isTure)}>
          {isTure ? <FaSearch /> : <FaTimes />}
        </button>
      </header>
      <div className="notes_container">
        {filteredNotes.length ? (
          filteredNotes.map((doc, i) => (
            <NoteItem id={doc.id} doc={doc.data()} key={i} />
          ))
        ) : (
          <p>No Record Found..</p>
        )}
      </div>
    </section>
  );
};
