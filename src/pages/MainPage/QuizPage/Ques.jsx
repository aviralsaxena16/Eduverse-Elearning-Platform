import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom';

const Ques = () => {
    const { id } = useParams()
    const [Questions, setQuestions] = useState([]);
    const [Loading,setLoading] = useState(true);
    const [Error,setError] = useState();
    

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
    
    return (
        <div>
    <h3>Quiz</h3>
    <div className="questions">
      <ol>
        {Questions.map((Ques, index) => (
            <li key={index}>
            {/* <p dangerouslySetInnerHTML={{ __html: Ques.question }}></p> */}
            <h1>{Ques.question}</h1>
            <ol>
              {[...Ques.incorrect_answers, Ques.correct_answer]
                .sort(() => Math.random() - 0.5)
                .map((Option, i) => (
                  <li key={i}>
                    <button
                      onClick={() =>
                        Option === Ques.correct_answer
                          ? alert("Correct answer!")
                          : alert("Wrong answer!")
                      }
                    >
                      {Option}
                    </button>
                  </li>
                ))}
            </ol>
          </li>
        ))}
      </ol>
    </div>
  </div>)
}

export default Ques

