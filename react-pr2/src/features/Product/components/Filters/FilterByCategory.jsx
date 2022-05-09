import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { themeStyle } from '../../../../utils/utils';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '16px',
  },
  menu: {
    padding: 0,
    margin: 0,
    listStyleType: 'none',
    '& > li': {
      marginTop: '8px',
      transition: 'all 0.25s',
      '&:hover': {
        color: themeStyle.blueColor,
        cursor: 'pointer',
      },
    },
  },
}));

function FilterByCategory({ onChange }) {
  const classes = useStyles();
  const { t } = useTranslation();
  const { category } = useSelector((state) => state.categories);

  const handleCategoryClick = (category) => {
    onChange && onChange(category);
  };

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">{t('Product category')}</Typography>
      <ul className={classes.menu}>
        {category.map((item) => (
          <li key={item.id} onClick={() => handleCategoryClick(item)}>
            <Typography variant="body2">{item.name}</Typography>
          </li>
        ))}
      </ul>
    </Box>
  );
}

export default FilterByCategory;
