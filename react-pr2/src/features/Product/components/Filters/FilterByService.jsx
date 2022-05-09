import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { themeStyle } from '../../../../utils/utils';

const useStyles = makeStyles((theme) => ({
  root: {
    borderTop: `1px solid ${themeStyle.grayColor}`,
    padding: '16px',
  },
  listService: {
    padding: 0,
    margin: 0,
    listStyleType: 'none',
    '& > li': {
      margin: 0,
    },
  },
}));

function FilterByService({ filters = {}, onChange }) {
  const { t } = useTranslation();
  const classes = useStyles();

  const handleChange = (e) => {
    if (!onChange) return;

    const { name, checked } = e.target;
    onChange({ [name]: checked });
  };

  const services = [
    { value: 'isPromotion', label: `${t('Promotion')}` },
    { value: 'isFreeShip', label: `${t('Free shipping')}` },
  ];

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">{t('Service')}</Typography>

      <ul className={classes.listService}>
        {services.map((service) => (
          <li key={service.value}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={Boolean(filters[service.value])}
                  onChange={handleChange}
                  inputProps={{ 'aria-label': 'controlled' }}
                  name={service.value}
                />
              }
              label={service.label}
            />
          </li>
        ))}
      </ul>
    </Box>
  );
}

export default FilterByService;
