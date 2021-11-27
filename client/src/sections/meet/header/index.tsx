import React, { memo, useMemo } from 'react';
import Button from '@/components/Button';
import styles from './.module.scss';

import type { Dispatch, MouseEventHandler, SetStateAction } from 'react';
import type { View } from '../types';

interface AvailabilitiesHeaderProps {
  view: View;
  setView: Dispatch<SetStateAction<View>>;
  localName: string;
  submitAvailability: MouseEventHandler<HTMLButtonElement>;
  submitScheduledTime: MouseEventHandler<HTMLButtonElement>;
}

const AvailabilitiesHeader: React.FC<AvailabilitiesHeaderProps> = ({
  view,
  setView,
  submitScheduledTime,
  submitAvailability,
  localName,
}) => {

  const {
    headingLabel,
    scheduleLabel,
    addAvailabilityLabel,
    onClickScheduleButton,
    onClickAddAvailabilityButton,
  } = useMemo(() => {
    switch (view) {
      case 'view': return {
        headingLabel: 'Availabilities',
        scheduleLabel: 'Schedule',
        addAvailabilityLabel: 'Add availability',
        onClickScheduleButton: () => { setView('schedule'); },
        onClickAddAvailabilityButton: () => { setView('add'); },
      };
      case 'add': return {
        headingLabel: 'Add Availability',
        scheduleLabel: 'Cancel',
        addAvailabilityLabel: 'Save',
        onClickScheduleButton: () => { setView('view'); },
        onClickAddAvailabilityButton: submitAvailability,
      }
      case 'schedule': return {
        headingLabel: 'Schedule meet',
        scheduleLabel: 'Cancel',
        addAvailabilityLabel: 'Save',
        onClickScheduleButton: () => { setView('view'); },
        onClickAddAvailabilityButton: submitScheduledTime,
      }
    }
  }, [view, setView, submitAvailability, submitScheduledTime]);

  return (
    <div className={styles.header}>
      <h2 className={styles.heading}>{headingLabel}</h2>
      <div className={styles.buttons}>
        {view === 'view' ? null : ( // hide schedule meet option until the feature's ready
          <Button variant="outlined" onClick={onClickScheduleButton}>
            {scheduleLabel}
          </Button>
        )}
        <Button
          accent={true}
          variant="outlined"
          onClick={onClickAddAvailabilityButton}
          disabled={view === 'add' && localName.length === 0}
        >
          {addAvailabilityLabel}
        </Button>
      </div>
    </div>
  )
}

export default memo(AvailabilitiesHeader);