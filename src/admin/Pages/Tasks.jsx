import '../App.css';
import { useState, useEffect } from 'react';
import logo from "../Assets/logo-renkli.png"
import Sidebar2 from '../Modals/Sidebar2';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Tasks() {

    const accessToken = sessionStorage.getItem("token");
        const navigate = useNavigate();
        if(!accessToken) {
            navigate("/");
        }
    
    //------------------------------------------------------------------------------  
    const {taskadmin} = useSelector((state) => state.taskadmin)
    console.log(taskadmin.tasks.tasks)
    const dispatch = useDispatch()
    //------------------------------------------------------------------------------   

      const getTasksByStatus = (status) => {
        if (!taskadmin.tasks || !taskadmin.tasks.tasks) {
          return [];
        }

        return taskadmin.tasks.tasks.filter((task) => task.taskStatus === status);
      };
    
      const plannedTasks = getTasksByStatus('Planned');
      const inProgressTasks = getTasksByStatus('In Progress');
      const finishedTasks = getTasksByStatus('Finished');

    if(!taskadmin.tasks){
        return null
        }
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
                                <h2 className='purple w-auto mt-3'>Proje Alanı</h2>
                                <img src={logo} className='sidebar-logo' alt="" />
                            </div>
                            <div className="row slideleft task-wrapper">
                                    {/* <form onSubmit={handleCreateUserTask}>
                                        <div className="col-8 p-0">
                                            <label>
                                                    <p className='me-3'>
                                                        Eklemek İstediğiniz Taskı Giriniz:
                                                    </p>
                                                    <input type="text" className='product-input me-3' value={newTaskValue} onChange={handleInputChange} placeholder='Taskı Giriniz'></input>
                                            </label>
                                            <button type="submit" className='buton2'>Submit</button>
                                        </div>
                                    </form> */}
                                <div className="col-4 pe-3 ps-0 ms-0">
                                    <div className="task-seperator pbg ps-3 pe-3">
                                        <h5 className='task-status'><i class="fa-solid fa-list-check ms-2 my-auto"></i> Planlandı</h5>
                                        <ul id="plan" className="task-ul">
                                            {plannedTasks.map((task, index) => (
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
                                            {inProgressTasks.map((task, index) => (
                                                <li className="task-li" key={index} style={{ boxShadow: `0 0 5px 1px yellow`}}>
                                                    <p className='task-title' >{task.taskName}</p>
                                                        <div className='task-icon'>
                                                            <i class="fa-regular fa-clock ms-2 my-auto"></i>
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
                                            {finishedTasks.map((task, index) => (
                                                <li className="task-li" key={index } style={{ boxShadow: `0 0 5px 1px #270082`}}>
                                                    <p className='task-title' >{task.taskName}</p>
                                                        <div className='task-icon'>
                                                            <i class="fa-solid fa-check-double ms-2 my-auto"></i>
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

export default Tasks;


