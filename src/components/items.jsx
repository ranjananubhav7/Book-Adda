import React from "react";

function Item(props){
  var id = props.id;
  var href = "/"+id;
  var url = "https://books.google.com/books/content?id="+ id +"&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api";
  return (<li className="listitems card books cardsss">
  <img className="card-img-top cardImg" src={url} alt={props.bookTitle}/>
  <div class="card-body">
    <h5 class="card-title bookName">{props.bookTitle}</h5>
    <h6>Ebook is {props.ebook ? <h6>available</h6>:<h6>unavailable</h6>}</h6>
    <a href={href} class="btn btn-primary">Details</a>
  </div>
  </li>);
}
export default Item;
<a href="/0" class="btn btn-primary">Enroll Now</a>
