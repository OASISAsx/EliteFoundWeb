import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { TimeLineType } from './data';
type Props = {
    dialog: boolean
    onClose: () => void;
    item: TimeLineType | null;
}
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(0),

    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
    "& .MuiDialog-paper": {
        backgroundColor: "#1e293b", // สี bg
        color: "#fff",              // สี text
        borderRadius: "16px",
    },
}));

export default function DialogTimeline({ dialog, onClose, item }: Props) {
    if (!dialog) return null;

    console.log(item, 'item')

    return (
        <React.Fragment>
            <BootstrapDialog
                maxWidth="lg"
                fullWidth
                onClose={onClose}
                aria-labelledby="customized-dialog-title"
                open={dialog}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Modal title
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    {item?.items}

                </DialogContent>
                {/* <DialogActions>
                    <Button autoFocus onClick={onClose}>
                        Save changes
                    </Button>
                </DialogActions> */}
            </BootstrapDialog>
        </React.Fragment>
    );
}
