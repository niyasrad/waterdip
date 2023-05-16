import React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import MonitorListTable from './MonitorListTable';
import { setModelMonitorData } from '../../../redux/slices/ModelMonitorState';
import { useDispatch } from '../../../redux/store';

const PREFIX = 'MonitorList';

const classes = {
  model_list_container: `${PREFIX}-model_list_container`
};

const StyledPage = styled(Page)(() => ({
  [`& .${classes.model_list_container}`]: {
    padding: '0 4rem 0 2.1rem'
  }
}));

const MonitorList: React.FC = () => {

  const dispatch = useDispatch();
  dispatch(setModelMonitorData({ modelID: null, pathLocation: 'monitor' }));
  return (
    <StyledPage title="Monitor List | Waterdip">
      <Box>
        <HeaderBreadcrumbs heading="Monitors" links={[]} action={''} />
      </Box>
      <div className={classes.model_list_container}>
        <MonitorListTable />
      </div>
    </StyledPage>
  );
};

export default MonitorList;
