const express = require('express');
const AWS = require('aws-sdk');

const app = express();
const port = process.env.PORT || 3000;

// Configurar AWS SDK con DigitalOcean Spaces
const s3 = new AWS.S3({
  accessKeyId: 'DO00B9T9ZTDU84NWRQ4Y',
  secretAccessKey: 'IQW075hdRwvEWpYNh+ty0u1COek8AnV49or0Sx9tucg',
  endpoint: 'https://nyc3.digitaloceanspaces.com',
  signatureVersion: 'v4',
});

app.get('/generate-presigned-url', (req, res) => {
  const params = {
    Bucket: 'growconex25app',
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
