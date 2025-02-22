import React from 'react'

function Register() {
    return (
        // <div className='register-main-content'>
        //     <div className='register-card'>

        //     </div>
        // </div>

        <div className='register-main'>
      <div className='container'>
        <h1 className='register-h1'>Register</h1>
        <div className='enterarea'>
          <input id='register' type="text" required />
          <div className='lebelline'>Enter your email</div>
        </div>
        <br />
        <div className='enterarea'>
          <input id='register' type="text" required />
          <div className='lebelline'>Enter your name</div>
        </div>
        <br />
        <div  id='register' className='enterarea'>
          <input type="text" required />
          <div className='lebelline'>Enter your password</div>
        </div>

       
      </div>
    </div>

    )
}

export default Register