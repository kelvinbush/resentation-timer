import { useEffect, useState } from "react";

function App() {
  const initialTime = 5 * 60; // 5 minutes in seconds
  const [count, setCount] = useState(initialTime);
  const [timerActive, setTimerActive] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;
    if (timerActive && count > 0 && !paused) {
      interval = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000); // Decrement count every second (1000ms)
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval); // Cleanup interval on unmount or dependency change
  }, [timerActive, count, paused]);

  const handleSpaceClick = () => {
    setCount(initialTime); // Reset count to initial time when space is clicked
    setTimerActive(true); // Start the timer
    setPaused(false); // Ensure timer is not paused
  };

  const handleResetClick = () => {
    setCount(initialTime); // Reset count to initial time
    setTimerActive(false); // Stop the timer
    setPaused(false); // Ensure timer is not paused
  };

  const handlePauseClick = () => {
    setPaused(true); // Pause the timer
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return (
      String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0")
    );
  };

  return (
    <div
      className={"h-screen bg-[#151F28]"}
      onKeyDown={(e) => {
        if (e.code === "Space") {
          handleSpaceClick();
        } else if (e.code === "KeyX") {
          handleResetClick();
        } else if (e.code === "KeyP") {
          handlePauseClick();
        }
      }}
      tabIndex={0}
    >
      <div className={"w-full mx-auto flex items-center justify-center"}>
        <img src="/mk-remove.png" alt="Mkbg" className={"h-[150px] w-auto"} />
      </div>
      <div className="text-white text-center uppercase font-bold text-[450px] font-mono">
        {formatTime(count)}
      </div>
    </div>
  );
}

export default App;
