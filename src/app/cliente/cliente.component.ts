import { Component, OnInit  } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from '../cliente.service';

declare var window: any;

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit{
  clientes: Cliente[] = [];
  cliente: Cliente = {} as Cliente;
  editarClienteId: number | undefined;
  mostrarModal: boolean = false;
  mensaje: string = "";
  ventanaModal: any;

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.obtenerClientes();

    this.ventanaModal = new window.bootstrap.Modal(
      document.getElementById("ventanaModal")
      );
  }

  obtenerClientes(): void {
    this.clienteService.getClientes()
      .subscribe(clientes => this.clientes = clientes);
  }

  crearCliente(): void {
    this.clienteService.crearCliente(this.cliente)
      .subscribe((respuestaTransaccion) => {
        this.mensaje = respuestaTransaccion.mensaje;
        this.abrirVentanaModal();
        this.obtenerClientes();
        this.cliente = {} as Cliente;
      });
  }

  editarCliente(idCliente: number): void {
    this.editarClienteId = idCliente;
    this.clienteService.getCliente(idCliente)
      .subscribe(cliente => this.cliente = cliente);
  }

  actualizarCliente(): void {
    if (this.editarClienteId) {
      this.clienteService.actualizarCliente(this.editarClienteId, this.cliente)
        .subscribe(() => {
          this.obtenerClientes();
          this.cliente = {} as Cliente;
          this.editarClienteId = undefined;
        });
    }
  }

  eliminarCliente(idCliente: number): void {
    this.clienteService.eliminarCliente(idCliente)
      .subscribe(() => this.obtenerClientes());
  }

  cerrarVentanaModal(): void {
    this.ventanaModal.hide();
  }

  abrirVentanaModal(): void {
    this.ventanaModal.show();
  }
}
