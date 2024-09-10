import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

export const NoteItem = ({ doc, id }) => {
  const date = new Date(
    doc.created.seconds * 1000 + doc.created.nanoseconds / 1e6
  );
  return (
    <Link to={`/enote/${id}`} className="note">
      <h3>{doc.title}</h3>
      <p>{moment(date).format("MMM DD, YYYY")}</p>
    </Link>
  );
};
