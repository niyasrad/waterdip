import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Page from '../../../../components/Page';
import LoadingScreen from '../../../../components/LoadingScreen';
import { Box } from '@mui/material';
import { colors } from '../../../../theme/colors';
import { useParams } from 'react-router-dom';
import { useDispatch } from '../../../../redux/store';
import AlertListTable from 'pages/Alerts/AlertListTable';

const PREFIX = 'ModelAlerts';
const classes = {};
const StyledPage = styled(Page)(() => ({}));

const RootStyle = styled('div')({
  overflowY: 'hidden',
  padding: '.5rem 2.4rem',
  background: colors.white
});

const ModelAlerts = () => {

  const { modelId } = useParams();

  const dispatch = useDispatch();

  return (
    <StyledPage title="Model Alert | Waterdip">
      <RootStyle>
        <AlertListTable value="Model" />
      </RootStyle>
    </StyledPage>
  );
};

export default ModelAlerts;
