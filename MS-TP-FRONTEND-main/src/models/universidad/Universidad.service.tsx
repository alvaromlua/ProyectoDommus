import {Universidad} from './Universidad.interface'
import {AxiosResponse} from 'axios'
import AxiosConfig from '../AxiosConfig'

export class UniversidadService {
  listarUniversidad(): Promise<Universidad[]> {
    return AxiosConfig.get(`universidad/`)
      .then((response: AxiosResponse<Universidad[]>) => response.data)
  }

  crearUniversidad(data:any): Promise<Universidad> {
    return AxiosConfig.post(`universidad/`, data)
      .then((response: AxiosResponse<Universidad>) => response.data)
  }

  buscarUniversidad(pk:number): Promise<Universidad> {
    return AxiosConfig.get(`universidad/${pk}/`)
      .then((response: AxiosResponse<Universidad>) => response.data)
  }
  
  actulizarUniversidad(pk:number, data:any): Promise<Universidad> {
    return AxiosConfig.put(`universidad/${pk}/`, data)
      .then((response: AxiosResponse<Universidad>) => response.data)
  }
  
  eliminarUniversidad(pk:number): Promise<Universidad> {
    return AxiosConfig.delete(`universidad/${pk}/`)
      .then((response: AxiosResponse<Universidad>) => response.data)
  }
}