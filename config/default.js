
module.exports={
  "mysql": {
    "connectionLimit": process.env.CONNECTIONLIMIT||50,
    "host": process.env.HOST||"localhost",
    "port": process.env.PORT||3306,
    "user": process.env.USER||"root",
    "password": process.env.PASSWORD||"password",
    "database": process.env.DATABASE||"auction"
  },
}