# CHALLENGE_05 - El problema final

Finalmente los hackers han conseguido acceder a la base de datos y la han dejado
corrupta. Pero parece que han dejado un mensaje oculto en la base de datos.
¿Podrás encontrarlo?

Nuestra base de datos está en formato _.csv_. Las columnas son _id_, _username_,
_email_, _age_, _location_.

Un usuario sólo es válido si:

- **id:** existe y es alfanumérica
- **username:** existe y es alfanumérico
- **email:** existe y es válido (sigue el patrón _`user@dominio.com`_)
- **age:** es opcional pero si aparece es un número
- **location:** es opcional pero si aparece es una cadena de texto

### Ejemplos:

- [x] Entrada: `1a421fa,alex,alex9@gmail.com,18,Barcelona` Resultado: ✅ Válido

- [ ] Entrada: `9412p_m,maria,mb@hotmail.com,22,CDMX` Resultado: ❌ Inválido
      (_id_ no es alfanumérica, sobra el `_`)

- [x] Entrada: `494ee0,madeval,mdv@twitch.tv,,` Resultado: ✅ Válido (_age_ y
      _location_ son opcionales)

- [ ] Entrada: `494ee0,madeval,twitch.tv,22,Montevideo` Resultado: ❌ Inválido
      (_email_ no es válido)

## Cómo resolverlo

1. Analiza [la lista de entradas](./data/database_attacked.txt) de la base de
   datos y detecta los inválidos

2. Encuentra el primer caracter (número o letra) del username de cada usuario
   inválido. Júntalos por orden de aparición y descubre el mensaje oculto. Luego
   envíalo con submit. Por ejemplo:

   submit att4ck
