package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.demo.model.proveedores;
import com.example.demo.service.ProveedoresService;

@RestController
@RequestMapping("/proveedores")
public class ProveedoresController {

    @Autowired
    ProveedoresService proveedorService;

    @GetMapping("/index")
    public String index() {
        return "hello word";
    }

    @PostMapping("/guardar")
    public proveedores guardarProveedor(@RequestBody proveedores proveedor ) {
        return proveedorService.create(proveedor);
    }
}
