import React, { useEffect, useState } from 'react';

interface CountdownTimerProps {
  timeString: string; // format: 'HH:MM:SS'
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ timeString }) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    setTimeLeft(totalSeconds);
  }, [timeString]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const formatTime = (time: number) => {
    const hours = String(Math.floor(time / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="flex space-x-2 text-center">
      {formatTime(timeLeft).split(':').map((unit, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="text-xs capitalize text-[#2c7865]">
            {['Hours', 'Minutes', 'Seconds'][index]}
          </div>
          <div className="text-xl font-bold text-[#2c7865] py-2 pb-1 px-4 rounded">
            {unit}
          </div>
          
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;
