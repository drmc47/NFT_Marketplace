import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import getProfileAdmin from "../../actions/getProfileAdmin"
import getClean from "../../actions/getClean"

export default function AdminProfile() {
   
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getProfileAdmin())
    return () => {
      dispatch(getClean())
    }
  }, [dispatch])
  const admin = useSelector((state) => state.profileAdmin)
  console.log("Información del perfil desded el Reducer:", admin[0])
  
  return ( <div>

           <h3>Bienvenido {admin[0].firstName}</h3>
           <img src={admin[0]? admin[0].image : "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Imagen_no_disponible.svg/1024px-Imagen_no_disponible.svg.png"} alt="Image Not Found" />
            
            <button>Create a new category</button>
            <button>Select an administrator</button>
            <button>Delete NFTs</button>
            <button>Change Fee price </button>

         
        </div>

        
        
  )
}
