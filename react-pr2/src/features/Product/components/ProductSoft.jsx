import { Tab, Tabs } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  root: {
    borderBottom: `1px solid ${grey[200]}`,
  },
  hover: {
    '&:hover': {
      color: `${blue[500]}`,
      borderBottom: `2px solid ${blue[700]}`,
    },
  },
}));

function ProductSoft({ currentSoft, onChange }) {
  const classes = useStyles();
  const { t } = useTranslation();

  const handleSortChange = (e, newValue) => {
    if (onChange) onChange(newValue);
  };

  return (
    <Tabs value={currentSoft} onChange={handleSortChange} aria-label="disabled tabs example" className={classes.root}>
      <Tab label={t('Price low to high')} value="asc" className={classes.hover}></Tab>
      <Tab label={t('Price high to low')} value="desc" className={classes.hover}></Tab>
    </Tabs>
  );
}

export default ProductSoft;
