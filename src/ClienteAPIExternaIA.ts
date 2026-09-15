import ProvedorIA from "./ProvedorIA.js";

export default class ClienteAPIExternaIA implements ProvedorIA {
  urlBase: string;
  modelo: string;

  completar(prompt: string): string { return undefined as any; }
}
