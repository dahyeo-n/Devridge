/*global kakao*/

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addPost, updatePost } from '../../store/modules/posts';
import Layout from '../commons/Layout';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const WritePage = () => {
  const [title, setTitle] = useState('');
  const [nickname, setNickname] = useState('');
  const [content, setContent] = useState('');
  const [password, setPassword] = useState('');
  const [locationName, setLocationName] = useState('');
  const [errors, setErrors] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const [selectedMarkerInfo, setSelectedMarkerInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [mapInstance, setMapInstance] = useState();

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        setIsLoading(true);
        try {
          const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/${id}`);
          setTitle(response.data.title);
          setContent(response.data.content);
        } catch (error) {
          alert('게시물이 존재하지 않습니다.');
          navigate('/');
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchPost();
  }, [id, navigate]);

  useEffect(() => {
    if (!mapInstance) return;

    const placeSearchService = new kakao.maps.services.Places();
    placeSearchService.keywordSearch(
      locationName,
      (data, status, _pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          // 검색된 장소 위치 기준으로 지도 범위를 재설정하기 위해 LatLngBounds 객체에 좌표 추가
          const bounds = new kakao.maps.LatLngBounds();
          let searchResultsMarkers = [];

          for (let i = 0; i < data.length; i++) {
            searchResultsMarkers.push({
              position: {
                lat: data[i].y,
                lng: data[i].x
              },
              content: data[i].place_name
            });
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }
          setMarkers(searchResultsMarkers);
          console.log(searchResultsMarkers);
          // 검색된 장소 위치를 기준으로 지도 범위 재설정
          mapInstance.setBounds(bounds);
        }
      },
      { size: 15, page: 3 }
    );
  }, [mapInstance, locationName]);

  // Validation logic
  const validateInput = () => {
    let errors = {};
    if (password.length !== 4) {
      errors.password = '비밀번호는 4자리여야 합니다.';
    }
    if (title.length < 10 || title.length > 40) {
      errors.title = '제목은 최소 10자에서 최대 40자여야 합니다.';
    }
    if (nickname.length < 1 || nickname.length > 10) {
      errors.nickname = '닉네임은 최소 1자에서 최대 10자여야 합니다.';
    }
    if (content.length < 10 || content.length > 300) {
      errors.content = '내용은 최소 10자에서 최대 300자여야 합니다.';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const submitPostHandler = async (event) => {
    event.preventDefault();
    if (!validateInput() || !selectedMarkerInfo) return;

    setIsLoading(true);
    const newPost = {
      id: uuidv4(),
      title,
      content,
      nickname,
      password,
      createdAt: new Date().toLocaleString('ko-KR'), // 'YYYY년 MM월 DD일'
      location: {
        name: locationName,
        locationId: '2',
        latLng: {
          lat: selectedMarkerInfo.position.lat,
          lng: selectedMarkerInfo.position.lng
        }
      }
    };
    // console.log(newPost);

    try {
      if (id) {
        // 수정 로직
        await axios.put(`${process.env.REACT_APP_SERVER_URL}/${id}`, newPost);
        dispatch(updatePost({ id, ...newPost }));
        alert('게시글이 수정되었습니다.');
      } else {
        // 생성 로직
        await axios.post(`${process.env.REACT_APP_SERVER_URL}`, newPost);
        dispatch(addPost(newPost));
        alert('새 게시글이 추가되었습니다.');
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving the post: ', error);
      alert('게시글 저장에 실패하였습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const submitCompanylocationInfoHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${process.env.REACT_APP_SERVER_URL}`, { location: selectedMarkerInfo });
    } catch (error) {
      alert('회사 위치 정보를 불러오는 데 실패했습니다.');
      console.log('Error => ', error);
    }
  };

  const titleChangeHandler = (event) => setTitle(event.target.value);
  const nicknameChangeHandler = (event) => setNickname(event.target.value);
  const locationNameChangeHandler = (event) => setLocationName(event.target.value);
  const contentChangeHandler = (event) => setContent(event.target.value);
  const passwordChangeHandler = (event) => setPassword(event.target.value);
  const cancelBtnhandler = () => {
    const userConfirmed = window.confirm('변경사항이 모두 초기화됩니다. 정말 나가시겠습니까?');
    if (userConfirmed) {
      setTitle('');
      setNickname('');
      setLocationName('');
      setContent('');
      setPassword('');
      navigate('/');
    }
  };

  return (
    <div>
      <Layout />
      <StPageWide>
        <form onSubmit={(e) => submitPostHandler(e)}>
          <div>
            <StTitleWriteBox
              type="text"
              value={title}
              name="title"
              placeholder="제목을 입력해주세요."
              maxLength="40"
              minLength="10"
              onChange={titleChangeHandler}
              required
            />
            {errors.title && <p style={{ color: 'red' }}>{errors.title}</p>}
            <StNicknameWriteBox
              type="text"
              value={nickname}
              name="nickname"
              placeholder="닉네임을 입력해주세요."
              maxLength="10"
              minLength="1"
              onChange={nicknameChangeHandler}
              required
            />
            <StLocationNameWriteBox
              type="input"
              value={locationName}
              name="locationName"
              placeholder="재직하셨던 회사명을 입력해주세요."
              onChange={(e) => locationNameChangeHandler(e)}
              required
            />
            <button type="button" onClick={submitCompanylocationInfoHandler}>
              등록
            </button>
            <Map // 로드뷰 표시할 Container
              center={{
                lat: 37.566826,
                lng: 126.9786567
              }}
              style={{
                width: '100%',
                height: '350px'
              }}
              level={1}
              onCreate={setMapInstance}
            >
              {markers.map((marker) => (
                <MapMarker
                  key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
                  position={marker.position}
                  onClick={() => setSelectedMarkerInfo(marker)}
                >
                  {selectedMarkerInfo && selectedMarkerInfo.content === marker.content && (
                    <div style={{ color: '#000' }}>{marker.content}</div>
                  )}
                </MapMarker>
              ))}
            </Map>
            <StContentWriteBox
              as="textarea"
              value={content}
              name="content"
              placeholder="내용을 입력해주세요."
              maxLength="300"
              minLength="10"
              onChange={contentChangeHandler}
              required
            />
            <StPasswordWriteBox
              type="password"
              value={password}
              name="password"
              placeholder="비밀번호 4자리"
              maxLength="4"
              minLength="4"
              onChange={passwordChangeHandler}
              required
            />
            <StWriteCancleCompleteBtn>
              <Stbtn type="button" onClick={cancelBtnhandler}>
                Cancel
              </Stbtn>
              <Stbtn type="submit" disabled={isLoading}>
                {isLoading ? 'in progress...' : 'Complete'}
              </Stbtn>
            </StWriteCancleCompleteBtn>
          </div>
        </form>
      </StPageWide>
    </div>
  );
};

export default WritePage;

const StPageWide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  font-weight: 200;
  width: 100%;
  height: 800px;
  min-width: 800px;
  margin: auto;
  padding: auto;
  background-color: #1c1c20 !important;
  color: #fff !important;
  border-radius: 20px;
  font-size: x-large;
`;

const StTitleWriteBox = styled.input`
  width: 700px;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  padding: 15px;
  margin: 20px 10px 0px 10px;
  border-radius: 10px;
  background-color: #1c1c20 !important;
  font-size: 36px;
  line-height: 230%;
  font-weight: bold;
  /* font-weight: 400; */
  letter-spacing: -0.02px;
  color: #7472e7;
`;

const StNicknameWriteBox = styled.input`
  width: 700px;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  padding: 15px;
  margin: 20px 10px 0px 10px;
  border-radius: 10px;
  background-color: #1c1c20 !important;
  font-size: 36px;
  line-height: 230%;
  font-weight: bold;
  /* font-weight: 400; */
  letter-spacing: -0.02px;
  color: #7472e7;
`;

const StLocationNameWriteBox = styled.input`
  width: 700px;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  padding: 15px;
  margin: 20px 10px 0px 10px;
  border-radius: 10px;
  background-color: #1c1c20 !important;
  font-size: 36px;
  line-height: 230%;
  font-weight: bold;
  /* font-weight: 400; */
  letter-spacing: -0.02px;
  color: #7472e7;
`;

const StContentWriteBox = styled.textarea`
  width: 700px;
  height: 100px;
  padding: 15px;
  margin: 0px 10px 0px 10px;
  border-radius: 10px;
  background-color: #1c1c20 !important;
  color: #fff !important;
  font-size: 28px;
  font-weight: 600;
  align-items: baseline;
`;

const StPasswordWriteBox = styled.input`
  width: 700px;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  padding: 15px;
  margin: 20px 10px 0px 10px;
  border-radius: 10px;
  background-color: #1c1c20 !important;
  font-size: 36px;
  line-height: 230%;
  font-weight: bold;
  /* font-weight: 400; */
  letter-spacing: -0.02px;
  color: #7472e7;
`;

const StWriteCancleCompleteBtn = styled.div`
  display: flex;
  justify-content: flex-end;
  border-radius: 10px;
  margin: 20px 10px 0px 0px;
`;

const Stbtn = styled.button`
  border: none;
  margin: 10px;
  padding: 10px;
  font-size: medium;
  color: white;
  background-color: #3e3e3e;
  border-radius: 10px;
`;
