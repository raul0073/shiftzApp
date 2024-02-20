'use client'
import { Wizard } from 'react-use-wizard';
import Step2 from './Step2';
import Step3 from './Step3';
import Step1 from './Step1';

export const WizardComp = ({id}:{id:string}) => {
  
  return (
  <section className="w-[90%] h-[60vh] mx-auto flex justify-center items-center">
  <Wizard>
    <Step1 />
    <Step2 />
    <Step3 id={id}/>
  </Wizard>

  </section>
  )
}

