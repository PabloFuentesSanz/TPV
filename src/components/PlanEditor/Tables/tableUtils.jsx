import Chair from './Chair';
import RoundedTable from './RoundedTable';
import SquaredTable from './SquaredTable';

export const renderTable = (type) => {
  switch (type) {
    case 'round':
      return <RoundedTable />;
    case 'square':
      return <SquaredTable />;
    case 'chair':
      return <Chair />;
    default:
      return null;
  }
};
