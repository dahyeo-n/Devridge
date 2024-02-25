/*global kakao*/

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

function Write() {
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(
      search,
      (data, status, _pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
          // LatLngBounds 객체에 좌표를 추가합니다
          const bounds = new kakao.maps.LatLngBounds();
          let markers = [];

          for (let i = 0; i < data.length; i++) {
            // @ts-ignore
            markers.push({
              position: {
                lat: data[i].y,
                lng: data[i].x
              },
              content: data[i].place_name
            });
            // @ts-ignore
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }
          setMarkers(markers);
          console.log(markers);
          console.log(markers);
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
          map.setBounds(bounds);
        }
      },
      { size: 15, page: 3 }
    );
  }, [map, search]);

  const [name, setName] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();

    const obj = {
      // 아이디 ,날짜
      name,
      location: info
    };

    await axios.post(`${process.env.REACT_APP_SERVER_URL}`, obj);
  };

  return (
    <>
      {/* 검색입력폼 */}
      <form onSubmit={(e) => submitHandler(e)}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <br />
        <input type="input" value={search} onChange={(e) => setSearch(e.target.value)} />
        <button type="submit">버튼 </button>
      </form>
      <Map // 로드뷰를 표시할 Container
        center={{
          lat: 37.566826,
          lng: 126.9786567
        }}
        style={{
          width: '100%',
          height: '350px'
        }}
        level={1}
        onCreate={setMap}
      >
        {markers.map((marker) => (
          <MapMarker
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            position={marker.position}
            onClick={() => setInfo(marker)}
            title={marker.name}
          >
            {info && info.content === marker.content && <div style={{ color: '#000' }}>{marker.content}</div>}
          </MapMarker>
        ))}
      </Map>
    </>
  );
}

export default Write;
