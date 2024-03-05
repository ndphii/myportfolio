import iconMouse from "./asset/icon/mouse.svg"
import iconEyeVisible from './asset/icon/eyevisible.svg'
import './App.css';
import React, { useState, useRef } from 'react';
import { Banner } from './componets/banner';
import MyCursor from "./componets/cursor-content";


function App() {
  const [isHovered, setIsHovered] = useState(false);
  const [svgMouse, setSvgMouse] = useState({ src: iconMouse });
  const [urlImgIsHover, setUrlImgIsHover] = useState({ src: "" });
  const aRef = useRef(null);
  const handleMouseEnter = (e) => {
    const url = e.target.dataset.url;
    setUrlImgIsHover({ src: url });
    setIsHovered(true);
    setSvgMouse({
      src: iconEyeVisible,
    })
  };
  const handleMouseLeave = () => {
    setUrlImgIsHover({ src: "" });
    setIsHovered(false);
    setSvgMouse({
      src: iconMouse,
    })
  };
  return (
    <>
      <MyCursor svgMouse={svgMouse.src} stateHover={isHovered} urlImg={urlImgIsHover.src} />
      <div className="App">
        <div className="App-header">
          <div className="banner"><h1>{`Hi! I'm Duc Phi `}<span><Banner /></span></h1></div>

          {/* <a
          ref={aRef}
          className="Link"
          alt="go home"
          rel="noopener noreferrer"
          data-url="https://dennissnellenberg.com/media/pages/work/aanstekelijk/bef2894a92-1687423090/thumbnail-aanstekelijk.jpg"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >App
        </a> */}
          <div className="list-project">
            <a ref={aRef} href="https://www.behance.net/ndphii/moodboards" target="_blank" rel="noopener noreferrer">
              <p data-url="https://dennissnellenberg.com/media/pages/work/aanstekelijk/bef2894a92-1687423090/thumbnail-aanstekelijk.jpg"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                1. project 1
              </p>
            </a>
            <a ref={aRef} href="https://www.behance.net/ndphii/moodboards" target="_blank" rel="noopener noreferrer">
              <p data-url="https://dennissnellenberg.com/media/pages/work/fabric/b0f1607937-1688453092/thumbnail-fabric-darkgray.jpg"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                2. project 2
              </p>
            </a>
            <a ref={aRef} href="https://www.behance.net/ndphii/moodboards" target="_blank" rel="noopener noreferrer">
              <p data-url="https://dennissnellenberg.com/media/pages/work/base-create/15ac739d82-1680179645/thumbnail-base-desktop.jpg"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                3. project 3
              </p>
            </a>
            <a ref={aRef} href="https://www.behance.net/ndphii/moodboards" target="_blank" rel="noopener noreferrer">
              <p data-url="https://dennissnellenberg.com/media/pages/work/avvr/5f20b9a876-1672918357/thumbnail-avvr-v2.jpg"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                4. project 4
              </p>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
