import { createContext } from "react";

const UserProgressContext = createContext({
    progress: '',
    showCart: ()=>{},
    hideCart: ()=>{},
    showCheckout: ()=>{},
    hideCheckout: ()=>{}
});

export function UserProgressProvider({children}) {
    
}
export default UserProgressContext;
