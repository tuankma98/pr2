import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import React from 'react';
import { Controller } from 'react-hook-form';

export default function RadioField(props) {
  const { form, name } = props;
  const { control } = form;

  return (
    <FormControl component="fieldset" sx={{ margin: '8px' }}>
      <FormLabel component="legend" id="demo-row-radio-buttons-group-label">
        Gender
      </FormLabel>
      <Controller
        rules={{ required: true }}
        control={control}
        name={name}
        render={({ field }) => {
          return (
            <RadioGroup
              {...field}
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
          );
        }}
      />
    </FormControl>
  );
}
