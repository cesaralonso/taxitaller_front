export interface UserResponseInterface {
    status: string;
    message: string;
    data: [{
        iduser: number;
        acceso: string;
        email: string;
        nombre: string;
        password: string;
        rol_idrol: number;
        token: string;
        token_expire?: string;
        usuario?: string;
    }];
}
