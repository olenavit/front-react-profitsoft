import {Alert, Snackbar} from "@mui/material";

const SnackBar = ({
                      open,
                      children,
                      severity,
                      autoHideDuration = 1000,
    onClose
                  }) => {
    return (
        <>
            <Snackbar
                open={open}
                variant="solid"
                autoHideDuration={autoHideDuration}
            onClose={onClose}>
                <Alert
                    severity={severity}
                >{children}</Alert>
            </Snackbar>
        </>
    )
}
export default SnackBar;