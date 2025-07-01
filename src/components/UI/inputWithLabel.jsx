import './css/inputWithLabel.css'

function InputWithLabel({ label, value, onChange }) {
  return (
    <div className='inputWithLabel'>
      <label className='inputWithLabel__label'>{label}</label>
      <input className='inputWithLabel__input' type='text' value={value} onChange={onChange}/>
    </div>
  )
}

export default InputWithLabel