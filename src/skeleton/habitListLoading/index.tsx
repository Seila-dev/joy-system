import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styled from 'styled-components';

export const HabitListSkeleton = () => {
  return (
    <SkeletonContainer>
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonCard key={i}>
          <Skeleton height={15} width={80} baseColor='#111' highlightColor='#444' />
          <Skeleton height={150} width={`100%`} style={{ marginTop: 10 }} baseColor="#111" highlightColor='#333' />
          <Skeleton count={5} height={12} style={{ marginTop: 10
           }} baseColor='#111' highlightColor='#444' />
        </SkeletonCard>
      ))}
    </SkeletonContainer>
  );
};

const SkeletonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media(max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media(max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const SkeletonCard = styled.div`
  padding: 16px;
  background: #222;
  border-radius: 8px;
`;