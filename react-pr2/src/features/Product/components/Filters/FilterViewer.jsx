import { Box, Chip } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row wrap',
    padding: 0,
    alignItems: 'center',
    listStyle: 'none',
    margin: '16px',
    '& > li': {
      pading: '8px',
      margin: 0,
      marginRight: '8px',
    },
  },
}));

const FILTER_LIST = [
  {
    id: 1,
    getLabel: ({ title }) => {
      const { label } = title[0];
      return label;
    },
    isActive: (filters) => filters.isFreeShip,
    isVisible: () => true,
    isRemovable: false,
    onRemove: () => {},
    onToggle: (filters) => {
      const newFilters = { ...filters, _page: 1 };
      if (newFilters.isFreeShip) {
        newFilters.isFreeShip = false;
      } else {
        newFilters.isFreeShip = true;
      }
      return newFilters;
    },
  },
  {
    id: 2,
    getLabel: ({ title }) => {
      const { label } = title[1];
      return label;
    },
    isActive: () => true,
    isVisible: (filters) => filters.isPromotion,
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      newFilters.isPromotion = false;
      return newFilters;
    },
    onToggle: () => {},
  },
  {
    id: 3,
    getLabel: ({ filters, title }) => {
      const { from, to } = title[2];
      return `${from} ${filters.salePrice_gte} ${to} ${filters.salePrice_lte}`;
    },
    isActive: () => true,
    isVisible: (filters) =>
      Number.parseInt(filters.salePrice_gte) > 0 &&
      Number.parseInt(filters.salePrice_lte) > 0 &&
      Object.keys(filters).includes('salePrice_gte') &&
      Object.keys(filters).includes('salePrice_lte'),
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters.salePrice_gte;
      delete newFilters.salePrice_lte;
      return newFilters;
    },
    onToggle: () => {},
  },
  {
    id: 4,
    getLabel: ({ filters }) => `${filters['category.name']}`,
    isActive: () => true,
    isVisible: (filters) => filters['category.name'],
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters['category.name'];
      delete newFilters['categoryId'];
      return newFilters;
    },
    onToggle: () => {},
  },
];
function FilterViewer({ filters = {}, onChange = null }) {
  const { t } = useTranslation();
  const classes = useStyles();
  const visibleFilters = useMemo(() => {
    return FILTER_LIST.filter((filter) => filter.isVisible(filters));
  }, [filters]);

  const title = [
    {
      label: `${t('Free shipping')}`,
    },
    {
      label: `${t('Promotion')}`,
    },
    {
      from: `${t('From')}`,
      to: `${t('To')}`,
    },
  ];

  return (
    <Box component="ul" className={classes.root}>
      {visibleFilters.map((visible) => (
        <li key={visible.id}>
          <Chip
            label={visible.getLabel({ filters, title })}
            color={visible.isActive(filters) ? 'primary' : 'default'}
            clickable={!visible.isRemovable}
            onClick={
              visible.isRemovable
                ? null
                : () => {
                    if (!onChange) return;
                    const newFilters = visible.onToggle(filters);
                    onChange(newFilters);
                  }
            }
            onDelete={
              visible.isRemovable
                ? () => {
                    if (!onChange) return;
                    const newFilters = visible.onRemove(filters);
                    onChange(newFilters);
                  }
                : null
            }
          ></Chip>
        </li>
      ))}
    </Box>
  );
}

export default FilterViewer;
