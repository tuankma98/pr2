import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import { useSelector } from 'react-redux';
import { cartItemCountSelector } from '../selectors';
import { useTranslation } from 'react-i18next';

function EnhancedTableHead(props) {
  const { t } = useTranslation();

  const { onSelectAllClick, numSelected, rowCount } = props;
  const cartItemsCount = useSelector(cartItemCountSelector);

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        <TableCell align="left" padding="none">
          {`${t('All')} (${cartItemsCount} ${t('Product')}) `}
        </TableCell>
        <TableCell align="left" padding="normal">
          {t('Unit Price')}
        </TableCell>
        <TableCell align="center" padding="normal">
          {t('Quantity')}
        </TableCell>
        <TableCell align="center" padding="normal">
          {t('Into Money')}
        </TableCell>
        <TableCell align="right" padding="normal">
          {t('Detele')}
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

export default EnhancedTableHead;
