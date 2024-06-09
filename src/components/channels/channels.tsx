import { useState } from "react";
import ReactPlayer from "react-player";

function Channels() {
  const [videoUrl, setVideoUrl] = useState(
    "https://www.youtube.com/watch?v=g2zQJB8llRk&t=1s"
  );
  const [playing, setPlaying] = useState(false);

  const handleDownload = () => {
    if (!videoUrl) return;

    const link = document.createElement("a");
    link.href = videoUrl;
    link.setAttribute("download", "video.mp4"); // Specify the file name
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Enter video URL"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
      />
      <button onClick={() => setPlaying(true)}>Play</button>
      <button onClick={handleDownload}>Download</button>
      {videoUrl && <ReactPlayer url={videoUrl} playing={playing} controls />}
    </div>
  );
}

export default Channels;
