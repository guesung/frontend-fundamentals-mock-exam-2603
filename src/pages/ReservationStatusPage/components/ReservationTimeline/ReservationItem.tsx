import { css } from '@emotion/react';
import { colors } from '_tosslib/constants/colors';
import { EQUIPMENT_LABELS } from 'constants/equipment';
import { useOutsideClick } from 'hooks/index';
import { Reservation } from 'types';
import { getTimelinePercentage, getTimelineWidth } from '../../utils';

interface ReservationItemProps {
  reservation: Reservation;
  name: string;
  isActive: boolean;
  onReservationItemClick: () => void;
  onReservationItemCancle: () => void;
}

export function ReservationItem({
  reservation,
  name,
  isActive,
  onReservationItemClick,
  onReservationItemCancle,
}: ReservationItemProps) {
  const { ref } = useOutsideClick<HTMLDivElement>(
    () => {
      if (!isActive) {
        return;
      }
      onReservationItemCancle();
    },
    {
      ignoreId: 'tooltip',
    }
  );

  return (
    <div
      css={css`
        position: absolute;
        left: ${getTimelinePercentage(reservation.start)}%;
        width: ${getTimelineWidth(reservation.start, reservation.end)}%;
        height: 100%;
      `}
    >
      <div
        id="tooltip"
        role="button"
        aria-label={`${name} ${reservation.start}-${reservation.end} 예약 상세`}
        onClick={onReservationItemClick}
        css={css`
          width: 100%;
          height: 100%;
          background: ${colors.blue400};
          border-radius: 4px;
          opacity: ${isActive ? 1 : 0.75};
          cursor: pointer;
          transition: opacity 0.15s;
          &:hover {
            opacity: 1;
          }
        `}
      />
      {isActive && (
        <div
          ref={ref}
          role="tooltip"
          css={css`
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            margin-top: 6px;
            background: ${colors.grey900};
            color: ${colors.white};
            padding: 8px 12px;
            border-radius: 8px;
            font-size: 12px;
            white-space: nowrap;
            z-index: 10;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
            line-height: 1.6;
          `}
        >
          <div>
            {reservation.start} ~ {reservation.end}
          </div>
          <div>{reservation.attendees}명</div>
          {reservation.equipment.length > 0 && (
            <div>{reservation.equipment.map((e: string) => EQUIPMENT_LABELS[e]).join(', ')}</div>
          )}
        </div>
      )}
    </div>
  );
}
