import "../style/cursor.css"
import React, { useEffect, useState } from 'react';
function isMobile() {
    // Kiểm tra kích thước màn hình
    if (window.innerWidth > 1024) {
        // Nếu kích thước nhỏ hơn hoặc bằng 1024px, kiểm tra cảm ứng
        return false;
    }
    else if (window.innerWidth <= 1024) {
        return 'ontouchstart' in window || navigator.msMaxTouchPoints;
    }
    // Nếu kích thước lớn hơn 1024px, không coi là mobile
    return false;
}


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

function MyCursor({ svgMouse, stateHover, urlImg }) {
    const [isMobileDevice, setIsMobileDevice] = useState(isMobile());
    const { x, y } = useMouse();
    useEffect(() => {
        // Sự kiện thay đổi kích thước cửa sổ
        const handleResize = () => {
            setIsMobileDevice(isMobile());
        };
        window.addEventListener("resize", handleResize);
        // Cleanup sự kiện khi component unmount
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    // lấy tọa độ chuột
    useEffect(() => {
        const cursorOutside = document.querySelector(".cursor-outside");
        const cursorInside = document.querySelector(".cursor-inside");
        const textBlockOutside = document.querySelector(".text-block-outside");
        const divBlockOutside = document.querySelector(".div-block-outside");
        if (!isMobileDevice) {
            if (cursorOutside && cursorInside && stateHover === false) {
                cursorOutside.style.cssText = cursorInside.style.cssText = `left: ${x}px; top: ${y}px;`;
                cursorInside.style.transform = 'translate(-50%, -50%) scale(1.0)';
                textBlockOutside.style.visibility = 'visible';
                divBlockOutside.classList.remove("active");
            }
            else if (cursorOutside && cursorInside && stateHover === true) {
                cursorInside.style.cssText = `left: ${x}px; top: ${y}px;`;
                cursorInside.style.transform = 'translate(-50%, -50%) scale(1.25)';
                cursorOutside.style.cssText = `transition: 0.35s linear;left: ${x}px; top: ${y}px;`
                textBlockOutside.style.visibility = 'hidden';
                divBlockOutside.classList.add("active");
            }
        }
        else {
            textBlockOutside.style.display = cursorInside.style.display = cursorOutside.style.display = 'none'
        }
    }, [x, y, stateHover, isMobileDevice])
    return (
        <>
            <div className="cursor-outside">
                <div className="div-block-outside">
                    <img src={urlImg} alt="img-hoverMouse"></img>
                </div>
                <div className="text-block-outside"></div>
            </div >
            <div className="cursor-inside">
                <p className="svg-inside">
                    <img className="iconMouse" src={svgMouse} alt="svg-inMouse" />
                </p>
            </div>
        </>
    );
};

export default MyCursor;
