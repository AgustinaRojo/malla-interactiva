const materias = document.querySelectorAll('.materia');

materias.forEach(boton => {
  boton.addEventListener('click', () => {
    if (boton.classList.contains('bloqueada')) return;

    boton.classList.add('aprobada');
    const id = boton.dataset.id;

    // Desbloquea materias dependientes
    materias.forEach(materia => {
      const requisitos = materia.dataset.prerrequisitos?.split(',') || [];
      const todosAprobados = requisitos.every(req => {
        return document.querySelector(`.materia[data-id="${req}"]`)?.classList.contains('aprobada');
      });

      if (materia.classList.contains('bloqueada') && todosAprobados) {
        materia.classList.remove('bloqueada');
      }
    });

    // ✅ Verificar si se completó TODO el ciclo básico
    const cicloBasico = [
      "elementos", "lectura", "matematicas",
      "matematicaI", "introProg", "orgComp",
      "estructuraDatos", "progObjetosI", "basesDatos",
      "matematicaII", "progObjetosII", "redesComp", "sistemasOperativos", "progFuncional",
      "interfaces", "algoritmos", "persistencia", "labSistemas"
    ];

    const cicloCompleto = cicloBasico.every(id => {
      return document.querySelector(`.materia[data-id="${id}"]`)?.classList.contains('aprobada');
    });

    // 🔓 Desbloquear Núcleo Complementario + Aspectos Legales
    if (cicloCompleto) {
  document.querySelectorAll('[data-id="aspectosLegales"], #nucleo-complementario .materia').forEach(m => {
    m.classList.remove('bloqueada');
  });

  const noti = document.getElementById('notificacion-exito');
  if (noti && noti.style.display === 'none') {
    noti.style.display = 'block';
    setTimeout(() => {
      noti.style.display = 'none';
    }, 4000); // se oculta en 4 segundos
  }
}

      });
    }
  });
});
