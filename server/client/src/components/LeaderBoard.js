

import React from "react";
import {useState, useEffect,useContext} from 'react'
import { AppContext } from '../App';
import { TeamContext } from "./Team";
import { Chart } from "react-google-charts";
import { Typography } from "@mui/material";
import Box from '@mui/material/Box';


// const data = [
//     { assignee_id: 1, tl_id: 1, username: 'A', sum: '2' },
//     { assignee_id: 2, tl_id: 1, username: 'C', sum: '1' },
//     { assignee_id: 3, tl_id: 1, username: 'E', sum: '5' },
//     { assignee_id: 4, tl_id: 1, username: 'G', sum: '1' }
//     ]
 
;

const LeaderBoard = (props) => {
    const {teamId,tLId,lBlistener}=useContext(AppContext)

    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(()=>{
        fetch (`/leaderboard/${teamId}`)
        .then(res=>{
            if(res.status == 200) {
                return res.json()
            }
        }
            )
        .then(data=>{
            
            console.log(data)
            setLeaderboard(data)

            
            // leaderboard.map((i)=>Number(i.sum))
            
        })
        .catch(e=>{console.log(e)})
    },[])

    useEffect(()=>{
        fetch (`/leaderboard/${teamId}`)
        .then(res=>{
            if(res.status == 200) {
                return res.json()
            }
        }
            )
        .then(data=>{
            
            console.log(data)
            setLeaderboard(data)

            
            // leaderboard.map((i)=>Number(i.sum))
            
        })
        .catch(e=>{console.log(e)})
    },[lBlistener, tLId])
    //add condition to update leaderboard when task status changes to done
        if (leaderboard) {leaderboard.sort((a,b)=>Number(b.sum) - Number(a.sum))
            console.log(leaderboard)}

    const options = {
        // title: "Leaderboard",
        width: 'auto',
        height: 400,
        bar: { groupWidth: "95%" },
        legend: { position: "none" },
        hAxis: { title: "score", },
        vAxis: { title: "username"},
      };
    let dataToShow = [['username', 'score']];

    let refactoredData = leaderboard.map((item)=> {
        return(
            [item.email, Number(item.sum)]
        )
    })
    console.log(refactoredData)
    
    dataToShow.push(...refactoredData)
    // dataToShow = {...dataToShow}
    console.log(dataToShow)
    if (leaderboard.length<0) {
        return (
            <Typography sx={{ mt: 4, mb: 2 }} variant="h5">Once you have accomplished tasks, you'll see your team champion</Typography>
        )
    } else {
        
    }
  return (
    
    <Box >
    <Typography sx={{ mt: 4, mb: 2 }} variant="h5">Team champion:</Typography>
    <Box sx={{boxShadow: 2, marginTop:2 }}>
        <Chart
            
            chartType="BarChart"
            // width="100%"
            // height="400px"
            data={dataToShow}
        //   columns={dataToShow[0]}
        //   rows={dataToShow[1]}
            options={options}/>
    </Box>
    
</Box>
    
    
   
    

  );
}

export default LeaderBoard













// // import {useState, useEffect,useContext} from 'react'
// // import { AppContext } from '../App';
// // import * as React from 'react';
// // import Paper from '@mui/material/Paper';
// // import {
// //   Chart,
// //   BarSeries,
// //   Title,
// //   ArgumentAxis,
// //   ValueAxis,
// // } from '@devexpress/dx-react-chart-material-ui';
// // import { Animation } from '@devexpress/dx-react-chart';


// // const Leaderboard = (props) => {
// //     const {teamId}=useContext(AppContext)
// //     const [leaderboard, setLeaderboard] = useState([]);

// //     useEffect(()=>{
// //         fetch (`/leaderboard/${teamId}`)
// //         .then(res=>{
// //             if(res.status == 200) {
// //                 return res.json()
// //             }
// //         }
// //             )
// //         .then(data=>{
            
// //             console.log(data)
// //             setLeaderboard(data)
            
// //             leaderboard.map((i)=>Number(i.sum))
// //             // leaderboard.sort((a,b)=>Number(a.sum) - Number(b.sum))
// //             console.log(leaderboard)
// //         })
// //         .catch(e=>{console.log(e)})
// //     },[])
    
    
// //     return (
// //         <Paper>
// //           <Chart
// //             data={leaderboard}
// //             // rotated
// //           >
// //             <ArgumentAxis />
// //             <ValueAxis max={7} />
  
// //             <BarSeries
// //               valueField="sum"
// //               argumentField="username"
// //             />
// //             <Title text="Leaderboard" />
// //             <Animation />
// //           </Chart>
// //         </Paper>
// //       );
// //     }

  

// // export default Leaderboard


// import * as React from 'react';
// import Paper from '@mui/material/Paper';
// import {
//   Chart,
//   BarSeries,
//   Title,
//   ArgumentAxis,
//   ValueAxis,
// } from '@devexpress/dx-react-chart-material-ui';
// import { Animation } from '@devexpress/dx-react-chart';

// const data =  [
//   { assignee_id: 1, tl_id: 1, username: 'A', sum: 2 },
//   { assignee_id: 2, tl_id: 1, username: 'C', sum: 1},
//   { assignee_id: 3, tl_id: 1, username: 'E', sum: 1},
//   { assignee_id: 4, tl_id: 1, username: 'G', sum: 1 },
// ];
// export default class LeaderBoard extends React.PureComponent {
//     constructor(props) {
//       super(props);
  
//       this.state = {
//         data: data,
//         teamId: 1
//       };
//     }
//     componentDidMount(){
    
//         fetch (`/leaderboard/${this.state.teamId}`)
//                 .then(res=>{
//                     if(res.status == 200) {
//                         return res.json()
//                     }
//                 }
//                     )
//                 .then(result=>{
                    
//                     console.log(result)
//                     this.setState({data: result})
                    
//                 })
//                 .catch(e=>{console.log(e)})
//       }
    
  
//     render() {
//       const { data: chartData  } = this.state.data;
  
//       return (
//         <Paper>
//           <Chart
//             data={chartData}
//             // rotated
//           >
//             <ArgumentAxis />
//             <ValueAxis max={7} />
  
//             <BarSeries
//               valueField="sum"
//               argumentField="username"
//             />
//             <Title text="Leaderboard" />
//             <Animation />
//           </Chart>
//         </Paper>
//       );
//     }
//   }
  