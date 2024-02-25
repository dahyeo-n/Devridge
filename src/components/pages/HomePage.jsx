import React, { useEffect } from 'react';
import { Map, MapMarker, useKakaoLoader } from 'react-kakao-maps-sdk';
import axios from 'axios';

function HomePage() {
  const [loading, error] = useKakaoLoader({
    appkey: `${process.env.REACT_APP_KAKAO_KEY}` // 발급 받은 APPKEY
    // ...options // 추가 옵션
  });

  const fetchdata = async () => {
    const { data } = await axios.get(`http://localhost:4000/reviews`);
    return data;
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <Map center={{ lat: 33.5563, lng: 126.79581 }} style={{ width: '100%', height: '360px' }}>
      <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}></MapMarker>
      <div style={{ color: '#000' }}>Hello World!</div>
    </Map>
  );
}

export default HomePage;
