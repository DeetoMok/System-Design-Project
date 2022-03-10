import React, { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Papa from 'papaparse'
import { CSVReader, readString } from 'react-papaparse';
import './dataManagement.css';
import { useHistory } from 'react-router';

function preventDefault(event) {
  event.preventDefault();
}

export default function AedcandidateData() {

  const [ohcadata, setData] = useState();
  const [columnData, setColumnData] = useState();
  const [rowData, setRowData] = useState();
  const history = useHistory();
  useEffect(() => {
      getData()
  }, [])

  let getData = async () => {
      let response = await fetch('http://127.0.0.1:8000/api/aedcandidates/')
      let data = await response.json()
      // console.log('GET DATA:', data.length)
      if (data.length !== 0) {
        setData(data)
      }
  }

  let updateData = async (rows) => {
    // console.log("ohcadata being sent to backend", ohcadata)
    fetch(`http://127.0.0.1:8000/api/aedcandidates/update`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(rows)
    })
  }

  let deleteData = async () => {
    fetch(`http://127.0.0.1:8000/api/aedcandidates/delete`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify([])
    })
    history.go(0);
  }

  let handleSubmit = (rows) => {
    updateData(rows);
    history.go(0);
  }

  let handleOnDrop = (data) => {
    console.log('---------------------------');
    let emptyIndex = 0;
    for (var i = 0; i< data.length; i++) {
      console.log(data[i].data);
      if (data[i].data.length <= 1) {
        emptyIndex = i;
        console.log("empty index", i);
        break;
      }
    }
    console.log("HANDLEONDROP DATA: ", data);
    // console.log(data[0].data[0])
    // console.log("JSON: ", readString("1,2,3,4,5,5,6,7"))
    console.log('---------------------------');
    data=data.slice(0,emptyIndex);
    const columns = data[0].data.map((col,index) => {
      return {
        Header: col,
        accessor: col.split(" ").join("_".toLowerCase()),
      };
    });

    console.log("COLUMNS", columns);

    const rows = data.slice(1).map((row) => {
      return row.data.reduce((acc, curr, index) => {

        acc[columns[index].accessor] = curr;
        return acc;
      }, {})
    });

    console.log("ROWS:", rows);

    // setData(rows)
    
    handleSubmit(rows)
  }

  let handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
  }

  let handleOnRemoveFile = (data) => {
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')
  }  

  return (
    <React.Fragment>
      <div className='tableTop'> 
        <div className='tableTitle'>
          <h1>AED Candidate Data</h1>
          {(ohcadata === undefined) ?
            <></> :
            <h3><br/>Size of Data: {ohcadata.length}</h3>
          }
        </div>

        
        {(ohcadata === undefined) ? 
          <></> : 
          <Button variant="outlined" color="error" onClick={deleteData}>Delete</Button>

        }
        
      </div>

      {(ohcadata === undefined) ? (
      <CSVReader
      onDrop={handleOnDrop}
      onError={handleOnError}
      addRemoveButton
      onRemoveFile={handleOnRemoveFile}
      >
      <span>Drop CSV file here or click to upload.</span>
      </CSVReader>
      ) : (
          <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Latitude</TableCell>
              <TableCell>Longitude</TableCell>
              <TableCell>Planning Area</TableCell>
              <TableCell>Region</TableCell>
              <TableCell>Subzone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ohcadata.slice(0,30).map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.lat}</TableCell>
                <TableCell>{row.lon}</TableCell>
                <TableCell>{row.pa}</TableCell>
                <TableCell>{row.region}</TableCell>
                <TableCell>{row.subzone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {(ohcadata === undefined) ? (
        <p>Upload data to start</p>
      ) : (
        <></>
        // <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        //   See more data
        // </Link>
      )}
    </React.Fragment>
  );
}