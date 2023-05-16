import express  from "express";
import path from "path";
import axios from "axios";
const app = express();

app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(path.resolve(),"public")));

app.get("/",(req,res)=>{
    res.render("home.ejs");
});

app.post("/data",async (req,res)=>{
    const value = req.body.name;
    const options = {
        method: 'POST',
        url: 'https://trains.p.rapidapi.com/',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': 'c0d63673d5msh194eb46ffb49d79p1c9340jsn47bece833828',
          'X-RapidAPI-Host': 'trains.p.rapidapi.com'
        },
        data: {search: `${value}`}
      };
      
      const answer = await axios.request(options);
      const material = answer.data;
      res.render("data.ejs",({
        name:material[0].name,
        number:material[0].train_num,
        classes:material[0].data.classes,
        from:material[0].train_from,
        to:material[0].train_to,
        depart:material[0].data.departTime,
        arrival:material[0].data.arriveTime,
      }));
})

app.listen(5000,()=>{
    console.log("Server is running");
});