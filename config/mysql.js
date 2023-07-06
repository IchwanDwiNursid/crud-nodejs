import mysql from 'mysql'

 export const con = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "iwan",
    database : "iwan_univers"
});

// con.connect(function(err){
//     if (err) throw err;
//     console.log('Koneksi berhasil!');
// });