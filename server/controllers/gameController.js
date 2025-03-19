function bestmove(board){
    const available = board.map((cell,i)=>cell===''?i:null).filter((cell)=>cell!==null)
    if(available.length===0) return null
    let n=available.length
    return available[Math.floor(Math.random()*n)]
}


export const move=async(req,res)=>{
    const { board } = req.body;
    const aiMove = bestmove(board);
    res.json({ move: aiMove });
}

