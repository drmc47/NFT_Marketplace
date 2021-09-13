import React, { useEffect,useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import getProfileAdmin from "../../actions/getProfileAdmin"
import getClean from "../../actions/getClean"
import postCategorie from "../../actions/admin/postCategorie"
import { getCategories } from '../../actions/getCategories'
import {deleteCategory} from '../../actions/admin/deleteCategory'
import { deleteNFT } from '../../actions/admin/deleteNFT'
import { getNFTs } from '../../actions/getNFTs'
import { getUsers } from '../../actions/admin/getUsers'
import usersToAdmin from '../../actions/admin/usersToAdmin'




export default function AdminProfile() {
   
  const dispatch = useDispatch();
  
  const categoriesDB=useSelector(state=>state.categories)
  const nfts=useSelector(state=>state.allNFTs)
  const users=useSelector(state=>state.allUsers)
  
  
  
  useEffect(() => {
    dispatch(getCategories())
    dispatch(getNFTs())
    dispatch(getUsers())
    // dispatch(getProfileAdmin())
    // return () => {
    //   dispatch(getClean())
    // }
  }, [dispatch])
  
  // const admin = useSelector((state) => state.profileAdmin)
  

  const [inputs,setInputs]=useState({
    nameCategory: "",
    deleteCategory: "",
    deleteNFT: [],
    users:[]
  })

  function onInputChange(e) {
    if (e.target.name === "deleteNFT" || e.target.name === "users") {
      const arrays= inputs[e.target.name];
         setInputs({
        ...inputs,
        [e.target.name]: arrays.concat(e.target.value),
      });
    } else {
      setInputs({ ...inputs, [e.target.name]: e.target.value }); 
    }
  }
  
  
  async function handleSubmit(e) {
     e.preventDefault()
     const category ={name:inputs.nameCategory}
     dispatch(postCategorie(category))
     alert('Category created')
     dispatch(getCategories())
     setInputs({nameCategory:""})
     
 }
 async function handleDelete(e) {
  e.preventDefault()
  dispatch(deleteCategory(inputs.deleteCategory))
  alert('Category deleted')
  dispatch(getCategories())
  setInputs({deleteCategory:""})
  
}
async function handleDeleteNFT(e) {
  e.preventDefault()
  dispatch(deleteNFT(inputs.deleteNFT))
  alert('NFT deleted')
  dispatch(getNFTs())
  setInputs({deleteNFT:""})
  
}

async function handleRole(e) {
  e.preventDefault()
  dispatch(usersToAdmin(inputs.users))
  alert('Role changed')
  dispatch(getUsers())
  setInputs({users:""})
  
}
  
  return ( <div>

           <h3>Bienvenido
              {/* {admin[0].firstName} */}
              </h3>
           {/* <img src={admin[0]? admin[0].image : "" /> */}
            
            <h3>Modify categories </h3>
            <h4>Add</h4>
            <label>Name</label>
            <input
            required
            type="text"
            name="nameCategory"
            placeholder="New category"
            value={inputs.nameCategory}
            onChange={(e)=>onInputChange(e)}
            />
            <button onClick={handleSubmit}>Create!</button>

            <form onSubmit={(e)=>handleDelete(e)}>
            <h4>Delete</h4>
            <label htmlFor="">Categories</label> 
            <select required name="deleteCategory" onChange={(e)=>onInputChange(e)} defaultValue="">
            <option value="">Choose categories</option>
            {categoriesDB.map((cat)=>(
              <option key={cat._id} name={cat.name} value={cat._id}>{cat.name?.charAt(0).toUpperCase()+cat.name?.slice(1)}</option>
            ))}
           </select>
           <button type="submit">Delete!</button>
            </form>

            <form name="deleteNFT" onSubmit={(e)=>handleDeleteNFT(e)}>
            <h3>Delete NFT</h3>
            <label htmlFor="">NFTs</label>             
            <div>
              {nfts.map((n) => (
                <div key={n._id}>
                  <input
                    type="checkbox"
                    name="deleteNFT"
                    value={n._id}
                    onChange={(e)=>onInputChange(e)}
                    ></input>
                    <div>
                  <label name={n.name}> {n.name} </label>
                  <img src={n.image} alt="NFT image" width="60" height="60"/>
                  </div>
                </div>
              ))}
            </div>            
           <button type="submit">Delete!</button>
            </form>

            <form name="users" 
            onSubmit={(e)=>handleRole(e)}
            >
            <h3>Change role</h3>
            <label htmlFor="">Users To Admin</label>             
            <div>
              {users.map((u) => (
                <div key={u}>
                  <input
                    type="checkbox"
                    name="users"
                    value={u}
                    onChange={(e)=>onInputChange(e)}
                    ></input>
                    <div>
                  <label name={u}> {u} </label>
                  </div>
                </div>
              ))}
            </div>            
           <button type="submit">Change!</button>
            </form>

            

   
           
            {/* <button>Change Fee price </button>  */}

         
        </div>

        
        
  )
}
