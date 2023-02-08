import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';
import Card from 'react-bootstrap/Card';

export default function Compressor() {
  const [compressedLink, setCompressedLink] = useState(
    'https://imgur.com/nuAYFOx'
  );

  const [originalImage, setOriginalImage] = useState('');
  const [originalLink, setOriginalLink] = useState('');
  const [clicked, setClicked] = useState(false);
  const [uploadImage, setUploadImage] = useState(false);
  const [outputFileName, setOutputFileName] = useState('');

  const handleUpload = (event) => {
    const imageFile = event.target.files[0];

    setOriginalLink(URL.createObjectURL(imageFile));
    setOriginalImage(imageFile);
    setOutputFileName(imageFile.name);
    setUploadImage(true);
  };

  const handleClick = (event) => {
    event.preventDefault();

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 500,
      useWebWorker: true,
    };

    if (options.maxSizeMB >= originalImage.size / 1024) {
      alert("Too smal, can't be compressed!");
      return 0;
    }

    let output;
    imageCompression(originalImage, options).then((img) => {
      output = img;

      const downloadLink = URL.createObjectURL(output);
      setCompressedLink(downloadLink);
    });

    setClicked(true);
    return 1;
  };

  return (
    <div className="m-5">
      <div className="text-light text-center">
        <h1>Compress your image with this simple steps:</h1>
        <h3>1. Upload</h3>
        <h3>2. Click om compress</h3>
        <h3>3. Download your compressed image</h3>
      </div>

      <div className="row mt-5">
        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
          {uploadImage ? (
            <Card.Img
              className="ht"
              variant="top"
              src={originalLink}
            ></Card.Img>
          ) : (
            <Card.Img
              className="ht"
              variant="top"
              src="https://imgur.com/nuAYFOx"
            ></Card.Img>
          )}
          <div className="d-flex justify-content-center">
            <input
              type="file"
              accept="image/*"
              className="mt-2 btn btn-dark w-75"
              onChange={handleUpload}
            />
          </div>
        </div>
        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
          {clicked ? (
            <Card.Img
              className="ht"
              variant="top"
              src={compressedLink}
            ></Card.Img>
          ) : (
            <Card.Img
              className="ht"
              variant="top"
              src="https://imgur.com/nuAYFOx"
            ></Card.Img>
          )}
          <div className="d-flex justify-content-center">
            <button className="mt-2 btn btn-dark w-75" onClick={handleClick}>
              Compress
            </button>
          </div>
        </div>
      </div>
      {clicked ? (
        <a
          className="btn btn-outline-dark w-75 d-flex m-auto"
          href={compressedLink}
          download={outputFileName}
        >
          Download
        </a>
      ) : (
        ''
      )}
    </div>
  );
}
