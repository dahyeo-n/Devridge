import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addPost, updatePost } from '../../redux/modules/posts';
import Header from '../commons/Header';

const WritePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [locationName, setLocationName] = useState('');
  const [locationId, setLocationId] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email, nickName } = useSelector((item) => item.user);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        setIsLoading(true);
        try {
          const response = await axios.get(`http://localhost:4000/posts/${id}`);
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
      userId: uuidv4(),
      title,
      content,
      nickname,
      password,
      email,
      createdAt: new Date().toISOString().split('T')[0], // 'YYYY-MM-DD'
      location: {
        name: locationName,
        locationId
      }
    };

    try {
      if (id) {
        // 수정 로직
        await axios.put(`http://localhost:4000/posts/${id}`, newPost);
        dispatch(updatePost({ id, ...newPost }));
        alert('게시글이 수정되었습니다.');
      } else {
        // 생성 로직
        await axios.post('http://localhost:4000/posts', newPost);
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
  const contentChangeHandler = (event) => setContent(event.target.value);
  const cancelBtnhandler = () => {
    const userConfirmed = window.confirm('변경사항이 모두 초기화됩니다. 정말 나가시겠습니까?');
    if (userConfirmed) {
      setTitle('');
      setContent('');
      navigate('/');
    }
  };

  return (
    <div>
      <Header />
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
            <StContentWriteBox
              type="text"
              value={content}
              name="content"
              placeholder="내용을 입력해주세요."
              onChange={contentChangeHandler}
              required
            />
            <StWriteCancleCompleteBtn>
              <Stbtn type="button" onClick={cancelBtnhandler}>
                Cancle
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
