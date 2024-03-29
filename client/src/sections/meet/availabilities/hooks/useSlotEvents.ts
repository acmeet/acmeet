import React, { MouseEventHandler, useMemo, useRef, useState } from 'react';

import { arrayShallowEquals } from '@/utils/arrayShallowEquals';
import { noop_undefined } from '@/utils/noop';

import type { SetValue } from '@/utils/types';
import type { AvailabilityGrid, View } from '../../types';

interface UseSlotEventsProps {
  view: View;
  localAvailabilityGrid: AvailabilityGrid;
  setLocalAvailabilityGrid: SetValue<AvailabilityGrid>;
  setLocalNumTimesAvailable: SetValue<number>;
  setSelectedSlot: SetValue<[number, number] | undefined>;
  setHoveredSlot: SetValue<[number, number] | undefined>;
}

type SlotEventHandlerResolver = (i: number, j: number) => (MouseEventHandler<HTMLDivElement> | undefined);

interface SlotEventHandlers {
  onMouseDown: SlotEventHandlerResolver;
  onMouseUp: SlotEventHandlerResolver;
  onMouseEnter: SlotEventHandlerResolver;
  onMouseLeave: SlotEventHandlerResolver;
  onClick: SlotEventHandlerResolver;
}

export const useSlotEvents = ({
  view,
  localAvailabilityGrid,
  setLocalAvailabilityGrid,
  setLocalNumTimesAvailable,
  setSelectedSlot,
  setHoveredSlot,
}: UseSlotEventsProps): SlotEventHandlers => {

  // add
  const [selectionStartSlot, setSelectionStartSlot] = useState<[number,number] | undefined>();
  const [selectionEndSlot, setSelectionEndSlot] = useState<[number,number] | undefined>();

  const isDeselecting = useRef<boolean>(false);

  const handlers = useMemo(() => {
    switch (view) {
      case 'view':
        return {
          onMouseDown: noop_undefined,
          onMouseUp: noop_undefined,
          onMouseEnter: (i: number, j: number) => () => {
            setHoveredSlot([i,j]);
          },
          onMouseLeave: () => () => {
            setHoveredSlot(undefined);
          },
          onClick: (i: number, j: number) => () => {
            const target = [i,j] as [number, number];
            setSelectedSlot((slot) => (slot === undefined
              ? target
              : arrayShallowEquals(slot, target)
                ? undefined
                : target
            ));
          },
        };
      case 'add':
        return {
          onMouseEnter: (i: number, j: number) => () => {
            setHoveredSlot([i, j]);
            if (selectionStartSlot !== undefined) {
              setSelectionEndSlot([i,j]);
            }
          },
          onMouseLeave: () => () => {
            setHoveredSlot(undefined);
          },
          onMouseDown: (i: number, j: number) => (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            e.preventDefault();
            const target = [i,j] as [number, number];
            setSelectionStartSlot(target);
            setSelectionEndSlot(target);
            // set whether is selecting or deselecting
            isDeselecting.current = Boolean(localAvailabilityGrid[i][j]);
          },
          onMouseUp: (() => () => {
            if (selectionStartSlot === undefined || selectionEndSlot === undefined) { return; }
            let [i1, j1] = selectionStartSlot;
            let [i2, j2] = selectionEndSlot;
            
            // actually update selection
            if (i1 > i2) { [i1, i2] = [i2, i1]; }
            if (j1 > j2) { [j1, j2] = [j2, j1]; }

            let balance = 0;

            for (let i = i1; i <= i2; ++i) {
              for (let j = j1; j <= j2; ++j) {
                if (isDeselecting.current) {
                  if (localAvailabilityGrid[i][j] !== 0) {
                    balance -= 1;
                  }
                  localAvailabilityGrid[i][j] = 0;
                } else {
                  if (localAvailabilityGrid[i][j] !== 1) {
                    balance += 1;
                  }
                  localAvailabilityGrid[i][j] = 1;
                }
              }
            }
            
            setLocalNumTimesAvailable((count) => count + balance);
            setLocalAvailabilityGrid(localAvailabilityGrid);

            setSelectionStartSlot(undefined);
            setSelectionEndSlot(undefined);
            isDeselecting.current = false;
          }) as SlotEventHandlerResolver,
          onClick: noop_undefined,
        }
      case 'schedule':
        return {
          onMouseEnter: noop_undefined,
          onMouseLeave: noop_undefined,
          onMouseDown: noop_undefined,
          onMouseUp: noop_undefined,
          onClick: noop_undefined,
        }
    }
  }, [
    view,
    selectionStartSlot,
    selectionEndSlot,
    localAvailabilityGrid,
    setLocalAvailabilityGrid,
    setLocalNumTimesAvailable,
    setHoveredSlot,
    setSelectedSlot,
  ]);

  return handlers;
}