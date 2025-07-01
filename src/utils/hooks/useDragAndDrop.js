import { useState } from 'react';

export function useDragAndDrop(items, onReorder) {
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleDragStart = (index) => {
    setDraggedIndex(index); 
  };

  const handleDragOver = (e, index) => {
    e.preventDefault(); 
    e.currentTarget.classList.add('drag-over'); 
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('drag-over');
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault(); 
    e.currentTarget.classList.remove('drag-over'); 

    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const newItems = [...items];
    const [draggedItem] = newItems.splice(draggedIndex, 1);
    newItems.splice(dropIndex, 0, draggedItem);

    onReorder(newItems);

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
