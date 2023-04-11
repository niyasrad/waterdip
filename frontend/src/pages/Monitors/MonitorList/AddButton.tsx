import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { DialogAnimate } from '../../../components/animate';
import { Box, Button } from '@mui/material';
import { Grid } from '@mui/material';
import { colors } from '../../../theme/colors';
import MonitorAddDialog from './MonitorAddDialog';

const PREFIX = 'AddButton';

const classes = {
  button_add: `${PREFIX}-button_add`
};

const StyledBox = styled(Box)(() => ({
  [`& .${classes.button_add}`]: {
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.01em',
    color: colors.white,
    background: colors.textPrimary,
    boxShadow: '0px 4px 10px rgba(103, 128, 220, 0.24)',
    borderRadius: '4px',
    height: '40px',
    padding: '0rem 2.4rem'
  }
}));

const DialogBox = (props: any) => {

  const [boxDisplay, setBoxDisplay] = useState(true);

  return (
    <StyledBox>
      {boxDisplay === true ? (
        <>
          <MonitorAddDialog close={props.close}/>
        </>
      ) : null}
    </StyledBox>
  );
};

const AddButton = () => {

  const [expandForm, setExpandForm] = useState(false);
  return (
    <StyledBox>
      <Button
        className={classes.button_add}
        variant="contained"
        onClick={() => setExpandForm((state) => !state)}
      >
        Create Monitor
      </Button>
      <DialogAnimate maxWidth="sm" open={expandForm} onClose={() => setExpandForm(false)}>
        <DialogBox close={() => setExpandForm(false)}/>
      </DialogAnimate>
    </StyledBox>
  );
};

export default AddButton;
