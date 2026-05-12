import AddMoney from '../components/banking/AddMoney';
import RetailerHeader from '../components/RetailerHeader';

const PayoutHub = () => {
    return (
        <div>
            <RetailerHeader compact />
            <AddMoney mode="payout-hub" />
        </div>
    );
};

export default PayoutHub;
