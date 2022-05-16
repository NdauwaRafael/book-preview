import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {useAppDispatch} from "../../redux/hooks";
import {bookSelectors, getBook} from "../../redux/slices/books";
import Book from "./partials/book";


const Home = () => {
    const dispatch = useAppDispatch();
    const books = useSelector(bookSelectors.selectAll);

    useEffect(() => {
        document.title = 'Home | Books';
    });

    useEffect(() => {
        dispatch(getBook());
    }, [dispatch]);


    return (
        <div>
            {
                books.map((book: any, index) => <Book {...book} key={index}/>)
            }
        </div>
    )
}

export default Home