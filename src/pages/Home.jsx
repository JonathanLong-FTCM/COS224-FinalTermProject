import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "./Home.css";
import { useCart } from "./Cart.jsx";

export default function Home() {
  const [page, setPage] = useState(3);
  const [data, setData] = useState({ products: [], moreProducts: true });
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();
  const url = `https://huitian.serv00.net/project/?type=list&batchNumber=${page}`;

    useEffect (() => {
        setLoading(true);
        async function initFetch() {
            try {
                const promise1 = fetch('https://huitian.serv00.net/project/?type=list&batchNumber=1');
                const promise2 = fetch('https://huitian.serv00.net/project/?type=list&batchNumber=2');
                const [initFetch1, initFetch2] = await Promise.all([promise1, promise2]);
                const initData1 = await initFetch1.json();
                const initData2 = await initFetch2.json();

                setData({
                    products: [...initData1.products, ...initData2.products],
                    moreProducts: initData2.moreProducts
                });
            } catch (error) {
                console.log("Uncessful init lodaing.")
            } finally {
                setLoading(false);
            }
        }
        initFetch();
    }, [])

    async function Fetchdata(url) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data)
            setData(prevData => ({
                products: [...prevData.products, ...data.products],
                moreProducts: data.moreProducts
            }));
        } catch (error) {
            console.error("Data Fetch Error!");
        } finally {
            setPage(page + 1);
        }
    };

    if (loading && !data.products.length) {
      return (
        <div className="loading-message">
          Contenting is Loading...
        </div>
      );
    }

    return (
        <div className="ProductsDisplay">
            <div className="products">
            {data?.products?.map((product, index) => {
                const { productId: name, imageUrl: url, price } = product;
                const onAddToCart = () =>
                    addToCart({
                        productId: name,
                        price: price,
                        image: url,
                    });

                return (
                    <div className="product-card" key={index}>
                        <Link to={`/product/${name}`}>
                            <img src={url} alt="product picture"/>
                        </Link>
                        <div className="product-info">
                            <p><strong>{name}</strong></p>
                            <p className='price'>{price}</p>
                        </div>
                        <button className='add-button' onClick={onAddToCart}>Add to Cart</button>
                    </div>
                );
            })}
            </div>
            <button className="load-button" onClick={() => Fetchdata(url)} disabled={loading||!data?.moreProducts}>{loading? "Loading...": "Load More Products"}</button>
        </div>
    )
}