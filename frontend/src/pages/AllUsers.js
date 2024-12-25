import React, { useEffect, useState } from 'react'
import summeryApi from '../common'
import { toast } from 'react-toastify';
import moment from 'moment';
import {MdModeEdit} from 'react-icons/md'
import ChangeUserRole from '../components/ChangeUserRole';


const AllUsers = () => {
 
    const [allUsers, setAllUsers] = useState([])
    const [openUpdateUser, setOpenUpdateUser] = useState(false)
    const [updateUserDetails, setUpdateUserDetails] = useState({
      email: '',
      name: '',
      role: '',
      _id: ''
    })
    
    const fetchAllUsers = async () =>{
        const fetchData = await fetch(summeryApi.Allusers.url,{
            method: summeryApi.Allusers.method,
            credentials: 'include'
        })

        const dataResponse = await fetchData.json()

        if (dataResponse.success) {
          setAllUsers(dataResponse.data)
        }
        if (dataResponse.error) {
          toast.error(dataResponse.message)
        }
    }

    useEffect(()=>{
        fetchAllUsers()
    },[])

  return (
    <div className='bg-white pb-4'>
      <table  className='w-full userTable'>
        <thead>
          <tr className='bg-black text-white '>
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
          
        </thead>

        <tbody className=''>
          {
              allUsers.map((el,index)=>{
                return(
                  <tr>
                    <td>00{index+1}</td>
                    <td>{el?.name}</td>
                    <td>{el?.email}</td>
                    <td>{el?.role}</td>
                    <td>{moment(el?.createdAt).format('LL')}</td>
                    <td>
                      <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white' 
                        onClick={()=>{
                          setUpdateUserDetails(el)
                          setOpenUpdateUser(true)}
                        }

                        >
                        <MdModeEdit/>
                      </button>
                    </td>
                   
                  </tr>
                )
              })
          }
        </tbody>
      </table>



      {
        openUpdateUser && (
          <ChangeUserRole 
          onClose={()=>setOpenUpdateUser(false)}
          name={updateUserDetails.name} 
          email= {updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFunc={fetchAllUsers}
          />
        )
          

        
      }
      
    </div>
  )
}

export default AllUsers
