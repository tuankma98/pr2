import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import ReactImageMagnify from 'react-image-magnify';
import { thumbnailURL } from '../../../../utils/utils';

const useStyles = makeStyles((theme) => ({
  enlargedImage: {
    position: 'relative',
    zIndex: 100,
  },
  thumbnail: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
}));

function ProductThumbnail({ product = {} }) {
  const { name, images = '' } = product;
  const classes = useStyles();

  const handleClickImg = (e) => {};

  return (
    <Box>
      <ReactImageMagnify
        {...{
          smallImage: {
            alt: `${name}`,
            isFluidWidth: true,
            src: `${images[0]}`,
          },
          largeImage: {
            src: `${images[0]}`,
            width: 1200,
            height: 1800,
          },
        }}
        enlargedImageClassName={classes.enlargedImage}
      />
      <Box className={classes.thumbnail}>
        {images &&
          images.slice(0, 4).map((image, indx) => {
            return (
              <Box
                onClick={handleClickImg}
                key={indx}
                sx={{ width: '25%', border: '1px solid red', cursor: 'pointer' }}
              >
                <img src={thumbnailURL(image)} alt={name} width="100%" />
              </Box>
            );
          })}
      </Box>
    </Box>
  );
}

export default ProductThumbnail;
