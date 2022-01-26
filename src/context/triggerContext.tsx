import { createContext,useContext } from "react";
export type TriggerContent={
    trigger:boolean,
    setTrigger:(c:boolean)=>void
}
export const TriggerContext=createContext<TriggerContent>({
    trigger:false,
    setTrigger:()=>{},
})
export const useTriggerContext =()=>useContext(TriggerContext)