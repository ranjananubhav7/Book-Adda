import React, {useState} from "react";
import axios from "axios";
import Item from "./items.jsx"


function App(){

  const [bookName, setbookName] = useState("");
  const [results, setresults] = useState([]);
  const apikey = "AIzaSyCBbyNy9RCeUtdu2USCo8JqaX6ycdU2VMQ";

  async function handleChange(event){
    setbookName(event.target.value);
    console.log(bookName);
    axios.get("https://www.googleapis.com/books/v1/volumes?q="+bookName+"&key="+apikey+"&maxResults=40").then(data =>
    {
      setresults(data.data.items);
    });
  }
  
  function handleSubmit(event){
    event.preventDefault();
    var bookName1 = document.getElementById("formInput").value;
    axios.get("https://www.googleapis.com/books/v1/volumes?q="+bookName1+"&key="+apikey+"&maxResults=40").then(data =>
    {
      setresults(data.data.items);
    });
  }

  return (<div className="forM">
  <h1 className="formText">Search for books!</h1>
  <form onSubmit={handleSubmit}>
    <input id="formInput" type="text" onChange={handleChange} className="form-control formInput" placeholder="type here" autoComplete="off" />
    
    <div>
      <i id="start_button" onClick={startDictation} className="fa fa-2x fa-microphone icon"></i>
    </div>

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

//-------------------------------- speech recognition code---------------------------

var final_transcript = '';
var recognizing = false;

  if ('webkitSpeechRecognition' in window) {
    var recognition = new window.webkitSpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = function () {
      recognizing = true;
      var audioElement = new Audio('images/speaknow.mp3');
      audioElement.play();
      document.getElementById("start_button").style.color = "red";
    };

    recognition.onerror = function (event) {
      console.log(event.error);
    };

    recognition.onend = function () {
      recognizing = false;
      document.getElementById("start_button").style.color = "white";
      var audioElement = new Audio('images/speaknow.mp3');
      audioElement.play();
    };

    recognition.onresult = function (event) {
      var interim_transcript = '';
      for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final_transcript += event.results[i][0].transcript;
        } else {
          interim_transcript += event.results[i][0].transcript;
        }
      }
      final_transcript = capitalize(final_transcript);
      document.getElementById("formInput").value = interim_transcript;    
      document.getElementById("formInput").value = final_transcript;  
    };
  }

  function capitalize(s) {
    return s.replace(s.substr(0, 1), function (m) {
      return m.toUpperCase();
    });
  }

  function startDictation() {
    if (recognizing) {
      recognition.stop();
      return;
    }
    final_transcript = '';
    recognition.lang = 'en-US';
    recognition.start();
    document.getElementById("formInput").innerHTML = '';
    document.getElementById("formInput").innerHTML = '';
  }

export default App;
