
import { createTheme } from '@mui/material/styles';

 const Theme = createTheme (
    {
        palette: {
            type: 'light',
            primary: {
              main: '#5a33fd',
            },
            secondary: {
              main: '#f3178c',
            },
            success: {
              main: '#00796b',
            },
            warning:{
              main:  '#ff9800'
            }

          },
          spacing: 8,
          shape: {
            borderRadius: 4,
          },
          props: {
            MuiAppBar: {
              color: 'secondary',
            },
          },
    }
) 

export default Theme