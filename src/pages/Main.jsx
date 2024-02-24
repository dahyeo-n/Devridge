import React, { useEffect, useState } from 'react';
import { Map, MapMarker, useKakaoLoader } from 'react-kakao-maps-sdk';
import axios from 'axios';
import Header from 'components/commons/Header';
import { useNavigate } from 'react-router-dom';

function Main() {
  const [loading, error] = useKakaoLoader({
    appkey: `${process.env.REACT_APP_KAKAO_KEY}`
    // ...options // 추가 옵션
  });

  const [mockData, setMockData] = useState([]);

  const fetchData = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}`);
    setMockData(data);
    return data;
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filTerArray = mockData.filter((data) => data).map((data) => data.location);
  console.log(filTerArray);
  const navi = useNavigate();

  return (
    <>
      <Header />

      <section style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        {/* 지도 나타내는 부분 */}

        <Map center={{ lat: 37.50232863613739, lng: 127.04444701396942 }} style={{ width: '50%', height: '360px' }}>
          {filTerArray.map((position) => (
            <MapMarker
              key={`${position.name}-${position.latlng}`}
              position={position.latlng} // position :  마커를 표시할 위치
              image={{
                src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png', // 마커이미지의 주소입니다
                size: {
                  width: 24,
                  height: 35
                } // size :   마커이미지의 크기입니다
              }}
              title={position.name} // title :  마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            />
          ))}
        </Map>

        <article>
          <figure>
            {/* 사용자 글 리스트를 나타내는 부분    */}
            {mockData.map((data) => (
              <div key={data.password}>
                <h1>{data.reviewTitle}</h1>
                <small>{data.nickname}</small>
                <p>{data.content.slice(1, 10) + '...'}</p>
                <small>{data.createdAt}</small>
                <button
                  onClick={() => {
                    navi(`detail/${data.password}`);
                  }}
                >
                  이동
                </button>
              </div>
            ))}
          </figure>
        </article>
      </section>
    </>
  );
}

export default Main;
