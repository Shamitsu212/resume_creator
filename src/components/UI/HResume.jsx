import './css/HResume.css'


function Hresume({text}) {
  return (
    <div className='hResume'>
        <h2 className='hResume__h2'>{text}</h2>
        <hr className='hResume__hr' />
    </div>
  )
}

export default Hresume