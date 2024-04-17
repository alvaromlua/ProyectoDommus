import { Usuario } from './Usuario.interface'
import { AxiosResponse } from 'axios'
import AxiosConfig from '../AxiosConfig'

export class UsuarioService {
  listarUsuario(): Promise<Usuario[]> {
    return AxiosConfig.get(`usuario/`).then((response: AxiosResponse<Usuario[]>) => response.data)
  }

  crearUsuario(data: any): Promise<Usuario> {
    return AxiosConfig.post(`usuario/`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
      .then((response: AxiosResponse<Usuario>) => response.data)
  }

  buscarUsuario(pk: number): Promise<Usuario> {
    return AxiosConfig.get(`usuario/${pk}/`).then((response: AxiosResponse<Usuario>) => response.data)
  }

  actulizarUsuario(pk: number, data: any): Promise<Usuario> {
    return AxiosConfig.put(`usuario/${pk}/`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
      .then((response: AxiosResponse<Usuario>) => response.data)
  }

  eliminarUsuario(pk: number): Promise<Usuario> {
    return AxiosConfig.delete(`usuario/${pk}/`).then((response: AxiosResponse<Usuario>) => response.data)
  }

  sendEmail(pk: number) {
    return AxiosConfig.post(`sendEmail/${pk}/`).then((response) => response.status)
  }
}