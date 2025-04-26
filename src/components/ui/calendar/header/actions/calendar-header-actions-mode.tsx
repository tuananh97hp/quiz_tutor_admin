'use client';

import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';

import { cn } from '@/lib/utils';
import { useCalendarContext } from '@/components/ui/calendar/calendar-context';
import { calendarModes, Mode } from '@/components/ui/calendar/calendar-types';
import { calendarModeIconMap } from '@/components/ui/calendar/calendar-mode-icon-map';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export default function CalendarHeaderActionsMode() {
  const { mode, setMode } = useCalendarContext();

  return (
    <LayoutGroup>
      <ToggleGroup
        className="flex gap-0 -space-x-px overflow-hidden rounded-sm border shadow-sm shadow-black/5 rtl:space-x-reverse"
        type="single"
        variant="outline"
        value={mode}
        onValueChange={(value) => {
          if (value) setMode(value as Mode);
        }}
      >
        {calendarModes.map((modeValue) => {
          const isSelected = mode === modeValue;
          return (
            <motion.div
              key={modeValue}
              layout
              className="flex flex-1 divide-x"
              animate={{ flex: isSelected ? 1.6 : 1 }}
              transition={{
                flex: {
                  type: 'spring',
                  stiffness: 400,
                  damping: 30,
                },
              }}
            >
              <ToggleGroupItem
                value={modeValue}
                className={cn(
                  'relative flex w-full items-center justify-center gap-2 rounded-none border-none text-base shadow-none focus-visible:z-10',
                  isSelected && 'z-10',
                )}
              >
                <motion.div
                  layout
                  className="flex items-center justify-center gap-2 px-3 py-2"
                  initial={false}
                  animate={{
                    scale: isSelected ? 1 : 0.95,
                  }}
                  transition={{
                    scale: {
                      type: 'spring',
                      stiffness: 400,
                      damping: 30,
                    },
                    layout: {
                      type: 'spring',
                      stiffness: 400,
                      damping: 30,
                    },
                  }}
                >
                  <motion.div
                    layout="position"
                    initial={false}
                    animate={{
                      scale: isSelected ? 0.9 : 1,
                    }}
                    transition={{
                      scale: {
                        type: 'spring',
                        stiffness: 400,
                        damping: 30,
                      },
                    }}
                  >
                    {calendarModeIconMap[modeValue]}
                  </motion.div>
                  <AnimatePresence mode="popLayout">
                    {isSelected && (
                      <motion.p
                        layout="position"
                        key={`text-${modeValue}`}
                        className="origin-left whitespace-nowrap font-medium"
                        initial={{
                          opacity: 0,
                          x: -2,
                          scale: 0.95,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          scale: 1,
                          transition: {
                            type: 'spring',
                            stiffness: 400,
                            damping: 30,
                            opacity: { duration: 0.15 },
                          },
                        }}
                        exit={{
                          opacity: 0,
                          x: -2,
                          scale: 0.95,
                          transition: {
                            type: 'spring',
                            stiffness: 400,
                            damping: 30,
                            opacity: { duration: 0.1 },
                          },
                        }}
                      >
                        {modeValue.charAt(0).toUpperCase() + modeValue.slice(1)}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              </ToggleGroupItem>
            </motion.div>
          );
        })}
      </ToggleGroup>
    </LayoutGroup>
  );
}
