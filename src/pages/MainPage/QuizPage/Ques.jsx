import React, { useEffect } from 'react'
import { useState } from 'react'
const Ques = ({id}) => {
    const [Ques, setQues] = useState([]);
    const [Loading,setLoading] = useState(true);
    const [Error,setError] = useState();

    useEffect(()=>{
        const fetchData =async(id)=>{
            const data = fetch(`https://opentdb.com/api.php?amount=10&category=${id}&type=multiple`)
            data= await data.json();
            if(data.response_code===0){
                setQues(data.results);
                setLoading(false);
            }
            else{
                console.log(data.response_code);
            }
        }
        fetchData(id);
    },[id])

  return (
    <div>
     <h3>Quiz</h3>
     <div className="questions"></div>

    </div>

  )
}

export default Ques