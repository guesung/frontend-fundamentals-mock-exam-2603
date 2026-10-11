import { Navigate, Routes as ReactRouterRoutes, Route } from 'react-router-dom';
import { ReservationStatusPage } from './ReservationStatusPage';
import { RoomBookingPage } from './RoomBookingPage';
import { Suspense } from 'react';

export const Routes = () => {
  return (
    <ReactRouterRoutes>
      <Route
        path="/"
        element={
          <Suspense fallback={null}>
            <ReservationStatusPage />
          </Suspense>
        }
      />
      <Route
        path="/booking"
        element={
          <Suspense fallback={null}>
            <RoomBookingPage />
          </Suspense>
        }
      />
      <Route path="*" element={<Navigate replace to="/" />} />
    </ReactRouterRoutes>
  );
};
