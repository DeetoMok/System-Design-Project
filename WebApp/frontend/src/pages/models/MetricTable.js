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
  createData("F1-Score", 0.63),
  createData("Accuracy", 0.71),
  createData("Error Rate", 0.29),
  createData("Precision", 0.51),
  createData("Recall", 0.82),
];

const unpopulatedRows = [
  createData("F1-Score", ""),
  createData("Accuracy", ""),
  createData("Error Rate", ""),
  createData("Precision", ""),
  createData("Recall", ""),
];

export default function MetricTable({ hasTrain }) {
  const classes = useStyles();
  const rows = hasTrain ? populatedRows : unpopulatedRows;
  return (
    <div style={{ height: 400, width: "18%" }}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Metrics</TableCell>
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
