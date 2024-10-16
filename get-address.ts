async function getAddress(cep: string) {
  const url = `https://viacep.com.br/ws/${cep}/json/`;

  try {
    const response = await fetch(url);

    console.log(response);
    const data = await response.json();
    console.log(data.erro);
  } catch (error) {
    console.error("Ocorreu algum erro na requisição", error);
  }
}

getAddress("53240501");


/* async function getData() {
    const url = "https://example.org/products.json";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      // ...
    } catch (error) {
      console.error(error.message);
    }
  }
   */