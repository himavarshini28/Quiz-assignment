import express from "express";
import cors from 'cors';
import fetch from 'node-fetch';

const app=express();
const PORT=3000;

app.use(cors({ origin: "*" })); 

app.get('/api/quiz',async(req,res)=>{
    try{
    const response = await fetch("https://api.jsonserve.com/Uw5CrX");
    if(!response.ok)
    {
        throw new Error("Failed to fetch quiz data");
    }
    const data=await response.json();
    res.json(data);
    }
    catch(err)
    {
        res.status(500).json({err:"error fetching quiz data"});
    }
})

app.listen(PORT,()=>{
    console.log("server is listening to the port",PORT);
})