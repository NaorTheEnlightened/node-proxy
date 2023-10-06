const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3004;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/get-image', async (req, res) => {
  const targetUrl = req.body.url;
  try {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    // Perform Axios POST request
    const response = await axios.post(
      'https://steptodown.com/istock-downloader/get.php',
      targetUrl,
      { headers },
    );

    // return res.json({ imageSrc: response.data });
    const htmlString = response.data;
    const imgSrcPattern =
      /<img[^>]+src=["']([^"']+\.(jpg|jpeg))["'][^>]*>/gi;

    const matches = htmlString.match(imgSrcPattern);

    if (matches) {
      // Extract and print the matched image URLs
      const imageUrls = matches.map((match) => {
        const urlMatch = match.match(
          /src=["']([^"']+)["']/,
        );
        return urlMatch ? urlMatch[1] : null;
      });
      res.json(imageUrls[0]);
    } else {
      res
        .status(404)
        .json({ error: 'Image src not found' });
    }
  } catch (error) {
    // Handle errors from Axios request
    console.error(error);
    res
      .status(500)
      .json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
