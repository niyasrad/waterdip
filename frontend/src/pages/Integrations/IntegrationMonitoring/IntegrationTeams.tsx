import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import { Box, Button, TextField, Grow } from '@mui/material';
import { colors } from "theme/colors";
import { UseIntegrationAdd } from "api/integrations/AddIntegration";
import { useSnackbar } from "notistack";

const PREFIX = 'IntegrationTeams';

const classes = {
  root: `${PREFIX}-root`,
  list: `${PREFIX}-list`,
  buttonContainer: `${PREFIX}-buttonContainer`,
  actionInput: `${PREFIX}-actionInput`,
  actionInputTitle: `${PREFIX}-actionInputTitle`,
  actionInputContent: `${PREFIX}-actionInputContent`,
  label: `${PREFIX}-label`,
  txtInp: `${PREFIX}-txtInp`
};

const Root = styled('div')({
  [`&.${classes.root}`]: {
    width: "100%",
    minHeight: "400px",
    paddingTop: "25px",
    margin: "15px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  [`& .${classes.list}`]: {
    maxWidth: "450px",
  },
  [`& .${classes.buttonContainer}`]: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "25px",
  },
  [`& .${classes.actionInput}`]: {
    margin: "0 0 1.2rem 0",
  },
  [`& .${classes.actionInputTitle}`]: {
    fontSize: ".9rem",
    color: colors.text,
    fontWeight: 600,
    marginBottom: ".4rem",
  },
  [`& .${classes.actionInputContent}`]: {
    display: "flex",
    flexDirection: "column",
  },
  [`& .${classes.label}`]: {
    display: "flex",
    alignItems: "center",
    marginBottom: "1rem",
    [`& > input`]: {
      marginRight: "1rem",
    },
    [`& > input + div`]: {
      borderRadius: "4px",
      padding: "0.3rem 0.5rem",
      margin: "0 1rem 0 0",
      color: colors.textLight,
      fontSize: ".75rem",
      fontWeight: 400,
      letterSpacing: "0.05rem",
      cursor: "pointer",
      transition: "all 0.15s ease-in-out",
      [`&:hover`]: {
        transform: "scale(1.05)",
      },
    },
    [`& > input:checked + div`]: {
      fontWeight: 500,
      color: colors.black,
    },
    [`& input:checked + .low`]: {
      background: colors.low,
    },
    [`& input:checked + .medium`]: {
      background: colors.medium,
    },
    [`& input:checked + .high`]: {
      background: colors.high,
    },
  },
  [`& .${classes.txtInp}`]: {
    width: "350px",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: "4px",
        borderColor: colors.textLight,
      },
      "&.Mui-focused fieldset": {
        borderColor: colors.text,
      },
    },
  },
});

export default function IntegrationTeams({ done }: { done: any }) {


  const { enqueueSnackbar } = useSnackbar()
  const [adding, setAdding] = useState<boolean>(false)
  
  const [formErrors, setFormErrors] = useState<any>({
    appName: false,
    webhookUrl: false
  });

  interface formDataProps {
    [key: string]: string;
  } 
  const [formData, setFormData] = useState<formDataProps>({
    appName: '',
    webhookUrl: ''
  })


  const handleSubmit = () => {

    let hasErrors = false;
    const newFormErrors = { ...formErrors };

    Object.entries(formData).forEach(([fieldName, fieldValue]) => {
      if (fieldValue.trim() === "") {
        newFormErrors[fieldName] = true;
        hasErrors = true;
      } else {
        newFormErrors[fieldName] = false;
      }
    });

    if (hasErrors) {
      setFormErrors(newFormErrors)
      return
    }
    setAdding(true)
    try {
      UseIntegrationAdd({
        integration: "MONITORING",
        app_name: formData.appName,
        configuration: {
          type: "TEAMS",
          webhook_url: formData.webhookUrl,
        }
      })
      .then((res) => {
        enqueueSnackbar(`Integration created sucessfully!`, { variant: 'success' })
        setAdding(false)
        done.update(null)
      })
      .catch((err) => {
        enqueueSnackbar(`Something went wrong!`, { variant: 'error' })
        setAdding(false)
      })
      .finally(() => {
        setAdding(false)
      })
    } catch (err) {
      enqueueSnackbar(`Something went wrong!`, { variant: 'error' })
      setAdding(false)
      done.update(null)
    }
    
  };

  const handleCancel = () => {
    done.update(null)
  };

  const fields = [
    { id: 1, name: 'appName', label: "App Name", errorMessage: "Please fill the App Name!"},
    { id: 2, name: 'webhookUrl', label: "Webhook URL", errorMessage: "Please fill the Webhook URL!" }
  ];

  return (
    <Root className={classes.root}>
      <div>
      {fields.map((field) => (
        <Grow in={true} key={field.id} timeout={400}>
          <Box className={classes.actionInput}>
            <Box className={classes.actionInputTitle}>{field.label}</Box>
            <TextField
              className={classes.txtInp}
              fullWidth
              required
              size="small"
              error={formErrors[field.name]}
              helperText={formErrors[field.name] && field.errorMessage}
              value={formData[field.name]}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  [field.name]: e.target.value,
                }))
                setFormErrors((prevFormErrors: any) => ({
                  ...prevFormErrors,
                  [field.name]: false,
                }))
              }}
            />
          </Box>
        </Grow>
      ))}
      </div>
      <div className={classes.buttonContainer}>
      <Button
          sx={{
            width: "130px",
            height: "40px",

            borderColor: "#6780DC",
            borderRadius: "4px",
          }}
          variant="contained"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          sx={{
            width: "130px",
            height: "40px",
            background: "#6780DC",
            boxShadow: "0px 4px 10px rgba(103, 128, 220, 0.24)",
            borderRadius: "4px",
          }}
          variant="contained"
          onClick={adding ? () => {}: handleSubmit}
        >
          Save
        </Button>
      </div>
    </Root>
  );
}
