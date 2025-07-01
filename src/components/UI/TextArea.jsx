import './css/textarea.css'

function TextArea({ value, onChange }) {
  return (
    <textarea className='textarea' value={value} onChange={onChange}/>
  )
}

export default TextArea