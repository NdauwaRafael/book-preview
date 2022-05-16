import React, {useEffect} from "react";
import {bookPagesState} from "../../../redux/slices/books";


const Page = ({page}: any) => {
    const {content, tokens} = page;

    return (
        <div style={{padding: 10, margin: 20}}>
            {
                page.content
            }
        </div>
    )
};

const Book = (book: any) => {
    const {pages} = book;
    return (
        <div >
            {
                pages.map((page: bookPagesState, index: any) => {
                    return page.content.length > 0 ? <Page page={page} key={index} /> : null
                })
            }
        </div>
    );
}

export default Book;