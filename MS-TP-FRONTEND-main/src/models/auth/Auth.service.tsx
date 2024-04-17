/* eslint-disable @typescript-eslint/no-unused-expressions */
import { AxiosResponse } from 'axios'
import AxiosConfig from '../AxiosConfig'
import { Usuario } from '../usuario/Usuario.interface'

export class AuthService {
  activateAccount(frs: any, snd: any) {
    return AxiosConfig.post(`activate/${frs}/${snd}/`)
  }

  loginAccont(data: any): Promise<Usuario> {
    return AxiosConfig.post('login/', data)
      .then((response: AxiosResponse<Usuario>) => response.data)
  }
}