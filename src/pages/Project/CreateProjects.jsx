import React from "react";
import StepOne from "./Steps/StepOne";
import StepTwo from "./Steps/StepTwo";
import StepThree from "./Steps/StepThree";
import StepFour from "./Steps/StepFour";
import ManualPrompt from "./ManualPrompt.json"

export default () => {
 
    const [step, setStep] = React.useState({
      step: 1,
      parent: ""
    });
    const configStep = `step-${step.step}`;

  const config = {
    "step-1": {
      ...ManualPrompt["step-1"],
      component: StepOne,      
    },
    "step-2":{
        ...ManualPrompt["step-2"],
        component: StepTwo,
    },
    "step-3":{
        ...ManualPrompt["step-3"],
        component: StepThree,
    },
    "step-4":{
      ...ManualPrompt["step-4"],
      component: StepFour
    }
  };

  console.log(typeof(`w-${(step.step)}/6`));


  return (
    <div
      className="flex h-screen w-screen items-center justify-center"
      style={{
        backgroundImage:
          "url(https://img.freepik.com/free-vector/blue-pink-halftone-background_53876-99004.jpg?w=2000)",
      }}
    >
      <div className="relative flex w-[40rem] flex-col justify-center overflow-hidden rounded-lg bg-white/50 py-32">
        <span style={{width: `${((step.step)/6)*100}%`}} className={"absolute top-0 h-1 bg-blue-600"}></span>
        {React.createElement(config[configStep].component, {
            data: config[configStep].data,
            step: step,
            setStep: setStep,
            })
        }
      </div>
    </div>
  );
};
