import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";
import fnConvertDate from "../../../components/fnConvertDate";


export default function TransactionTable({transactionList, hasMoreTransaction, 
    onClickLoadMore}) {

    const navigate = useNavigate();

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography variant="h6">Title</Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography variant="h6">Amount</Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography variant="h6">Created By</Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography variant="h6">Created At</Typography>
                        </TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactionList.map(element => {
                        return (
                            <TableRow key={element.id}>
                                <TableCell><b>{element.title}</b></TableCell>
                                <TableCell align="right">
                                    €{element.amount}
                                </TableCell>
                                <TableCell align="right">
                                    {element.created_by.name}
                                </TableCell>
                                <TableCell align="right">
                                    {fnConvertDate(element.created_at)}
                                </TableCell>
                                <TableCell align="center">
                                        <IconButton size="small" 
                                         onClick={() => {
                                            navigate(`/transaction/${element.id}/edit`);
                                         }}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton color="error" size="small" 
                                         onClick={() => {
                                            navigate(`/transaction/${element.id}/delete`);
                                         }}>
                                            <DeleteIcon />
                                        </IconButton>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                    {hasMoreTransaction === true && (
                        <TableRow>
                            <TableCell colSpan={5}>
                                <Button size="small" fullWidth 
                                 onClick={onClickLoadMore}>
                                    Load more transaction
                                </Button>
                            </TableCell>
                        </TableRow>  
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}