import React,{useState,useEffect} from 'react';
import api from 'api/AxiosConnection'
import { VictoryChart,VictoryLine,VictoryVoronoiContainer } from 'victory';

type allArray=[{
  x:number,
  y:number
}]

function getHourEarly(now:Date){

  let SplitTime=now.toISOString().split('T');
  let Time=SplitTime[1].split(':');

  let FullHourEarly = SplitTime[0]+"-"+(now.getHours()+2)+":"+Time[1];
  return(FullHourEarly)
}

function getToday(now:Date){
  let SplitTime=now.toISOString().split('T');
  let Time=SplitTime[1].split('.');

  let FullToday=SplitTime[0]+"-"+Time[0]
  return FullToday
}

function GraphicPart(){
  const [graphicInfo,setGraphicInfo]=useState([{x:0,y:0}]);
  const [reload,setReload]=useState<boolean>(false)

  useEffect(()=>{
    let now = new Date();
    let aHourEarly=getHourEarly(now)
    let today=getToday(now)
    

    api.get(`https://marketdata.tradermade.com/api/v1/timeseries?currency=GBPUSD&api_key=wPQ2qY07oCIDKLuS7I5p&start_date=${aHourEarly}&end_date=${today}&format=records&interval=minute&period=5`)
    .then(function(data:any){
      let FirstData=data.data.quotes[0]
      let FirstSplitedDate=(FirstData.date.split(" "))
      let FirstRealDate= FirstSplitedDate[1].substring(0,5);
      let all=[{x:FirstRealDate,y:FirstData.close}];
      data.data.quotes.map(function(Data:any,index:number){
        if(index!=0){
          let realdate=((Data.date.split(" ")));
          let FirstRealDate= realdate[1].substring(0,5);
          all.push({x:FirstRealDate,y:Data.close})
        }
      })
      setGraphicInfo(all)
    })
    setTimeout(function(){
      setReload(!reload)
    },1000*60)
  },[reload])

  let a=0
  

    return(
        <div className='GraphicPart'>
        <div className='CurrencyName'>GBP/USD</div>
          <div className='Graphic'>
            <VictoryChart
              width={600}
              containerComponent={
                <VictoryVoronoiContainer
                  labels={({ datum }) => `${datum.y}`}
                />
              }
            >
              <VictoryLine
               style={{
                  data: { stroke: "#c43a31" },
                  parent: { border: "1px solid #ccc"}
                }}
                data={graphicInfo}
              />
            </VictoryChart>
          </div>
        </div>
    )
}

export default GraphicPart