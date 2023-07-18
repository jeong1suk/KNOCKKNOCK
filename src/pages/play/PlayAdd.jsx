import styled from 'styled-components';

function PlayAdd() {
  return (
    <>
      <TopBox>
        <p>같이 놀자!</p>
        <p>여러분이 원하는 만남을 만들어보세요</p>
      </TopBox>
      <PostAddBox>
        <p>asdfd</p>
      </PostAddBox>
    </>
  )
}

export default PlayAdd;

const TopBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #FFFFFF;
  height: 200px;
  margin: 50px -35px 0px -35px;
  padding: 30px 0 0 50px;
`

const PostAddBox = styled.div`
  display: flex;
  flex-directionL column;
  align-items: flex-start;
  background-color: #FFFFFF;
  height: 800px;
  margin: 50px 0 0 0;
`