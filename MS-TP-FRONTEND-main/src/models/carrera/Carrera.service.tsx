import {Carrera} from './Carrera.interface'
import {AxiosResponse} from 'axios'
import AxiosConfig from '../AxiosConfig'

export class CarreraService {
  listarCarrera(): Promise<Carrera[]> {
    return AxiosConfig.get(`carrera/`).then((response: AxiosResponse<Carrera[]>) => response.data)
  }
  
  buscarCarreraSegunUniversidad(pk:number): Promise<Carrera[]> {
    return AxiosConfig.get(`carrera/universidad/${pk}`).then((response: AxiosResponse<Carrera[]>) => response.data)
  }

  crearCarrera(data:any): Promise<Carrera> {
    return AxiosConfig.post(`carrera/`, data).then((response: AxiosResponse<Carrera>) => response.data)
  }

  buscarCarrera(pk:number): Promise<Carrera> {
    return AxiosConfig.get(`carrera/${pk}/`).then((response: AxiosResponse<Carrera>) => response.data)
  }
  
  actulizarCarrera(pk:number, data:any): Promise<Carrera> {
    return AxiosConfig.put(`carrera/${pk}/`, data).then((response: AxiosResponse<Carrera>) => response.data)
  }
  
  eliminarCarrera(pk:number): Promise<Carrera> {
    return AxiosConfig.delete(`carrera/${pk}/`).then((response: AxiosResponse<Carrera>) => response.data)
  }
}