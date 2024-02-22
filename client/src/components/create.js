import React, { useState } from "react";
import { useNavigate } from "react-router";
export default function Create() {
 const [entry, setEntry] = useState({
   title: "",
   year: "",
   director: "",
   region: "",
   rating: "",
 });
 const navigate = useNavigate();
  // These methods will update the state properties.
 function updateEntry(value) {
   return setEntry((prev) => {
     return { ...prev, ...value };
   });
 }
  // This function will handle the submission.
 async function onSubmit(e) {

   e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
   const newFilm = { ...entry };

    await fetch("http://localhost:5001/record/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newFilm),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
    setEntry({ title: "", year: "", director: "", region:"", rating:"" });
   navigate("/");
 }
  // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Add New Film Entry</h3>
     <form onSubmit={onSubmit}>

       <div className="form-group">
         <label htmlFor="title">Title</label>
         <input
           type="text"
           className="form-control"
           id="title"
           value={entry.title}
           onChange={(e) => updateEntry({ title: e.target.value })}
         />
       </div>

       <div className="form-group">
         <label htmlFor="year">Year</label>
         <input
           type="text"
           className="form-control"
           id="year"
           value={entry.year}
           onChange={(e) => updateEntry({ year: e.target.value })}
         />
       </div>

       <div className="form-group">
         <label htmlFor="director">Director</label>
         <input
           type="text"
           className="form-control"
           id="director"
           value={entry.director}
           onChange={(e) => updateEntry({ director: e.target.value })}
         />
       </div>

       <div className="form-group">
         <label htmlFor="region">Region</label>
         <input
           type="text"
           className="form-control"
           id="region"
           value={entry.region}
           onChange={(e) => updateEntry({ region: e.target.value })}
         />
       </div>

       <div className="form-group">
         <label htmlFor="rating">Rating</label>
         <input
           type="text"
           className="form-control"
           id="rating"
           value={entry.rating}
           onChange={(e) => updateEntry({ rating: e.target.value })}
         />
       </div>






       {/* <div className="form-group">
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="positionIntern"
             value="Intern"
             checked={form.level === "Intern"}
             onChange={(e) => updateForm({ level: e.target.value })}
           />
           <label htmlFor="positionIntern" className="form-check-label">Intern</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="positionJunior"
             value="Junior"
             checked={form.level === "Junior"}
             onChange={(e) => updateForm({ level: e.target.value })}
           />
           <label htmlFor="positionJunior" className="form-check-label">Junior</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="positionSenior"
             value="Senior"
             checked={form.level === "Senior"}
             onChange={(e) => updateForm({ level: e.target.value })}
           />
           <label htmlFor="positionSenior" className="form-check-label">Senior</label>
         </div>
       </div> */}
       <div className="form-group">
         <input
           type="submit"
           value="Create entry"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}