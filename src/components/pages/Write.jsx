import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addPost, updatePost } from '../../store/modules/posts';
import Layout from '../commons/Layout';

const WritePage = () => {
  const [title, setTitle] = useState('');
  const [nickname, setNickname] = useState('');
  const [content, setContent] = useState('');
  const [password, setPassword] = useState('');
  const [locationName, setLocationName] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        setIsLoading(true);
        try {
          const response = await axios.get(`http://localhost:4000/reviews/${id}`);
          setTitle(response.data.title);
          setContent(response.data.content);
        } catch (error) {
          alert('게시물이 존재하지 않습니다.');
          navigate('/');
        }
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [id, navigate]);

  const submitPostHandle = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const newPost = {
      id: uuidv4(),
      title,
      content,
      nickname,
      password,
      createdAt: new Date().toISOString().split('T')[0], // 'YYYY-MM-DD'
      location: {
        name: locationName
      }
    };

    try {
      if (id) {
        // 수정 로직
        await axios.put(`http://localhost:4000/reviews/${id}`, newPost);
        dispatch(updatePost({ id, ...newPost }));
        alert('게시글이 수정되었습니다.');
      } else {
        // 생성 로직
        await axios.post('http://localhost:4000/reviews', newPost);
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
        <form onSubmit={submitPostHandle}>
          <div>
            <StTitleWriteBox
              type="text"
              value={title}
              name="title"
              placeholder="제목을 입력해주세요."
              onChange={titleChangeHandler}
              required
            />
            <StNicknameWriteBox
              type="text"
              value={nickname}
              name="nickname"
              placeholder="닉네임을 입력해주세요."
              onChange={nicknameChangeHandler}
              required
            />
            <StLocationNameWriteBox
              type="text"
              value={locationName}
              name="locationName"
              placeholder="재직하셨던 회사명을 입력해주세요."
              onChange={locationNameChangeHandler}
              required
            />
            <StContentWriteBox
              type="text"
              value={content}
              name="content"
              placeholder="내용을 입력해주세요."
              onChange={contentChangeHandler}
              required
            />
            <StPasswordWriteBox
              type="password"
              value={password}
              name="password"
              placeholder="비밀번호 4자리"
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

const StContentWriteBox = styled.input`
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
