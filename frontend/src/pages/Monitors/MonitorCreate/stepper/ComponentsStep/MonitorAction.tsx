import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Autocomplete, Box, TextField } from '@mui/material';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { colors } from '../../../../../theme/colors';
import { useFormikContext } from 'formik';
import { UseGetIntegration } from 'api/integrations/GetIntegrations';

const PREFIX = 'MonitorAction';

const classes = {
  actionInput: `${PREFIX}-actionInput`,
  actionInputTitle: `${PREFIX}-actionInputTitle`,
  actionInputContent: `${PREFIX}-actionInputContent`,
  label: `${PREFIX}-label`,
  desc: `${PREFIX}-desc`,
  select: `${PREFIX}-select`,
  txtInp: `${PREFIX}-txtInp`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(() => ({
  [`& .${classes.actionInput}`]: {
    margin: '0 0 1.8rem 0'
  },

  [`& .${classes.actionInputTitle}`]: {
    fontSize: '.9rem',
    color: colors.text,
    fontWeight: 600,
    marginBottom: '.4rem'
  },

  [`& .${classes.actionInputContent}`]: {
    display: 'flex',
    flexDirection: 'column'
  },

  [`& .${classes.label}`]: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem',
    [`& > input`]: {
      marginRight: '1rem'
    },
    [`& > input + div`]: {
      borderRadius: '4px',
      padding: '0.3rem 0.5rem',
      margin: '0 1rem 0 0',
      color: colors.textLight,
      fontSize: '.75rem',
      fontWeight: 400,
      letterSpacing: '0.05rem',
      cursor: 'pointer',
      transition: 'all 0.15s ease-in-out',
      [`&:hover`]: {
        transform: 'scale(1.05)'
      }
    },
    [`& > input:checked + div`]: {
      fontWeight: 500,
      color: colors.black
    },
    [`& input:checked + .low`]: {
      background: colors.low
    },
    [`& input:checked + .medium`]: {
      background: colors.medium
    },
    [`& input:checked + .high`]: {
      background: colors.high
    }
  },

  [`& .${classes.desc}`]: {
    minWidth: 350,
    maxWidth: 350,
    minHeight: 100,
    fontSize: '.85rem',
    padding: '0.75rem 1.2rem',
    letterSpacing: '0.025rem',
    borderRadius: '4px',
    borderColor: colors.textLight
  },

  [`& .${classes.txtInp}`]: {
    width: '350px',
    transform: 'scale(1,.8)',
    '& .MuiInputBase-input': {
      transform: 'scale(1,1.2)'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderRadius: '4px',
        borderColor: colors.textLight
      },
      '&.Mui-focused fieldset': {
        borderColor: colors.text
      }
    }
  }
}));

const MonitorAction = () => {
  const formikProps = useFormikContext();

  const [monitorName, setmonitorName] = useState<string>();
  const [severityValue, setseverityValue] = useState<string>('MEDIUM');
  const [integrationID, setIntegrationID] = useState<string | null>(null);

  const handleRadioChange = (e: any) => {
    setseverityValue(e.target.value);
  };

  const { data } = UseGetIntegration()
  const integrationList = data?.data || []; 

  useEffect(() => {
    formikProps.setFieldValue('actions.monitor_name', monitorName);
    formikProps.setFieldValue('actions.severity', severityValue);
    formikProps.setFieldValue('actions.integration_id', integrationID)
  }, [monitorName, severityValue, integrationID]);
  return (
    (<Root>
      <Box className={classes.actionInput}>
        <Box className={classes.actionInputTitle}>Severity</Box>
        <Box className={classes.actionInputContent}>
          <label className={classes.label}>
            <input required type="radio" name="severity" value="LOW" id="" onChange={handleRadioChange}/>
            <Box className="low">Low</Box>
          </label>
          <label className={classes.label}>
            <input required defaultChecked type="radio" name="severity" value="MEDIUM" id="" onChange={handleRadioChange}/>
            <Box className="medium">Medium</Box>
          </label>
          <label className={classes.label}>
            <input required type="radio" name="severity" value="HIGH" id="" onChange={handleRadioChange} />
            <Box className="high">High</Box>
          </label>
        </Box>
      </Box>
      <Box className={classes.actionInput}>
        <Box className={classes.actionInputTitle}>Monitor Name</Box>
        <TextField
          required
          placeholder="Eg: Monitor 1"
          className={classes.txtInp}
          onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
            setmonitorName(e.target.value as string);
          }}
        />
      </Box>
      <Box className={classes.actionInput}>
          <Box className={classes.actionInputTitle}>Alerts Integration</Box>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={integrationList}
            onChange={ (e,v) => setIntegrationID(v && v.integration_id ? v.integration_id : null )}
            sx={{ 
              width: 350,
              paddingTop: 2
            }}
            getOptionLabel={(option) => option.app_name}
            renderInput={(params) => <TextField {...params} label="Select Integration" />}
          />
      </Box>
      <Box className={classes.actionInput}>
        <Box className={classes.actionInputTitle}>Description</Box>
        <TextareaAutosize
          aria-label="empty textarea"
          placeholder="Type Here..."
          className={classes.desc} 
        />
      </Box>
    </Root>)
  );
};

export default MonitorAction;
