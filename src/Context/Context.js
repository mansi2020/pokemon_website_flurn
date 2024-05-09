import { createContext, useState,useContext } from "react";


// create common context
const UserContext = createContext({
  setUpdatedPokeList : ()=>{},
  showData:true,
  setShowData : ()=>{},
  
});



const ContextProvider = ({children})=>{
  const [updatedPokeList, setUpdatedPokeList] = useState([]);
    const [showData,setShowData] = useState(true);
    const [bookmarkStatus, setBookmarkStatus] = useState({});
  return (
    <UserContext.Provider value={{updatedPokeList,setUpdatedPokeList,showData,setShowData,bookmarkStatus, setBookmarkStatus}}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, ContextProvider};