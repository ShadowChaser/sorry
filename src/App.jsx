import React, { useState, useRef } from 'react';
import { HeartCrack, Frown, MessageCircleWarning, HeartHandshake, Heart, MoveRight, UserX, Droplets, Clock } from 'lucide-react';
import './App.css';

function App() {
  const [step, setStep] = useState(0);
  const [noPosition, setNoPosition] = useState({});

  const steps = [
    {
      icon: <MessageCircleWarning size={64} />,
      title: "I am so deeply sorry.",
      text: "I messed up really bad. My heart sinks every time I think about the thoughtless things I said. I am incredibly sorry for hurting you.",
    },
    {
      icon: <Droplets size={64} />,
      title: "I cannot stand seeing you cry.",
      text: "Knowing that my foolish words caused you pain and brought you to tears is the worst feeling in the world. I would do absolutely anything to take those tears away.",
    },
    {
      icon: <HeartCrack size={64} />,
      title: "You are everything I want.",
      text: "I shattered your trust, and I hate myself for it. Please know, you are the most important person in my life. I want you, and only you, and the thought of losing you over my own stupidity is terrifying.",
    },
    {
      icon: <UserX size={64} />,
      title: "I will spend every day making it up to you.",
      text: "I have no excuses. It was wrong. But I just want you to know how desperately I want to fix this. I am pleading for the chance to prove my love and loyalty to you.",
    },
    {
      icon: <Clock size={64} />,
      title: "I'll wait as long as it takes.",
      text: "If you need time or space, I will give it to you. I will wait forever if I have to. Because a life without you is just not a life I want.",
    },
    {
      icon: <Frown size={64} />,
      title: "I love you. I need you.",
      text: "I am an absolute idiot. But I'm an idiot who is hopelessly, completely in love with you. I need you in my life so much. I am so sorry.",
    },
    {
      icon: <HeartHandshake size={64} />,
      title: "Can you ever forgive me?",
      text: "Can you find it in your beautiful heart to forgive me just once? I promise you I will never make you feel like this again.",
      isFinal: true
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const handleEvade = () => {
    // Avoid putting it too close to the edge to prevent scrolling
    const maxX = window.innerWidth - 150; 
    const maxY = window.innerHeight - 60;
    
    const newX = Math.max(20, Math.floor(Math.random() * maxX));
    const newY = Math.max(20, Math.floor(Math.random() * maxY));

    setNoPosition({
      position: 'fixed',
      left: `${newX}px`,
      top: `${newY}px`,
      transition: 'left 0.2s ease, top 0.2s ease',
      zIndex: 999
    });
  };

  const handleForgive = () => {
    setStep(steps.length);
  };

  if (step === steps.length) {
    return (
      <div className="card-container success-container">
        <div className="icon-container hearts">
          <Heart size={80} fill="currentColor" />
        </div>
        <h1>Thank you! ❤️</h1>
        <p>You have no idea how much this means to me. I promise I won't let you down again.</p>
      </div>
    );
  }

  const currentStep = steps[step];

  return (
    <div className="card-container">
      <div className="icon-container" key={step}>
        {currentStep.icon}
      </div>
      
      <h1 key={`title-${step}`}>{currentStep.title}</h1>
      <p key={`text-${step}`}>{currentStep.text}</p>
      
      <div className="button-group">
        {!currentStep.isFinal ? (
          <button className="btn-next" onClick={handleNext}>
            Next <MoveRight size={20} />
          </button>
        ) : (
          <>
            <button className="btn-yes" onClick={handleForgive}>
              Yes, I forgive you ❤️
            </button>
            <div className="btn-wrapper-no">
              <button 
                className="btn-no" 
                style={noPosition.position ? noPosition : {}}
                onMouseEnter={handleEvade}
                onClick={handleEvade}
                onTouchStart={handleEvade}
              >
                No, never!
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
