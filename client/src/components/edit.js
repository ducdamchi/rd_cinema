import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 export default function Edit() {
 const [entry, setEntry] = useState({
    title: "",
    year: "",
    director: "",
    region: "",
    rating: "",
   records: [],
 });
 const params = useParams();
 const navigate = useNavigate();
  useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`http://localhost:5001/record/${params.id.toString()}`);
     
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
      const record = await response.json();
    
      if (!record) {
       window.alert(`Record with id ${id} not found`);
       navigate("/");
       return;
     }
      setEntry(record);
   }
    fetchData();
    return;
 }, [params.id, navigate]);



  // These methods will update the state properties.
 function updateEntry(value) {
   return setEntry((prev) => {
     return { ...prev, ...value };
   });
 }
  async function onSubmit(e) {

   e.preventDefault();
   const editedEntry = {
     title: entry.title,
     year: entry.year,
     director: entry.director,
     region: entry.region,
     rating: entry.rating,
   };

    // This will send a post request to update the data in the database.
   await fetch(`http://localhost:8000/update/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedEntry),
     headers: {
       'Content-Type': 'application/json'
     },
   });
    navigate("/");
 }

  // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
     <h3>Update Film Entry</h3>
     <form onSubmit={onSubmit}>

       <div className="form-group">
         <label htmlFor="title">Title: </label>
         <input
           type="text"
           className="form-control"
           id="title"
           value={entry.title}
           onChange={(e) => updateEntry({ title: e.target.value })}
         />
       </div>


       <div className="form-group">
         <label htmlFor="year">Year: </label>
         <input
           type="text"
           className="form-control"
           id="year"
           value={entry.year}
           onChange={(e) => updateEntry({ year: e.target.value })}
         />
       </div>


       <div className="form-group">
         <label htmlFor="director">Director: </label>
         <input
           type="text"
           className="form-control"
           id="director"
           value={entry.director}
           onChange={(e) => updateEntry({ director: e.target.value })}
         />
       </div>


       <div className="form-group">
         <label htmlFor="region">Region: </label>
         <input
           type="text"
           className="form-control"
           id="region"
           value={entry.region}
           onChange={(e) => updateEntry({ region: e.target.value })}
         />
       </div>


       <div className="form-group">
         <label htmlFor="rating">Rating: </label>
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
       </div>
       <br /> */}
 
       <div className="form-group">
         <input
           type="submit"
           value="Update Record"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}