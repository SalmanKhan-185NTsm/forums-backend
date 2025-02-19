const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get('/posts', async (req, res) => {
  const posts = await prisma.post.findMany();
  res.json(posts);
});

app.post('/posts', async (req, res) => {
  const { title, content } = req.body;
  const post = await prisma.post.create({
    data: {
      title,
      content,
    },
  });
  res.json(post);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});