import React, { useEffect } from "react";
import { CSVReader } from "react-papaparse";
import { DragAndDropContainer } from "../sharedComponent/styledComponents";
import PopUpScreen from "./popupscreen";
import { ToastContainer, toast } from "react-toastify";
// TODO: parse the data and validate the input CSV file

function isInValidInput(input) {
  // check if the user input is a not a number or empty string or less than 0
  return Boolean(isNaN(input) | (input === ""));
}

function validateData(processedData) {
  for (let i = 0; i < processedData.length; i++) {
    var dataEntry = processedData[i];
    for (const param of Object.values(dataEntry)) {
      if (isInValidInput(param) && i != processedData.length - 1) {
        return false;
      }
    }
  }
  return true;
}

function parseJsonData(data) {
  let id = 0;
  let processedData = data.map((x) => x.data);
  const isValid = validateData(processedData);
  if (!isValid) {
    toast.error("Please ensure only numeric values are present");
    return;
  }
  toast.success("Successfully validate the data");
  var columns = Object.keys(processedData[0]); //column is first row 1
  processedData.map((array) => {
    id++;
    array["id"] = id; // add one more column id in the 2d array
  });
  return [columns, processedData];
}

var config = {
  quotes: false, //or array of booleans
  quoteChar: '"',
  escapeChar: '"',
  delimiter: ",",
  header: true,
  newline: "{",
  //skipEmptyLines: false, //or 'greedy',
  //columns: null, //or array of strings
};

const CSVParser = () => {
  const [initialState, setOpen] = React.useState({
    isOpen: false,
    columns: [],
    numberOfRows: 0,
    data: [],
  });

  const handleOnDrop = (csvData) => {
    const result = parseJsonData(csvData);
    if (result === undefined) {
      handleOnRemoveFile(csvData);
      return;
    }
    const [columns, processedData] = result;
    setOpen({
      data: processedData,
      numberOfRows: processedData.length,
      columns: columns,
      isOpen: true,
    });
  
  };

  const handleOnError = (err, file, inputElem, reason) => {
    // console.log(err);
  };

  const handleOnRemoveFile = (data) => {

  };
  return (
    <>
      <DragAndDropContainer>
        <CSVReader
          onDrop={handleOnDrop}
          onError={handleOnError}
          addRemoveButton
          onRemoveFile={handleOnRemoveFile}
          config={config}
        >
          <span>Drop CSV file here or click to upload.</span>
        </CSVReader>
      </DragAndDropContainer>
      {/* <PopUpScreen initialState={initialState} setOpen={setOpen} />  */}
      <ToastContainer />
    </>
  );
};

export default CSVParser;
