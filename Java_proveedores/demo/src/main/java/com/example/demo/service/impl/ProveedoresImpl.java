package com.example.demo.service.impl;

import com.example.demo.service.ProveedoresService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.proveedores;
import com.example.demo.repository.ProveedoresRepository;

@Service
public class ProveedoresImpl implements ProveedoresService {

    
    @Autowired
    ProveedoresRepository proveedoresRepository;

    @Override
    public proveedores create(proveedores proveedor) {
        return proveedoresRepository.save(proveedor);
    }

}
