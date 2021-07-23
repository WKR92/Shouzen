import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { LooseObject } from '../store/interfaces';
import fire from '../fire';
import { useCallback, useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';

const OrdersHistory = () => {

    const [orders, setOrders] = useState({} as any);

    const getUserFromLocalStorage = () => {
        let user = localStorage.getItem('user');
        let loggedUser: LooseObject = {}
        if(user){
            loggedUser = JSON.parse(user);
        }
        return loggedUser
    }

    const getOrdersHistory = useCallback(() => {
        const profileInfoRef = fire.database().ref("Orders");
        profileInfoRef.on('value', (snapshot) => {
            const snaps = snapshot.val();
            const userSnaps = Object.values(snaps).filter((e: any) => e.user === getUserFromLocalStorage().uid);
            const userOrdersHistory = Object.values(userSnaps).map((e: any) => e.order);
            setOrders(userOrdersHistory);
        })
    }, [])

    useEffect(() => {
        getOrdersHistory()
    }, [getOrdersHistory])

    const createDataEntries = (id: number, cost: number) => {
        return { id, cost };
      }

    const rows = () => Object.values(orders).forEach((e: any) => {
        console.log(e.costOfOrder)
    })

    return (
        <Container className="ordersHistory">
            {orders.length > 0 ? <h2>Your orders history: </h2> : null }
            {orders.length > 0 ? orders.map((e: any) => { return (
                <TableContainer key={e.id} component={Paper} 
                style={{ margin: "30px 0px", backgroundColor: "rgba(0, 0, 0, 0.5)" }} 
                transition-style="in:circle:top-right">
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell style={{ color: "white"}} width="70%">Date of order</TableCell>
                                <TableCell style={{ color: "white"}} align="center" width="30%">{e.data.slice(0, 10)}</TableCell>
                            </TableRow>
                            {Object.values(e.whatIsOrdered).map((e: any) => { return (
                                <TableRow key={e[0]}>
                                    <TableCell style={{ color: "white"}} width="70%">{e[0]}</TableCell>
                                    <TableCell style={{ color: "white"}} align="center" width="30%">x{e[1]}</TableCell>
                                </TableRow>
                            )})}
                            <TableRow>
                                <TableCell style={{ color: "white"}} width="70%">Cost</TableCell>
                                <TableCell style={{ color: "white"}} align="center" width="30%">{e.costOfOrder}</TableCell>
                            </TableRow>                           
                        </TableBody>
                    </Table>
                </TableContainer>
            )}) : <div className="loader"><div className="loaderInnerDiv"></div></div>}
        </Container>
    )
}
export default OrdersHistory;