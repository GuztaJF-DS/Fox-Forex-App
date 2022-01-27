import { createContext,useContext } from "react";
export type TriggerStateContent={
    triggerState:boolean,
    setTriggerState:(c:boolean)=>void
}
export const TriggerStateContext=createContext<TriggerStateContent>({
    triggerState:false,
    setTriggerState:()=>{},
})
export const useTriggerStateContext =()=>useContext(TriggerStateContext)