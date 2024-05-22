package com.example.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter

public class proveedores {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String persona_juridica;
    private String nit_o_rut;
    private String razon_social;
    private String nombre_del_represetnte_legal;
    private String telefono;
    private String correo;
    private String ciudad;
    private String pais;
    private String departamento;
    private String direccion;
    private String ubicacion_rut;


    

    
}
