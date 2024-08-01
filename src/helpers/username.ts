export const generateRandomUsername = (): string => {
  const adjectives = [
    "Brave", "Clever", "Swift", "Mighty", "Sly", "Wise", "Gentle", "Fierce", "Bold", "Loyal"
  ];
  const animals = [
    "Lion", "Tiger", "Eagle", "Wolf", "Falcon", "Fox", "Bear", "Panther", "Hawk", "Dolphin"
  ];

  const randomAdjective1 = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomAdjective2 = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomAnimal = animals[Math.floor(Math.random() * animals.length)];

  return `${randomAdjective1}${randomAdjective2}${randomAnimal}`;
}
