import { Button, Chip, Grid, IconButton, Typography } from "@mui/material";
import { callApi } from "../../hooks/useApi";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import AddIcon from '@mui/icons-material/Add';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import TransactionTable from "./components/TransactionTable";


export default function WalletDetail() {

    const { id } = useParams();
    const { authToken } = useAuth();
    const [wallet, setWallet] = useState(false);
    const [accessUsers, setAccessUsers] = useState([]);
    const [hasMoreTransaction, setHasMoreTransaction] = useState(false);
    const [transactionList, setTransactionList] = useState([]);
    const [cursor, setCursor] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        callApi('get', `/wallet/${id}`, undefined, authToken).then(response => {

            setWallet(response.data);
            setAccessUsers(response.data.access);

        }).catch(error => {
            console.error(error.response.data);
        });

        callApi('post', '/transactions', {wallet_id: id, limit: 5, cursor: ''}, 
        authToken).then(response => {

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
        <Typography variant="h4" marginTop={3} marginBottom={3}>
            {wallet.name}
        </Typography>
        <Typography variant="subtitle2" marginTop={3} marginBottom={3}>
            {wallet.description} 
            <IconButton color="primary" size="small" 
             onClick={() => navigate(`/wallet/${wallet.id}/edit`)}>
                <EditIcon />
            </IconButton>
        </Typography>
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Typography variant="h6">Contributors</Typography>
            </Grid>
            <Grid item alignContent={"middle"}>
                    {accessUsers.map(element => {
                        return(
                            <Chip key={element.id} sx={{ml: 0.5, mr: 0.5}} 
                             label={element.name} 
                             onDelete={() => {
                                navigate(`/wallet/${id}/remove_access/${element.id}`);
                            }}/>
                    );})}
            </Grid>
            <Grid item>
                <Button onClick={()=>navigate(`/wallet/${id}/share`)} 
                 startIcon={<ShareIcon />}>
                    Share
                </Button>
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
        <TransactionTable
         transactionList={transactionList} 
         hasMoreTransaction={hasMoreTransaction}
         onClickLoadMore={() => {
            callApi('post', 
                    '/transactions',
                    {
                        wallet_id: id, 
                        limit: 5, 
                        cursor: cursor
                    },
                    authToken
            ).then(response => {
                    setTransactionList(
                        [
                        ...transactionList, 
                        ...response.data.transactions
                        ]);
                    setHasMoreTransaction(response.data.has_more);
                    if (response.data.cursor) {
                        setCursor(response.data.cursor);
                    }
            }).catch(error => {
                console.error(error.response.data);
            });
            }
         } />
    </>);
}