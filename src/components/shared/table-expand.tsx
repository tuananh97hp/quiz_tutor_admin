import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ITableExpandProps {
  isExpand: boolean;
  onClick: () => void;
}
export const TableExpand = ({ isExpand, onClick }: ITableExpandProps) => {
  return (
    <Button variant="outline" onClick={() => onClick()}>
      {isExpand ? <ChevronUp /> : <ChevronDown />}
    </Button>
  );
};
