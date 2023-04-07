import Box from '@mui/material/Box'
import { useNavigate, Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid'
import GridItem from '@mui/material/Grid'
import bgimgbig from '../bgimgbig.png'
import Paper from '@mui/material/Paper'

const Welcome = (props) => {
    return (
        <>
        <Box container
            direction="column"
            justifyContent="center"
            alignItems="center"
            margin='auto'
            
            style={{
                backgroundImage: `url(${bgimgbig})`,
                backgroundSize: "cover",
                backgroundPositionX: 'center',
                height: "65vh",
            }}>
            

        </Box>
        <Box container
        display='flex'
        flexDirection="column"
        // justifyContent="center"
        // alignContent= 'center'
        alignItems="center"
        width='2'
        margin='auto'
        // bgcolor='#ffffff'
        >
            <Typography variant="h5" component="h1">Welcome to “Teamwork makes the dream work”</Typography>
            <Typography variant="h6" component="p" >to continue your journey</Typography>
            <Typography variant="h6" component="p" ><Link to='/register'>Register</Link> or <Link to='/login'>Login</Link></Typography>
        </Box>
        </>

    )
}

export default Welcome