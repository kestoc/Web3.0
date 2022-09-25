// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract kestoColl1 {
    
    struct certificados { //Estructura que contiene la informacion de cada certificado
        string nombre_estudiante;
        uint id;
        string fecha_participacion;
        string nombre_curso;
    }

    certificados[] list; //Lista donde se almacenan los certificados creados y agregados
    
    constructor(string memory nombre_estudiante, uint id, string memory fecha_participacion, string memory nombre_curso) {
        list.push(certificados(nombre_estudiante, id, fecha_participacion, nombre_curso));   
    } //Constructor para generar el primer certificado de la cadena

    function agregar_certificado(string memory nombre_estudiante, uint id, string memory fecha_participacion, string memory nombre_curso) public {
        list.push(certificados(nombre_estudiante, id, fecha_participacion, nombre_curso));
    } //Funcion para agregar un nuevo certificado a la lista de certificados

    function consultar_certificado(uint id) public view returns(bool) {
        for(uint i = 0; i < list.length; i++){
            if(list[i].id == id){
                return true;
            }
        }
        return false;
    } //Funcion para consultar la existencia de un certificado en la lista

}