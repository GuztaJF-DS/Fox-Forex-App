import { createContext,useContext } from "react";
export type ProfitContent={
    profitValues:{
        FinalProfit:number;
        PipQtd: number;
        PipPrice: number;
    },
    setProfitValues:(c:{
        FinalProfit:number;
        PipQtd: number;
        PipPrice: number;
    })=>void
}
export const ProfitContext=createContext<ProfitContent>({
    profitValues:{
        FinalProfit:0,
        PipQtd: 0,
        PipPrice: 0
    },
    setProfitValues:()=>{},
})
export const useProfitContext=()=>useContext(ProfitContext)