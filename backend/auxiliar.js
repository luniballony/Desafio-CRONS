// ficheiro com funções auxiliares
import fs from "fs";

// marca todos os crons como não ativos
export function resetCrons() {

  let data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
  data = data.map(c => ({ ...c, active: false }));
  fs.writeFileSync("data.json", JSON.stringify(data, null, 2));

}

/*
// função para mostrar a hora atual
export function Time() {
  const now = new Date();
  return `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`;
}

// função para mostrar dia atual
export function Day() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
}
  */


// função para calcular a timezone
export function offsetToTimezone(offset) {
  const intOffset = parseInt(offset, 10);

  if (intOffset === 0) return "Etc/GMT";
  if (intOffset > 0) return `Etc/GMT-${intOffset}`; 
  if (intOffset < 0) return `Etc/GMT+${Math.abs(intOffset)}`; 
}