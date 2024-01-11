// TableDisplay.jsx
import RestaurantIcon from '@mui/icons-material/Restaurant';

const TableDisplay = ({ table, onTableClick }) => {
  const { nombreMesa, tipoMesa, capacidad, position, dimension } = table;

  const tableStyle = {
    position: 'absolute',
    left: `${position.x}px`,
    top: `${position.y}px`,
    width: `${dimension.width}px`,
    height: `${dimension.height}px`,
    backgroundColor: tipoMesa === 'muro' ? 'black' : '#C4A484',
    border: '2px solid black',
    color: tipoMesa === 'muro' ? 'white' : 'black',
    borderRadius: tipoMesa === 'redonda' ? '50%' : '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    cursor: 'pointer',
  };

  return (
    <div style={tableStyle} onClick={() => onTableClick(table)} className='flex flex-col'>
      {nombreMesa}
      <br />
      {tipoMesa !== 'muro' && (
        <div>
          <RestaurantIcon fontSize="small" />
          {capacidad}
        </div>
      )}
    </div>
  );
};

export default TableDisplay;
