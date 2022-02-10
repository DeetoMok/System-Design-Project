import React from "react";
import { Chart } from "react-google-charts";
import { useSelector } from "react-redux";
import { Typography, Card, CardActions, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";
import { GraphBody, SelectBody } from "./styledComponents";
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const mlParams = {
  knn: { neighbour: 0, "random state": 0 },
  "random forest": {
    "number of trees": 0,
    height: 0,
    depth: 0,
    max_depth: 0,
  },
};
const ScatterPlot = () => {
  const clientTrainingData = useSelector((state) => state.trainingData);
  const classes = useStyles();
  const columns = clientTrainingData.columns;
  const data = clientTrainingData.data;
  const [independentVariable, setindependentVariable] = React.useState(
    columns[0]
  );
  const [dependentVariable, setdependentVariable] = React.useState(columns[1]);
  const array = [[independentVariable, dependentVariable]];
  for (let i = 0; i < data.length; i++) {
    array.push([
      parseInt(data[i][independentVariable]),
      parseInt(data[i][dependentVariable]),
    ]);
  }

  const handleXVariableChange = (event) => {
    setdependentVariable(event.target.value);
  };
  const handleYVariableChange = (event) => {
    setindependentVariable(event.target.value);
  };

  return (
    <GraphBody>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Variable Selection
          </Typography>
          <SelectBody>
            <FormControl
              className={classes.formControl}
              styled={{ width: "100%" }}
            >
              <InputLabel id="demo-simple-select-label">x-axis</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={handleXVariableChange}
                value={dependentVariable} // need to give this shit a value if not it will give warning
                renderValue={(selected) => (
                  <div className={classes.chips}>
                    <Chip
                      key={selected}
                      label={selected}
                      className={classes.chip}
                    />
                  </div>
                )}
              >
                {columns.map((column) => (
                  <MenuItem value={column} key={column}>
                    {column}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">y-axis</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={handleYVariableChange}
                value={independentVariable} // need to give this shit a value if not it will give warning
                renderValue={(selected) => (
                  <div className={classes.chips}>
                    <Chip
                      key={selected}
                      label={selected}
                      className={classes.chip}
                    />
                  </div>
                )}
              >
                {columns.map((column) => (
                  <MenuItem value={column} key={column}>
                    {column}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </SelectBody>
        </CardContent>
      </Card>
      <Chart
        styled={{ marginTop: "10px;" }}
        width={"600px"}
        height={"400px"}
        chartType="ScatterChart"
        loader={<div>Loading Chart</div>}
        data={array}
        options={{
          title: `${independentVariable} vs. ${dependentVariable}`,
          hAxis: { title: independentVariable },
          vAxis: { title: dependentVariable },
          legend: "none",
        }}
        rootProps={{ "data-testid": "1" }}
      />
    </GraphBody>
  );
};
export default ScatterPlot;
