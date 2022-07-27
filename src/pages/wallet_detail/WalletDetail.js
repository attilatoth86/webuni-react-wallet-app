import { Button, Chip, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import fnConvertDate from "../../components/fnConvertDate";
import { useAuth } from "../../hooks/useAuth";
import AddIcon from '@mui/icons-material/Add';
import ShareIcon from '@mui/icons-material/Share';

export default function WalletDetail() {

    const { id } = useParams();
    const { authToken } = useAuth();
    const [wallet, setWallet] = useState(false);
    const [accessUsers, setAccessUsers] = useState([]);
    const [hasMoreTransaction, setHasMoreTransaction] = useState(false);
    const [transactionList, setTransactionList] = useState([]);
    const [cursor, setCursor] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        axios({
            method: 'get',
            url: `https://wallet.atoth.workers.dev/wallet/${id}`,
            headers: {'Authorization': 'Bearer ' + authToken}
        }).then(response => {

            console.log(response.data);

            setWallet(response.data);
            setAccessUsers(response.data.access);

        }).catch(error => {
            console.error(error.response.data);
        });

        axios({
            method: 'post',
            url: 'https://wallet.atoth.workers.dev/transactions',
            headers: {'Authorization': 'Bearer ' + authToken},
            data: {wallet_id: id, limit: 5, cursor: ''}
        }).then(response => {

            console.log(response.data);
            setTransactionList(response.data.transactions);
            setHasMoreTransaction(response.data.has_more);
            if (response.data.cursor) {
                setCursor(response.data.cursor);
            }

        }).catch(error => {

            console.error(error.response.data);

        });
    }, [authToken, id]);

    return (<>
        <Typography variant="h4" marginTop={3} marginBottom={3}>{wallet.name}</Typography>
        <Typography variant="subtitle2" marginTop={3} marginBottom={3}>{wallet.description}</Typography>
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Typography variant="h6">Contributors</Typography>
            </Grid>
            <Grid item alignContent={"middle"}>
                    {accessUsers.map(element => {
                        return(
                            <Chip sx={{ml: 0.5, mr: 0.5}} label={element.name} />
                    );})}
            </Grid>
            <Grid item>
                <Button onClick={()=>navigate(`/wallet/${id}/share`)} startIcon={<ShareIcon />} >Share</Button>
            </Grid>
        </Grid>
        <Typography variant="h5" marginTop={10}>Transactions</Typography>
        <Grid container marginBottom={1}>
            <Grid item sx={{ flexGrow: 1 }}>
                <Typography variant="overline" marginLeft={1}>
                    Balance: €{wallet.balance}
                </Typography>
            </Grid>
            <Grid item>
                <Button variant="contained" startIcon={<AddIcon />} 
                 onClick={() => navigate(`/wallet/${id}/transaction/new`)}>
                    Add Transaction
                </Button>
            </Grid>
        </Grid>
        
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
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactionList.map(element => {
                        return (
                            <TableRow key={element.id}>
                                <TableCell><b>{element.title}</b></TableCell>
                                <TableCell align="right">€{element.amount}</TableCell>
                                <TableCell align="right">{element.created_by.name}</TableCell>
                                <TableCell align="right">{fnConvertDate(element.created_at)}</TableCell>
                            </TableRow>
                        );
                    })}
                    {hasMoreTransaction === true && (
                        <TableRow>
                            <TableCell colSpan={4}>
                                <Button size="small" fullWidth onClick={()=>{
                                    axios({
                                        method: 'post',
                                        url: 'https://wallet.atoth.workers.dev/transactions',
                                        headers: {'Authorization': 'Bearer ' + authToken},
                                        data: {wallet_id: id, limit: 5, cursor: cursor}
                                    }).then(response => {

                                        console.log(response.data);
                                        setTransactionList([...transactionList, ...response.data.transactions]);
                                        setHasMoreTransaction(response.data.has_more);
                                        if (response.data.cursor) {
                                            setCursor(response.data.cursor);
                                        }

                                    }).catch(error => {

                                        console.error(error.response.data);

                                    });
                                }}>Load more transaction</Button>
                            </TableCell>
                        </TableRow>  
                    )}
                </TableBody>
            </Table>
        </TableContainer>
        <br/>
    </>);
}