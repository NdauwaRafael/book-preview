import React, {useEffect, useState} from "react";
import "./book.scss";

const Page = ({page}: any) => {
    const {content, tokens} = page;
    const contentArray = content.split(/(?=[.\s]|\b)/);
    const [selectedWord, setSelectedWord] = useState(null);


    const wordIndexes = (word: string) => {
        const index = content.indexOf(word);
        const endIndex = index + word.length;

        return {index, endIndex};
    }

    const getToken = (word: string) => {
        const {index, endIndex} = wordIndexes(word);
        const positions = [index, endIndex];

        return tokens.filter((tkn: any) => tkn.position.join("|") === positions.join("|"));
    }

    const wordClicked = (word: string) => {
        if (!isClickable(word)) return;
        const token = getToken(word);

        if (token.length > 0) {
            const selectedToken = token[0];
            setSelectedWord(selectedToken.value);
        }

        return;
    };

    const isClickable = (word: string) => {
        const token = getToken(word);
        return token.length > 0;
    }

    return (
        <div className="content">
            <p>
                {
                    !selectedWord ?
                        contentArray.map((contentStr: string, index: number) =>
                            <span
                                className={isClickable(contentStr) ? 'clickable' : ''}
                                key={index} onClick={() => wordClicked(contentStr)}>{contentStr}</span>
                        )
                        :
                        <div>
                            <button className="back-button" onClick={() => setSelectedWord(null)}> &lt;&nbsp;Back
                            </button>
                            {selectedWord}
                        </div>
                }
            </p>
        </div>
    )
};

const Book = (book: any) => {
    const {pages} = book;
    const [page, setPage] = useState(0);

    useEffect(() => {
        console.log(pages.length, page)
    }, [page])
    return (
        <div className="book">
            <div className="book-page">
                <div className="book-page--content">
                    <div className="book-page-section left">
                        {pages[page] && <Page page={pages[page]} key={page}/>}

                        <div className="number">
                            {page}
                        </div>
                    </div>
                    <div className="book-page-section right">
                        {pages[page + 1] && <Page page={pages[page + 1]} key={page}/>}
                        <div className="number">
                            {page + 1}
                        </div>
                    </div>
                </div>

                <div className="book-page--actions">
                    <button disabled={pages.length - 1 <= page}
                            onClick={() => setPage(page < pages.length - 1 ? page + 2 : page)}>Next Page
                    </button>

                    <button disabled={page == 0} onClick={() => setPage(page > 0 ? page - 2 : page)}>Previous Page
                    </button>

                </div>
            </div>
        </div>
    );
}

export default Book;