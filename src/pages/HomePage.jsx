import React, { useState } from 'react';
import { Map, MapMarker, useKakaoLoader, CustomOverlayMap } from 'react-kakao-maps-sdk';
import Header from 'components/commons/Header';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Review from 'components/commons/Review';
import { useQuery } from 'react-query';
import { getReview } from 'store/modules/reviewSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Pagination from 'components/commons/Pagination';

function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const reviewData = useSelector((state) => state.review.review);

  const [currentPage, setCurrentPage] = useState(1);

  const [postPerPage, setPostPerPage] = useState(3);

  const gotoDetailPage = (id) => {
    navigate(`detail/${id}`);
  };

  const inlineStyleMap = {
    width: '50%',
    height: '360px',
    marginLeft: '140px',
    marginTop: '40px',
    borderRadius: '5px'
  };

  const [loading, error] = useKakaoLoader({ appkey: `${process.env.REACT_APP_KAKAO_KEY}/reviews` });

  const getReviewData = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/reviews`);
    dispatch(getReview(data));
    return data;
  };

  const { isLoading, isError, data } = useQuery('reviews', getReviewData);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>오류!!!!</p>;
  }

  const filterMapData = data.filter((data) => data).map((data) => data.location);

  const lastPageIndex = currentPage * postPerPage;
  const firstPageIndex = lastPageIndex - postPerPage;

  const currentPosts = (data) => {
    let currentPosts = 0;
    currentPosts = data.slice(firstPageIndex, lastPageIndex);

    return currentPosts;
  };

  return (
    <>
      <Header />
      <StDevRidgeMainContainer>
        <Map center={{ lat: 37.3588600621634, lng: 127.10520633434606 }} style={inlineStyleMap} level={10}>
          {filterMapData.map((position) => (
            <>
              <MapMarker
                position={position.latLng}
                image={{
                  src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png',
                  size: {
                    width: 64,
                    height: 69
                  },
                  options: {
                    offset: {
                      x: 27,
                      y: 69
                    }
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
        <StDevRidgeReview>
          <Review posts={currentPosts(data)} gotoDetailPage={gotoDetailPage} />
          <Pagination postsPerPage={postPerPage} totalPosts={reviewData.length} paginate={setCurrentPage}></Pagination>
        </StDevRidgeReview>
      </StDevRidgeMainContainer>
    </>
  );
}

export default HomePage;

const StDevRidgeReview = styled.div`
  list-style-type: none;
  padding: 40px;
`;

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
