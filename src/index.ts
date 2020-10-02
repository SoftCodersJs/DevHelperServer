import express from 'express';

const app = express();

app.use(express.json())
app.get('/', (req, res) => {
  return res.json({message:'Tudo rodando de boa'})
})

app.listen(3333, () => {
  console.log('servidor rodando')
})