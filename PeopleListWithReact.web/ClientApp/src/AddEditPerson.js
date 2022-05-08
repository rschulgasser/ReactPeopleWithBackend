import React from 'react';


export default function AddPersonForm({ firstName, lastName, age, onTextChange, onAddClick,
     isEditting, onUpdateClick, onCancelClick}) {
     
   
    return <div>
       <div className="row">
           <div className="col-md-3">
           <input value={firstName} onChange={onTextChange} name='firstName' type="text" className="form-control" placeholder="First Name" />
        </div>
        <div className="col-md-3">
        <input value={lastName} onChange={onTextChange} name='lastName' type="text" className="form-control" placeholder="Last Name" />
        </div>
        <div className="col-md-3">
        <input value={age}  onChange={onTextChange} name='age' type="text" className="form-control" placeholder="Age" />
        </div>
        <div className="col-md-3">
        
        {!isEditting?<button className="btn btn-primary btn-block" onClick={onAddClick}>Add</button>: <div>
                <button onClick={onUpdateClick} className="btn btn-warning btn-block">Update</button>
                <button onClick={onCancelClick} className="btn btn-info btn-block">Cancel</button>
                </div>}
        </div>
        </div>
    </div>
}