export function flagemojiToPNG(flag: string): JSX.Element {
  const countryCode = Array.from(flag, (codeUnit: any) => codeUnit.codePointAt()!)
    .map((char) => String.fromCharCode(char - 127397).toLowerCase())
    .join('');
  return <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt='flag' />;
}

export function convertToEmoji(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char: any) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

// const getDrawPolygon = () => {
//   if (points) {
//     const pos: [number, number][] = points.map((point) => [point.point[0]!, point.point[1]!]);
//     return pos;
//   }
//   return [];
// };
