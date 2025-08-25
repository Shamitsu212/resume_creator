import { useState } from 'react';

export function useDragAndDrop(items, onReorder) {
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleDragStart = (index) => {
    setDraggedIndex(index); 
  }; // Запоминаем индекс элемента, который начали тянуть.

  const handleDragOver = (e, index) => {
    e.preventDefault(); 
    e.currentTarget.classList.add('drag-over'); 
  }; // Добавляем CSS-класс drag-over, чтобы подсветить место, куда можно бросить.

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('drag-over');
  }; // Когда мышка уходит с элемента, убираем подсветку drag-over.

  const handleDrop = (e, dropIndex) => {
    e.preventDefault(); 
    e.currentTarget.classList.remove('drag-over'); 

    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const newItems = [...items]; // Создаём копию массива элементов, чтобы не мутировать исходный state
    const [draggedItem] = newItems.splice(draggedIndex, 1);
    newItems.splice(dropIndex, 0, draggedItem);   // Вставляем этот элемент в новое место:
                                                  // splice(dropIndex, 0, draggedItem) → вставить draggedItem на позицию dropIndex, ничего не удаляя

    onReorder(newItems); // Передаём новый порядок элементов

    setDraggedIndex(null);
  };

  return {
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    draggedIndex,
  };
}
