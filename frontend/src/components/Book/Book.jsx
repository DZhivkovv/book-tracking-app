import React from "react";
import '../../assets/styles/book.scss'

export default function Book({id, title,author,status, onDelete}){
    return(
        <div className="book-container">
            <div className="book-text">
                <p className="book-title">{title}</p>
                <p className="book-author">{author}</p>
                <p className="book-status">{status}</p>
            </div>
            <button className="remove-book" onClick={() => onDelete(id)}>x</button>
        </div>
    )
}