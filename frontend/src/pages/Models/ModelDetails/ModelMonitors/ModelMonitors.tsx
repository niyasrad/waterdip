import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Page from '../../../../components/Page';
import LoadingScreen from '../../../../components/LoadingScreen';
import { Box } from '@mui/material';
import { colors } from '../../../../theme/colors';
import MonitorListTable from '../../../Monitors/MonitorList/MonitorListTable';
import { useParams } from 'react-router-dom';
import { setModelMonitorData } from '../../../../redux/slices/ModelMonitorState';
import { useDispatch } from '../../../../redux/store';

const PREFIX = 'ModelMonitors';
const classes = {};
const StyledPage = styled(Page)(() => ({}));

const RootStyle = styled('div')({
  overflowY: 'hidden',
  padding: '.7rem 2.4rem',
  background: colors.white
});

const ModelMonitors = () => {

  const { modelId } = useParams();

  const dispatch = useDispatch();
  dispatch(setModelMonitorData({ modelID: modelId, pathLocation: 'model' }));

  return (
    <StyledPage title="Model Monitor | Waterdip">
      <RootStyle>
        <MonitorListTable model_id={ modelId }/>
      </RootStyle>
    </StyledPage>
  );
};

export default ModelMonitors;
