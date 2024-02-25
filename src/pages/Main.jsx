import React, { useEffect, useState } from 'react';
import { Map, MapMarker, useKakaoLoader } from 'react-kakao-maps-sdk';
import Header from 'components/commons/Header';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useQuery } from 'react-query';
import axios from 'axios';

function Main() {
  const [loading, error] = useKakaoLoader({
    appkey: `${process.env.REACT_APP_KAKAO_KEY}`
    // ...options // 추가 옵션
  });

  const getReview = async () => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}`);
    return response.data;
  };

  const { data } = useQuery('reviews', getReview);
  console.log(data);

  const navi = useNavigate();

  const gotoDetailPage = (id) => {
    navi(`detail/${id}`);
  };

  const filTerArray = data.filter((data) => data).map((data) => data.location);

  const styleMap = {
    width: '50%',
    height: '360px',
    marginLeft: '140px',
    marginTop: '10px'
  };

  return (
    <>
      <Header />

      <StDevRidgeMainContainer>
        {/* 지도 나타내는 부분 */}

        <Map center={{ lat: 37.50232863613739, lng: 127.04444701396942 }} style={styleMap}>
          {filTerArray.map((position) => (
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
                <StDevRidgeReplyNickName>{data.nickname}</StDevRidgeReplyNickName>
                <StDevRidgeReplyTitle>{data.reviewTitle.slice(0, 50) + '....'}</StDevRidgeReplyTitle>
              </StDevRidgeReplyInfo>
              <StDevRidgeReplyCreatedAt>{data.createdAt}</StDevRidgeReplyCreatedAt>
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

const StDevRidgeReplyBorder = styled.figure`
  margin: 10px;
  box-shadow: 1px 1px 1px 1px lightgray;
  width: 300px;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    box-shadow: 1px 1px 1px 1px darkgrey;
  }
`;

const StDevRidgeReplyInfo = styled.figcaption`
  margin: 10px;
`;

const StDevRidgeReplyNickName = styled.h1`
  padding-bottom: 5px;
  color: #141315;
  font-weight: 700;
  padding-top: 2px;
`;

const StDevRidgeReplyTitle = styled.h4`
  padding-left: 10px;
  font-size: 12px;
  padding-top: 10px;
`;

const StDevRidgeReplyCreatedAt = styled.small`
  font-size: small;
  padding-left: 220px;
  color: #636263;
`;
