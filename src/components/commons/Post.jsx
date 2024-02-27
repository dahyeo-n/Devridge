import styled from 'styled-components';

function Post({ posts, gotoDetailPage }) {
  return (
    <>
      {posts.map((post) => (
        <div key={post.id}>
          <StDevRidgePost
            key={post.id}
            onClick={() => {
              gotoDetailPage(post.id);
            }}
          >
            {post.title.slice(0, 8) + '...'}
            <StDevRidgePostBody>
              <StDevRidgeNickName>
                {post.nickname}| {post.location.name}
              </StDevRidgeNickName>

              <StDevRidgeCreateAt>{post.createdAt} </StDevRidgeCreateAt>
            </StDevRidgePostBody>
            <StDevRidgePostFoot>
              <p>{post.content.slice(0, 9) + '....'} </p>
            </StDevRidgePostFoot>
          </StDevRidgePost>
        </div>
      ))}
    </>
  );
}

export default Post;

const StDevRidgePost = styled.figure`
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 1px 1px 1px 1px darkgrey;
  font-size: 22px;
  font-weight: bolder;
  width: 400px;
`;

const StDevRidgePostBody = styled.figcaption`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  color: #7e7d7d;
`;

const StDevRidgePostFoot = styled.p`
  font-size: smaller;
`;

const StDevRidgeCreateAt = styled.p`
  padding-left: 40px;
  font-size: 10px;
`;

const StDevRidgeNickName = styled.p`
  font-size: 10px;
`;
