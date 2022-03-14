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
  createData("Total Coverage", 0.677),
  createData("Parial Coverage", 0.1509),
  createData("Expected Survival", 0.4917),
  createData("Ave Dist to Closest AED", 162.32),
  createData("Computational Time", "2 min 26 s"),
];

const unpopulatedRows = [
  createData("Total Coverage", "-"),
  createData("Parial Coverage", "-"),
  createData("Expected Survival", "-"),
  createData("Ave Dist to Closest AED", "-"),
  createData("Computational Time", "-"),
];

export default function MetricTable({ hasTrain }) {
  const classes = useStyles();
  const rows = hasTrain ? populatedRows : unpopulatedRows;
  return (
    <div style={{ height: 400, width: "25%" }}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Metrics (With new AEDs)</TableCell>
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
