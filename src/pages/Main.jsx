import React, { useState } from 'react';
import { Map, MapMarker, useKakaoLoader } from 'react-kakao-maps-sdk';
import Header from 'components/commons/Header';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useQuery } from 'react-query';
import axios from 'axios';

function Main() {
  const navi = useNavigate();
  const gotoDetailPage = (id) => {
    navi(`detail/${id}`);
  };

  const styleMap = {
    width: '50%',
    height: '360px',
    marginLeft: '140px',
    marginTop: '10px'
  };

  const [loading, error] = useKakaoLoader({
    appkey: `${process.env.REACT_APP_KAKAO_KEY}`
    // ...options // 추가 옵션
  });

  const getReview = async () => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}`);
    console.log(response.data);
    return response.data;
  };

  const { isLoading, isError, data } = useQuery('reviews', getReview);
  console.log(data);

  if (isLoading) {
    console.log('로딩중입니다.');
    // isLoading을 사용하여 데이터가 로딩중일 때 화면을 랜더링합니다.
    return <div>Loading...</div>;
  }

  if (isError) {
    // isError를 사용하여 error가 발생할 때 화면을 랜더링합니다.
    return <div>오류!!!!</div>;
  }

  return (
    <>
      <Header />

      <StDevRidgeMainContainer>
        {/* 지도 나타내는 부분 */}

        <Map center={{ lat: 37.50232863613739, lng: 127.04444701396942 }} style={styleMap}>
          {data
            .filter((data) => data)
            .map((data) => data.location)
            .map((position) => (
              <MapMarker
                key={`${position.name}-${position.latLng}`}
                position={position.latLng} // position :  마커를 표시할 위치
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

        <StDevRidgeReplyList>
          {data.map((data) => (
            <StDevRidgeReplyBorder
              key={data.reviewId}
              onClick={() => {
                gotoDetailPage(data.reviewId);
              }}
            >
              <StDevRidgeReplyInfo>
                <StDevRidgeReplyTitle>{data.title}</StDevRidgeReplyTitle>
                <StDevRidgeReplyBody>
                  <StDevRidgeReplyNickName>
                    {data.nickname}|<StDevRidgeCompanyName>{data.location.name}</StDevRidgeCompanyName>
                  </StDevRidgeReplyNickName>
                  <StDevRidgeReplyCreatedAt>{data.createdAt}</StDevRidgeReplyCreatedAt>
                </StDevRidgeReplyBody>
              </StDevRidgeReplyInfo>
              <StDevRidgeReplyContent>{data.content.slice(0, 20) + '...'}</StDevRidgeReplyContent>
            </StDevRidgeReplyBorder>
          ))}
        </StDevRidgeReplyList>
      </StDevRidgeMainContainer>
    </>
  );
}

export default Main;

const StDevRidgeMainContainer = styled.main`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StDevRidgeReplyList = styled.article`
  margin: 10px;
`;

const StDevRidgeReplyBody = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 8px;
  margin: 5px;
`;

const StDevRidgeReplyBorder = styled.figure`
  align-items: center;
  justify-content: center;
  margin: 10px;
  box-shadow: 1px 1px 1px 1px lightgray;
  width: 500px;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    box-shadow: 1px 1px 1px 1px darkgrey;
  }
`;

const StDevRidgeReplyInfo = styled.figcaption`
  margin: 10px;
`;

const StDevRidgeCompanyName = styled.b`
  font-weight: bolder;
  color: #141315;
`;

const StDevRidgeReplyNickName = styled.p`
  padding-bottom: 5px;
  color: #141315;

  padding-top: 2px;
`;
const StDevRidgeReplyContent = styled.p`
  padding-bottom: 5px;
  color: #141315;

  padding-top: 2px;
`;

const StDevRidgeReplyTitle = styled.h1`
  padding-left: 5px;
  font-size: 14px;
  font-weight: bolder;
  padding-top: 10px;
`;

const StDevRidgeReplyCreatedAt = styled.small`
  padding-left: 220px;
  color: #636263;
`;
