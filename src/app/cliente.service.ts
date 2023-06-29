import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from './cliente/cliente';
import { RespuestaTransaccion } from './cliente/respuestaTransaccion';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private baseUrl = 'http://localhost:8080/api/clientes';

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.baseUrl);
  }

  getCliente(idCliente: number): Observable<Cliente> {
    const url = `${this.baseUrl}/${idCliente}`;
    return this.http.get<Cliente>(url);
  }

  crearCliente(cliente: Cliente): Observable<RespuestaTransaccion> {
    return this.http.post<RespuestaTransaccion>(this.baseUrl + "/crear", cliente);
  }

  actualizarCliente(idCliente: number, cliente: Cliente): Observable<RespuestaTransaccion> {
    return this.http.put<RespuestaTransaccion>(this.baseUrl + "/actualizar", cliente);
  }

  eliminarCliente(idCliente: number): Observable<RespuestaTransaccion> {
    const url = `${this.baseUrl}/eliminar/${idCliente}`;
    return this.http.delete<RespuestaTransaccion>(url);
  }
}
