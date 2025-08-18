
/** Para crear la interface 
 * 1. copiamos los datos
 * 2. con los comandos command + shif + p buscamos la extencion
 * Paste JSON as Code
 * 3. Colocamos el nombre a la interface en el recuadro y enter
 */

export interface PokeResponse {
    count:    number;
    next:     string;
    previous: null;
    results:  Result[];
}

export interface Result {
    name: string;
    url:  string;
}
