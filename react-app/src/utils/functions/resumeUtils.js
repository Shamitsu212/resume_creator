export function addItemToSections(sections, type, item) {
  return sections.map(section =>
    section.type === type
      ? { ...section, data: [...section.data, item] }
      : section
  );
}

export function deleteLastItemFromSections(sections, type) {
  return sections.map(section =>
    section.type === type && section.data.length > 0
      ? { ...section, data: section.data.slice(0, -1) }
      : section
  );
}
