import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { Box, Button, FormControl, FormHelperText, Input, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { Controller } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
  root: {},
  box: {
    display: 'flex',
    alignItems: 'center',
    flexFlow: 'row nowrap',
    maxWidth: '200px',
  },
  input: {
    width: '40px',
    height: '36px',
    textAlign: 'center',
  },
}));

function QuantityField(props) {
  const classes = useStyles();
  const { form, name, label, disabled } = props;
  const {
    control,
    setValue,
    formState: { errors },
  } = form;

  const hasError = !!errors[name];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value, name } }) => (
        <>
          <FormControl error={hasError} fullWidth margin="normal" variant="outlined" size="small">
            <Typography mb={1}>{label}</Typography>
            <Box className={classes.box}>
              <Button disabled={value === 1}>
                <RemoveCircleOutline
                  onClick={() => setValue(name, Number.parseInt(value) ? Number.parseInt(value) - 1 : 1)}
                />
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
              <Button>
                <AddCircleOutline
                  onClick={() => setValue(name, Number.parseInt(value) ? Number.parseInt(value) + 1 : 1)}
                />
              </Button>
            </Box>
          </FormControl>
          <FormHelperText error={hasError} sx={{ paddingLeft: '32px' }}>
            {errors[name]?.message}
          </FormHelperText>
        </>
      )}
    />
  );
}

export default QuantityField;
