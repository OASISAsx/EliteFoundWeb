"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";
import ContractInfo from "./ContractInfo";
import BorrowerInfo from "./BorrowerInfo";
// import ContractInfo from "./sections/ContractInfo";
// import BorrowerInfo from "./sections/BorrowerInfo";
// import LoanDetailInfo from "./sections/LoanDetailInfo";

type Props = {
  open: boolean;
  onClose: () => void;
  loan: any;
  actionType: "PENDING" | "APPROVED" | "ACTIVE";
  remarks: string;
  setRemarks: (v: string) => void;
  onSubmit: () => void;
};

export default function LoanDetailDialog({
  open,
  onClose,
  loan,
  actionType,
  remarks,
  setRemarks,
  onSubmit,
}: Props) {
  if (!loan) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle className="bg-linear-to-r from-violet-950 to-cyan-200 text-white">
        {actionType === "PENDING" && "รายละเอียดคำขอกู้เงิน"}
        {actionType === "PENDING" && "อนุมัติคำขอกู้เงิน"}
        {/* {actionType === "REJECT" && "ปฏิเสธคำขอกู้เงิน"} */}
      </DialogTitle>

      <DialogContent dividers>
        <Box className="space-y-4 py-4">
          <ContractInfo loan={loan} />
          {/* <BorrowerInfo loan={loan} /> */}
          {/* <LoanDetailInfo loan={loan} /> */}

          {actionType !== "PENDING" && (
            <TextField
              label="หมายเหตุ"
              multiline
              rows={4}
              fullWidth
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
          )}
        </Box>
      </DialogContent>

      <DialogActions className="p-4">
        <Button onClick={onClose} className="text-gray-600">
          ปิด
        </Button>

        {actionType === "PENDING" && (
          <Button
            variant="contained"
            color="success"
            startIcon={<CheckCircle />}
            onClick={onSubmit}
          >
            อนุมัติ
          </Button>
        )}

        {actionType === "PENDING" && (
          <Button
            variant="contained"
            color="error"
            startIcon={<Cancel />}
            onClick={onSubmit}
          >
            ปฏิเสธ
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
