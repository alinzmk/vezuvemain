import '../App.css';
import { useState } from 'react';
import logo from "../Assets/logo-renkli.png"
import Sidebar2 from '../Modals/Sidebar2';
import { useEffect } from 'react';
import axios from 'axios';
import { getUserTasks, setUserTasks, createUserTask } from '../AdminApiService';

function Products() {

    const [userTasks, setTasks] = useState(null); // State to store user tasks data
    const [newTaskValue, setNewTaskValue] = useState('');
    const accessToken = localStorage.getItem("token"); // Replace with the actual access token
    const [userId, setUserId] = useState(123); // Replace with actual user ID
    const [customerId, setCustomerId] = useState(456); // Replace with actual customer ID
    const [column, setColumn] = useState('your-column'); // Replace with actual column
    const [newValue, setNewValue] = useState('your-new-value'); // Replace with actual new value
    const [taskName, setTaskName] = useState('your-task-name'); // Replace with actual task name

    
    // ADD TASK
    const handleCreateUserTask = async () => {
      try {
        const result = await createUserTask(accessToken, customerId, taskName);
  
        if (result.status === 200) {
          console.log('User task created successfully!');
        } else {
          console.error('Failed to create user task.');
        }
      } catch (error) {
        console.error('Error creating user task:', error);
        throw error;
      }
    };

    const handleInputChange = (event) => {
        setNewTaskValue(event.target.value);
    };


   // SET TASK
   const handleSetUserTasks = async () => {
     try {
       const result = await setUserTasks(accessToken, userId, column, newValue, customerId);
 
       if (result.status === 200) {
         console.log('User tasks set successfully!');
       } else {
         console.error('Failed to set user tasks.');
       }
     } catch (error) {
         console.error('Error setting user tasks:', error);
        throw error;

     }
   };

    useEffect(() => {
       //GET TASKS
        const getUserTask = async () => {
            try {
            const result = await getUserTasks(accessToken, userId, customerId);
            setUserTasks(result.tasks);
            } catch (error) {
                throw error;
            }
        };

        getUserTask();
    }, [accessToken, userId, customerId]); // Add accessToken, userId, and customerId to dependencies if you want to refetch data when they change
  

/*     const planTasks = tasksData.filter(task => task.status === 'plan');
    const processTasks = tasksData.filter(task => task.status === 'process');
    const finishedTasks = tasksData.filter(task => task.status === 'finished'); */
    
  return (
    <>
        <div className="dashboard m-0">
            <div className="row d-flex ">
                <div className="p-0">
                    <Sidebar2/>
                </div>
                <div className="container mt-4 slideleft right">
                    <div className="row">
                        <div className="col-12">
                            <div className="row mb-4 d-flex justify-content-between me-5">
                                <h2 className='purple w-auto mt-3'>Proje Alanı: Müşteri İsim Soyisim</h2>
                                <img src={logo} className='sidebar-logo' alt="" />
                            </div>
                            <div className="row slideleft task-wrapper">
                                <div className="task-add">
                                <form onSubmit={handleCreateUserTask}>
                                    <div className="col-8 p-0">
                                        <label>
                                                <p className='me-3'>
                                                    Eklemek İstediğiniz Taskı Giriniz:
                                                </p>
                                                <input type="text" className='product-input me-3' value={newTaskValue} onChange={handleInputChange} placeholder='Taskı Giriniz'></input>
                                        </label>
                                        <button type="submit" className='buton2'>Submit</button>
                                    </div>
                                </form>
                                </div>
                                <div className="col-4 pe-3 ps-0 ms-0">
                                    <div className="task-seperator pbg ps-3 pe-3">
                                        <h5 className='task-status'><i class="fa-solid fa-list-check ms-2 my-auto"></i> Planlandı</h5>
                                        <ul id="plan" className="task-ul">
                                            {userTasks.planTasks.map((task, index) => (
                                                <li className="task-li" key={index} style={{ boxShadow: `0px 0px 5px 1px #FA58B6`}}>
                                                    <p className='task-title' >{task.taskName}</p>
                                                    <div className='task-icon-admin dropdown'>                
                                                            <button class="btn btn-outline-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                            <i class="fa-solid fa-list-check my-auto"></i>
                                                            </button>
                                                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                                <li><a class="dropdown-item" href="#">Plan</a></li>
                                                                <li><a class="dropdown-item" href="#">Process</a></li>
                                                                <li><a class="dropdown-item" href="#">Finished</a></li>
                                                            </ul>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-4 pe-3 ps-0 ms-0">
                                    <div className="task-seperator pbg ps-3 pe-3">
                                        <h5 className='task-status'><i class="fa-regular fa-clock ms-2 my-auto"></i> Süreç İşliyor</h5>
                                        <ul id="process" className="task-ul">
                                            {userTasks.processTasks.map((task, index) => (
                                                <li className="task-li" key={index} style={{ boxShadow: `0 0 5px 1px yellow`}}>
                                                    <p className='task-title' >{task.taskName}</p>
                                                        <div className='task-icon-admin dropdown'>                
                                                                <button class="btn btn-outline-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                                    <i class="fa-regular fa-clock my-auto"></i>
                                                                </button>
                                                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                                    <li><a class="dropdown-item" href="#">Plan</a></li>
                                                                    <li><a class="dropdown-item" href="#">Process</a></li>
                                                                    <li><a class="dropdown-item" href="#">Finished</a></li>
                                                                </ul>
                                                        </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-4 pe-3 ps-0 ms-0">
                                    <div className="task-seperator pbg ps-3 pe-3">
                                        <h5 className='task-status'><i class="fa-solid fa-check-double ms-2 my-auto"></i> Tamamlandı</h5>
                                        <ul id="finished" className="task-ul">
                                            {userTasks.finishedTasks.map((task, index) => (
                                                <li className="task-li" key={index } style={{ boxShadow: `0 0 5px 1px #270082`}}>
                                                    <p className='task-title' >{task.taskName}</p>
                                                        <div className='task-icon-admin dropdown'>                
                                                                <button class="btn btn-outline-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                                    <i class="fa-solid fa-check-double my-auto"></i>
                                                                </button>
                                                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                                    <li><a class="dropdown-item" href="#">Plan</a></li>
                                                                    <li><a class="dropdown-item" href="#">Process</a></li>
                                                                    <li><a class="dropdown-item" href="#">Finished</a></li>
                                                                </ul>
                                                        </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}

export default Products;


