import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
  Chart,
  PieSeries,
  Title,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import { useContext } from 'react';

const data = [
  { assignee_id: 1, tl_id: 1, username: 'A', sum: '5' },
  { assignee_id: 2, tl_id: 1, username: 'C', sum: '5' },
  { assignee_id: 3, tl_id: 1, username: 'E', sum: '3' },
  { assignee_id: 4, tl_id: 1, username: 'G', sum: '1' }
];
export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: data,
      teamId: 1
    };
  } 
  
  componentDidMount(){
    
    fetch (`/leaderboard/${this.state.teamId}`)
            .then(res=>{
                if(res.status == 200) {
                    return res.json()
                }
            }
                )
            .then(result=>{
                
                console.log(result)
                this.setState({data: result})
                
            })
            .catch(e=>{console.log(e)})
  }

  render() {
    const { data: chartData } = this.state;

    return (
      <Paper>
        <Chart
          data={chartData}
        >
          <PieSeries
            valueField="sum"
            argumentField="username"
          />
          <Title
            text="Leaderboard"
          />
          <Animation />
        </Chart>
      </Paper>
    );
  }
}