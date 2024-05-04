import { Theme } from '@/src/app/theme';
import { useAppSelector } from '@/src/lib/RThooks';
import { selectCardData } from '@/src/lib/feature/businessCardDataSlice';
import { selectFormData } from '@/src/lib/feature/formDataSlice';
import { saveFormData } from '@/src/lib/handleData';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Dispatch, SetStateAction, useState } from 'react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
  },
});

export default function HorizontalLinearStepper({
  steps,
  activeStep,
  setActiveStep,
}: {
  steps: string[];
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
}) {
  const data = useAppSelector(selectCardData);
  const formData = useAppSelector(selectFormData);
  const [errorMessage, setErrorMessage] = useState('');
  const handleNext = () => {
    switch (activeStep) {
      case 0:
        if (data.id && data.cardType) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
          setErrorMessage('');
        } else {
          setErrorMessage('請點選下方的選取按鈕，選取想要的卡片');
        }
        break;

      case 1:
        if (data.submitStatus) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
          setErrorMessage('');
        } else {
          setErrorMessage('請將表單填寫完並且儲存');
        }
        break;

      case 3:
        console.log('完成表單');
        console.log(formData);
        const formDataObject = {
          formData: formData,
        };
        saveFormData(formDataObject);

      default:
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    // if(activeStep === 0 && data.id && data.cardType ){
    //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: '100%', margin: '50px auto' }}>
        {/* 步驟 */}
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};

            if (index === 0) {
              return (
                <Step key={label} {...stepProps} sx={{ paddingLeft: '0px' }}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            } else {
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            }
          })}
        </Stepper>

        {/* 完成後 應該為自動前往blog*/}
        {activeStep === steps.length ? (
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>
              完成所有表單填寫，去看看最終成果吧！！
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={() => {}}>Go to my blog</Button>
            </Box>
          </>
        ) : (
          <>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                pt: 2,
                alignItems: 'center',
              }}
            >
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1, color: 'black' }}
              >
                Back
              </Button>
              <Box
                sx={{
                  flex: '1 1 auto',
                  color: Theme.errorRed,
                  textAlign: 'center',
                  alignItems: 'center',
                }}
              >
                {errorMessage}
              </Box>
              <Button onClick={handleNext} sx={{ color: 'black' }}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </ThemeProvider>
  );
}
