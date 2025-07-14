document.querySelectorAll('.materia').forEach(boton => {
  boton.addEventListener('click', () => {
    if (boton.classList.contains('bloqueada')) return;

    // Aprobar la materia visualmente
    boton.classList.add('aprobada');

    const id = boton.dataset.id;

    // Buscar materias que dependan de esta
    document.querySelectorAll('.materia.bloqueada').forEach(m => {
      const requisitos = m.dataset.prerrequisitos?.split(',') || [];
      if (requisitos.includes(id)) {
        // Verificar si todos sus requisitos están aprobados
        const aprobados = requisitos.every(r => {
          return document.querySelector(`.materia[data-id="${r}"]`)?.classList.contains('aprobada');
        });

        if (aprobados) {
          m.classList.remove('bloqueada');
        }
      }
    });
  });
});
