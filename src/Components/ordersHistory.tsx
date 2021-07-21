import TextFiled from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

const OrdersHistory = () => {
    return (
        <div className="ordersHistory">
            <h2>Profile information: </h2>
            <FormControl
                fullWidth={true}
            >
                <TextFiled
                    type="text"
                    label="Name"
                    variant="filled"
                    color="secondary"
                    required={true}
                    InputLabelProps={{
                        style: { color: '#fff' },
                    }}
                />
                <TextFiled
                    type="text"
                    label="Surname"
                    variant="filled"
                    color="secondary"
                    required={true}
                    InputLabelProps={{
                        style: { color: '#fff' },
                    }}
                />
                <TextFiled
                    type="text"
                    label="Address"
                    variant="filled"
                    color="secondary"
                    required={true}
                    InputLabelProps={{
                        style: { color: '#fff' },
                    }}
                />
                <TextFiled
                    type="text"
                    label="Post code"
                    variant="filled"
                    color="secondary"
                    required={true}
                    InputLabelProps={{
                        style: { color: '#fff' },
                    }}
                />
                <TextFiled
                    type="text"
                    label="Town"
                    variant="filled"
                    color="secondary"
                    required={true}
                    InputLabelProps={{
                        style: { color: '#fff' },
                    }}
                />
                <TextFiled
                    type="text"
                    label="Country"
                    variant="filled"
                    color="secondary"
                    required={true}
                    InputLabelProps={{
                        style: { color: '#fff' },
                    }}
                />
                <TextFiled
                    type="tel"
                    label="Phone"
                    variant="filled"
                    color="secondary"
                    required={true}
                    InputLabelProps={{
                        style: { color: '#fff' },
                    }}
                />
                <button type="submit">Update profile information</button>
            </FormControl>     
        </div>
    )
}

export default OrdersHistory;