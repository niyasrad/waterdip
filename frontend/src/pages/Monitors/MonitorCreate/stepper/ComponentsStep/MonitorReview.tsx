import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, TextareaAutosize, TextField } from '@mui/material';
import { colors } from '../../../../../theme/colors';
import { useFormikContext } from 'formik';

const PREFIX = 'MonitorReview';

const classes = {
  reviewInput: `${PREFIX}-reviewInput`,
  reviewInputTitle: `${PREFIX}-reviewInputTitle`,
  reviewInputContent: `${PREFIX}-reviewInputContent`,
  label: `${PREFIX}-label`,
  desc: `${PREFIX}-desc`,
  txtInp: `${PREFIX}-txtInp`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')(() => ({
  [`& .${classes.reviewInput}`]: {
    margin: '0 0 1.8rem 0'
  },

  [`& .${classes.reviewInputTitle}`]: {
    fontSize: '.9rem',
    color: colors.text,
    fontWeight: 600,
    marginBottom: '.4rem'
  },

  [`& .${classes.reviewInputContent}`]: {
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

const MonitorReview = (props: any) => {
  const formikProps = useFormikContext();
  const { values }: any = formikProps;

  return (
    (<Root>
      <Box className={classes.reviewInput}>
        <Box className={classes.reviewInputTitle}>Monitor Name</Box>
        <TextField
          placeholder={values.actions.monitor_name}
          className={classes.txtInp}
          disabled={true}
        />
      </Box>
      <Box className={classes.reviewInput}>
        <Box className={classes.reviewInputTitle}>Severity</Box>
        <TextField
          placeholder={values.actions.severity}
          className={classes.txtInp}
          disabled={true}
        />
      </Box>
      {props.monitorType !== 'Model Performance' && (
          <Box className={classes.reviewInput}>
          <Box className={classes.reviewInputTitle}>Dimension</Box>
          {values.monitor_condition.dimensions.features.length !== 0 &&
            <TextField
              placeholder={values.monitor_condition.dimensions.features.map((dimension: string) => ""+dimension)}
              className={classes.txtInp}
              disabled={true}
            />
          } 
          {values.monitor_condition.dimensions.predictions.length !== 0 &&
            <TextField
              placeholder={values.monitor_condition.dimensions.predictions.map((dimension: string) => ""+dimension)}
              className={classes.txtInp}
              disabled={true}
            />
          } 
          
        </Box>
      )}
      {props.monitorType === 'Model Performance' && (
          <Box className={classes.reviewInput}>
          <Box className={classes.reviewInputTitle}>Performance Threshold</Box>
          <TextField
            placeholder={values.monitor_condition.threshold.threshold + " than "+ values.monitor_condition.threshold.value}
            className={classes.txtInp}
            disabled={true}
          />
        </Box>
      )}
      {props.monitorType === 'Drift' && (
          <Box className={classes.reviewInput}>
          <Box className={classes.reviewInputTitle}>Drift Threshold</Box>
          <TextField
            placeholder={values.monitor_condition.threshold.threshold + " than "+ values.monitor_condition.threshold.value}
            className={classes.txtInp}
            disabled={true}
          />
        </Box>
      )}
      {props.monitorType === 'Data Quality' && (
          <Box className={classes.reviewInput}>
          <Box className={classes.reviewInputTitle}>Metric Threshold</Box>
          <TextField
            placeholder={values.monitor_condition.threshold.threshold + " than "+ values.monitor_condition.threshold.value}
            className={classes.txtInp}
            disabled={true}
          />
        </Box>
      )}
      <Box className={classes.reviewInput}>
        <Box className={classes.reviewInputTitle}>Evaluation Metric</Box>
        <TextField
          placeholder={values.monitor_condition.evaluation_metric}
          className={classes.txtInp}
          disabled={true}
        />
      </Box>
      <Box className={classes.reviewInput}>
        <Box className={classes.reviewInputTitle}>Evaluation Window</Box>
        <TextField
          placeholder={values.monitor_condition.evaluation_window}
          className={classes.txtInp}
          disabled={true}
        />
      </Box>
    </Root>)
  );
};

export default MonitorReview;
