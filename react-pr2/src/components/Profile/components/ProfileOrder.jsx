import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AllOrders from './Orders/AllOrders';
import CencelOrders from './Orders/CencelOrders';
import DoneOrders from './Orders/DoneOrders';
import PendingOrders from './Orders/PendingOrders';

const useStyles = makeStyles((theme) => ({
  tabs: {
    display: 'flex',
    justifyContent: 'center',
    background: '#ffffff',
  },
}));

function ProfileOrder(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography>Đơn hàng của tôi</Typography>
      <TabContext value={value}>
        <Box sx={{ marginTop: '16px', borderColor: 'divider' }} className={classes.tabs}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label={t('Tất cả đơn')} value="1" />
            <Tab label={t('Đang xử lý')} value="2" />
            <Tab label={t('Đã giao')} value="3" />
            <Tab label={t('Đã huỷ')} value="4" />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{ padding: 0, marginTop: '12px' }}>
          <AllOrders />
        </TabPanel>
        <TabPanel value="2" sx={{ padding: 0, marginTop: '12px' }}>
          <PendingOrders />
        </TabPanel>
        <TabPanel value="3" sx={{ padding: 0, marginTop: '12px' }}>
          <DoneOrders />
        </TabPanel>
        <TabPanel value="4" sx={{ padding: 0, marginTop: '12px' }}>
          <CencelOrders />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default ProfileOrder;
