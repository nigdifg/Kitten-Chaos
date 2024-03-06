import React, {useState, useEffect} from 'react'
import "./Board.css"
import Navbar from './components/Navbar';
import {useDispatch, useSelector} from "react-redux"
import { updateScore, fetchHighscore } from './redux/slices/userSlice';
import Highscore from './components/Highscore';


function Board() {
    const [deck, setDeck] = useState([])
    const [diffuseCardCount, setDiffuseCardCount] = useState(0)
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [explodeAction, setExplodeAction] = useState(false);
    const [currentCard, setCurrentCard] = useState(null)
    const [cardIsShowing, setCardIsShowing] = useState(false);

    const dispatch = useDispatch();

    const highscore = useSelector(state => state.user.highscores)


    const initializeDeck = () => {
        const cards = [
          { cardName: 'Cat card', cardTitle: 'Cat Card' },
          { cardName: 'Defuse card', cardTitle: 'Defuse ' },
          { cardName: 'Shuffle card', cardTitle: 'Shuffle card ' },
          { cardName: 'Exploding card', cardTitle: 'Exploding card ' },
        ];
        const tempDeck = [];
        
        const getRandomInt = (min, max) => {
          return Math.floor(Math.random() * (max - min + 1) + min);
        }
      
        for (let i = 0; i < 5; i++) {
          tempDeck.push(cards[getRandomInt(0, cards.length - 1)]);
        }
      
        return tempDeck;
      }

    const restartGame = () => {
        console.log("restarting ....");
        const tempDeck = initializeDeck();
        setDeck(tempDeck);
        setDiffuseCardCount(0);
        dispatch(fetchHighscore())
        setGameOver(false)
        setGameWon(false)
    }

    const handleExplodingKitten = () => {
            const tempDeck = [...deck];
            tempDeck.pop();

            if(deck.length == 1){
                dispatch(updateScore())
                setGameWon(true)
            }
            else{
                if(diffuseCardCount > 0){

                setDiffuseCardCount(prev => prev - 1);
                }
                else{
                    setGameOver(true)
                    setExplodeAction(false)
                    
                }
                // setDeck(tempDeck)
            }
    }
const handleCardShow = () => {
    const tempDeck = [...deck];
    const currCard = tempDeck[tempDeck.length-1];
    setCurrentCard(currCard)
    setCardIsShowing(true)
    setTimeout(() => {
        if(tempDeck.length === 1 && currCard.cardName !== "Shuffle card" && currCard.cardName !== "Exploding kitten card"){
            setGameWon(true)
            dispatch(updateScore())
        }

        if(currCard.cardName === "Cat card"){
            //remove card from deck
            tempDeck.pop();
            setDeck(tempDeck);
            console.log("Cat card");
        }
        else if(currCard.cardName === "Defuse card"){
            setDiffuseCardCount(prev => prev + 1)
            tempDeck.pop();
            setDeck(tempDeck);
            console.log("Defuse card");
            //count defuse card - so that it can defuse expoloding card if it comes in subsequent cards
            //also if there is any exploing card in the deck,this card can be used to defuse one bomb that may come in subsequent cards drawn from the deck.
        }
        else if(currCard.cardName === "Shuffle card"){
            console.log("Shuffle card");
            restartGame() //Restart Game 
        }
        else if(currCard.cardName === "Exploding card"){ //exploding kitten card
            if(diffuseCardCount > 0 ){ //if player has any diffuse cards
                //Game over
                // setExplodeAction(true);
                setDiffuseCardCount (diffuseCardCount - 1);
                console.log("Exploding card is Defused by using Defuse card.");
            }
            else{
                setGameOver(true)
            }
        }
        setCurrentCard(null); // set currentCard to null after 2.5 seconds
        setCardIsShowing(false)
    }, 2500)
}
    //Pop the last card ->  check what it is -> take appropriate action
    // const handleCardShow = () => {
    //     const tempDeck = [...deck];
    //     const currCard = tempDeck[tempDeck.length-1];
    //     setCurrentCard(currCard)
    //     setCardIsShowing(true)
    //     setTimeout(() => {
    //         if(tempDeck.length == 1 && currCard.cardName != "Shuffle card" && currCard.cardName != "Exploding kitten card"){
    //             setGameWon(true)
    //             dispatch(updateScore())
    //         }

    //         if(currCard.cardName == "Cat card"){
    //             //remove card from deck
    //             tempDeck.pop();
    //             setDeck(tempDeck);
    //         }
    //         else if(currCard.cardName == "Defuse card"){
    //             setDiffuseCardCount(prev => prev + 1)
    //             tempDeck.pop();
    //             setDeck(tempDeck);
    //         }
    //         else if(currCard.cardName == "Shuffle card"){
    //             restartGame() //Restart Game 
    //         }
    //         else if(currCard.cardName == "Exploding kitten card"){ //exploding kitten card
    //             if(diffuseCardCount > 0 ){ //if player has any diffuse cards
    //                 //Game over
    //                 setExplodeAction(true);
    //             }
    //             else{
    //                 setGameOver(true)
    //             }
    //         }
    //         setCurrentCard(null); // set currentCard to null after 2.5 seconds
    //         setCardIsShowing(false)
    //       }, 2500)
    // }

      
    useEffect( () => {
        const tempDeck = initializeDeck();
        setDeck(tempDeck);
    }, [])

    console.log(deck)
  return (
    <>
    <Navbar/>
    {
        gameWon ? (
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-4xl font-bold mb-4">You Won</h1>
                <button onClick={restartGame} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Restart</button>
            </div>
        ) : (
            gameOver ? (
                <div className="flex flex-col items-center justify-center h-screen">
                    <h1 className="text-4xl font-bold mb-4">Game Over</h1>
                    <button onClick={restartGame} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Restart</button>
                </div>
            ) : (
                <div className='flex lg:flex-row bg-gray-100 min-h-screen pt-10 pb-20 px-0 md:px-0'>
                    <div className="container mx-auto">
                        <div className='card-cont flex flex-wrap justify-center mb-12'>
                            {
                                deck && deck.map((card, ind) => (
                                    <div key={ind} className={`card card-${ind+1} bg-indigo-100 hover:bg-indigo-400 hover:ease-in-out-0.5s shadow-md rounded-lg p-6 m-2 w-full md:w-1/2 lg:w-1/4`}>card {ind} </div>
                                ))
                            }
                        </div>

                        {
                            currentCard && (
                                <div className='card active-card bg-indigo-400 shadow-md rounded-lg p-6 m-2 w-full md:w-1/2 lg:w-1/4 mx-auto'> 
                                    {currentCard.cardName}
                                </div>
                            )
                        }

                        { !cardIsShowing && <button className='show-btn bg-indigo-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto mt-4' onClick={handleCardShow}>show card</button>} 
                        {
                            explodeAction && <button onClick={handleExplodingKitten} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-auto mt-4">useDiffuse</button>
                        }
                        <h2 className="text-center mt-4">Diffuse Cards Available {' '} {diffuseCardCount}</h2>
                       
                    </div>
                    <div className='flex flex-auto '>
                    <Highscore highscore={highscore} />

                    </div>

                </div>
            )
        
        
      )
    }

    </>
  )
}

export default Board