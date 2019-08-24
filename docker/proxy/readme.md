## É Necessário configurar as variáveis de ambiente nos containers que vão ser enxergados pelo proxy
por exemplo:
```
      environment:
        - VIRTUAL_HOST=develop.boilerplate.somadevelop.com.br
        - VIRTUAL_PORT=80
```