export default async function getData() {
  const a = await fetch('./assets/data.json');
  const res = await a.json();
  return res;
}
