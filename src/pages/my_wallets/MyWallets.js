import { Button, Card, CardActions, CardContent, Grid, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fnConvertDate from "../../components/fnConvertDate";
import { callApi } from "../../hooks/useApi";
import { useAuth } from "../../hooks/useAuth";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';


export default function MyWallets() {

    const [wallets, setWallets] = useState([]);
    const {authToken} = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        callApi('get', '/wallets', undefined, authToken).then(response => {
            setWallets(response.data);
        }).catch(error => {
            console.error(error.response.data);
        });
    }, [authToken]);

    return (<>
        <Typography variant="h4" marginTop={3} marginBottom={3}>
            My Wallets
        </Typography>
        <Grid container spacing={2}>
            {wallets.map(element => {
                return(
                    <Grid key={element.id} item xs={12} sm={6} md={4} lg={3}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">
                                    {element.name}
                                </Typography>
                                <Typography sx={{ mb: 2 }} 
                                 color="text.secondary">
                                    Balance: €{element.balance}
                                </Typography>
                                <Typography sx={{ mb: 2 }} variant="body2">
                                    {element.description}
                                </Typography>
                                <Typography variant="caption">
                                    Created by <b>{element.created_by.name}</b> at {fnConvertDate(element.created_at)}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button sx={{ flexGrow: 1 }} variant="outlined" 
                                 size="small" onClick={() => {
                                    navigate(`/wallet/${element.id}`)}}>
                                    Details
                                </Button>
                                <IconButton aria-label="delete" color="error" 
                                 size="small" onClick={() => {
                                    navigate(`/wallet/delete/${element.id}/confirm`)
                                 }}>
                                    <DeleteIcon />
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Grid>
            );})}
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Button variant="contained" startIcon={<AddIcon />} 
                 onClick={() => navigate("/wallet/new")}>
                    Add Wallet
                </Button>
            </Grid>
        </Grid>
    </>);
}