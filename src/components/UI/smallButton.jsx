import './css/smallbutton.css'

function SmallButton({ icon, color, onClick, disabled, tooltip }) {
  return (
    <button className="smallbutton" onClick={onClick} disabled={disabled} title={tooltip} style={{ backgroundColor: color }}>
      <img src={icon} alt="button icon" className='buttonImage' />
    </button>
  );
}

export default SmallButton;