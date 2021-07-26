import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import fire from '../utils/fire';
import { useCallback, useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Loader from './loader';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { getUserFromLocalStorage } from '../store/localStorage';
import { Orders, UserProfile } from '../store/interfaces';


const OrdersHistory = () => {

    const [orders, setOrders] = useState({} as any);
    const [isHistoryEmpty, setIsHistoryEmpty] = useState(false);

    const getOrdersHistory = useCallback(() => {
        const profileInfoRef = fire.database().ref("Orders");
        profileInfoRef.on('value', (snapshot) => {
            const snaps = snapshot.val();
            if(snaps) {
              const userSnaps = Object.values(snaps).filter((e: any) => e.user === getUserFromLocalStorage().uid);
              const userOrdersHistory: Orders[] = Object.values(userSnaps).map((e: any) => e.order);
              setOrders(userOrdersHistory.reverse());
            }  
        })
    }, [])

    const removeOrder = (e: any) => {
      const profileInfoRef = fire.database().ref("Orders");
      const idOfOrder = e.currentTarget.id;

      if (window.confirm('Are you sure you want to remove this order from the history?')) {
        
        profileInfoRef.once('value', (snapshot) => {
          const snaps = snapshot.val();
          if(snaps) {
            const currentUserProfile: UserProfile[] = [];
            for (let id in snaps) {
                currentUserProfile.push({id, ...snaps[id]})
            }
            const currentUserProfileId = currentUserProfile.filter((e: UserProfile) => e.user === getUserFromLocalStorage().uid);
            const chosenOrderId = Object.values(currentUserProfileId).filter((e: any) => e.order.id === idOfOrder);
            if(currentUserProfileId.length > 0){
              console.log(chosenOrderId)
              const removeProfileRef = fire.database().ref("Orders").child(chosenOrderId[0].id);
              removeProfileRef.remove();
            }
            getOrdersHistory();
          } else {
            return;
          }
        })
      }        
    }

    useEffect(() => {
        getOrdersHistory();
        return () => {setOrders({} as any)}
    }, [getOrdersHistory])

    const historyIsEmpty = useCallback(() => {
      const timeOut = setTimeout(() => {
        if(Object.keys(orders).length === 0) {
          setIsHistoryEmpty(true);
        }
      }, 5000);
      return () => {clearTimeout(timeOut)}
    }, [orders])

    useEffect(() => {
        historyIsEmpty();
        return () => {setIsHistoryEmpty(false)}
  }, [historyIsEmpty])

  return (
      <Container className="ordersHistory">
        {orders.length > 0 ? <h2>Your orders history: </h2> : null }
        {orders.length > 0 ? orders.map((e: any) => { return (
        <Container key={e.id} className="orderContainer">
          <TableContainer component={Paper}
          style={{ margin: "30px 0px 0px 0px", backgroundColor: "rgba(0, 0, 0, 0.5)" }} 
          transition-style="in:circle:top-right">
            <Table>
            <TableBody>
              <TableRow>
                <TableCell style={{ color: "white"}} width="70%">Date of order</TableCell>
                <TableCell style={{ color: "white"}} align="center" width="30%">{e.data.slice(0, 17)}</TableCell>
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
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            endIcon={<DeleteIcon />}
            style={{ margin: "0px 0px 30px 0px", width: "100%" }}
            onClick={(e) => removeOrder(e)}
            id={e.id}
          >
            Delete
          </Button>
        </Container>
      )}) : isHistoryEmpty ? <div className="emptyHistoryDiv"><h2>Your orders history is empty</h2></div> : <Loader />}

      </Container>
  )
}
export default OrdersHistory;