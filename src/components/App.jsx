import React, {useState} from "react";
import axios from "axios";
import Item from "./items.jsx"

function App(){

  const [bookName, setbookName] = useState("");
  const [results, setresults] = useState([]);
  const apikey = "AIzaSyCBbyNy9RCeUtdu2USCo8JqaX6ycdU2VMQ";

  function handleChange(event){
    setbookName(event.target.value);
  }

  function handleSubmit(event){
    event.preventDefault();
    axios.get("https://www.googleapis.com/books/v1/volumes?q="+bookName+"&key="+apikey+"&maxResults=40").then(data =>
    {
      setresults(data.data.items);
    });
  }

  return (<div className="forM">
  <h1 className="formText">Search for books!</h1>
  <form onSubmit={handleSubmit}>
    <input type="text" onChange={handleChange} className="form-control formInput" placeholder="type here" autoComplete="off" />
    <button type="submit" className="btn btn-outline-warning formButton">search</button>
  </form>
<ul>
  {results.map(book => (
    <Item
      id = {book.id}
      bookTitle = {book.volumeInfo.title}
      description = {book.volumeInfo.description}
      ebook = {book.saleInfo.isEbook}
    />
 ))}
 </ul>
    </div>);

}

export default App;
