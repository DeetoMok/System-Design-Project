import { useDispatch } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { UploadDataAction } from "../redux/actiontype.js";

const PopUpScreen = ({ initialState, setOpen }) => {
  const dispatch = useDispatch();
  let history = useHistory();

  const handleValidFile = () => {
    // close the menu button when the file is deemed valid
    setOpen({
      ...initialState,
      isOpen: false,
    });
    //   update the file data
    dispatch({ type: UploadDataAction, payload: initialState });
    history.push("/trainModel");
    handleInvalidFile();
  };

  const handleInvalidFile = () => {
    setOpen({
      isOpen: false,
      columns: [],
      numberOfRows: 0,
      data: [],
    });
  };

  const handleClose = () => {
    setOpen({
      ...initialState,
      isOpen: false,
    });
  };

  return (
    <Dialog
      open={initialState.isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Is the Data accurate?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <ul>
            <dt style={{ marginTop: "-25px" }}>Detected Columns</dt>
            {initialState.columns.map((column) => (
              <li key={column} style={{ marginLeft: "13px" }}>
                {column}
              </li>
            ))}
          </ul>
        </DialogContentText>
      </DialogContent>
      <DialogActions style={{ marginTop: "-20px" }}>
        <Button onClick={handleInvalidFile} color="secondary">
          No, reupload file
        </Button>
        <Button onClick={handleValidFile} color="primary" autoFocus>
          Yes, continue to train model
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default PopUpScreen;
