import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import queryString from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMiniCartClick } from '../../../../store/Slice/cartSlice';
import { getCategoryItem } from '../../../../store/Slice/categorySlice';

export default function DetailBreadcrumb({ name, categoryId }) {
  const history = useHistory();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { id, name: nameLink } = useSelector((state) => state.categories.categoryItem);

  useEffect(() => {
    categoryId && dispatch(getCategoryItem(categoryId));
  }, [categoryId, dispatch]);

  function handleClickHome(event) {
    event.preventDefault();
    history.push('/');
    dispatch(toggleMiniCartClick(false));
  }

  function handleClickName(event) {
    event.preventDefault();
    const filters = {
      _limit: 12,
      _page: 1,
      _sort: 'salePrice',
      _order: 'asc',
      categoryId: id,
      'category.name': `${nameLink}`,
    };
    const params = queryString.stringify(filters);
    history.push(`/?${params}`);
    dispatch(toggleMiniCartClick(false));
  }

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="" onClick={handleClickHome}>
      {t('Home')}
    </Link>,
    <Link underline="hover" key="3" color="inherit" href="" onClick={handleClickName}>
      {nameLink}
    </Link>,
    <Typography key="4" color="text.primary">
      {name}
    </Typography>,
  ];

  return (
    <Stack p={1.5}>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
}
