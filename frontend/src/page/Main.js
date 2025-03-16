import React, { useState, useEffect } from "react";
import "./Mainmap.css";
import mapImage from "../image/map.jpg";
import building from "../image/buildingbtn.png"
import busstop from "../image/busstopbtn.png"
import searchbtn from "../image/searchbtn.png"
import busbtn from "../image/busbtn.png"
import bitcrowdbtn from "../image/bitcrowdbtn.png"
import cafe from "../image/cafe.png"
import mart from "../image/mart.png"
import crowdbtn from "../image/crowdbtn.png"
import smoothbtn from "../image/smoothbtn.png"
import Imagebutton from "../component/imagebutton";
import Notice from "../component/notice";
import Hoverbutton from '../component/hoverbutton';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from "../api";


export default function App() {
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
    const [congestion, setCongestion] = useState(-1);

    useEffect(() => {
        const fetchCongestion = async () => {
            try {
                const response = await axiosInstance.get('http://127.0.0.1:8000/api/congestion/');
                const data = response.data;
                setCongestion(data.congestion_level);
            } catch (error) {
                console.error(error);
            }
        };

        const interval = setInterval(fetchCongestion, 30000);

        fetchCongestion();

        return () => clearInterval(interval);
    }, []);

    // congestion 값에 따라서 다른 이미지 버튼을 보여줌
    let RestImage;
    if (congestion === null) {
        // congestion 값이 아직 초기화되지 않은 경우 로딩 화면을 보여줌
        RestImage = <Hoverbutton className="D16" type={"congestion"} image={smoothbtn} alt="art_restaurant" buildingName="원활" />;
    } else if (congestion === "혼잡") {
        RestImage = <Hoverbutton className="D16" type={"congestion"} image={crowdbtn} alt="art_restaurant" buildingName="혼잡" />;
    } else if (congestion === "약간 혼잡") {
        RestImage = <Hoverbutton className="D16" type={"congestion"} image={bitcrowdbtn} alt="art_restaurant" buildingName="약간 혼잡" />;
    } else {
        RestImage = <Hoverbutton className="D16" type={"congestion"} image={smoothbtn} alt="art_restaurant" buildingName="원활" />;
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const navigate = useNavigate();

    const handleClick = (path, buildingname, floornumber, buildname) => {
        navigate(path, { state: { buildingname, floornumber, buildname } });
    }

    return (
        <div className="main">
            <div className="container" style={{ overflow: 'hidden', touchAction: 'none' }}>
                <div className="head">
                    <div className="time">{currentTime}</div>
                    <div className="notice">
                        <Notice />
                    </div>
                </div>
                <div className="bottom">
                    <Imagebutton className="busbtn" type={"bottom"} image={busbtn} alt="building button" onClick={() => handleClick("/Bus")} />
                    <Imagebutton className="searchbtn" type={"bottom"} image={searchbtn} alt="building button" onClick={() => handleClick("/Search")} />
                </div>
                <TransformWrapper
                    options={{
                        disabled: false,
                        limitToBounds: false
                    }}
                >
                    {({ zoomIn, zoomOut, resetTransform }) => (
                        <React.Fragment>
                            <TransformComponent
                                style={{
                                    PointerEvent: 'none'
                                }}>
                                <div id="map">
                                    <img src={mapImage} alt="map_image" />

                                    <img className="cafe1" src={cafe} alt="카페" />
                                    <img className="cafe2" src={cafe} alt="카페" />
                                    <img className="cafe3" src={cafe} alt="카페" />
                                    <img className="cafe4" src={cafe} alt="카페" />
                                    <img className="cafe5" src={cafe} alt="카페" />
                                    <img className="cafe6" src={cafe} alt="카페" />
                                    <img className="cafe7" src={cafe} alt="카페" />

                                    <img className="mart1" src={mart} alt="편의점" />
                                    <img className="mart2" src={mart} alt="편의점" />
                                    <img className="mart3" src={mart} alt="편의점" />
                                    <img className="mart4" src={mart} alt="편의점" />
                                    <Hoverbutton className="D1" type={"building"} image={building} alt="building hoverbutton" buildingName="창업보육센터" />
                                    <Imagebutton className="D2" type={"building"} image={building} alt="building button" buildingName="공학관, 제2산학협력관" onClick={() => handleClick("/D2/1", "D2", 1)} />
                                    <Hoverbutton className="D3" type={"building"} image={building} alt="building hoverbutton" buildingNumber="D3" buildingName="해양바이오산업연구센터" />
                                    <Hoverbutton className="D4" type={"building"} image={building} alt="building hoverbutton" buildingNumber="D4" buildingName="중앙기기센터" />
                                    <Hoverbutton className="D5" type={"building"} image={building} alt="building hoverbutton" buildingNumber="D5" buildingName="성도미니코관" />
                                    <Hoverbutton className="D6" type={"building"} image={building} alt="building hoverbutton" buildingNumber="D6" buildingName="성이시도르관" />
                                    <Hoverbutton className="D7" type={"building"} image={building} alt="building hoverbutton" buildingNumber="D7" buildingName="약학관" />
                                    <Hoverbutton className="D8" type={"building"} image={building} alt="building hoverbutton" buildingNumber="D8" buildingName="정보통신관" />
                                    <Hoverbutton className="D9" type={"building"} image={building} alt="building hoverbutton" buildingNumber="D9" buildingName="성토마스관" />
                                    <Hoverbutton className="D10" type={"building"} image={building} alt="building hoverbutton" buildingNumber="D10" buildingName="제2약학관" />
                                    <Hoverbutton className="D11" type={"building"} image={building} alt="building hoverbutton" buildingNumber="D11" buildingName="성마르타관" />
                                    <Hoverbutton className="D12" type={"building"} image={building} alt="building hoverbutton" buildingNumber="D12" buildingName="미대실습동" />
                                    <Hoverbutton className="D13" type={"building"} image={building} alt="building hoverbutton" buildingNumber="D13" buildingName="미대 창고" />
                                    <Hoverbutton className="D15" type={"building"} image={building} alt="building hoverbutton" buildingNumber="D15" buildingName="성카타리나관" />
                                    {RestImage}
                                    <Hoverbutton className="D17" type={"building"} image={building} alt="building hoverbutton" buildingNumber="D17" buildingName="성체칠리아관" />
                                    <Hoverbutton className="D18" type={"building"} image={building} alt="building hoverbutton" buildingNumber="D18" buildingName="성안나관" />
                                    <Hoverbutton className="D19" type={"building"} image={building} alt="building hoverbutton" buildingNumber="D19" buildingName="용해로실" />

                                    <Hoverbutton className="A1" type={"building"} image={building} alt="building hoverbutton" buildingNumber="A1" buildingName="본관" />
                                    <Imagebutton className="A2" type={"building"} image={building} alt="building button" buildingName="교양관" onClick={() => handleClick("/A2/1", "A2", 1)} />
                                    <Hoverbutton className="A3" type={"building"} image={building} alt="building hoverbutton" buildingNumber="A3" buildingName="종합민원센터" />
                                    <Hoverbutton className="A4" type={"building"} image={building} alt="building hoverbutton" buildingNumber="A4" buildingName="팔각정" />
                                    <Imagebutton className="A6" type={"building"} image={building} alt="building button" buildingName="제1학생회관" onClick={() => handleClick("/A6/1", "A6", 1)} />
                                    <Hoverbutton className="A7" type={"building"} image={building} alt="building hoverbutton" buildingNumber="A7" buildingName="제2학생회관" />
                                    <Imagebutton className="A8" type={"building"} image={building} alt="building button" buildingName="중앙도서관" onClick={() => handleClick("/A8/1", "A8", 1)} />
                                    <Hoverbutton className="A9" type={"building"} image={building} alt="building hoverbutton" buildingNumber="A9" buildingName="종합강의동" />
                                    <Hoverbutton className="A10" type={"building"} image={building} alt="building hoverbutton" buildingNumber="A10" buildingName="사육장" />
                                    <Hoverbutton className="A11" type={"building"} image={building} alt="building hoverbutton" buildingNumber="A11" buildingName="중앙도서관 관외보존서고" />
                                    <Hoverbutton className="A13" type={"building"} image={building} alt="building hoverbutton" buildingNumber="A13" buildingName="영선실" />

                                    <Hoverbutton className="C1" type={"building"} image={building} alt="building hoverbutton" buildingNumber="C1" buildingName="성토마스모어관" />
                                    <Hoverbutton className="C2" type={"building"} image={building} alt="building hoverbutton" buildingNumber="C2" buildingName="성라이문도관" />
                                    <Hoverbutton className="C3" type={"building"} image={building} alt="building hoverbutton" buildingNumber="C3" buildingName="체육관" />
                                    <Hoverbutton className="C4" type={"building"} image={building} alt="building hoverbutton" buildingNumber="C4" buildingName="성비토관" />
                                    <Hoverbutton className="C5" type={"building"} image={building} alt="building hoverbutton" buildingNumber="C5" buildingName="사제관" />
                                    <Hoverbutton className="C6" type={"building"} image={building} alt="building hoverbutton" buildingNumber="C6" buildingName="신학관" />
                                    <Hoverbutton className="C7" type={"building"} image={building} alt="building hoverbutton" buildingNumber="C7" buildingName="성예로니모관" />
                                    <Hoverbutton className="C8" type={"building"} image={building} alt="building hoverbutton" buildingNumber="C8" buildingName="창고" />
                                    <Hoverbutton className="C9" type={"building"} image={building} alt="building hoverbutton" buildingNumber="C9" buildingName="성요한보스코관" />
                                    <Hoverbutton className="C10" type={"building"} image={building} alt="building hoverbutton" buildingNumber="C10" buildingName="제3학생식당" />
                                    <Hoverbutton className="C11" type={"building"} image={building} alt="building hoverbutton" buildingNumber="C11" buildingName="미래인재관" />
                                    <Hoverbutton className="C12" type={"building"} image={building} alt="building hoverbutton" buildingNumber="C12" buildingName="성야고보관" />
                                    <Hoverbutton className="C13" type={"building"} image={building} alt="building hoverbutton" buildingNumber="C13" buildingName="성마태오관" />

                                    <Hoverbutton className="B1" type={"building"} image={building} alt="building hoverbutton" buildingNumber="B1" buildingName="취창업관" />
                                    <Hoverbutton className="B2" type={"building"} image={building} alt="building hoverbutton" buildingNumber="B2" buildingName="제르멩관" />
                                    <Hoverbutton className="B3" type={"building"} image={building} alt="building hoverbutton" buildingNumber="B3" buildingName="성당(교목처)" />
                                    <Hoverbutton className="B4" type={"building"} image={building} alt="building hoverbutton" buildingNumber="B4" buildingName="국제관" />
                                    <Hoverbutton className="B5" type={"building"} image={building} alt="building hoverbutton" buildingNumber="B5" buildingName="학생군사교육단" />
                                    <Hoverbutton className="B6" type={"building"} image={building} alt="building hoverbutton" buildingNumber="B6" buildingName="역사박물관" />
                                    <Hoverbutton className="B7" type={"building"} image={building} alt="building hoverbutton" buildingNumber="B7" buildingName="강당" />
                                    <Hoverbutton className="B8" type={"building"} image={building} alt="building hoverbutton" buildingNumber="B8" buildingName="산학협력관" />

                                    <Hoverbutton className="E1" type={"building"} image={building} alt="building hoverbutton" buildingNumber="E1" buildingName="성바오로문화관" />
                                    <Hoverbutton className="E3" type={"building"} image={building} alt="building hoverbutton" buildingNumber="E3" buildingName="기숙사 아마레관" />
                                    <Hoverbutton className="E4" type={"building"} image={building} alt="building hoverbutton" buildingNumber="E4" buildingName="기숙사 행정동" />
                                    <Hoverbutton className="E5" type={"building"} image={building} alt="building hoverbutton" buildingNumber="E5" buildingName="기숙사 예지관" />
                                    <Hoverbutton className="E6" type={"building"} image={building} alt="building hoverbutton" buildingNumber="E6" buildingName="기숙사 세르비레관" />
                                    <Hoverbutton className="E7" type={"building"} image={building} alt="building hoverbutton" buildingNumber="E7" buildingName="기숙사 효성관" />
                                    <Hoverbutton className="E8" type={"building"} image={building} alt="building hoverbutton" buildingNumber="E8" buildingName="기숙사 성김대건관" />
                                    <Hoverbutton className="E9" type={"building"} image={building} alt="building hoverbutton" buildingNumber="E9" buildingName="기숙사 다솜관" />
                                    <Hoverbutton className="E10" type={"building"} image={building} alt="building hoverbutton" buildingNumber="E10" buildingName="기숙사 참인재관" />
                                    <Hoverbutton className="E11" type={"building"} image={building} alt="building hoverbutton" buildingNumber="E11" buildingName="성이윤일관, 입학처" />
                                    <Hoverbutton className="E12" type={"building"} image={building} alt="building hoverbutton" buildingNumber="E12" buildingName="대가빌라 1동" />
                                    <Hoverbutton className="E13" type={"building"} image={building} alt="building hoverbutton" buildingNumber="E13" buildingName="대가빌라 2동" />

                                    <Hoverbutton className="AT1" type={"building"} image={building} alt="building hoverbutton" buildingNumber="AT1" buildingName="김종복 미술관 / 체력증진센터" />
                                    <Hoverbutton className="AT2" type={"building"} image={building} alt="building hoverbutton" buildingNumber="AT2" buildingName="효음아트홀" />
                                    <Hoverbutton className="AT3" type={"building"} image={building} alt="building hoverbutton" buildingNumber="AT3" buildingName="청년희망공작소" />
                                    <Hoverbutton className="AT4" type={"building"} image={building} alt="building hoverbutton" buildingNumber="AT4" buildingName="약초원" />
                                    <Hoverbutton className="AT5" type={"building"} image={building} alt="building hoverbutton" buildingNumber="AT5" buildingName="온실" />

                                    <Imagebutton className="busstop1" type={"building"} image={busstop} alt="building button" onClick={() => handleClick("/Bus")} />
                                    <Imagebutton className="busstop2" type={"building"} image={busstop} alt="building button" onClick={() => handleClick("/Bus")} />
                                    <Imagebutton className="busstop3" type={"building"} image={busstop} alt="building button" onClick={() => handleClick("/Bus")} />
                                    <Imagebutton className="busstop4" type={"building"} image={busstop} alt="building button" onClick={() => handleClick("/Bus")} />
                                    <Imagebutton className="busstop5" type={"building"} image={busstop} alt="building button" onClick={() => handleClick("/Bus")} />
                                    <Imagebutton className="busstop6" type={"building"} image={busstop} alt="building button" onClick={() => handleClick("/Bus")} />
                                </div>
                            </TransformComponent>
                        </React.Fragment>
                    )}
                </TransformWrapper>
            </div>
        </div>
    );
}