import { FallbackProps } from 'react-error-boundary';

interface ErrorViewParams {
  resetErrorBoundary: FallbackProps['resetErrorBoundary'];
}

export function ErrorView({ resetErrorBoundary }: ErrorViewParams) {
  return (
    <div>
      서버 에러 발생
      <button onClick={() => resetErrorBoundary()}>Try again</button>
    </div>
  );
}
