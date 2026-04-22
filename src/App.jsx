import React, { useState, useRef } from 'react';
import { HeartCrack, Frown, MessageCircleWarning, HeartHandshake, Heart, MoveRight, UserX, Droplets, Clock } from 'lucide-react';
import './App.css';

function App() {
  const [step, setStep] = useState(0);
  const [noPosition, setNoPosition] = useState({});

  const steps = [
    {
      icon: <MessageCircleWarning size={64} />,
      title: "I messed up really bad.",
      text: "I want to sincerely apologize for my slip of the mouth. What I said was completely out of line, thoughtless, and deeply hurtful.",
    },
    {
      icon: <Droplets size={64} />,
      title: "I hate that I made you cry.",
      text: "Knowing that my careless words caused you pain and brought you to tears is tearing me apart. You did not deserve to be hurt like that.",
    },
    {
      icon: <HeartCrack size={64} />,
      title: "I broke your trust.",
      text: "Trust is everything, and I shattered it in a moment of sheer stupidity. I can't express how horrible I feel for letting you down so badly.",
    },
    {
      icon: <UserX size={64} />,
      title: "I have no excuses.",
      text: "I take full responsibility. I am not trying to defend what I did. It was just plain wrong, and I regret it more than words can say.",
    },
    {
      icon: <Clock size={64} />,
      title: "I'll give you time.",
      text: "I know sorry doesn't magically fix things, and if you need space, I understand. But please know, I am committed to healing the damage I caused.",
    },
    {
      icon: <Frown size={64} />,
      title: "I am an idiot.",
      text: "I really am an idiot. But I'm an idiot who deeply values you, respects you, and wants to make things right. I promise I will be better.",
    },
    {
      icon: <HeartHandshake size={64} />,
      title: "Can you forgive me?",
      text: "Can you find it in your beautiful heart to forgive this absolute idiot just once?",
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
