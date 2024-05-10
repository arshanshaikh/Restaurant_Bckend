import app from "./app.js"  //js you have to write everytime because you have use module package.json

app.listen(process.env.PORT,()=>{
    console.log(`Server running on port ${process.env.PORT}`);
});