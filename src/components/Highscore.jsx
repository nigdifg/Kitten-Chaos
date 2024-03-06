import React from 'react'
// import "./componentsStyle.css"

function Highscore({highscore}) {

    function extractNameFromEmail(email) {
        const atIndex = email.indexOf('@');
        return email.substring(0, atIndex);
    }

  return (
    <div className='highscore-cont bg-white shadow-md rounded-lg p-10 m-2 w-full my-auto mt-20 md:w-1/2 lg:w-1/2 mx-auto'>
        <h1 className="text-2xl font-bold mb-4">Leaderboard <br /> {' '} 
        <span className='bg-indigo-200 rounded-xl'>

        (Top score)
        </span>
        </h1>
        <div className='highscore text-black' >
          {
            Array.isArray(highscore) && highscore.map( (user, ind) => (
              <p key={ind} className="border-b border-gray-200 py-2"> {extractNameFromEmail(user.email)} {' - '}  {user.score}</p>
            ))
          }
        </div>
    </div>
  )
}

export default Highscore