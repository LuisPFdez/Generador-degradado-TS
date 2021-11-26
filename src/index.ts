//Constante con la exprexion regular para compobar un codigo hexadecimal, con la almohadilla obligatoria
export const expresionRegexHexadecimal = new RegExp("^#[0-9a-fA-F]{6}$");

/**
 * Error para las funciones de generar el degradado
 */
export class ErrorCodigoHexadecimal extends Error {

    constructor(msg: string = "Codigo Hexadecimal errorneo") {
        super(msg);
        this.name = "ErrorCodigoHexadecimal";
    }

}

/**
 * Clase para generar degradado apartir de un punto de inicio y varios puntos de paso
 * @param codigoInicio string, codigo hexadecimal (con la almohadilla), punto de inicio
 * @param codigosPaso  Array<string>, codigos hexadecimal (con la almohadilla), puntos de paso y final. 
 * @param pasosEntreCodigos number, numero de colores que se generan entre el códigos
 * @returns Array<string>, listado con los codigos de colores deL degradado
 */
export function generar_degradado_multiple(codigoInicio: string, codigosPaso: Array<string>, pasosEntreCodigos: number = 2): Array<string> {
    pasosEntreCodigos++;
    const valores = Array<string>();

    if (!expresionRegexHexadecimal.test(codigoInicio)) {
        throw new ErrorCodigoHexadecimal("Error, el código de inicio es erroneo (ha de ser un código hexadecimal similar a #FFFFFF)")
    }

    valores.push(codigoInicio);
    let codigoAnterior = codigoInicio;

    codigosPaso.forEach(codigo => {
        if (!expresionRegexHexadecimal.test(codigo)) {
            throw new ErrorCodigoHexadecimal("Error, el código " + codigo + " es erroneo (ha de ser un código hexadecimal similar a #FFFFFF)");
        }

        const r = parseInt(codigoAnterior.substring(1, 3), 16);
        const g = parseInt(codigoAnterior.substring(3, 5), 16);
        const b = parseInt(codigoAnterior.substring(5, 7), 16);

        const sr = (parseInt(codigo.substring(1, 3), 16) - r) / pasosEntreCodigos;
        const sg = (parseInt(codigo.substring(3, 5), 16) - g) / pasosEntreCodigos;
        const sb = (parseInt(codigo.substring(5, 7), 16) - b) / pasosEntreCodigos;

        for (let i = 1; i < pasosEntreCodigos; i++) {

            const vr = Math.trunc(r + (sr * i));
            const vg = Math.trunc(g + (sg * i));
            const vb = Math.trunc(b + (sb * i));

            valores.push("#" + vr.toString(16).toUpperCase() + vg.toString(16).toUpperCase() + vb.toString(16).toUpperCase());
        }

        valores.push(codigo);
        
        codigoAnterior = codigo;
    });

    return valores;
}

/**
 * Clase para generar degradado apartir de un punto de inicio y un punto de fin
 * @param codigoInicio string, codigo hexadecimal (con la almohadilla), punto de inicio
 * @param codigoFinal  string, codigos hexadecimal (con la almohadilla), punto final 
 * @param pasos number, numero de colores para el degradado
 * @returns Array<string>, listado con los codigos de colores deL degradado
 */
export function generar_degradado(codigoInicio: string, codigoFinal: string, pasos: number = 3): Array<String> {

    pasos++;
    const valores = Array<string>();

    if (!expresionRegexHexadecimal.test(codigoInicio) || !expresionRegexHexadecimal.test(codigoFinal)) {
        throw new ErrorCodigoHexadecimal("Error, uno de los códigos hexadecimales es erroneo (han de ser un código hexadecimal similar a #FFFFFF)");
    }

    valores.push(codigoInicio);

    const r = parseInt(codigoInicio.substring(1, 3), 16);
    const g = parseInt(codigoInicio.substring(3, 5), 16);
    const b = parseInt(codigoInicio.substring(5, 7), 16);

    const sr = (parseInt(codigoFinal.substring(1, 3), 16) - r) / pasos;
    const sg = (parseInt(codigoFinal.substring(3, 5), 16) - g) / pasos;
    const sb = (parseInt(codigoFinal.substring(5, 7), 16) - b) / pasos;


    for (let i = 1; i < pasos; i++) {

        const vr = Math.trunc(r + (sr * i));
        const vg = Math.trunc(g + (sg * i));
        const vb = Math.trunc(b + (sb * i));

        valores.push("#" + vr.toString(16).toUpperCase() + vg.toString(16).toUpperCase() + vb.toString(16).toUpperCase());
    }

    valores.push(codigoFinal)

    return valores;
}