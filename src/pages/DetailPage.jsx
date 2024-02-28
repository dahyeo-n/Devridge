import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from 'components/commons/Header';
import Button from 'components/commons/Button';
import { getReview } from 'store/modules/reviewSlice';
import axios from 'axios';

function DetailPage() {
  const params = useParams();
  const id = params.id;
  const reduxReviews = useSelector((state) => state.review.review);
  const [review] = reduxReviews.filter((review) => review.id === id);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: mutateToDelete } = useMutation({
    mutationFn: async (id) => await axios.delete(`${process.env.REACT_APP_SERVER_URL}/${id}`),
    onSuccess: async () => {
      await queryClient.invalidateQueries(['reviews']);
    }
  });

  const passwordEditHandler = (e) => {
    e.preventDefault();

    if (password === '') {
      return alert('비밀번호를 입력해주십시오.');
    }
    if (+review.password !== +password) {
      return alert('비밀번호가 틀렸습니다.');
    }
    dispatch(getReview(review));
    navigate(`/write/${id}`);
  };

  const passwordDeleteHandler = (e) => {
    e.preventDefault();

    if (password === '') {
      return alert('비밀번호를 입력해주십시오.');
    }

    if (+review.password !== +password) {
      return alert('비밀번호가 틀렸습니다.');
    }
    if (window.confirm('정말 삭제하시겠습니까?')) {
      mutateToDelete(review.id);
      navigate('/');
    }
  };

  return (
    <>
      <Header />
      <PageContainer>
        <DetailContainer>
          <Title maxLength="10">{review.title}</Title>
          <NicknameAndDate>{review.nickname + ' | ' + review.createdAt}</NicknameAndDate>
          <CompanyName>{review.location.name}</CompanyName>
          <Content>{review.content}</Content>
          <SelectionContainer>
            <PasswordInput
              type="password"
              placeholder="비밀번호를 입력해주세요."
              value={password}
              minLength="4"
              maxLength="4"
              onChange={(e) => {
                if (isNaN(e.target.value)) {
                  setPassword('');
                  return alert('비밀번호는 숫자를 입력해주십시오.');
                }
                setPassword(e.target.value);
              }}
            />
            <Button onClick={(e) => passwordEditHandler(e)} label="Edit" />
            <Button onClick={(e) => passwordDeleteHandler(e)} label="Delete" />
          </SelectionContainer>
        </DetailContainer>
      </PageContainer>
    </>
  );
}

export default DetailPage;

const PageContainer = styled.div`
  display: flex;
  background-color: lightGray;
  height: 105vh;
  align-items: center;
  flex-direction: column;
`;

const DetailContainer = styled.div`
  display: flex;
  width: 500px;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h1`
  background-color: white;
  height: 40px;
  width: 100%;
  font-size: 20px;
  padding: 10px;
  margin: 10px;
  border-width: 0px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  box-shadow: 1px 1px 1px 1px #ccc;
  border-radius: 10px;
`;

const NicknameAndDate = styled.p`
  background-color: white;
  padding: 10px;
  width: 100%;
  height: 40px;
  font-size: 15px;
  text-align: right;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  box-shadow: 1px 1px 1px 1px #ccc;
  border-radius: 10px;
`;

const CompanyName = styled.p`
  background-color: white;
  margin: 10px 0px 0px 0px;
  padding: 10px;
  width: 100%;
  height: 40px;
  font-size: 15px;
  text-align: right;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  box-shadow: 1px 1px 1px 1px #ccc;
  border-radius: 10px;
`;

const Content = styled.p`
  background-color: white;
  height: 500px;
  width: 100%;
  font-size: 20px;
  line-height: 150%;
  padding: 10px;
  margin: 10px 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  box-shadow: 1px 1px 1px 1px #ccc;
  border-radius: 10px;
`;

const SelectionContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 10px;
  justify-content: flex-end;
  flex-direction: rows;
`;

const PasswordInput = styled.input`
  width: 160px;
  border-width: 0px;
  box-shadow: 1px 1px 1px 1px #ccc;
  border-radius: 10px;
  margin-right: 10px;
`;
