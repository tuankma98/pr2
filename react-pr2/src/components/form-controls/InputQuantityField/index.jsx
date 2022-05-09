import { Box, Button, FormControl, FormHelperText, Input, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setQuantity } from '../../../store/Slice/cartSlice';

const useStyles = makeStyles((theme) => ({
  root: {},
  box: {
    display: 'flex',
    alignItems: 'center',
    flexFlow: 'row nowrap',
    maxWidth: '250x',
    justifyContent: 'center',
  },
  input: {
    width: '40px',
  },
}));

function InputQuantityField(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { name, label, disabled, id } = props;

  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  const hasError = !!errors[name];

  const handleDecreaseNumber = (name, value) => {
    setValue(name, Number.parseInt(value) ? Number.parseInt(value) - 1 : 1);
    dispatch(
      setQuantity({
        id,
        quantity: value - 1,
      })
    );
  };

  const handleIncreaseNumber = (name, value) => {
    setValue(name, Number.parseInt(value) ? Number.parseInt(value) + 1 : 1);
    dispatch(
      setQuantity({
        id,
        quantity: value + 1,
      })
    );
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value, name } }) => (
        <>
          <FormControl error={hasError} fullWidth margin="normal" variant="outlined" size="small">
            {label && <Typography mb={1}>{label}</Typography>}
            <Box className={classes.box}>
              <Button
                onClick={() => {
                  handleDecreaseNumber(name, value);
                }}
                disabled={value === 1}
              >
                -
              </Button>
              <Input
                id={name}
                error={hasError}
                value={value}
                disabled={disabled}
                onBlur={onBlur}
                onChange={onChange}
                className={classes.input}
              />
              <Button
                onClick={() => {
                  handleIncreaseNumber(name, value);
                }}
              >
                +
              </Button>
            </Box>
          </FormControl>
          <FormHelperText error={hasError} sx={{ textAlign: 'center' }}>
            {errors[name]?.message}
          </FormHelperText>
        </>
      )}
    />
  );
}

export default InputQuantityField;
