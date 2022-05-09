import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Paper,
  Rating,
  TextField,
  Typography,
} from '@mui/material';
import { blue } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';

import React, { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '32px',
  },
  card: {
    padding: '0 16px',
  },
  title: {
    color: blue[700],
    textDecoration: 'underline',
    paddingBottom: '24px',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  avatar: {
    backgroundColor: blue[300],
  },
  left: {
    width: '500px',
  },
  right: {
    flex: '1 1 0',
    paddingLeft: '16px',
  },
}));

const ProductReviews = () => {
  const classes = useStyles();
  const [value, setValue] = useState(2);
  return (
    <Paper elevation={0} className={classes.root}>
      <Box>
        <Typography component="h4" className={classes.title}>
          Các bình luận
        </Typography>
      </Box>
      <Box>
        <Grid container>
          <Grid item className={classes.left}>
            <Card className={classes.card}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    R
                  </Avatar>
                }
                title="Shrimp and Chorizo Paella"
                subheader="March 14, 2022"
              />
              <CardContent>
                <Rating name="read-only" value={3.5} precision={0.5} readOnly />

                <Typography variant="body2" color="textSecondary" component="p">
                  Sản phẩm tốt!
                </Typography>
              </CardContent>
            </Card>
            <Card className={classes.card}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    A
                  </Avatar>
                }
                title="John Cenaaa"
                subheader="March 14, 2022"
              />
              <CardContent>
                <Rating name="read-only" value={4.5} precision={0.5} readOnly />
                <Typography variant="body2" color="textSecondary" component="p">
                  Ờ mây zing! Gút chóp sốp!
                </Typography>
              </CardContent>
            </Card>
            <Card className={classes.card}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    NTA
                  </Avatar>
                }
                title="Mr.Sang"
                subheader="March 14, 2022"
              />
              <CardContent>
                <Rating name="read-only" value={5} precision={0.5} readOnly />
                <Typography variant="body2" color="textSecondary" component="p">
                  Trời ơi! Tuyệt vời ông mặt trời!
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item className={classes.right}>
            <Typography component="h4" variant="h5">
              Thêm đánh giá
            </Typography>
            <Box>
              <form className={classes.root} noValidate autoComplete="off">
                <TextField id="outlined-basic" label="Name*" variant="outlined" fullWidth size="small" />
                <TextField
                  id="outlined-basic"
                  label="Email*"
                  variant="outlined"
                  fullWidth
                  size="small"
                  style={{ marginTop: '15px' }}
                />
                <Box>
                  <Typography variant="h6">Đánh giá:</Typography>
                  <Rating
                    name="hover-feedback"
                    value={value}
                    precision={0.5}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                  />
                </Box>
                <TextField
                  id="outlined-multiline-static"
                  label="Bình luận"
                  multiline
                  rows={4}
                  defaultValue=""
                  fullWidth
                  variant="outlined"
                  style={{ marginTop: '15px' }}
                />
                <Button variant="contained" color="primary" style={{ marginTop: '15px' }}>
                  Xác nhận
                </Button>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default ProductReviews;
