import React from 'react';
import { Map, MapMarker, useKakaoLoader, CustomOverlayMap } from 'react-kakao-maps-sdk';
import Header from 'components/commons/Header';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getReviewData } from '../api/reviewData';
import { useQuery } from 'react-query';

function Main() {
  const navigate = useNavigate();
  const gotoDetailPage = (id) => {
    navigate(`detail/${id}`);
  };

  const styleMap = {
    width: '50%',
    height: '360px',
    marginLeft: '140px',
    marginTop: '40px',
    borderRadius: '5px'
  };

  const [loading, error] = useKakaoLoader({ appkey: `${process.env.REACT_APP_KAKAO_KEY}` });

  const { isLoading, isError, data } = useQuery('reviews', getReviewData);

  if (isLoading) {
    console.log('로딩중입니다.');
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>오류!!!!</div>;
  }

  const filterMapData = data.filter((data) => data).map((data) => data.location);

  return (
    <>
      <Header />

      <StDevRidgeMainContainer>
        {/* 지도 나타내는 부분 */}
        <Map center={{ lat: 37.50232863613739, lng: 127.04444701396942 }} style={styleMap}>
          {filterMapData.map((position) => (
            <>
              <MapMarker
                position={position.latLng}
                image={{
                  src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png', // 마커이미지의 주소입니다
                  size: {
                    width: 64,
                    height: 69
                  }, // 마커이미지의 크기입니다
                  options: {
                    offset: {
                      x: 27,
                      y: 69
                    } // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
                  }
                }}
              />

              <CustomOverlayMap position={position.latLng} yAnchor={1}>
                <StCustomOverlay>
                  <StCustomOverlayBlink href="#" target="_blank" rel="noreferrer">
                    <StCustomOverlayTitle>{position.name}</StCustomOverlayTitle>
                  </StCustomOverlayBlink>
                </StCustomOverlay>
              </CustomOverlayMap>
            </>
          ))}
        </Map>

        <StDevRidgeReplyList>
          {data.map((data) => (
            <StDevRidgeReplyBorder
              key={data.id}
              onClick={() => {
                gotoDetailPage(data.id);
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

const StCustomOverlay = styled.div`
  position: relative;
  bottom: 85px;
  border-radius: 6px;
  float: left;

  *:after {
    content: '';
    position: absolute;
    margin-left: -12px;
    left: 50%;
    bottom: -12px;
    width: 22px;
    height: 12px;
    background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png');
  }
`;

const StCustomOverlayBlink = styled.a`
  display: block;
  text-decoration: none;
  color: #000;
  text-align: center;
  border-radius: 6px;
  font-size: 14px;
  font-weight: bold;
  overflow: hidden;
  background: #d95050 url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png) no-repeat right 14px
    center;
`;

const StCustomOverlayTitle = styled.span`
  display: block;
  text-align: center;
  background: #fff;
  margin-right: 35px;
  padding: 10px 15px;
  font-size: 14px;
  font-weight: bold;
`;

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
  box-shadow: 1px 1px 1px 1px #ccc;
  width: 500px;

  border-radius: 10px;
  cursor: pointer;

  &:hover {
    box-shadow: 1px 1px 1px 1px #ccc;
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
