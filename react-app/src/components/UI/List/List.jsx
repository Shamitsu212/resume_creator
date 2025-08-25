import './List.css'

function List({ value, onChange }) {
  return (
    <select className='list' value={value} onChange={onChange}>
      <option className='option' value="section">
        Секция
      </option>
      <option className='option' value="experience">
        Опыт
      </option>
      <option className='option' value="education">
        Образование
      </option>
      <option className='option' value="skills">
        Навыки
      </option>
      <option className='option' value="certificates">
        Сертификаты
      </option>
      <option className='option' value="about">
        О себе
      </option>
    </select>
  )
}

export default List;