import React from "react";
import StepOne from "./Steps/StepOne";
import StepTwo from "./Steps/StepTwo";
import StepThree from "./Steps/StepThree";
import ManualPrompt from "./ManualPrompt.json"

export default () => {
 
    const [step, setStep] = React.useState(1);
    const configStep = `step-${step}`;
    const [parent, setParent] = React.useState(null);

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
  };

  return (
    <div
      className="flex h-screen w-screen items-center justify-center"
      style={{
        backgroundImage:
          "url(https://img.freepik.com/free-vector/blue-pink-halftone-background_53876-99004.jpg?w=2000)",
      }}
    >
      <div className="relative flex w-[40rem] flex-col justify-center overflow-hidden rounded-lg bg-white/50 py-32">
        <span className={`absolute top-0 h-1 w-${step.toString()}/6 bg-blue-600`}></span>
        {React.createElement(config[configStep].component, {
            data: config[configStep].data,
            step: step,
            setStep: setStep,
            parent: parent,
            setParent: setParent,
            })
        }
      </div>
    </div>
  );
};
