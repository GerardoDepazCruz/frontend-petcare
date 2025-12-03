import React, { useEffect, useState } from 'react';

function CitasList() {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('https://veterinaria-petcare.onrender.com/d/w/citas/all', {
          credentials: 'include',
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setCitas(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div>Cargando citas...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Lista de citas</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Mascota</th>
            <th>Servicio</th>
            <th>Veterinario</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {citas.map((cita) => (
            <tr key={cita.id}>
              <td>{cita.id}</td>
              <td>{cita.nombreMascota}</td>
              <td>{cita.nombreServicio}</td>
              <td>{cita.nombreVeterinario}</td>
              <td>{cita.fecha}</td>
              <td>{cita.hora}</td>
              <td>{cita.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CitasList;
