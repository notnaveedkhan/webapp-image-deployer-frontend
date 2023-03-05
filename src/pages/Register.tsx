import { Box, Button, Center, Text } from "@chakra-ui/react";
import { Step,Steps,useSteps} from 'chakra-ui-steps';

export default function Register() {
    const {nextStep,prevStep,activeStep,reset,setStep } = useSteps({
        initialStep:0
    })
    
    interface StepData{
        label: string,
        key:string
    }
    const steps: StepData[] = [
        {
            label: "Persobal Information",
            key:"1"
        },
        {
            label: "Bank Information",
            key:"2"
        },
        {
            label: "Study Information",
            key:"3"
        },
        {
            label: "Address Information",
            key:"4"
        },
        {
            label: "Carrer Information",
            key:"5"
        }
    ]

  return (
      <Box w={"100%"} minH={"100vh"}>
          <Steps activeStep={activeStep}>
              {steps.map(({label,key},index) => {
                  return <Step onClick={()=>setStep(index+1)} key={key} label={label}>
                      <Box
                          display={"flex"}
                          w="100%"
                          alignItems={"center"}
                          justifyContent="center"
                  >{`Step ${index + 1}`}</Box></Step>
              })}
          </Steps>
          <Center>
              <Button onClick={nextStep} colorScheme={"linkedin"}>Next</Button>
          </Center>
      </Box>
  )
}
