import { addItem, removeItem } from '../../state/ItemSlice/ItemSlice';
import classes from './Item.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import {useEffect,useState} from 'react'
import getProducts from '../hooks/getProducts.js'
interface ItemProps {
  search: string;
}

const Item: React.FC<ItemProps> = ({ search }) => {
  const [data, setData] = useState<any[]>([]);
  const isClicked = useSelector((state: RootState) => state.item.isClicked); 
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const products = await getProducts(); 
      console.log(products);
     setData(products ?? [])                  
    };
    fetchData();
  }, []);

  const filteredItems = data?.filter((item: any) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`${classes.wrapper} ${isClicked ? classes.blur : classes.nonblur}`}>
      {filteredItems?.map((item) => (
        <div key={item.ProductId} className={classes.card}>
          <div className={classes.card_content}>
            <div className={classes.img}>
              <img src={item.imageUrl} alt={item.name} />
            </div>
            <div className={classes.text}>
              <div className={classes.name}>
                <p>{item.name}</p>
              </div>
              <div className={classes.price}>
                <p>${item.price}</p>
              </div>
              <div className="purchase">
                <button
                  onClick={() => dispatch(addItem(item))}
                  className={classes.purchase_btn}
                >
                  Purchase it
                </button>
                <button
                  onClick={() => dispatch(removeItem(item))}
                  className={`${classes.purchase_btn} ${classes.remove}`}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      {filteredItems?.length === 0 && <p className={classes.no_results}>No items found.</p>}
    </div>
  );
};
export default Item;
