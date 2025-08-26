
//Definición de lo que necesito de una clase adaptadora tenga que implementar para poder utilizar en cualquier otro servicio.

export interface HttpAdapter {
    get<T>(url: string): Promise<T>
}