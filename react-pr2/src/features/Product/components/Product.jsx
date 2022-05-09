import { Box, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import React from 'react';
import { formatPrice, promotion, thumbnailURL } from '../../../utils/utils';
import { makeStyles } from '@mui/styles';

const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: '7px',
    cursor: 'pointer',
    border: '1px solid transparent',

    '&:hover': {
      boxShadow: 'rgb(0 0 0 / 10%) 0px 0px 20px',
      zIndex: 1,
    },
  },
  img: {
    flexShrink: 0,
    minHeight: '200px',
    padding: '7px',
  },
  bottom: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: '1',
  },

  name: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: '1',
  },
  price: {
    display: 'flex',
  },
}));

function Product({ images, name, salePrice, promotionPercent, id }) {
  const classes = useStyle();
  const history = useHistory();

  const handleClick = () => {
    history.push(`/products/${id}`);
  };

  return (
    <Box className={classes.root} onClick={handleClick}>
      <Box className={classes.img}>
        <img src={thumbnailURL(images[0])} alt={name} width="100%" />
      </Box>
      <Box className={classes.bottom}>
        <Typography variant="body2" className={classes.name}>
          {name}
        </Typography>
        <Typography variant="body2" className={classes.price}>
          <Box component="span" fontSize="16px" fontWeight="bold" mr={1}>
            {formatPrice(salePrice)}
          </Box>
          {promotion(promotionPercent)}
        </Typography>
      </Box>
    </Box>
  );
}

export default Product;
