import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export const PredictorSelect = ({ config, setConfig }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [paramsTheme, setParamsTheme] = React.useState([]); // use for changing color

  function filterParameter(array, selectedOptions) {
    var filterVariables = [];
    for (let i = 0; i < array.length; i++) {
      if (selectedOptions.includes(array[i])) {
        continue;
      }
      filterVariables.push(array[i]);
    }
    return filterVariables;
  }

  const handleChange = (event) => {
    setParamsTheme(event.target.value);
    setConfig({
      ...config,
      predictor: [event.target.value],
      responseOptions: filterParameter(config.columns, event.target.value),
    });
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-chip-label">Predictors</InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          value={paramsTheme}
          onChange={handleChange}
          multiple
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {config.predictorsOptions.map((predictor) => (
            <MenuItem
              key={predictor}
              value={predictor}
              style={getStyles(predictor, paramsTheme, theme)}
            >
              {predictor}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export const ResponseSelect = ({ config, setConfig }) => {
  const classes = useStyles();
  const [age, setAge] = React.useState("");

  function filterPredictorOptions(array, element) {
    var filteredArray = [];
    for (let i = 0; i < array.length; i++) {
      if (element === array[i]) {
        continue;
      }
      filteredArray.push(array[i]);
    }
    return filteredArray;
  }

  const handleChange = (event) => {
    setAge(event.target.value);

    setConfig({
      ...config,
      response: event.target.value,
      predictorsOptions: filterPredictorOptions(
        config.columns,
        event.target.value
      ),
    });
  };
  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-label">Response</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={age}
        onChange={handleChange}
        renderValue={(selected) => (
          <div className={classes.chips}>
            <Chip key={selected} label={selected} className={classes.chip} />
          </div>
        )}
      >
        {config.responseOptions.map((response) => (
          <MenuItem key={response} value={response}>
            {response}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const mlParams = {
  knn: { neighbour: 0, "random state": 0 },
  "random forest": {
    "number of trees": 0,
    height: 0,
    depth: 0,
    max_depth: 0,
  },
};

export const ModelSelect = ({ config, setConfig }) => {
  const [model, setModel] = React.useState(Object.keys(mlParams)[0]); // to manage the state of the model, e.g knn/random forest
  const [paramsState, setParamsState] = React.useState(mlParams); // to manage the state of the input of the parameter
  const classes = useStyles();

  const handleChange = (event) => {
    var modelParameters = Object.keys(paramsState[model]);

    setModel(event.target.value);
    setConfig({
      ...config,
      model: event.target.value,
    });
  };
  //todo change the error text based on the error
  const handleTextField = (event) => {
    var inputParam = event.target.value;
    var textFieldID = event.target.id;
    var modelParams = mlParams[model];
    modelParams[textFieldID] = inputParam;
    var modelStatus = inputParam; //paramsState[model]; // {"number of trees": false, "random state":'true}
    // console.log(inputParam, isNaN(inputParam));
    // modelStatus[textFieldID] =
    //   isNaN(inputParam) || inputParam === "" ? true : false; // if the input value is not a number, means there is an error
    setParamsState({
      ...paramsState,
      [model]: modelParams,
    });
  };

  const handleOnBlurInput = () => {
    setConfig({
      ...config,
      params: paramsState,
      model: model,
    });
  };

  const toggleMessage = (params) => {
    var inputStatus = paramsState[model][params];

    if (isNaN(inputStatus)) {
      return "Numeric values only.";
    } else if (parseFloat(inputStatus) < 0) {
      return "Positive values only.";
    } else if (inputStatus === "") {
      return "Please provide a numerical value.";
    }
    return "";
  };

  function validateInput(input) {
    // check if the user input is a not a number or empty string or less than 0
    return Boolean(isNaN(input) | (input === "") | (parseFloat(input) < 0));
  }

  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Models</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={handleChange}
          value={model} // need to give this shit a value if not it will give warning
          renderValue={(selected) => (
            <div className={classes.chips}>
              <Chip key={selected} label={selected} className={classes.chip} />
            </div>
          )}
        >
          {Object.keys(mlParams).map((mlModel) => (
            <MenuItem value={mlModel} key={mlModel}>
              {mlModel}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div>
        {Object.keys(paramsState[model]).map((params) => (
          <React.Fragment key={params.concat("container")}>
            <Typography variant="subtitle1" gutterBottom key={params}>
              {params}
            </Typography>
            <TextField // this is where all the magic happens for the text field
              id={params}
              key={params.concat("_field")}
              onChange={handleTextField}
              value={paramsState[model][params]}
              helperText={toggleMessage(params)}
              error={validateInput(paramsState[model][params])}
              onBlur={handleOnBlurInput}
            />
          </React.Fragment>
        ))}
      </div>
    </>
  );
};
