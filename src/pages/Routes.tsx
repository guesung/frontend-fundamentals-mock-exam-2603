import { Navigate, Routes as ReactRouterRoutes, Route } from 'react-router-dom';
import { ReservationStatusPage } from './ReservationStatusPage';
import { RoomBookingPage } from './RoomBookingPage';

export const Routes = () => {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={<ReservationStatusPage />} />
      <Route path="/booking" element={<RoomBookingPage />} />
      <Route path="*" element={<Navigate replace to="/" />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </ReactRouterRoutes>
  );
};
