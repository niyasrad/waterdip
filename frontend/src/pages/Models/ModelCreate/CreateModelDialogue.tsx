import { Box, TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { colors } from '../../../theme/colors';
import { useState } from 'react';
import { UseModelCreate } from '../../../api/models/CreateModel';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { useNavigate } from 'react-router-dom';

const PREFIX = 'CreateModelDialogue';

const classes = {
  addModelDialogue: `${PREFIX}-addModelDialogue`,
  dialogueHeading: `${PREFIX}-dialogueHeading`,
  dialogueInput: `${PREFIX}-dialogueInput`,
  buttonBox: `${PREFIX}-buttonBox`,
  dialogueButton: `${PREFIX}-dialogueButton`
};

const StyledBox = styled(Box)(() => ({
  [`&.${classes.addModelDialogue}`]: {
    padding: '1.6rem'
  },

  [`& .${classes.dialogueHeading}`]: {
    fontSize: '.8rem',
    fontWeight: 500,
    color: colors.text,
    marginBottom: '.5rem'
  },

  [`& .${classes.dialogueInput}`]: {
    transform: 'scale(1,.8)',
    '& .MuiInputBase-input': {
      transform: 'scale(1,1.2)',
      fontSize: '.8rem'
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
  },

  [`& .${classes.buttonBox}`]: { display: 'flex', justifyContent: 'flex-end', marginTop: '.7rem' },

  [`& .${classes.dialogueButton}`]: {
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.01em',
    color: colors.white,
    background: colors.textPrimary,
    boxShadow: '0px 4px 10px rgba(103, 128, 220, 0.24)',
    borderRadius: '4px',
    height: '2.1rem',
    padding: '0rem 1.6rem'
  }
}));

const CreateModelDialogue = ({ handleClick, forceUpdate }: any) => {
  const [model, setModel] = useState('');

  const navigate = useNavigate();

  const addModelName = () => {
    UseModelCreate({ model_name: model });
    navigate(PATH_DASHBOARD.general.models);
    handleClick();
    forceUpdate();
  };
  return (
    <StyledBox className={classes.addModelDialogue}>
      <Box className={classes.dialogueHeading}>Model Name</Box>
      <Box className={classes.dialogueInput}>
        <TextField
          value={model}
          placeholder="Create Model ..."
          sx={{ width: '100%' }}
          onChange={(e: any) => setModel(e.target.value)}
        />
      </Box>
      <Box className={classes.buttonBox}>
        <Button className={classes.dialogueButton} variant="contained" onClick={addModelName}>
          Create Model
        </Button>
      </Box>
    </StyledBox>
  );
};

export default CreateModelDialogue;
