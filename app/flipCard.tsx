import React, {useEffect, useState} from 'react';
import WordDiv from './Word'; // Assuming WordDiv is another component you've defined
import {Word} from './types'
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
const FlipCard = ({word, V, X}:{word: Word, X: any, V: any}) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [currentWord, setCurrentWord] = useState(word);

    const handleCardClick = () => {
        setIsFlipped(!isFlipped);
    };
    useEffect(()=>{
        if( currentWord != word){
            setIsFlipped(false)
            setCurrentWord(word)
        }
    }, [word])


    return (
        <div className="container">
            <div
                className={`flip-card ${
                    isFlipped ? "flipped" : ""
                }`}
            >
                <div className="flip-card-inner">
                    <div className="flip-card-front" onClick={handleCardClick}>
                        <div className="card-content">
                            {currentWord.word}
                        </div>
                    </div>
                    <div className="flip-card-back" onClick={handleCardClick}>
                        <div className="card-content">
                            <WordDiv word={currentWord.word} meaning={currentWord.meaning}
                                     examples={currentWord.examples}/>
                        </div>
                    </div>
                </div>
            </div>
            <button type="button" onClick={V} className="button1" style={{ color: 'green' }}><CheckIcon/></button>
            <button type="button" onClick={X} className="button2" style={{ color: 'red' }}><CloseIcon/></button>
        </div>
    );
};

export default FlipCard;
