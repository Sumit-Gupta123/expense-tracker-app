export const categoryMeta = {
  Food: { icon: 'utensils', color: '#FF7043' },
  Transport: { icon: 'bus', color: '#29B6F6' },
  Shopping: { icon: 'shopping-bag', color: '#AB47BC' },
  Utilities: { icon: 'bolt', color: '#FFD600' },
  Other: { icon: 'question-circle', color: '#BDBDBD' },
};

export const getCategoryDetails = (category: string) => {
  if (category in categoryMeta) {
    return categoryMeta[category as keyof typeof categoryMeta];
  }
  return { icon: 'question-circle', color: '#ccc' }; // default fallback
};

