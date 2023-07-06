import express from 'express'
import bodyParser from 'body-parser'
import {con as db} from './config/mysql.js'
import {response} from './response.js'

const app = express()
const port = 3000


app.use(bodyParser.json())

//routes/ URL / endpoint
app.get("/",(req,res) => {
    response(200,"API v1 ready to go","SUCCESS",res)
})

// -------select mahasiswa------
app.get("/mahasiswa",(req,res) => {
    const sql = "select * from mahasiswa";
    db.query(sql,(err,fields) => {
        if (err) throw err
        response(200,fields,"Spesifik Mahasiswa List",res)
    })
})

//---------select mahasiswa by nim-------
app.get("/mahasiswa/:nim",(req,res) => {
    const nim = req.params.nim 
    const sql = `select * from mahasiswa where nim = ${nim}` 
    db.query(sql,(err,result) => {
        response(200,result,`Spesifik Mahasiswa By ${nim}`,res)
    })
})


//-----------post data mahasiswa-------
app.post("/mahasiswa",(req,res) => {
    const {nim,namaLengkap,kelas,alamat} = req.body;
    const sql = `insert into mahasiswa(nim,nama_lengkap,kelas,alamat) values (${nim},"${namaLengkap}","${kelas}","${alamat}")`
    db.query(sql,(err,result) => {
        if(err) response(500,"invalid","error",res);
        if(result?.affectedRows){
            const data = {
                isSuccess : result.affectedRows,
                id : result.insertId
            }
            response(200,data,"Data Added Succesfully",res)
        }
    })
})

app.put("/mahasiswa",(req,res) => {
    const {nim,namaLengkap,kelas,alamat} = req.body;
    const sql = `update mahasiswa set nama_lengkap = '${namaLengkap}',kelas = '${kelas}',alamat = '${alamat}' where nim = ${nim}`
    db.query(sql,(err,fields) => {
        if(err) response (500,"invalid","error",res)
        if(fields?.affectedRows){
            const data = {
                isSuccess : fields.affectedRows,
                message : fields.message
            }
            response(200,data,"Update data succesfully",res)
        }else{
            response(404,"User Not Found","error",res)
        }
    })
        
})

app.delete("/mahasiswa",(req,res) => {
    const { nim } = req.body
    const sql = `delete from mahasiswa where nim = ${nim}`
    db.query(sql,(err,fields) => {
        if(err) response (500,"invalid","error",res)
        if(fields?.affectedRows){
            const data = {
                isDeleted : fields.affectedRows,
            }
            response(200,data,"Delete data succesfully",res)
        }else{
            response(404,"User Not Found","error",res)
        }
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})