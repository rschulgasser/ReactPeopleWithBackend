import React from 'react';

export default function AddPersonForm({person, onEditClick, onDeleteClick, onCheckClick, checked, onTextChange, check}) {
    
    const { firstName, lastName, age}=person;

   
    return <tr>
        <td>  <input checked={checked} onChange={onCheckClick} name='checked' type='checkbox' className='form-control' /></td>
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{age}</td>
        <td><button className='btn btn-warning' onClick={onEditClick} >Edit</button> <button onClick={onDeleteClick} className='btn btn-danger' >Delete</button></td>
        </tr>
}