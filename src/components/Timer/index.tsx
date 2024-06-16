import { createSignal, createEffect } from 'solid-js';
import { styled } from 'solid-styled-components';

const Timer = () => {
  const [time, setTime] = createSignal(30);
  const [remainingTime, setRemainingTime] = createSignal(time());
  const [isRunning, setIsRunning] = createSignal(false);
  let interval: NodeJS.Timeout;

  const startTimer = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!isRunning()) {
      setIsRunning(true);

      interval = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev === 1) {
            document.body.style.backgroundColor = 'red';
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const stopTimer = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    setIsRunning(false);
    clearInterval(interval);
  };

  const resetTimer = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    stopTimer(event);
    setRemainingTime(time());
    document.body.style.backgroundColor = 'transparent';
  };

  const restartTimer = (event: Event) => {
    resetTimer(event);
    startTimer(event);
  };

  const handleDefaultTimeChange = (event: Event) => {
    const newValue = Math.max(
      parseInt((event.target as HTMLInputElement).value) || 0,
      1,
    );
    setTime(newValue);
    setRemainingTime(newValue);
  };

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    time %= 3600;
    const minutes = Math.floor(time / 60);
    time %= 60;
    const seconds = time % 60;

    if (hours === 0) {
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  createEffect(() => {
    if (!isRunning()) {
      clearInterval(interval);
    }
  });

  return (
    <TimerContainer onClick={restartTimer}>
      <h1>{formatTime(remainingTime())}</h1>
      <input
        title="Enter time in seconds"
        type="number"
        value={time()}
        onInput={handleDefaultTimeChange}
        disabled={isRunning()}
        onClick={(e) => e.stopPropagation()}
      />
      <button onClick={startTimer} disabled={isRunning()}>
        Start
      </button>
      <button
        onClick={stopTimer}
        disabled={!isRunning() || remainingTime() === 0}
      >
        Stop
      </button>
      <button onClick={resetTimer}>Reset</button>
    </TimerContainer>
  );
};

const TimerContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  height: 100vh;
  justify-content: center;
`;

export default Timer;
