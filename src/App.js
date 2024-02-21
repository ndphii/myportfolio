import logo from './logo.svg';
import iconMouse from "./asset/icon/mouse.svg"
import iconEyeVisible from './asset/icon/eyevisible.svg'
import './App.css';
import React, { useEffect, useState, useRef } from 'react';
// import Test from './componets/test';
function useMouse() {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });

  useEffect(() => {
    function handle(e) {
      setMousePosition({
        x: e.pageX,
        y: e.pageY
      });
    }

    document.addEventListener("mousemove", handle);

    return () => document.removeEventListener("mousemove", handle);
  }, []);

  return mousePosition;
}

window.addEventListener("load", (e) => {
  // thêm đoạn text chạy tròn quanh con chuột
  const str = " ゜Graphic Design  ゜ UI/UX Design ";
  const text = document.querySelector(".text-block-outside");
  for (let i = 0; i < str.length; i++) {
    let span = document.createElement("span");
    span.innerHTML = str[i];
    text.appendChild(span);
    span.style.transform = `rotate(${11 * i}deg) `;
  }

});

function App() {
  const { x, y } = useMouse();
  const [svgMouse, setSvgMouse] = useState({
    src: iconMouse,
  })
  const [isHovered, setIsHovered] = useState(false);
  const [cursorInsideStyle, setCursorInsideStyle] = useState({
    transform: 'translate(-50%, -50%) scale(1.0)',

  });

  const aRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setCursorInsideStyle({
      transform: 'translate(-50%, -50%) scale(1.4)',
    });
    setSvgMouse({
      src: iconEyeVisible,
    })
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCursorInsideStyle({
      transform: 'translate(-50%, -50%) scale(1.0)',
    });
    setSvgMouse({
      src: iconMouse,
    })
  };

  useEffect(() => {
    const cursorOutside = document.querySelector(".cursor-outside");
    const cursorInside = document.querySelector(".cursor-inside");
    if (cursorOutside && cursorInside) {
      cursorOutside.style.cssText = cursorInside.style.cssText = `left: ${x}px; top: ${y}px;`;
      cursorInside.style.transform = cursorInsideStyle.transform;
    }
  }, [x, y, cursorInsideStyle]);

  return (
    <div className="App">
      {/* <Test /> */}
      <div className="App-header">
        <img src={logo} className="App-logo" alt="" />
        <div onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
          {isHovered.toString()}
        </div>
        <a
          ref={aRef}
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >link
        </a>
        <div className="cursor-outside">
          <p className="text-block-outside"></p>
        </div>
        <div className="cursor-inside">
          <p className="svg-inside">
            <img className="iconMouse" src={svgMouse.src} alt="" />
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
