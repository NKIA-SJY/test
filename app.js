// app.js
const express = require('express');
const path = require('path');
const app = express();

const port = 3000;

// 1. 정적 파일(CSS, 이미지 등)을 제공하기 위한 설정
// 현재 폴더(__dirname)에 있는 파일들을 그대로 브라우저가 가져갈 수 있게 허용합니다.
app.use(express.static(__dirname));

// 2. 누군가 사이트 주소로 들어오면 index.html을 보여줌
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 3. 서버 실행
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running at http://0.0.0.0:${port}/`);
});