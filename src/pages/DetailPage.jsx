import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { deleteReview } from 'api/reviews';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getReview } from 'store/modules/reviewSlice';
import Button from 'components/commons/Button';

function DetailPage() {
  const params = useParams();
  const id = params.id;
  const reduxReviews = useSelector((state) => state.review.review);
  const [review, setReview] = useState(reduxReviews);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate: mutateToDelete } = useMutation({
    mutationFn: deleteReview,
    onSuccess: async () => {
      await queryClient.invalidateQueries(['reviews']);
    }
  });

  const passwordEditHandler = (e) => {
    e.preventDefault();
    if (review.password !== +password) {
      return alert('비밀번호가 틀렸습니다.');
    }
    navigate('/write');
  };

  const passwordDeleteHandler = (e) => {
    e.preventDefault();
    if (review.password !== +password) {
      return alert('비밀번호가 틀렸습니다.');
    }
    if (window.confirm('정말 삭제하시겠습니까?')) {
      mutateToDelete(review.id);
      navigate('/');
    }
  };

  useEffect(() => {
    const filteredReview = reduxReviews.filter((review) => review.id === id);
    setReview(filteredReview[0]);
    dispatch(getReview(filteredReview[0]));
  }, []);

  return (
    <PageContainer>
      <DetailContainer>
        <Title>{review.title}</Title>
        <NicknameAndDate>{review.nickname + ' | ' + review.createdAt}</NicknameAndDate>
        <Content>{review.content}</Content>
        <SelectionContainer>
          <PasswordInput
            type="password"
            placeholder="비밀번호를 입력해주세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={(e) => passwordEditHandler(e)}>Edit</Button>
          <Button onClick={(e) => passwordDeleteHandler(e)}>Delete</Button>
        </SelectionContainer>
      </DetailContainer>
    </PageContainer>
  );
}

export default DetailPage;

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

const Title = styled.p`
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

const Content = styled.p`
  background-color: white;
  height: 500px;
  width: 100%;
  font-size: 20px;
  padding: 10px;
  margin: 10px 100%;
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
