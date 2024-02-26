import React, { useState } from 'react';
import styled from 'styled-components';
import { deleteReview } from 'api/reviews';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Detail() {
  const reduxReview = useSelector((state) => state.review);
  const [review, setReview] = useState(reduxReview);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: mutateToDelete } = useMutation({
    mutationFn: deleteReview,
    onSuccess: async () => {
      await queryClient.invalidateQueries(['reviews']);
    }
  });

  const editHandler = (e) => {
    e.preventDefault();
    if (review.password !== +password) {
      return alert('비밀번호가 틀렸습니다.');
    }
  };

  const deleteHandler = (e) => {
    e.preventDefault();
    if (review.password !== +password) {
      return alert('비밀번호가 틀렸습니다.');
    }
    if (window.confirm('정말 삭제하시겠습니까?')) {
      mutateToDelete(review.id);
      navigate('/');
    }
  };

  return (
    <PageContainer>
      <DetailContainer>
        <Title
          type="text"
          placeholder="제목을 입력하세요."
          disabled={true}
          value={review.title}
          onChange={(e) => setReview((prev) => ({ ...prev, title: e.target.value }))}
        />
        <NicknameAndDate>{review.nickname + ' | ' + review.createdAt}</NicknameAndDate>
        <Content
          placeholder="내용을 입력하세요."
          disabled={true}
          value={review.content}
          onChange={(e) => setReview((prev) => ({ ...prev, content: e.target.value }))}
        />
        <SelectionContainer>
          <PasswordInput
            type="password"
            placeholder="비밀번호를 입력해주세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <EditButton onClick={(e) => editHandler(e)}>Edit</EditButton>
          <DeleteButton onClick={(e) => deleteHandler(e)}>Delete</DeleteButton>
        </SelectionContainer>
      </DetailContainer>
    </PageContainer>
  );
}

export default Detail;

const PageContainer = styled.div`
  display: flex;
  background-color: lightGray;
  height: 100vh;
  align-items: center;
  flex-direction: column;
`;

const DetailContainer = styled.div`
  display: flex;
  width: 500px;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.input`
  background-color: white;
  height: 60px;
  width: 100%;
  font-size: 40px;
  padding: 10px;
  margin: 10px;
  border-width: 0px;
  overflow: hidden;
  text-overflow: ellipsis;
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
`;

const Content = styled.textarea`
  background-color: white;
  height: 500px;
  width: 100%;
  font-size: 20px;
  padding: 10px;
  margin: 10px 100%;
  border: none;
  resize: none;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SelectionContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  flex-direction: rows;
  gap: 5px;
`;

const PasswordInput = styled.input`
  width: 160px;
`;

const EditButton = styled.button`
  width: 50px;
`;

const DeleteButton = styled.button`
  width: 60px;
`;
