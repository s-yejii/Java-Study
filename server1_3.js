// 모듈(다른 개발자가 만들어놓은 것) 불러오기
const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const mariadb = require('mariadb')

const pool = mariadb.createPool({
    host: '127.0.0.1',
    port: 4406,
    user: 'root',
    password: 'admin',
    database: 'test',
    connectionLimit: 10,
    debug: false
})
BigInt.prototype.toJSON = () =>{
    return this.toString()
}
// 익스프레스 객체 만들기
const app = express()

// post 방식으로 요청이 들어오면 요청파라미터가 주소줄에 있는 것이 아니라서, body에 있는 요청파라미터를 가져옴
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// gg ㅍㅗㄹ더 오픈하기
app.use('/', express.static('./public'))


// 모든 요청에 대해서 응답을 보내는 함수 등록하기 (미들웨어)
app.use((req,res,next) => {
    console.log(`첫 번째 미들웨어 호출됨`)
    next()
})
// 지정한 경로로 요청한 것에 대해 응답을 보내는 함수 등록하기 (라우팅)
const router = express.Router()
app.use('/',router)
router.route('/list').get(async(req,res) => {
    console.log(`/list 요청 경로로 요청됨`)
    // 데이터베이스에서 조회하기
    let conn;
    try{
        const sql = `select id, name, age, mobile from test.person`
        conn = await pool.getConnection()
        const rows = await conn.query(sql)
        res.writeHead(200,{'Content-Type' : 'text/html;charset=utf8'})
        res.end(JSON.stringify(rows))
    } catch(err){
      console.log(`에러 발생 -> ${err}`)
    } finally {
        if (conn) conn.release()
    }
})
//router.route('/add').get(async(req,res)=>{
router.route('/add').post(async(req,res)=>{
    console.log(`/add 요청 경로로 요청됨`)
    // const params = req.query
    const params = req.body
    console.log(`요청 파라미터 -> ${JSON.stringify(params)}`)
    // 데이터베이스에서 조회하기
    let conn;
    try{
        const sql = `insert into test.person(name,age,mobile) values('${params.name}', '${params.age}', '${params.mobile}')`
        conn = await pool.getConnection()
        const rows = await conn.query(sql)
        res.writeHead(200,{'Content-Type' : 'text/html;charset=utf8'})
        res.end(JSON.stringify(rows))

    } catch(err){
        console.log(`에러 발생 -> ${err}`)
    } finally {
        if (conn) conn.release()
    }
})
//update
router.route('/update').get(async(req, res) => {
    console.log(`/update 요청 경로로 요청됨`)
    const params = req.query
    console.log(`요청 파라미터 -> ${JSON.stringify(params)}`)
    // 데이터베이스에서 수정하기
    let conn;
    try {
        const sql = `update test.person set name='${params.name}', age='${params.age}', mobile='${params.mobile}' where id=${params.id}`
        conn = await pool.getConnection()
        const rows = await conn.query(sql)
        res.writeHead(200, {'Content-Type' : 'text/html;charset=utf8'})
        res.end(JSON.stringify(rows))

    } catch(err) {
        console.log(`에러 발생 -> ${err}`)
    } finally {
        if (conn) conn.release()
    }
})

router.route('/remove').get(async(req, res) => {
    console.log(`/delete`)
    const params = req.query
    console.log(`요청 파라미터 -> ${JSON.stringify(params)}`)

    let conn;
    try {
        const sql = `delete from test.person where id=?`
        conn = await pool.getConnection()
        const rows = await conn.query(sql, [params.id])
        res.writeHead(200, {'Content-Type' : 'text/html;charset=UTF8'})
        res.end(JSON.stringify(result))
    } catch {
        console.log(`에러 발생 -> ${err}`)
    } finally {
        if(conn) {
            conn.release()
        }

    }

})
// 웹서버 실행하기
http.createServer(app).listen(7001,() => {
    console.log(`7001번 포트로 웹서버 실행됨`)
})
console.log(`웹서버 실행 요청됨`)