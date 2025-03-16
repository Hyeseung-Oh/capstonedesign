import React, { useState, useEffect, useRef } from "react";
import "./notice.css";
import { axiosInstance } from "../api";

const Notice = () => {
    const [notice, setNotice] = useState([]);
    const ulRef = useRef(null);

    useEffect(() => {
        const fetchNotice = async () => {
            try {
                const response = await axiosInstance.get("http://127.0.0.1:8000/api/notice/");
                const data = response.data;

                setNotice(data.notices.slice(0, 5));
            } catch (error) {
                console.error("Error fetching notice:", error);
                setNotice([]);
            }
        };

        const interval = setInterval(fetchNotice, 60000);

        fetchNotice();

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        const newsTicker = (timer) => {
            const $ul = ulRef.current;

            const tickerInterval = setInterval(() => {
                $ul.style.transitionDuration = "300ms";
                $ul.style.marginTop = "-34px";

                setTimeout(() => {
                    $ul.style.transitionDuration = "";
                    $ul.style.marginTop = "";
                    const firstChild = $ul.firstElementChild;
                    if (firstChild) {
                        $ul.removeChild(firstChild);
                        $ul.appendChild(firstChild);
                    }
                }, 400);
            }, timer);

            return () => {
                clearInterval(tickerInterval);
            };
        };

        newsTicker(3000);

    }, []);

    return (
        <div className="news-ticker">
            <ul className="notice-list" ref={ulRef}>
                {notice.map((item, index) => (
                    <li key={index} className={`notice-item`}>
                        <a href={item.link}>{item.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Notice;