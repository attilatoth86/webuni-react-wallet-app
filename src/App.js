import { Container } from "@mui/system";
import { Route, Routes } from "react-router-dom";
import MenuBar from "./components/MenuBar";
import DeleteWalletConfirm from "./pages/delete_wallet_confirm/DeleteWalletConfirm";
import Login from "./pages/login/Login";
import MyWallets from "./pages/my_wallets/MyWallets";
import NewTransaction from "./pages/new_transaction/NewTransaction";
import NewWallet from "./pages/new_wallet/NewWallet";
import Registration from "./pages/registration/Registration";
import ShareWallet from "./pages/share_wallet/ShareWallet";
import WalletDetail from "./pages/wallet_detail/WalletDetail";
import Providers from "./Providers";

function App() {
  return (
    <div className="App">
      <Providers>
        <MenuBar />
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" exact element={
              <div>
                <h1>Welcome to the Wallet App!</h1>
                <p>An online system to store financial transactions in shareable wallets.</p>
              </div>
            } />
            <Route path="/login" exact element={<Login />}/>
            <Route path="/register" exact element={<Registration />}/>
            <Route path="/mywallets" exact element={<MyWallets />} />
            <Route path="/wallet/new" exact element={<NewWallet />} />
            <Route path="/wallet/delete/:id/confirm" exact element={<DeleteWalletConfirm />} />
            <Route path="/wallet/:id" exact element={<WalletDetail />} />
            <Route path="/wallet/:id/transaction/new" exact element={<NewTransaction />} />
            <Route path="/wallet/:id/share" exact element={<ShareWallet />} />
          </Routes>
        </Container>
      </Providers>
    </div>
  );
}

export default App;
