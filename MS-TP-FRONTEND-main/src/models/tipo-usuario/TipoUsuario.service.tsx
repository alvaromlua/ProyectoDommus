import {TipoUsuario} from './TipoUsuario.interface'
import {AxiosResponse} from 'axios'
import AxiosConfig from '../AxiosConfig'

export class UniversidadService {
  listarTipoUsuario(): Promise<TipoUsuario[]> {
    return AxiosConfig.get(`tipo-usuario/`).then((response: AxiosResponse<TipoUsuario[]>) => response.data)
  }

  crearTipoUsuario(data:any): Promise<TipoUsuario> {
    return AxiosConfig.post(`tipo-usuario/`, data).then((response: AxiosResponse<TipoUsuario>) => response.data)
  }

  buscarTipoUsuario(pk:number): Promise<TipoUsuario> {
    return AxiosConfig.get(`tipo-usuario/${pk}/`).then((response: AxiosResponse<TipoUsuario>) => response.data)
  }
  
  actulizarTipoUsuario(pk:number, data:any): Promise<TipoUsuario> {
    return AxiosConfig.put(`tipo-usuario/${pk}/`, data).then((response: AxiosResponse<TipoUsuario>) => response.data)
  }
  
  eliminarTipoUsuario(pk:number): Promise<TipoUsuario> {
    return AxiosConfig.delete(`tipo-usuario/${pk}/`).then((response: AxiosResponse<TipoUsuario>) => response.data)
  }
}