import { useEffect } from "react"
import {useParams } from 'react-router-dom'
import getNftDetail from "../../actions/getNftDetail"
import {useDispatch} from 'react-redux'
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import getClean  from "../../actions/getClean"
import Payments from "../Payments/PaymentsButton/PaymentsButton"

export default function NftDetail() {
    const {id} = useParams();
    const dispatch=useDispatch();

    useEffect( () => {
        dispatch(getNftDetail(id))
    return () => {
        dispatch(getClean())
    }}, [id,dispatch])

    const nftDetail=useSelector(state=>state.nftDetail)
    console.log("Detalle del NFT", nftDetail)
    
    
    return <div>
        <div>
         <Link to="/">
            <button>Home</button>
            </Link>   
        </div> 
               
        {              
        nftDetail !==undefined ?      
        <div className="detail">     
                <h2>{nftDetail.name}</h2>
                <img src={nftDetail.image} alt="img"/>
                <p>{nftDetail.description}</p>
                <p>{nftDetail.price}</p>
                <br />
            <div>
                <Payments/>
            </div>
        </div>

                        
             : 
       
      <span>Loading...</span>
       

        }
        </div>
      
}