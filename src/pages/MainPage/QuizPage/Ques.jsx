import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import './quiz.css'

const Ques = () => {
    const { id } = useParams()
    const [quesId,setQuesId]=useState(0);
    const [score,setScore]=useState(0);
    const [Questions, setQuestions] = useState([]);
    const [Loading,setLoading] = useState(true);
    const [Error,setError] = useState();
    const [ans,setAns]=useState(null);    
    
    const [shuffledOptions, setShuffledOptions] = useState([]);

useEffect(() => {
    if (Questions.length > 0) {
        const options = [Questions[quesId].correct_answer, ...Questions[quesId].incorrect_answers];
        setShuffledOptions(options.sort(() => Math.random() - 0.5));
    }
}, [quesId, Questions]);


    useEffect(()=>{
        const fetchData =async(id)=>{
            const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${id}&type=multiple`)
            const data = await response.json();
            
            if(data.response_code===0){
                
                setQuestions(data.results);
                setLoading(false);
                console.log(id)
            }
            else{
                console.log(data.response_code);
            }
        }
        fetchData(id);
    },[id])
    
    if(Loading){
        return <h1>Loading...</h1>
    }
    if(Error){
        return <h1>Error loading data...</h1>
    }

    const handleNext=()=>{
        if (ans===null){
            console.log("Please select an option");
            return ;
        }
        if(ans===Questions[quesId].correct_answer){
            setScore(score+1);
        }
        setQuesId(quesId+1);
        setAns(null);
    }

if (quesId >= Questions.length) {
    return (
        <div>
            <h2>Quiz Completed!</h2>
            <h3>Your score: {score} / {Questions.length}</h3>
        </div>
    );
}

    const Question=Questions[quesId]
    
    return(
        <>
        <h2>Quiz</h2>
        <h3>{Question.question}</h3>
        <ol>
    {shuffledOptions.map((answer, idx) => (
        <li key={idx}>
            <button onClick={() => setAns(answer)}>{answer}</button>
        </li>
    ))}
</ol>
        <button onClick={handleNext}>Next</button>
        </>
    )
}

export default Ques;