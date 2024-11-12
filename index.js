const express = require('express');
const AWS = require('aws-sdk');

const app = express();
const port = process.env.PORT || 3000;

// Configurar AWS SDK con DigitalOcean Spaces
const s3 = new AWS.S3({
  accessKeyId: 'your-access-key',
  secretAccessKey: 'your-secret-key',
  endpoint: 'https://your-region.digitaloceanspaces.com',
  signatureVersion: 'v4',
});

app.get('/generate-presigned-url', (req, res) => {
  const params = {
    Bucket: 'your-space-name',
    Key: req.query.filename,
    Expires: 3600, // 1 hora
  };

  s3.getSignedUrl('putObject', params, (err, url) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error generando URL firmada');
    } else {
      res.json({ url });
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});