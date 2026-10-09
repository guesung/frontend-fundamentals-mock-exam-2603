import { useSearchParamsState } from 'hooks/useSearchParamsState';
import { ReservationStatusPage } from './ReservationStatusPage';
import { RoomBookingPage } from './RoomBookingPage';
import { Route, Routes as ReactRouterRoutes, Navigate } from 'react-router-dom';

export const Routes = () => {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={<ReservationStatusPage />} />
      <Route path="/booking" element={<RoomBookingPage />} />
      <Route path="*" element={<Navigate replace to="/" />} />
      <Route path="/" element={<Test />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </ReactRouterRoutes>
  );
};

function Test() {
  const [date, setDate] = useSearchParamsState<string>('date', { defaultValue: '' });
  const [startTime, setStartTime] = useSearchParamsState<string>('startTime', { defaultValue: '' });

  return (
    <div>
      <span>{date}</span>
      <span>{startTime}</span>
      <button
        onClick={() => {
          setDate('aa');
        }}
      >
        ?date=aa
      </button>
      <button
        onClick={() => {
          setStartTime('bb');
        }}
      >
        ?date=aa
      </button>
    </div>
  );
}
