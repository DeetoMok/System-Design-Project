import React from 'react'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import CSVParser from "./csvReader";

const Data = ({ data, setData }) => {
    return (

        <div>        
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >

            <Toolbar /> 
            <CSVParser
              data={data}
              setData={setData}
            />
            
          </Box>
        </div>

    )
}

export default Data
