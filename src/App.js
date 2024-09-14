import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css'; // Make sure to import the CSS file

const initialMessages = [
  { id: 1, sender: 'ansem', content: 'lets get to pumpin my n*ggaz', timestamp: '6:00 PM', avatar: './ansem.jpg' },
  { id: 2, sender: 'wolf', content: 'wolf reporting for shill duty', timestamp: '6:01 PM', avatar: './wolf.jpg' },
  { id: 3, sender: 'mitch', content: 'aped 5 Sol now Im getting a message dont nuke', timestamp: '6:02 PM', avatar: './mitch.jpg' },
  { id: 4, sender: 'yelo', content: '🖍️🖍️🖍️🖍️', timestamp: '6:02 PM', avatar: './yelo.jpg' },
  { id: 5, sender: 'slingoor', content: 'could send', timestamp: '6:02 PM', avatar: './sling.jpg' },
];

function App() {
  const [fallingBenjis, setFallingBenjis] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);
  const messagesLoadedRef = useRef(false); // Ref to track if messages are already loaded

  // Load initial messages only once
  useEffect(() => {
    const loadMessages = async () => {
      if (!messagesLoadedRef.current) {
        messagesLoadedRef.current = true; // Set the flag to true to prevent reloading
        for (const message of initialMessages) {
          await new Promise(resolve => setTimeout(resolve, 1500));
          setChatMessages(prevMessages => [...prevMessages, message]);
        }
      }
    };
    loadMessages();
  }, []);

  useEffect(() => {
    const createFallingBenji = () => {
      const newBenji = {
        id: Date.now(),
        left: Math.random() * 100,
        animationDuration: 5 + Math.random() * 5,
      };
      setFallingBenjis(prevBenjis => [...prevBenjis, newBenji]);

      setTimeout(() => {
        setFallingBenjis(prevBenjis => prevBenjis.filter(benji => benji.id !== newBenji.id));
      }, newBenji.animationDuration * 1000);
    };

    const intervalId = setInterval(createFallingBenji, 500);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const sendMessage = () => {
    if (inputText.trim() === '') return;

    const newMessage = {
      id: Date.now(),
      sender: 'You',
      content: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: '/api/placeholder/40/40',
    };

    setChatMessages(prevMessages => [...prevMessages, newMessage]);
    setInputText('');
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-[#32FF53] relative overflow-clip">
      <div className='absolute top-5 text-xs md:text-lg font-semibold'>CA: </div>
      <img src="b.png" className='w-[45%] md:w-[35%] absolute left-0 bottom-0' alt="Background" />

      {fallingBenjis.map(benji => (
        <img 
          key={benji.id}
          src="money.png"
          alt="Falling Benji"
          className="falling-money"
          style={{
            left: `${benji.left}%`,
            animationDuration: `${benji.animationDuration}s`,
          }}
        />
      ))}

      <div className="w-80 md:w-96 h-[600px] bg-white rounded-2xl border flex flex-col z-10 relative overflow-hidden">
        <div className="bg-gray-100 p-4 flex items-center justify-between">
          <div className="flex items-center">
            <ChevronLeft className="text-blue-500 mr-2" />
            <h1 className="text-xl font-semibold">breadwinnaz</h1>
          </div>
          <div className="flex space-x-1">
            <a href="https://x.com/makingbreadsol" className='transition ease-in-out duration-150'>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className='size-8 md:size-10 md:hover:scale-105 transition ease-in-out duration-150 cursor-pointer' fill="#000000" viewBox="0 0 50 50">
                <path d="M 6.9199219 6 L 21.136719 26.726562 L 6.2285156 44 L 9.40625 44 L 22.544922 28.777344 L 32.986328 44 L 43 44 L 28.123047 22.3125 L 42.203125 6 L 39.027344 6 L 26.716797 20.261719 L 16.933594 6 L 6.9199219 6 z"></path>
              </svg>
            </a>
            <a href="https://t.me/getthisbreadportal" className='transition ease-in-out duration-150'>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className='size-8 md:size-10 md:hover:scale-105 transition ease-in-out duration-150 cursor-pointer' fill="#33aaff" viewBox="0 0 50 50">
                <path d="M46.137,6.552c-0.75-0.636-1.928-0.727-3.146-0.238l-0.002,0C41.708,6.828,6.728,21.832,5.304,22.445	c-0.259,0.09-2.521,0.934-2.288,2.814c0.208,1.695,2.026,2.397,2.248,2.478l8.893,3.045c0.59,1.964,2.765,9.21,3.246,10.758	c0.3,0.965,0.789,2.233,1.646,2.494c0.752,0.29,1.5,0.025,1.984-0.355l5.437-5.043l8.777,6.845l0.209,0.125	c0.596,0.264,1.167,0.396,1.712,0.396c0.421,0,0.825-0.079,1.211-0.237c1.315-0.54,1.841-1.793,1.896-1.935l6.556-34.077	C47.231,7.933,46.675,7.007,46.137,6.552z M22,32l-3,8l-3-10l23-17L22,32z"></path>
              </svg>
            </a>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-white" style={{ backgroundImage: 'linear-gradient(180deg, #f0f0f0 0%, #ffffff 100%)' }}>
          <AnimatePresence>
            {chatMessages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'} ${index > 0 && message.sender === chatMessages[index - 1].sender ? 'mt-1' : 'mt-4'}`}
              >
                {message.sender !== 'You' && (index === 0 || message.sender !== chatMessages[index - 1].sender) && (
                  <img src={message.avatar} alt={message.sender} className="w-8 h-8 rounded-full mr-2 mb-auto" />
                )}
                <div className={`flex flex-col ${message.sender === 'You' ? 'items-end' : 'items-start'}`}>
                  {(index === 0 || message.sender !== chatMessages[index - 1].sender) && message.sender !== 'You' && (
                    <span className="text-xs text-gray-500 mb-1">{message.sender}</span>
                  )}
                  <div className={`${message.sender === 'You' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'} rounded-2xl p-2 px-4 max-w-[70%] flex justify-center`}>
                    <p>{message.content}</p>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">{message.timestamp}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
        <div className="p-4 bg-gray-100">
          <div className="flex items-center bg-white rounded-full border border-gray-300 overflow-hidden">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="iMessage"
              className="flex-1 p-2 px-4 focus:outline-none"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white px-4 py-2 rounded-full flex justify-center"
              aria-label="Send message"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;