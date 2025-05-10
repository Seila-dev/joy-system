import { useContext } from 'react';
import { HabitContext } from '../HabitContext';

export const useHabit = () => {
  const context = useContext(HabitContext);
  
  if (context === undefined) {
    throw new Error('useHabit must be used within a HabitProvider');
  }
  
  return context;
};

export default useHabit;