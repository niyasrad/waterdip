import React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { useDispatch } from '../../redux/store';
import AlertListTable from './AlertListTable';

const PREFIX = 'AlertList';

const classes = {
  model_list_container: `${PREFIX}-model_list_container`
};

const StyledPage = styled(Page)(() => ({
  [`& .${classes.model_list_container}`]: {
    padding: '0 4rem 0 2.1rem'
  }
}));

const AlertList: React.FC = () => {

  const dispatch = useDispatch();
  return (
    <StyledPage title="Alerts List | Waterdip">
      <Box>
        <HeaderBreadcrumbs heading="Alerts" links={[]} action={''} />
      </Box>
      <div className={classes.model_list_container}>
        <AlertListTable value="Not Model" />
      </div>
    </StyledPage>
  );
};

export default AlertList;
