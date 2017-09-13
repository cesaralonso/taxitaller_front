export interface LoginResponseInterface {
    status: string;
    message: string;
    user: {
        iduser: string;
        email: string;
        nombre: string;
        acceso: string;
        rol_idrol: string;
    };
    token: string;
}