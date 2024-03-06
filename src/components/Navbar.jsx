import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/slices/userSlice"
import Modal from 'react-modal';
import { IoMdClose } from "react-icons/io";

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    padding: '40px 20px',
  }
};

function Navbar() {
  const userVal = useSelector(state => state.user.user)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem('user', null);
    dispatch(logoutUser())
    navigate("/login")
    console.log("logout click")
  }

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-200 p-6">
      <div className="flex items-center flex-shrink-0 text-black mr-6">
        <span className="font-semibold text-xl tracking-tight">{userVal.email}</span>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-black border-gray-800 hover:text-blue hover:border-white">
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex border-solid lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <a onClick={openModal} href="#" className="block text-xl  mt-4 lg:inline-block lg:mt-0 text-black  mr-4">
            Rules
          </a>
        </div>
        <div>
          <button onClick={handleLogout} className="inline-block px-4 py-2 leading-none border rounded text-black text-xl border-white hover:border-transparent hover:text-indigo-500 hover:bg-white mt-4 lg:mt-0">Logout</button>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className='modal-content relative bg-indigo-200' >
          <button className='absolute top-0 mt-0 text-xl p-2 right-0' onClick={closeModal}>
          <IoMdClose />

          </button>
          <h2 className='text-2xl font-bold'> Rules – </h2>
          <ul>

          <li>- If the card drawn from the deck is a cat card, then the card is removed from the deck.</li>
          <li>- If the card is exploding kitten (bomb) then the player loses the game.</li>
          <li>- If the card is a defusing card, then the card is removed from the deck. This card can be used to defuse one bomb that may come in subsequent cards drawn from the deck.</li>
          <li>- If the card is a shuffle card, then the game is restarted and the deck is filled with 5 cards again.</li>
          </ul>
        </div>
      </Modal>
    </nav>
  )
}

export default Navbar