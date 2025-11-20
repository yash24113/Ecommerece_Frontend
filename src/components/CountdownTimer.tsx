import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = ({ targetDate }: { targetDate: Date }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +targetDate - +new Date();
    let timeLeft: TimeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const TimeBox = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="bg-background rounded-full h-16 w-16 flex items-center justify-center">
        <span className="text-xl font-bold">{value.toString().padStart(2, "0")}</span>
      </div>
      <span className="text-xs mt-1">{label}</span>
    </div>
  );

  return (
    <div className="flex gap-4 items-center">
      <TimeBox value={timeLeft.days} label="Days" />
      <span className="text-2xl font-bold text-primary">:</span>
      <TimeBox value={timeLeft.hours} label="Hours" />
      <span className="text-2xl font-bold text-primary">:</span>
      <TimeBox value={timeLeft.minutes} label="Minutes" />
      <span className="text-2xl font-bold text-primary">:</span>
      <TimeBox value={timeLeft.seconds} label="Seconds" />
    </div>
  );
};

export default CountdownTimer;
