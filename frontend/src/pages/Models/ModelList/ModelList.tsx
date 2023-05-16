import React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import ModelListTable from './ModelListTable';
import './shadow.css';
const PREFIX = 'ModelList';

const classes = {
  model_list_container: `${PREFIX}-model_list_container`
};

const StyledPage = styled(Page)(() => ({
  [`& .${classes.model_list_container}`]: {
    padding: '0 4rem 0 2.1rem'
  }
}));

const ModelList: React.FC = () => {

  return (
    <StyledPage title="Model List | Waterdip">
      <Box>
        <HeaderBreadcrumbs heading="Models" links={[]} action={''} />
      </Box>
      <div className={classes.model_list_container}>
        <ModelListTable />
      </div>
    </StyledPage>
  );
};

export default ModelList;
