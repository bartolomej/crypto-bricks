// https://coolors.co/0d1221-51ded2-d90368-26408b-ffffff
export const theme = {
  dark: 'rgba(13, 18, 33, 1)',
  vibrant: 'rgba(217,3,104, 1)',
  primary: 'rgba(81, 222, 210, 1)',
  darkish: 'rgba(27, 35, 56, 0.5)',
  light: 'rgba(255, 255, 255, 1)'
}

export function colorWithOpacity (color: string, opacity: number) {
  let [r, g, b] = color.substring(color.indexOf('(') + 1, color.indexOf(')')).split(',').map(e => e.trim());
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
