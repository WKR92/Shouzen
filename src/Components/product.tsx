import products from './products';
import { Products } from '../store/interfaces';
import { useDispatch } from 'react-redux';
import { addProductToCart } from '../store/productsActions';
// import {store} from '../store/store';

const Boots = () => {

    const dispatch = useDispatch();

    const putProductInCart = (product: Products) => {     
        dispatch(addProductToCart(product));

        // for adding item to cart animation
        const cartBtn = document.querySelectorAll('.cartBtn') as NodeListOf<HTMLButtonElement>;
        const loader = document.querySelectorAll('.loaderHolder') as NodeListOf<HTMLDivElement>;
        Object.values(cartBtn).map(e => e.style['display'] = "none");
        Object.values(loader).map(e => e.style['display'] = "inline-block");
        setTimeout(() => {
            Object.values(cartBtn).map(e => e.style['display'] = "inline");
            Object.values(loader).map(e => e.style['display'] = "none");
        }, 1500)
    }

    return (
        <>
        {products.length > 0
        ? products.map(elem => {return (
        <div key={elem.id} className="productBg">
            <div className="productContainer" transition-style="in:circle:top-right">
                <div className={`${elem.id}__container`}>
                    <div className="product__info">
                        <h2><span className="headlineSpan">{elem.name}.</span> {elem.headline}</h2>
                        <p>{elem.description}</p>
                        <p>price: {elem.price}$</p>
                        <p>{elem.callToAction}</p>
                        <div className="callToActionHolder">
                            <button onClick={() => putProductInCart(elem)} className="cartBtn">
                                <i className="fas fa-cart-arrow-down cartIcon"></i>
                                Add to cart.
                            </button>
                            <div className="loaderHolder">
                                <button className="loader"></button>
                            </div>
                        </div>
                    </div>
                    <img src={elem.picture} alt="nike_shoes"/>
                </div>
            </div>
            {/* to check state from localStore */}
            {/* <button style={{height: 60, width: 60}} onClick={() => console.log(store.getState())}> show state</button>
            <button style={{height: 60, width: 60}} onClick={() => localStorage.clear()}>clear local storage</button> */}
        </div>)})
        : null}
        </>  
    )
}
export default Boots;