// 모듈(다른 개발자가 만들어놓은 것) 불러오기

const http = require('http')
const express = require('express')

// express 객체(붕어빵) 만들기

const app = express()

// 모든 요청에 대해서 응답을 보내는 함수 등록하기 (미들웨어)
app.use((req, res, next) => {
    console.log(`첫번째 미들웨어 호출됨`)

    next()
})

// 지정한 경로로 요청한 것에 대해서 응답을 보내는 함수 등록하기 (라우팅 함수)
const router = express.Router()
app.use('/', router)

// router1
router.route('/list').get((req, res)=> {
    console.log(`/list 요청 경로로 요청됨`)

    res.writeHead(200, {'Content-Type': 'text/html;charset=utf8'})
   // res.end(`/list에 대한 응답`)
   res.end(
    `<html>
        <head>
            <meta charset="UTF-8">
            <title></title>

        </head>
        <body>
            <div>
                <h1>웹서버로부터 응답받은 것</h1>
            </div>
        </body>
    </html>`)
})

// router2
router.route('/add').get((req, res)=>{
    console.log(`/add 요청 경로로 요청됨`)
     res.writeHead(200, {'Content-Type': 'text/html;charset=utf8'})
     res.end(`/add에 대한 응답`)
})

// 웹서버 실행하기 (express 앱을 Http 서버에 연결하여 실행)
http.createServer(app).listen(7001, () => {
    console.log(`7001번 포트로 웹서버 실행됨`)
})
console.log(`웹서버 실행 요청됨`)


