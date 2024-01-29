import {Word} from "@/app/types";


export default function WordDiv (word: Word) : JSX.Element{
    return (
        <div>
            <div>
                <label>:פירוש</label> <h2>{word.meaning}</h2>
            </div>
            <div>
                {/*<label>דוגמאות שימוש:</label>*/}
                {/*<ul>*/}
                {/*    {word.examples.map((example, i) => {*/}
                {/*        return <li key={i}>{example}</li>;*/}
                {/*    })}*/}
                {/*</ul>*/}
            </div>
        </div>

    )
}