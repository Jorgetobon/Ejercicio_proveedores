import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './ProveedorForm.css';

const schema = yup.object().shape({
  personeriaJuridica: yup.string().required('Personería jurídica es obligatoria'),
  nitRut: yup.string().required('NIT o RUT es obligatorio'),
  razonSocial: yup.string().required('Nombre de la razón social es obligatorio'),
  representanteLegal: yup.string().required('Nombre del representante legal es obligatorio'),
  telefono: yup.string().required('Teléfono de contacto es obligatorio'),
  email: yup.string().email('Email no es válido').required('Email de contacto es obligatorio'),
  pais: yup.string().required('País es obligatorio'),
  departamento: yup.string().required('Departamento es obligatorio'),
  ciudad: yup.string().required('Ciudad es obligatoria'),
  direccion: yup.string().required('Dirección es obligatoria'),
  rutFile: yup.mixed().required('Debe cargar el archivo RUT')
});

const ProveedorForm = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const [paises, setPaises] = useState([{id:1, nombre:"Colombia"}]);
  const [departamentos, setDepartamentos] = useState([{id:2, nombre:"Antioquia"}, {id:3, nombre:"Quindio"}]);
  const [ciudades, setCiudades] = useState([{id:4, nombre:"Medellin"}, {id:5, nombre:"Bogota"}]);

  const handlePaisChange = (e) => {
    const paisId = e.target.value;
    // axios.get(`/api/ubicaciones/departamentos?paisId=${paisId}`).then(response => {
    //  setDepartamentos(response.data);
    //});
  };

  const handleDepartamentoChange = (e) => {
    const departamentoId = e.target.value;
    //axios.get(`/api/ubicaciones/ciudades?departamentoId=${departamentoId}`).then(response => {
      //setCiudades(response.data);
    //});
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('proveedor', JSON.stringify(data));
    formData.append('file', data.rutFile[0]);

    axios.post('/api/proveedores', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      console.log('Proveedor registrado:', response.data);
    }).catch(error => {
      console.error('Error registrando proveedor:', error);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="proveedor-form">
      <div>
        <label>Personería Jurídica</label>
        <input {...register('personeriaJuridica')} />
        {errors.personeriaJuridica && <p>{errors.personeriaJuridica.message}</p>}
      </div>
      <div>
        <label>NIT o RUT</label>
        <input {...register('nitRut')} />
        {errors.nitRut && <p>{errors.nitRut.message}</p>}
      </div>
      <div>
        <label>Nombre de la Razón Social</label>
        <input {...register('razonSocial')} />
        {errors.razonSocial && <p>{errors.razonSocial.message}</p>}
      </div>
      <div>
        <label>Nombre del Representante Legal</label>
        <input {...register('representanteLegal')} />
        {errors.representanteLegal && <p>{errors.representanteLegal.message}</p>}
      </div>
      <div>
        <label>Teléfono de Contacto</label>
        <input {...register('telefono')} />
        {errors.telefono && <p>{errors.telefono.message}</p>}
      </div>
      <div>
        <label>Email de Contacto</label>
        <input {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label>País</label>
        <select {...register('pais')} onChange={handlePaisChange}>
          <option value="">Seleccione un país</option>
          {paises.map((pais) => (
            <option key={pais.id} value={pais.id}>{pais.nombre}</option>
          ))}
        </select>
        {errors.pais && <p>{errors.pais.message}</p>}
      </div>
      <div>
        <label>Departamento</label>
        <select {...register('departamento')} onChange={handleDepartamentoChange}>
          <option value="">Seleccione un departamento</option>
          {departamentos.map((departamento) => (
            <option key={departamento.id} value={departamento.id}>{departamento.nombre}</option>
          ))}
        </select>
        {errors.departamento && <p>{errors.departamento.message}</p>}
      </div>
      <div>
        <label>Ciudad</label>
        <select {...register('ciudad')}>
          <option value="">Seleccione una ciudad</option>
          {ciudades.map((ciudad) => (
            <option key={ciudad.id} value={ciudad.id}>{ciudad.nombre}</option>
          ))}
        </select>
        {errors.ciudad && <p>{errors.ciudad.message}</p>}
      </div>
      <div>
        <label>Dirección</label>
        <input {...register('direccion')} />
        {errors.direccion && <p>{errors.direccion.message}</p>}
      </div>
      <div>
        <label>Cargar RUT (PDF)</label>
        <input type="file" {...register('rutFile')} />
        {errors.rutFile && <p>{errors.rutFile.message}</p>}
      </div>
      <button type="submit">Registrar Proveedor</button>
    </form>
  );
};

export default ProveedorForm;