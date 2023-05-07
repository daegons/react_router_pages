import { useRouteError } from 'react-router-dom';
import PageContent from '../components/PageContent';
import MainNavigation from '../components/MainNavigation';

const Error = () => {
  const error = useRouteError();

  let title = '에러 발생!@#';
  let message = '뭔가 잘못 되었다요';

  if (error.status === 500) {
    message = error.data.message;
  }
  if (error.status === 404) {
    title = '찾을 수 없음니다 404';
    message = '리소스 또는 페이지 찾을 수 없습니다. 404';
  }

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
};
export default Error;
