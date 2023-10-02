import React from 'react'

const RegisterForm = ({ 
        handleSubmit, 
        name, 
        setName, 
        email, 
        setEmail, 
        password, 
        setPassword
    }) => {
  return (
      <form className="mt-3" onSubmit={handleSubmit}>
        <div className='form-group'>
          <label className='form-label mb-3'>Your Name</label>
          <input 
            type="text" 
            className="form-control" 
            placeholder='Enter name' 
            value={name} 
            onChange={(e) =>{setName(e.target.value)}}
          />
        </div>

        <div className='form-group mb-3'>
          <label className='form-label'>Your Email</label>
          <input
            type="text" 
            className="form-control" 
            placeholder='Enter email' 
            value={email} 
            onChange={(e) =>{setEmail(e.target.value)}}
          />
        </div>

        <div className='form-group mb-3'>
          <label className='form-label'>Your Password</label>
          <input 
            type="password" 
            className="form-control" 
            placeholder='Enter name' 
            value={password} 
            onChange={(e) =>{setPassword(e.target.value)}}
          />
        </div>

        <button disabled={!name || !email || !password} className='btn btn-primary' type="submit">Submit</button> 
    </form>
  );
}

export default RegisterForm;