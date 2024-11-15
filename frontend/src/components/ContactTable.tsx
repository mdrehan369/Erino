import { Contact } from "../utils/types";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";

export default function AlertDialog({
  open,
  setOpen,
  id,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
  id: string;
}) {
  const [loading, setLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axiosInstance.delete(`/contact/${id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this contact
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <LoadingButton loading={loading} onClick={handleDelete} autoFocus>
            Yes
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

export const ContactTable = ({ contacts }: { contacts: Array<Contact> }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");

  const handleClickOpen = (id: string) => {
    setOpen(true);
    setId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axiosInstance.delete(`/contact/${id}`);
      contacts = contacts.filter((contact) => contact._id != id)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Contact"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this contact?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <LoadingButton loading={loading} onClick={handleDelete} autoFocus>
            Yes
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <TableContainer component={Paper} className="my-4 w-full">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell align="right">Last Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Phone Number</TableCell>
              <TableCell align="right">Company</TableCell>
              <TableCell align="right">Job Type</TableCell>
              <TableCell align="right">Edit</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map((contact: Contact) => (
              <TableRow
                key={contact.email}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                className="hover:bg-gray-100 cursor-pointer transition-colors"
              >
                <TableCell component="th" scope="row">
                  {contact.firstName}
                </TableCell>
                <TableCell align="right">{contact.lastName}</TableCell>
                <TableCell align="right">{contact.email}</TableCell>
                <TableCell align="right">{contact.phoneNumber}</TableCell>
                <TableCell align="right">{contact.company}</TableCell>
                <TableCell align="right">{contact.job_title}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    color="success"
                    size="small"
                    startIcon={<Edit />}
                  >
                    Edit
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    startIcon={<Delete />}
                    onClick={() => handleClickOpen(contact?._id!)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
