import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    Width: "30%",
  },
});

function createData(name, values) {
  return { name, values };
}

const populatedRows = [
  createData("Total Coverage", 0.3879),
  createData("Parial Coverage", 0.1196),
  createData("Expected Survival", 0.4040),
  createData("Ave Dist to Closest AED", 246.83),
];

const unpopulatedRows = [
  createData("Total Coverage", "-"),
  createData("Parial Coverage", "-"),
  createData("Expected Survival", "-"),
  createData("Ave Dist to Closest AED", "-"),
  createData("Computational Time", "-"),
];


export default function MetricTableCurrent({ hasTrain, metrics}) {
  const classes = useStyles();
  const rows = hasTrain ? populatedRows : unpopulatedRows;
  return (
    <div style={{ height: 400, width: "25%" }}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Current Metrics</TableCell>
              <TableCell>Values</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.values}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
