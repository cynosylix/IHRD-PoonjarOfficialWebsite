fetch("https://cep.ac.in/departments/ee")
  .then((r) => r.text())
  .then((t) => {
    const names = [...t.matchAll(/alt="([^"]+) portrait"/gi)].map((m) => m[1]);
    console.log(names);
  });
