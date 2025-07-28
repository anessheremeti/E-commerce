import { createSlice } from "@reduxjs/toolkit";
import DummyData from '../../components/ItemsData/DummyData';

interface Item {
  ProductId: number;
  name: string;
  price: number;
  img: string;
  quantity: number;
}

interface ItemState {
  items: Item[];
  totalItems: number;
  subtotal: number;
  total: number;
  quantity:number,
  isClicked:boolean;
}

const initialState: ItemState = {
  items: [], 
  totalItems:  0,
  subtotal: 0,
  total: 0,
  quantity:0,
  isClicked:false,
};

interface Totals {
  subtotal: number;
  total: number;
}

const calculateTotals = (items: Item[]): Totals => {
  const subtotal = items.reduce((sum: number, item: Item) => sum + item.price * item.quantity, 0);
  const total = subtotal;
  return { subtotal, total };
};

const ItemSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
   addItem: (state, action) => {
     
      const existingItem = state.items.find((item) => item.ProductId === action.payload.ProductId);
      if (existingItem) {
        existingItem.quantity += 1;
        state.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
        state.quantity += 1;
      }
     
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      const totals = calculateTotals(state.items);
      state.subtotal = totals.subtotal;
      state.total = totals.total * 1.2;
      console.log(state.subtotal ,"subtotal")
      console.log(state.total.toFixed(2),"total"); 
     
    },
    toggleClicked:(state) => {
      state.isClicked = !state.isClicked;
    },
    removeItem: (state, action) => {
        const index = state.items.findIndex(item => item.ProductId === action.payload.ProductId);
        if (index !== -1) {
          if (state.items[index].quantity >= 1) {
            state.items[index].quantity -= 1;
            state.quantity = state.quantity - 1;
            console.log('hi');
          } else {
            state.items.splice(index, 1);
          }
        }
        if(state.quantity == 0) {
            return 
        }
        
        
        
        state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
        const totals = calculateTotals(state.items);
        state.subtotal = totals.subtotal;
        state.total = totals.total;
      },
      clearCart: (state) => {
        state.items = [];
        state.totalItems = 0;
        state.subtotal = 0;
        state.total = 0;
        state.quantity = 0;
      },
  },
});

export const { addItem, removeItem,toggleClicked,clearCart } = ItemSlice.actions;
export default ItemSlice.reducer;