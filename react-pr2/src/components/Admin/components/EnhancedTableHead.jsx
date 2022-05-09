import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import { useTranslation } from 'react-i18next';

function EnhancedTableHead(props) {
  const { t } = useTranslation();

  const { onSelectAllClick, numSelected, rowCount } = props;

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
          {`${t('All')} (${rowCount} ${t('Product')}) `}
        </TableCell>
        <TableCell align="left" padding="normal">
          {t('salePrice')}
        </TableCell>
        <TableCell align="center" padding="normal">
          {t('promotionPercent')}
        </TableCell>
        <TableCell align="center" padding="normal">
          {t('Edit')}
        </TableCell>
        <TableCell align="right" padding="normal">
          {t('Detele')}
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

export default EnhancedTableHead;
