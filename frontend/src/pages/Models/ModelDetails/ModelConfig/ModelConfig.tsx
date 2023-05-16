import Page from '../../../../components/Page';
import { styled } from '@mui/material/styles';
import LoadingScreen from '../../../../components/LoadingScreen';
import { Box } from '@mui/material';
import { Heading } from '../../../../components/Heading';
import { ConfigBaseLine, ConfigEvaluation, ConfigAdvanced } from './ConfigCards';
import { useLocation } from 'react-router-dom';
import { colors } from '../../../../theme/colors';

const PREFIX = 'ModelConfiguration';
const classes = {};
const StyledPage = styled(Page)(() => ({}));

const RootStyle = styled('div')({
  overflowY: 'hidden',
  padding: '1.6rem 2.4rem',
  background: colors.white
});

const ModelConfiguration = (configuration_data: any) => {

  const location = useLocation();
  const data = location.state === null ? false : true;

  return (
    <StyledPage title="Model Configruration | Waterdip">
      <RootStyle>
        <Box>
          <ConfigBaseLine path={data} data={configuration_data}/>
          <ConfigEvaluation data={configuration_data}/>
          <ConfigAdvanced />
        </Box>
      </RootStyle>
    </StyledPage>
  );
};

export default ModelConfiguration;
