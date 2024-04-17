import { Vivienda } from './Vivienda.interface'
import { AxiosResponse } from 'axios'
import AxiosConfig from '../AxiosConfig'

export class ViviendaService {
  listarVivienda(): Promise<Vivienda[]> {
    return AxiosConfig.get(`vivienda/`)
      .then((response: AxiosResponse<Vivienda[]>) => response.data)
  }

  crearVivienda(data: any): Promise<Vivienda> {
    return AxiosConfig.post(`vivienda/`, data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((response: AxiosResponse<Vivienda>) => response.data)
  }

  buscarVivienda(pk: number): Promise<Vivienda> {
    return AxiosConfig.get(`vivienda/${pk}/`)
      .then((response: AxiosResponse<Vivienda>) => response.data)
  }

  actulizarVivienda(pk: number, data: any): Promise<Vivienda> {
    return AxiosConfig.put(`vivienda/${pk}/`, data)
      .then((response: AxiosResponse<Vivienda>) => response.data)
  }

  eliminarVivienda(pk: number): Promise<Vivienda> {
    return AxiosConfig.delete(`universidad/${pk}/`)
      .then((response: AxiosResponse<Vivienda>) => response.data)
  }
}