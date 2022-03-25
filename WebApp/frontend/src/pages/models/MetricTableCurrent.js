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

function createData(name, values, unit) {
  return { name, values, unit };
}

export default function MetricTableCurrent({ hasTrain, metrics}) {

  const populatedRows = [
    createData("Total Coverage", metrics.totalCoverage.toFixed(5), ""),
    createData("Parial Coverage", metrics.partialCoverage.toFixed(5), ""),
    createData("Expected Survival", metrics.expectedSurvival.toFixed(5), ""),
    createData("Ave Dist to Closest AED", metrics.aveDistToAed.toFixed(2), "metres"),
  ];

  const unpopulatedRows = [
    createData("Total Coverage", "-"),
    createData("Partial Coverage", "-"),
    createData("Expected Survival", "-"),
    createData("Average Distance to Closest AED", "-"),
  ];
  const classes = useStyles();
  const rows = hasTrain ? populatedRows : unpopulatedRows;
  return (
    <div style={{ height: 400, width: "25%" }}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Current Metrics (Current AED)</TableCell>
              <TableCell>Values</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.values} {row.unit}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
